import * as React from "react";
import {CSSProperties, FunctionComponent, useEffect, useLayoutEffect, useState} from "react";
import {
    Button,
    ButtonGroup,
    Classes,
    Dialog as BlueprintDialog,
    DialogProps as BlueprintDialogProps,
    Intent,
    NonIdealState,
    NonIdealStateIconSize,
    ProgressBar,
    Tag,
    Tooltip
} from "@blueprintjs/core";
import ReactDOM from "react-dom";
import {RestfuncsClient} from "restfuncs-client";
import {IServerSession} from "restfuncs-common";
import { Dialog,  DialogTitle, Paper} from "@mui/material";
import {DialogProps} from "@mui/material/Dialog";
import Draggable from 'react-draggable';
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

/**
 * (Dumb) Execute passed funktion
 *
 * Makes it clearer that the method is immediately executed than
 * () => {
 *     ... 100 lines
 * }()
 *
 * @param executor
 */
export function execNow<R>(executor: () => R) {
    return executor();
}

/**
 * You can see the the instance id change ever time this component is re-instantiated
 * @param props
 * @constructor
 */
export function DebugInstanceId(props: {}) {
    let [instanceId] = useState(Math.random())
    return <span>InstanceId: {instanceId}</span>
}

/**
 * More friendly way to show a modal blueprint dialog. Usage:
 * <pre><code>
   import { Button, ButtonGroup, Classes, Intent,} from "@blueprintjs/core";
   import "@blueprintjs/core/lib/css/blueprint.css"; // don't forget these
   import "@blueprintjs/icons/lib/css/blueprint-icons.css"; // don't forget these

   const result = await showBlueprintDialog({title: "SayHello"},(props) => {
     return <div>
                <div className={Classes.DIALOG_BODY}>
                    ...
                </div>

                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <ButtonGroup>
                            <Button onClick={() => props.resolve(myResult)} intent={Intent.PRIMARY}>OK</Button>
                            <Button onClick={() => props.resolve(undefined)}>Cancel</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>;
 * });
 *
 * ... code after dialog was closed...
 * </code></pre>
 * For a dialog with dragging and resizing, {@see showMuiDialog}
 * @param dialogProps
 * @param ContentComponent
 */
export async function showBlueprintDialog<T>(dialogProps: Partial<BlueprintDialogProps>, ContentComponent: FunctionComponent<{resolve: (result: T) => void, close: () => void}>) {
    return new Promise<T|undefined>((resolve) => {
        // We need some <div/> to render into
        const targetDiv = document.createElement("div");
        targetDiv.className = "ContainerForDialog"; // Tag it just for better debugging
        document.body.append(targetDiv);

        /**
         * Wrapper component so we can control the open state
         * @param props
         * @constructor
         */
        function Wrapper(props: {}) {
            let [open, setOpen] = useState(true);

            function close() {
                setOpen(false);
                targetDiv.remove(); // clean up target div. A bit dirty but works
            }

            return <BlueprintDialog usePortal={true} portalContainer={document.body} isOpen={open} {...dialogProps} onClose={() => {
                close();
                resolve(undefined);
            }}>
                <ContentComponent close={close} resolve={(result) => {
                    close();
                    resolve(result);
                }}/>
            </BlueprintDialog>
        }

        ReactDOM.render(<Wrapper/>, targetDiv);
    })
}


/**
 * More friendly way to show a modal MUI dialog. The dialog is also draggable and resizable. Usage:
 * <pre><code>
 import { DialogActions, DialogContent, DialogContentText} from "@mui/material";

 const result = await showMuiDialog("My dialog", {}, (props) => {
       return <React.Fragment>
           <DialogContent>
               <DialogContentText>
                   text
               </DialogContentText>
               other content
           </DialogContent>
           <DialogActions>
                <Button type="submit" onClick={() => props.resolve("OK")} >OK</Button>
                <Button onClick={() => props.resolve(undefined)}>Cancel</Button>
           </DialogActions>
       </React.Fragment>
     }, {width: "650px", height: "260px"}); // Specify css for default width/height (here), or minWidth/minHeight, or omit to fit content
 });

 ... code after dialog was closed...
 </code></pre>
 * For docs, see: https://mui.com/material-ui/api/dialog/
 * @param dialogProps
 * @param ContentComponent
 */
export async function showMuiDialog<T>(title: string | React.ReactElement, dialogProps: Partial<DialogProps>, ContentComponent: FunctionComponent<{resolve: (result: T) => void, close: () => void}>, paperSx?: CSSProperties) {
    return new Promise<T|undefined>((resolve) => {
        // We need some <div/> to render into
        const targetDiv = document.createElement("div");
        targetDiv.className = "ContainerForDialog"; // Tag it just for better debugging
        document.body.append(targetDiv);

        /**
         * Wrapper component so we can control the open state
         * @param props
         * @constructor
         */
        function Wrapper(props: {}) {
            let [open, setOpen] = useState(true);

            function close() {
                setOpen(false);
                targetDiv.remove(); // clean up target div. A bit dirty but works
            }

            return <Dialog open={open} {...dialogProps}
                           onClose={() => {
                               close();
                               resolve(undefined);
                           }}
                           PaperComponent={PaperComponent}
                           maxWidth={false}
                           aria-labelledby="draggable-dialog-title" {...dialogProps}>
                <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">{title}</DialogTitle>
                <ContentComponent close={close} resolve={(result) => {
                    close();
                    resolve(result);
                }}/>
            </Dialog>
        }

        ReactDOM.render(<Wrapper/>, targetDiv);
    })


    function PaperComponent(props: any) {
        return (
            <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
                <Paper {...props} sx={{resize: "both", ...(props.sx || {}), ...(paperSx || {})}} />
            </Draggable>
        );
    }
}



/**
 * Shows the (big) text content (like an exception) in a popup dialog
 * @param value
 * @param title
 * @param icon
 */
export async function showResultText(value: string, title?: string, icon?) {
    copyStringToClipboard(value);
    //TODO: For more space and resizability, we should use showMuiDialog instead
    await showBlueprintDialog({title, icon, style:{width:`${window.document.documentElement.clientWidth - 20}px`, height: `${window.document.documentElement.clientHeight - 100}px`} }, (props) => {
        return <div style={{height: "100%", display: "flex", flexDirection: "column"}}>
            <div className={Classes.DIALOG_BODY} style={{flexGrow: 1}}>
                <textarea style={{width: "100%", height: "100%"}} value={value} readOnly={true}/>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
                <Tag style={{position: "absolute"}}>Copied to clipboard.</Tag>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <ButtonGroup>
                        <Button onClick={() => props.resolve(true)} intent={Intent.PRIMARY} autoFocus={true}>OK</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    });
}

export async function withLoadingDialog(exec: () => Promise<unknown>,title =  "Loading...") {
    let close: () => void;
    try {
        const ignoredPromise  = showBlueprintDialog({title},(props) => {
            close = props.close;
            return <div>
                <div className={Classes.DIALOG_BODY}>
                    <ProgressBar/>
                </div>
            </div>;
        });
        return await exec();
    }
    finally {
        close?.();
    }
}

/**
 * Allows to a simpler form:
 * <input type={"text"} value={myStateValue} onChange={htmlEventHandlerForSetter(setMyStateValue)}/>
 * @param simpleHandler
 */
export function htmlEventHandlerForSetter(simpleHandler: (value: string) => void) : React.FormEventHandler<HTMLElement> {
    return (event: React.ChangeEvent<HTMLInputElement>) => simpleHandler(event.target.value);
}



export function replaceNull(value: string | null) : string {
    if(value === null || value === undefined) {
        return "";
    }
    return value;
}

/**
 * get/sets the whole part of the url after the #: i.e. http://localhost:8181/#mainpart?someOtherParam=xyz
 * would see "mainpart?someOtherParam=xyz"
 *
 * Copied from here: https://www.30secondsofcode.org/react/s/use-hash
 */
export function useHash(): [string, (newHash: string) => void] {
    const [hash, setHash] = React.useState<string>(window.location.hash);

    const hashChangeHandler = React.useCallback(() => {
        setHash(window.location.hash);
    }, []);

    React.useEffect(() => {
        window.addEventListener('hashchange', hashChangeHandler);
        return () => {
            window.removeEventListener('hashchange', hashChangeHandler);
        };
    }, []);

    const updateHash = React.useCallback(
        (newHash: string) => {
            if (newHash !== hash) window.location.hash = newHash;
        },
        [hash]
    );

    return [hash, updateHash];
};


/**
 * Gets / sets a param of the url after the #..?
 * I.e.: http://localhost:8181/#?myParam=xyz
 */
export function useHashParam(name: string, initialValue?: string): [string|undefined, (newHash?: string) => void] {
    const [hash, setHash] = useHash();



    function setValue(newValue?: string) {
        const params = getParamsFromUrl(hash);
        params[name] = newValue;

        let pairs = [];
        Object.keys(params).forEach(key => {
            const value = params[key];
            if(value) {
                pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            }
        });


        let newHash = hash.replace(/\?.*/,""); // remove ?... part
        newHash+= "?" + pairs.join("&");
        setHash(newHash);
    }

    const currentValue = getParamsFromUrl(hash)[name];

    // set initial value
    useEffect(() => {
        if(!currentValue) {
            setValue(initialValue);
        }
    },[]);

    return [currentValue, setValue]
}

export function getParamsFromUrl(url: string) {
    let regExp = /.*\?(.*)/;
    if(!regExp.test(url)) {
        return {}
    }
    const paramsPart = regExp.exec(url)![1];

    const result:Record<string, string> = {};
    paramsPart.split("&").forEach( paramPart => {
        let tokens = paramPart.split("=");
        if(tokens.length == 2) {
            result[decodeURIComponent(tokens[0])] = decodeURIComponent(tokens[1]);
        }
    })

    return result;
}


/**
 * Like useHashParam, but allows to set any value that will then be encoded / decocoded to json in the url
 */
export function useJsonHashParam<T>(name: string, initialValue?: T): [T, (newValue?: T) => void] {
    function toString(value) {
        return value === undefined ? undefined : JSON.stringify(value);
    }

    const [stringValue, setStringValue] = useHashParam(name, toString(initialValue));
    const currentValue = stringValue === undefined?undefined:JSON.parse(stringValue);

    return [currentValue, (newValue?: T) => setStringValue(toString(newValue))]
}


/**
 *
 * @param poller
 * @param intervalDuration
 * @param initalValue
 * @param deps
 * @returns array An array of: [The result (T|Error|undefined), An async function for manually triggering a re-poll]
 */
export function usePoll<T>(poller:  () => Promise<T>, intervalDuration: number, initalValue?: T , deps: any[] = []): [T|Error|undefined, () => Promise<void>] {
    const [result, setResult] = useState(initalValue)

    const doPoll = async () => {
        try {
            const pollResult = await poller();
            setResult(pollResult)
        }
        catch(e) {
            setResult(e)
        }
    };

    useEffect(() => {
        const interval = setInterval( doPoll, intervalDuration);
        doPoll(); // run also now
        return function cleanup() {
            clearInterval(interval);
        }
    },deps);

    return [result, doPoll]
}

export async function withErrorHandling(fn: () => Promise<void>) {
    try {
        await fn()
    }
    catch (e) {
        // Handle very very uncommon case of non-error:
        if(! (e instanceof Error)) {
            e = new Error(`Caught non-error value: ${e}`);
        }

        fixErrorStack(e as Error);
        await showResultText(errorToString(e), "Error", "error")
    }
}

export function ExceptionPopover(props) {
    if(!props.fullException) {
        return <span>{props.children}</span>
    }

    const onClick = () => {
        showResultText(props.fullException, "Error", "error");
    };

    return <Tooltip content={<span>{props.message} <Tag>Click to show full exception (+copy to clipboard)</Tag></span>}>
        <a style={{cursor: "pointer"}} onClick={onClick}>{props.children}</a>
    </Tooltip>
}

/**
 * Show a NonIdealState with a popup that shows the full stacktrace + causes.
 * <p>Has the side effect of fixErrorStack</p>
 *
 * @param props
 * @constructor
 */
export function ErrorState(props) {
    fixErrorStack(props.error)
    const fullError = errorToString(props.error);

    const onClick = () => {
        showResultText(fullError, props.error.message, "error");
        setTimeout(() => { // not in the thread that's caught by reacts error handler
            throw props.error // ### Don't look here, this line is just the error reporter! ### / Show error to console so the javascript source mapping will be resolved
        })
    }

    return <Tooltip content={"Click to show full error (+copy to clipboard)"}>
        <a style={{cursor: "pointer"}} onClick={onClick}>
            <NonIdealState icon={"error"} iconSize={NonIdealStateIconSize.SMALL} description={props.error.message}/>
        </a>
    </Tooltip>
}

/**
 * Removes redundant info from the error.stack + error.cause properties
 * @param error
 */
export function fixErrorStack(error: Error) {
    //Redundantly fix error.cause's
    //@ts-ignore
    if (error.cause && typeof error.cause === "object") {
        //@ts-ignore
        fixErrorStack(error.cause as Error);
    }

    if (typeof error.stack !== "string") {
        return;
    }

    // Remove repeated title from the stack:
    let title = (error.name ? `${error.name}: ` : "") + (error.message || String(error))
    if (error.stack?.startsWith(title + "\n")) {
        error.stack = error.stack.substring(title.length + 1);
    }
}


export type ErrorWithExtendedInfo = Error & { cause?: Error, fileName?: string, lineNumber?: Number, columnNumber?: Number, stack?: string };
export function errorToString(e: any): string {
    // Handle other types:
    if(!e || typeof e !== "object") {
        return String(e);
    }
    if(!e.message) { // e is not an ErrorWithExtendedInfo ?
        return JSON.stringify(e);
    }
    e = e as ErrorWithExtendedInfo

    return (e.name ? `${e.name}: `: "") + (e.message || String(e)) +
        (e.stack ? `\n${e.stack}` : '') +
        (e.fileName ? `\nFile: ${e.fileName}` : '') + (e.lineNumber ? `, Line: ${e.lineNumber}` : '') + (e.columnNumber ? `, Column: ${e.columnNumber}` : '') +
        (e.cause ? `\nCause: ${errorToString(e.cause)}` : '')
}

export function copyStringToClipboard(text: string) {
    // Copy to clipboard
    if(window.navigator.clipboard) { // method exists (modern browsers) ?
        navigator.clipboard.writeText(text);
    }
    else { // @ts-ignore
        if(window.clipboardData && window.clipboardData.setData) { // old ie / edge < 79 (without chromium)
            text = text.replace(/\r?\n/g,"\r\n"); // Zeilenumbrüche immer als \r\n. Sonst klappt das Pasten z.b. nach Notepad nicht richtig
            // @ts-ignore
            window.clipboardData.setData('Text', text);
        }
    }
}

interface WithLogin extends IServerSession {
    login(userName: string): Promise<boolean>;
}

/**
 *
 */
export class RestfuncsClientWithLogin<S extends WithLogin> extends RestfuncsClient<S> {
    async doCall(funcName: string, args: any[]) {
        try {
            return await super.doCall(funcName, args);
        } catch (e) {
            if (e?.cause?.name === "NotLoggedInError") {
                await this.doGuidedLogin();
                return await super.doCall(funcName, args); // We are so kind to finish the original call. Look how the result is immediately displayed after entering the correct username
            }

            throw e;
        }
    }

    /**
     * Shows a login dialog until the user is successfully logged in
     */
    async doGuidedLogin() {
        let loginSuccessfull
        do {
            const userName = prompt("Bitte Admin Passwort eingeben")
            loginSuccessfull = await this.proxy.login(userName);
        } while (!loginSuccessfull)
    }
}


/**
 * Calls effectFn on resize and initially
 * @param effectFn Function that i.e. implements **responsive** dom corrections
 * @param deps
 */
export function useWindowResizeEffect(effectFn:  () => void, deps?: React.DependencyList | undefined) {
    useLayoutEffect(() => {
        window.addEventListener("resize", effectFn);

        effectFn(); // Call initially

        return function cleanUp() {
            window.removeEventListener("resize", effectFn)
        }

    },deps);
}

/**
 * Calls effectFn on resize and initially
 * @param watchedElementRef
 * @param effectFn
 * @param deps
 */
export function useResizeEffect(watchedElementRef: React.RefObject<HTMLElement>, effectFn:  () => void, deps?: React.DependencyList | undefined) {
    useLayoutEffect(() => {
        if(!watchedElementRef.current) {
            return
        }

        let elementToWhichTheListenerWasAdded = watchedElementRef.current; // Refs can change over time. So we make sure to add and clean it on the exact one
        elementToWhichTheListenerWasAdded.addEventListener("resize", effectFn);

        effectFn(); // Call initially

        return function cleanUp() {
            if(elementToWhichTheListenerWasAdded) {
                elementToWhichTheListenerWasAdded.removeEventListener("resize", effectFn)
            }
        }

    },deps);
}