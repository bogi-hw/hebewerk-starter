import p5 from "p5";

// *** Wir zeichnen auf einen Canvas mit p5.js. ****
// p5 Get started: https://p5js.org/get-started/
// p5 Referenz: https://p5js.org/reference/
// Im Unterschied zu der Doku: Da diese Javascript Datei ein **Modul** ist, ist der folgende Setup Code nötig und du musst die befehle mit `sketch.` präfixen und globale Symbole mit `p5.` präfixen.
new p5((sketch: p5) => {
    sketch.setup = () => {
        sketch.createCanvas(400, 400);
    };

    sketch.draw = () => {
        sketch.background(220);
        sketch.ellipse(sketch.width / 2, sketch.height / 2, 50, 50);
    };
}, document.getElementById("p5-canvas")!);



