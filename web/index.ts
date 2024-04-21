import {RestfuncsClient} from "restfuncs-client";
import {GreeterSession} from "../GreeterSession.js" // Import to have types

(async () => {
    // TODO: Why does VS-Code on github workspaces complain on the following line?:
    const greeterSession = new RestfuncsClient<GreeterSession>("/greeterAPI", {/* options */}).proxy
    document.getElementById("main")!.textContent = await greeterSession.greet("Bob")
})()