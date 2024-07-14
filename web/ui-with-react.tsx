import ReactDOM from "react-dom";
import * as React from "react";
import {useEffect, useState} from "react";
import { RestfuncsClient } from "restfuncs-client";
import { GreeterSession } from "../server/GreeterSession.js"; // Import to have types

function App() {
    return <div>Der Kram hier unten / diese Textzeile wurde per React ausgegeben (web/ui-with-react.tsx). {/*TODO: Hier ein paar schöne MUI Elemente einfügen */}</div>
}

(async () => {
    // Die Komponente "App" auf die aktuelle Seite (index.html) rendern:
    const rootDiv = document.createElement("div");
    document.body.append(rootDiv);
    ReactDOM.render(<App/>, document.getElementById("ui-with-react_container"));

    // **** Eine Funktion auf dem Server aufrufen und Ergebnis ausgeben: ****
    // TODO: Why does VS-Code on github workspaces complain on the following line?:
    const greeterSession = new RestfuncsClient<GreeterSession>("/greeterAPI", {/* options */}).proxy
    console.log(await greeterSession.greet("Bob"));


    await greeterSession.addAnApple(false);
})()