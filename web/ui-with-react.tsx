import * as React from "react";
import { createRoot } from 'react-dom/client';
import {useEffect, useState} from "react";
import { RestfuncsClient } from "restfuncs-client";
import { GreeterSession } from "../server/GreeterSession.js"; // Import to have types

const greeterSession = new RestfuncsClient<GreeterSession>("/greeterAPI", {/* options */}).proxy

function App() {
    return <div>Der Kram hier unten / diese Textzeile wurde per React ausgegeben (web/ui-with-react.tsx). {/*TODO: Hier ein paar schöne MUI Elemente einfügen */}</div>
}

(async () => {
    // Die Komponente "App" auf die aktuelle Seite (index.html) rendern:
    const rootDiv = document.createElement("div");
    document.body.append(rootDiv);
    const reactRoot = createRoot(rootDiv);
    reactRoot.render(<App/>)

    // **** Eine Funktion auf dem Server aufrufen und Ergebnis ausgeben: ****
    // TODO: Why does VS-Code on github workspaces complain on the following line?:

    console.log(await greeterSession.greet("Bob"));


    await greeterSession.addAnApple(false);
})()