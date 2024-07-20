import {remote, ServerSession, ServerSessionOptions} from "restfuncs-server";
import {application} from "./Application.js"
import {Apple} from "../model/Apple.js"

export class GreeterSession extends ServerSession {

    static options: ServerSessionOptions = {/* Configuration */}

    @remote()
    async greet(name: string) {
        return `Hello ${name} from the server`
    }
    
    @remote() 
    async addAnApple(withWorm: boolean) {
        let apple = new Apple();
        apple.hasWorm = withWorm;
        application.data.apples.push(apple);

        application.db.markChanged();
    }

    // ... more remote methods go here
}