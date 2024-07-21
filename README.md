# Hebewerk Starter

Dieses Projekt...
- **serviert eine HTML Seite** (mittels Vite)
    - Bindet die **[p5.js](https://p5js.org/)** Biblothek ein, mit der man schnell ein einfach paar grafische Spielereien auf den Bildschirm zaubert ;)
- **ist eine vollständige Client / Server + Datenbank- Anwendung**. 
  - Serverseitig läuft ebenfalls Javascript (Nodejs). Darunter dann:
    - [Express](https://expressjs.com/de/guide/routing.html): Simpler Webserver
    - [Restfuncs](https://github.com/bogeeee/restfuncs): Für eine super einfache Client<>Server Kommunikation (RPC).
    - [MembraceDb](https://github.com/bogeeee/membrace-db): Eine fast nicht existierende Datenbank, die nur den Javascript-Objektbaum als .json Datei wegspeichert (oder lädt). Damit kommt man schon mal ziemlig weit und wir wollen es am Anfang nicht zu kompliziert machen. (kein SQL, keine Tabellen, kein ORM, keine Beziehungskonfiguration, keine extra Anwendung oder extra Server) 

# Code bearbeiten

Klicke hier: [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/bogi-hw/hebewerk-starter?title=Hebewerk%20Starter&file=web%2Fgame.ts) zum Bearbeiten und ausprobieren.

<details>
  <summary>Ich will es professioneller. Wo bekomme ich eine IDE her (Vergleichstabelle) ?</summary>

**Tl;dr:** Nimm am besten VS-Code (lokal).

| IDE                                  | Beschreibung | Läuft wo | Basiert auf | Ohne Account | Verpacken als Docker moglich | Schnell |   Kostenlos | Git integriert | Server debugging | browser debugging (im original Code) | Einstellungen und Plugins
| :---------------: | :-------------: | :--------------: | :--------------: | :--------------: | :--------------: | :--------------: | :--------------: | :--------------: | :--------------: | :--------------: | :--------------: |
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/bogi-hw/hebewerk-starter?title=Hebewerk%20Starter&file=web%2Fgame.ts) | Für die Ungeduldigen ([nur 1 Klick 👍](https://stackblitz.com/fork/github/bogi-hw/hebewerk-starter?title=Hebewerk%20Starter&file=web%2Fgame.ts)). | Vollständig im Browser (krank !!!) | VS-Code | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌
Visual Studio Code (lokal) **Empfohlen**|  Runterladen und lokal installieren (Vorteil, siehe unten). | Lokal | VS-Code | ✅ | <a title="Images für Linux bauen ist nur unter Linux möglich">❌*</a> | ✅ | ✅ | ✅ | ✅ | ✅ | ✅
Github Codespaces | Github account anlegen. Dannach klicke (hier) auf **&lt;&gt; Code** -> Codespaces. | In der Cloud | VS-Code | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ✅
Jetbrains Webstorm | Für die ultra Cracks. | Lokal | Jetbrains | ❌ | <a title="Images für Linux bauen ist nur unter Linux möglich">❌*</a> | ✅ | <a title="Ca. 10€/Monat">❌*</a> | ✅ | ✅ | ✅ | ✅

`*` = hover mich.

Vorteile bei Lokalen IDEs: Du siehst erst mal klarer, was ab geht in Sachen Server/Browser und hast eine bessere Kontrolle darüber. 
Dagegen kann die "IDE im Browser" Variante erst mal ziemlig overkill in der Vorstellung sein. _Erklärung: die IDE läuft im Browser, der dann wiederrum ein kleines Fenster hat, was einen Browser simuliert, welches zu dem simulierten Server deiner App im Browser (oder der Cloud) verbindet (plus dazu noch 'n Proxy dazwischen, der ein paar Sachen optimiert). Dazu ist es verwirrend, dass die Browser Devtools nun die IDE und deine Anwendung gleichzeitig debuggen._

Für Visual Studio Code sind folgende Plugins empfohlen: Eslint, Javascript booster, npm Intellisense, Gitlens (Achtung: Gitlens spamt dich ein bischen voll mit Kontextinfo. Kann man per Eintellungen bändigen).
</details>

# Anwendung lokal (auf deinem Computer) ausführen

1. [NodeJs](https://nodejs.org/en/download) installieren
2. [Git](https://git-scm.com/download/) installieren
3. Git Projekt klonen/runterladen:
````bash
git clone https://github.com/bogi-hw/hebewerk-starter.git`
cd hebewerk-starter
````

4. **NPM** Pakete installieren:
````bash
npm install --ignore-scripts
````
<details>
  <summary>⚠⚠⚠ Sicherheitswarnung zu `npm install`</summary>

`npm install` installiert eine Menge Pakete (Abhängigkeiten von Abhängikeiten von... . Da kommt dann ganz schön was zusammen). Bei diesem Projekt sind es aktuell grade 281 Pakete (siehst du im node_modules Ordner). Dies sind alles open-source Projekte, die zwar von vielen hunderttausenden Benutzern verwendet werden,
und die Öffentlichkeit hat hoffentlich ein gewisses Auge darauf, dass da kein Schadcode dabei ist. Aber letztlich steckt hinter jedem dieser Pakete dann doch ein random-guy aus dem Internet, dem das Vertrauen vorgeschossen wird.
Es wird daher von uns dringend empfohlen, Schutzmaßnahmen zu treffen, die leider auch etwas nervig sein können:
- Eine virtuelle Maschine nur für dieses Projekt zu benutzen. Z.B. mit virtualbox oder vmware player (der ist hoffentlich noch kostenlos).
- [Einen Dev-Server in einem Docker Container laufen zu lassen, in dem dieses Projekt ausgeführt wird](docker_dev_environment/README.md)

</details>

5. App ausführen (diesen Schritt auch bei Github Codespaces):
```bash
npm run dev
```

# Ein kleiner Rundgang durch den Code
Willkommen bei der Tourieführung! Interessant sind erst mal die folgenden Dateien:
- `web/`

    - `game.ts` Hier wird der Kreis auf dem Canvas gezeichnet und du kannst loslegen und ein **Browserspiel programmieren**.
    - `ui-with-react.tsx` Hier kannst du mit React.js ein User interface Programmieren und auch Servermethoden aufrufen aus `server/GreeterSession.ts`.
    - `index.html` **Startseite**, welche beide o.g. Dateien einbindet. Schmeiße eine von Beiden raus, wenn du sie nicht brauchst.
- `server/`
    - `Application.ts`: Unter `constructor() {...` siehst du, wie der Webserver initialisiert wird. Außerdem sind zentrale Dinge, wie die Datenbank dort in der Application Klasse definiert und über `application.xyz...` dann von überall aus erreichbar.
    - `GreeterSession.ts` Enthält aufrufbare API "Endpoints" für die der Anwendung im Browser (`ui-with-react.tsx`). Also für eine Client-zu-Server Kommunikation per HTTP. Dabei werden diese "Endpoints" als ganz normale javascript/typescript Methoden geschrieben👍.
