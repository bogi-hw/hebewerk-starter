# Hebewerk Starter

Dieses Projekt...
- **serviert eine HTML Seite** (mittels Vite)
    - Bindet die **[p5.js](https://p5js.org/)** Biblothek ein, mit der man schnell ein einfach paar grafische Spielereien auf den Bildschirm zaubert ;)
- **ist eine vollständige Client / Server + Datenbank- Anwendung**. 
  - Serverseitig läuft ebebfalls Javascript (Nodejs). Darunter dann:
    - Express: Webserver
    - [Restfuncs](https://github.com/bogeeee/restfuncs): Für eine super einfache Client<>Server Kommunikation (RPC)
    - [MembraceDb](https://github.com/bogeeee/membrace-db): Eine fast nicht exisiterende Datenbank, die nur den Javascript-Objektbaum als .json Datei wegspeichert (oder lädt). Damit kommt man schon mal ziemlig weit und wir wollen es am Anfang nicht zu kompliziert machen. (kein SQL, keine Tabellen, kein ORM, keine Beziehungskonfiguration, kein extra Server) TODO: Momentan ist die DB wegen nerfiger .lock Fehlermeldung noch im Branch: `withDatabase` 

## Wo bekomme ich eine IDE her ?

**Tl;dr:** Klicke auf [StackBlitz](https://stackblitz.com/fork/github/bogi-hw/hebewerk-starter?title=Hebewerk%20Starter&file=web%2Fgame.ts), zum reinschnuppern. Ansonsten VS-Code (lokal).

| IDE                                  | Beschreibung | Läuft wo | Basiert auf | Ohne Account | Verpacken als Docker moglich | Schnell |   Kostenlos | Git integriert | Server debugging | browser debugging (im original Code) | Einstellungen und Plugins
| :---------------: | :-------------: | :--------------: | :--------------: | :--------------: | :--------------: | :--------------: | :--------------: | :--------------: | :--------------: | :--------------: | :--------------: |
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/bogi-hw/hebewerk-starter?title=Hebewerk%20Starter&file=web%2Fgame.ts) | Für die Ungeduldigen ([nur 1 Klick 👍](https://stackblitz.com/fork/github/bogi-hw/hebewerk-starter?title=Hebewerk%20Starter&file=web%2Fgame.ts)). | Vollständig im Browser (krank !!!) | VS-Code | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌
Visual Studio Code (lokal) **Empfohlen**|  Runterladen und lokal installieren (Vorteil, siehe unten). | Lokal | VS-Code | ✅ | <a title="Images für Linux bauen ist nur unter Linux möglich">❌*</a> | ✅ | ✅ | ✅ | ✅ | ✅ | ✅
Github Codespaces | Github account anlegen. Dannach klicke (hier) auf **&lt;&gt; Code** -> Codespaces. | In der Cloud | VS-Code | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ✅
Jetbrains Webstorm | Für die ultra Cracks. | Lokal | Jetbrains | ❌ | <a title="Images für Linux bauen ist nur unter Linux möglich">❌*</a> | ✅ | <a title="Ca. 10€/Monat">❌*</a> | ✅ | ✅ | ✅ | ✅

`*` = hover mich.

_Vorteile bei Lokalen IDEs: Du siehst erst mal klarer, was ab geht in Sachen Server/Browser und hast eine bessere Kontrolle darüber. 
Dagegen ist eine IDE im Browser, die dann wiederrum ein kleines Fenster hat, was einen Browser simuliert, welches zu dem simulierten Server deiner App im Browser (oder der Cloud) verbindet (plus dazu noch 'n Proxy dazwischen, der ein paar Sachen optimiert) vielleicht erst mal etwas Overkill in der Vorstellung ;) Dazu ist es verwirrend, dass die Browser Devtools nun die IDE und deine Anwendung gleichzeitig debuggen._

Für Visual Studio Code sind folgende Plugins empfohlen: Eslint, Javascript booster, npm Intellisense, Gitlens (Achtung: Gitlens spamt dich ein bischen voll mit Kontextinfo. Kann man per Eintellungen bändigen).



### Projekt lokal (auf deinem Computer) ausführen

- [Git](https://git-scm.com/download/) installieren
- Git Projekt klonen/runterladen: `git clone https://github.com/bogi-hw/hebewerk-starter.git`
- [NodeJs](https://nodejs.org/en/download) installieren
- npm packages holen und App ausführen (diesen Schritt auch bei Github Codespaces):

<details>
  <summary>⚠⚠⚠ Sicherheitswarnung zu `npm install`</summary>

`npm install` installiert eine Menge Pakete (Abhängigkeiten von Abhängikeiten von... . Da kommt dann ganz schön was zusammen). Bei diesem Projekt sind es aktuell grade 281 Pakete (siehst du im node_modules Ordner). Dies sind alles open-source Projekte, die zwar von vielen hunderttausen Benutzern verwendet werden, 
und die Öffentlichkeit hat hoffentlich ein gewisses Auge darauf, dass da kein Schadcode dabei ist. Aber letztlich steckt hinter jedem dieser Pakete dann doch ein random-guy aus dem Internet, dem das Vertrauen vorgeschossen wird.
Es wird daher von uns dringend empfohlen, Schutzmaßnahmen zu treffen, die leider auch etwas nerfig sein können:
- Eine virtuelle Maschine nur für dieses Projekt zu benutzen. Z.B. mit virtualbox oder vmware player (der ist hoffentlich noch kostenlos).
- [Einen Dev-Server in einem Docker Container laufen zu lassen, in dem dieses Projekt ausgeführt wird](docker_dev_environment/README.md) 

</details>

```bash
cd hebewerk-starter
npm install --ignore-scripts
npn run dev
```