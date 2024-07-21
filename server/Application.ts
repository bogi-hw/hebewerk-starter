import {restfuncsExpress, ServerSessionOptions} from "restfuncs-server";
import {GreeterSession} from "./GreeterSession.js"
import helmet from "helmet";
import {createServer} from "vite";
import express from "express";
import {MembraceDb, persistence} from "membrace-db";
import {ApplicationData} from "../model/ApplicationData.js";
import http from "node:http";



/**
 * Class for the application singleton (=one and only instance). You can store all **global** fixed configuration values and **global** state inside this class.
 * <p>
 * Access the application object via:
 * </p> 
 * <code><pre>
 * import {Application} from "....Application.js"
 * application. ... // <- do somethig with the global application object
 * application.data. ... // Access the data (objects that get stored in the database file /data/db.json and therefore persist a restart)
 * </pre></code>
 * 
 * Effects:
 *  - Starts a webserver on the specified port
 */
export class Application {
    // *** Configuration: ***
    port = 3000

    /**
     * you can specify a backup strategy for the database. Set to undefined to disable backups (i.e. if you handle backups externally instead of by this app)
     */
    keepBackups: MembraceDb<any>["keepBackups"] = { maxAgeInDays: 365 * 2 /* 2 years */ };

    // **** State: ****
    db = new MembraceDb<ApplicationData>("./db", {
        root: new ApplicationData(), // Initial content
        classes: ApplicationData.classes,
        keepBackups: this.keepBackups,    
    });
    
    server?: http.Server;

    constructor() {

        // Create and start web server:
        (async () => {

            const app = restfuncsExpress() // "Express" is the most commonly used webserver in node for simple purposes. Here we use an enhanced version, which gives us websockets and cookie support which both play together. For an express-how-to, see: https://expressjs.com/de/guide/routing.html

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

    get data() {
        return this.db.root;
    }
}

/**
 * Single instance
 */
export const application = new Application();