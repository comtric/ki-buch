// Da diese Klasse in Kapitel 2 ausführlich diskutiert wird, stehen
// hier nur spärliche Kommentare.

class Markow {

  constructor() {
    this.uebergaenge = {};
  }

  // Schnittstelle: Alle Übergänge in einem Text lernen
  lerneText(textQuelle, grad) {
    this.uebergaenge = {};
    const nUebergaenge = textQuelle.length - grad;

    for (let i = 0; i < nUebergaenge; i++) {
      const letzteZeichen = textQuelle.slice(i, i + grad);
      const naechstesZeichen = textQuelle[i + grad];
      this.lerneUebergang(letzteZeichen, naechstesZeichen);
    }
  }

  lerneUebergang(letzteZeichen, naechstesZeichen) {
    const eintrag = this.uebergaenge[letzteZeichen];
    if (!eintrag) {
      this.uebergaenge[letzteZeichen] = { [naechstesZeichen]: 1 };
    } else {
      let eintrag2 = eintrag[naechstesZeichen];
      if (!eintrag2) {
        //eintrag.push({ [naechstesZeichen]: 1 });
        eintrag[naechstesZeichen] = 1
      }
      else {
        eintrag[naechstesZeichen] = eintrag[naechstesZeichen] + 1;
      }
    }
  }

  // Schnittstelle: Text erzeugen
  erzeugeText(anfang, nZeichen) {
    let letzteZeichen = anfang;
    const sequenz = [anfang];

    while (sequenz.length <= nZeichen) {
      const naechsteZeichen = this.gewichteterUebergang(letzteZeichen);
      // const naechsteZeichen = this.zufaelligerUebergang(letzteZeichen);
      if (!naechsteZeichen) {
        break;
      }
      sequenz.push(naechsteZeichen);
      letzteZeichen = (letzteZeichen + naechsteZeichen).slice(1);
    }

    let ergebnis = sequenz.join("");
    ergebnis = ergebnis.replaceAll("\n", "&#13");
    return ergebnis + "...";
  }

  zufaelligerUebergang(letzteZeichen) {
    let eintrag = this.uebergaenge[letzteZeichen];
    if (eintrag) {
      let array = Object.entries(eintrag);
      array = array.map(element => element[0]);
      let result = random(array);
      return result;
    }
  }

  gewichteterUebergang(letzteZeichen) {
    let eintrag = this.uebergaenge[letzteZeichen];
    if (eintrag) {
      let result = this.gewichteterZufall(eintrag);
      // let array = Object.entries(eintrag);
      // array = array.map(element => element[0]);
      // let result = random(array);
      return result;
    }
  }

  // Reproduziert die Häufigkeiten in ereignisse, sprich: wenn diese Funktion
  // oft genug aufgerufen wird, dann liefert sie in 60 von 100 Fällen eine 
  // Niete etc.
  gewichteterZufall(ereignisse) {
    let nEreignisse = 0;

    for (let ereignis in ereignisse) {
      nEreignisse += ereignisse[ereignis];
    }

    const zufallszahl = Math.random() * nEreignisse;
    let summe = 0;

    for (let ereignis in ereignisse) {
      summe += ereignisse[ereignis];
      if (summe >= zufallszahl) {
        return ereignis;
      }
    }
  }

  // Schnittstelle: Übergänge als String für die Darstellung im GUI
  uebergaengeAlsString() {
    const zeilen = [];
    const anschluesseAlsTabelle = Object.entries(this.uebergaenge);
    for (let [dieseZeichen, naechstesZeichen] of anschluesseAlsTabelle) {
      dieseZeichen = dieseZeichen.replaceAll(" ", "_");
      naechstesZeichen = Object.entries(naechstesZeichen);
      let naechstesZeichen2 = "";
      naechstesZeichen.forEach((element, i) => {
        if (i > 0) naechstesZeichen2 += "|";
        naechstesZeichen2 += element[0];
      });
      //naechstesZeichen2 = naechstesZeichen.join("|");
      naechstesZeichen2 = naechstesZeichen2.replaceAll(" ", "_");
      naechstesZeichen2 = naechstesZeichen2.replaceAll("\n", "\\n");
      const zeile = dieseZeichen + " -> " + naechstesZeichen2;
      zeilen.push(zeile);
    }
    const ergebnis = zeilen.join('&#13;');
    return ergebnis;
  }

}