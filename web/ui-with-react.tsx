import * as React from "react";
import { createRoot } from 'react-dom/client';
import {useEffect, useState} from "react";
import {watchedComponent, useWatchedState, watched, load, poll, isLoading, loadFailed, preserve, bind, READS_INSIDE_LOADER_FN} from "react-deepwatch"
import { RestfuncsClient } from "restfuncs-client";
import { GreeterSession } from "../server/GreeterSession.js"; // Import to have types
import {Button, Switch, TextField } from "@mui/material";

const greeterSession = new RestfuncsClient<GreeterSession>("/greeterAPI", {/* options */}).proxy

const App = watchedComponent(props => {
    const state = useWatchedState({
        name: "",
        hasWorm: false,
    })
    return <div><br/><br/>Der folgende Kram wurde per React ausgegeben (web/ui-with-react.tsx).<br/><br/>
        Name des Apfels: <TextField {...bind(state.name)} /><br/>
        Hat Wurm: <Switch {...bind(state.hasWorm)}/><br/>
        <Button onClick={async () => await greeterSession.addAnApple(state.hasWorm) }>Apfel in den Korb legen</Button>
    </div>
});

(async () => {
    // Die Komponente "App" auf die aktuelle Seite (index.html) rendern:
    const rootDiv = document.createElement("div");
    document.body.append(rootDiv);
    const reactRoot = createRoot(rootDiv);
    reactRoot.render(<App/>)

    // **** Eine Funktion auf dem Server aufrufen und Ergebnis ausgeben: ****
    // TODO: Why does VS-Code on github workspaces complain on the following line?:

    console.log(await greeterSession.greet("Bob"));
})()