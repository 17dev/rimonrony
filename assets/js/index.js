var Typer = {
  text: "",
  index: 0,
  speed: 3,        // typing speed (higher = faster)
  file: "",
  init: function () {
    setInterval(function () { Typer.toggleCaret(); }, 500);
    $.get(Typer.file, function (data) {
      Typer.text = data;
      // safety trim in case the source ends with a newline
      Typer.text = Typer.text.slice(0, Typer.text.length);
    });
  },
  content: function () { return $("#console").html(); },
  write: function (str) { $("#console").append(str); return false; },
  addText: function () {
    if (!Typer.text) return;
    var cont = Typer.content();
    if (cont.substring(cont.length - 1) === "|") {
      $("#console").html($("#console").html().slice(0, -1));
    }
    Typer.index += Typer.speed;
    var text = Typer.text.substring(0, Typer.index);
    $("#console").html(text.replace(/\n/g, "<br/>"));
    window.scrollBy(0, 50);
    if (Typer.index >= Typer.text.length) clearInterval(window.__typerTimer);
  },
  toggleCaret: function () {
    var cont = Typer.content();
    if (cont.substring(cont.length - 1) === "|") {
      $("#console").html($("#console").html().slice(0, -1));
    } else {
      Typer.write("|");
    }
  }
};

// set the content file to stream into the console
Typer.file = "assets/content/rimijoker.html";
Typer.init();

// drive the typing
window.__typerTimer = setInterval(function () { Typer.addText(); }, 30);

// allow ESC to instantly finish typing (handy for you)
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    Typer.index = Typer.text.length;
    Typer.addText();
  }
});
