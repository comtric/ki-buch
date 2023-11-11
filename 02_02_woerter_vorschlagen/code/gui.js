const GUI = {

  textEingabe: undefined,
  textAusgabe: undefined,
  wortEinfuegeKnoepfe: [],

  erzeugeGUI() {
    createElement("h1", "Wörter vorschlagen");

    noCanvas();

    this.textAusgabe = createElement("textarea");
    this.textEingabe = createElement("textarea");
    this.textEingabe.input(eingabe);
  }

}