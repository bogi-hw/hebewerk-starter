import {Apple} from "./Apple.js";

/**
 * Root class from where you can access all data who's classes and types were are defined in this `model` folder.
 * <p>
 * Access the application object via:
 * </p>
 * <code><pre>
 * import {Application} from "./Application.js"
 * application.data.getApplesWithoutWorm() // `application.data` retrieves the one-and-only ApplicationData instance
 * </pre></code>
 *
 */
export class ApplicationData {
    static classes: any[] = [ApplicationData, Apple]; // All your classes must be registed here, so MembraceDb knows, how to restore them from disk.

    /**
     * Example for a single, global field
     */
    visitCounter = 0;

    /**
     * Example
     */
    apples: Apple[] = []; 

    /**
     * Just an example method 
     * @param apple
     */
    getApplesWithoutWorm() {
        return this.apples.filter(a => !a.hasWorm);
    }
}