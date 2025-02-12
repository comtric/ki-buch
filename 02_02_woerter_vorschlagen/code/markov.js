// Da diese Klasse in Kapitel 2 ausführlich diskutiert wird, stehen
// hier nur spärliche Kommentare.

class Markow {

  constructor() {
    uebergaenge: { };
  }

  // Schnittstelle: Text lernen
  lerneText(textQuelle) {
    this.uebergaenge = {};
    const worte = textQuelle.split(" ");
    const nPaare = worte.length - 1;

    for (let i = 0; i < nPaare; i++) {
      const diesesWort = worte[i];
      const naechstesWort = worte[i + 1];
      this.lerneUebergang(diesesWort, naechstesWort);
    }
    //var text = this.uebergaenge.join("-");
    let uebergaenge2 = Object.entries(this.uebergaenge);
    var text = "";
    uebergaenge2.forEach(eintrag => {
      text += eintrag[0] + "->";

      let eintrag1 = Object.entries(eintrag[1]);
      eintrag1.forEach(eintrag2 => {
        text += eintrag2[0] + "(" + eintrag2[1] + ")" + " | ";
      });
      text += "\n";
    });
    GUI.textAusgabe.html(text);
  }

  lerneUebergang(letztesWort, naechstesWort) {
    const eintrag = this.uebergaenge[letztesWort];
    if (!eintrag) {
      this.uebergaenge[letztesWort] = { [naechstesWort]: 1 };
    } else {
      if (!eintrag[naechstesWort]) {
        eintrag[naechstesWort] = 1;
      } else {
        eintrag[naechstesWort] += 1;
      }
    }
  }

  //Schnittstelle: Wort vorschlagen
  wortVorschlaege(letztesWort, anzahl = 5) {
    let eintrag = this.uebergaenge[letztesWort];
    if (eintrag) {
      const eintragAlsArray = Object.entries(eintrag);
      eintragAlsArray.sort((a, b) => b[1] - a[1]);
      let folgewoerter = eintragAlsArray.map(element => element[0]);
      folgewoerter = folgewoerter.slice(0, anzahl);
      return folgewoerter;
    }
  }

}