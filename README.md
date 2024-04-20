# hebewerk-starter

Starter Projekt für
- Einfache statisch HTML Seiten
- Eine Client / Server + Datenbank- Anwendung

## Wo bekomme ich eine IDE her ?

**Tl;dr:** Klicke auf [StackBlitz](https://stackblitz.com/fork/github/bogi-hw/hebewerk-starter?title=Hebewerk%20Starter&file=client%2Findex.ts), zum reinschnuppern. Ansonsten VS-Code (lokal).

| IDE                                  | Beschreibung | Läuft wo | Basiert auf | Ohne Account | Verpacken als Docker moglich | Schnell |   Kostenlos | Git integriert | Einstellungen und Plugins
| :---------------: | :-------------: | :--------------: | :--------------: | :--------------: | :--------------: | :--------------: | :--------------: | :--------------: | :--------------: |
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/bogi-hw/hebewerk-starter?title=Hebewerk%20Starter&file=client%2Findex.ts) | Für die Ungeduldigen (1 click) | Vollständig im Browser (krank !!!) | VS-Code | ✅ | ❌ | ✅ | ✅ | ❌ | ❌
Visual Studio Code (lokal) **Empfohlen**|  Runterladen und lokal installieren (Vorteil, siehe unten) | Lokal | VS-Code | ✅ | <a title="Images für Linux bauen ist unter Linux möglich">❌*</a> | ✅ | ✅ | ✅ | ✅
Github Codespaces | Github account anlegen. Dannach klicke (hier) auf **&lt;&gt; Code** -> Codespaces | In der Cloud | VS-Code | ❌ | ✅ | ❌ | ✅ | ✅ | ✅
Jetbrains Webstorm | Für die ultra Cracks | Lokal | Jetbrains | ❌ | <a title="Images für Linux bauen ist unter Linux möglich">❌*</a> | ✅ | <a title="Ca. 10€/monat">❌*</a> | ✅ | ✅

`*` = hover mich.

Vorteile bei Lokalen IDEs: Du siehst erst mal klarer, was ab geht in Sachen Server/Browser und hast eine bessere Kontrolle darüber. 
Dagegen ist eine IDE im Browser, die dann wiederrum ein kleines Fenster hat, was einen Browser simuliert, welches zu dem simulierten Server deiner App im Browser (oder der Cloud) verbindet (plus dazu noch 'n Proxy dazwischen, der ein paar Sachen optimiert) vielleicht erst mal etwas Overkill in der Vorstellung ;) Dazu ist es verwirrend, dass die Browser Devtools nun die IDE und deine Anwendung gleichzeitig debuggen.

TODO: Welche Plugins installieren in VS-Code ?

### Lokal ausführen

- [Git](https://git-scm.com/download/) installieren
- Git Projekt klonen/runterladen: `git clone https://github.com/bogi-hw/hebewerk-starter.git`
- [NodeJs](https://nodejs.org/en/download) installieren
- npm packages holen und App ausführen (diesen Schritt auch bei Github Codespaces):
```bash
npm install
npn run dev
```