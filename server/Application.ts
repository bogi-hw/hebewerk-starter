import {restfuncsExpress, ServerSessionOptions} from "restfuncs-server";
import {GreeterSession} from "./GreeterSession.js"
import helmet from "helmet";
import {createServer} from "vite";
import express from "express";
import http from "node:http";



/**
 * Class for the application singleton (=one and only instance). You can store all **global** fixed configuration values and **global** state inside this class.
 * <p>
 * Access the application object via:
 * </p> 
 * <code><pre>
 * import {Application} from "....Application.js"
 * application. ... // <- do somethig with the global application object *
 * </pre></code>
 * 
 * Effects:
 *  - Starts a webserver on the specified port
 */
export class Application {
    // *** Configuration: ***
    port = 3000

    // **** State: ****
    server?: http.Server;

    constructor() {

        // Create and start web server:
        (async () => {

            const app = restfuncsExpress()

            app.use("/greeterAPI", GreeterSession.createExpressHandler() );

            // Client web:
            if (process.env.NODE_ENV === 'development') {
                // Serve web web through vite dev server:
                const viteDevServer = await createServer({
                    server: {
                        middlewareMode: true
                    },
                    root: "web",
                    base: "/",
                });
                app.use(viteDevServer.middlewares)
            } else {
                app.use(express.static('web/dist')) // Serve pre-built web (npm run build)      //TODO: app.use(helmet(),...) wieder reinnehmen - gibt momentan einen Fehler.
            }


            this.server = app.listen(this.port)
            console.log(`Server started: http://localhost:${this.port}`)

        })()

    }
}

/**
 * Single instance
 */
export const application = new Application();