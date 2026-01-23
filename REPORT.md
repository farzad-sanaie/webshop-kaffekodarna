# 📌 Rättningsrapport – fed25s-the-webshop-kaffekodarna

## 🎯 Uppgiftens Krav:
# The Webshop - En inlämningsuppgift

Denna uppgift går ut på att ni skall bygga en webbshop baserat på kraven här under.
Projektet är ett vite-projekt med vanilla/typescript.
Målet är att studenterna skall förstå vad som krävs för att skicka information mellan sidor, använda localStorage och kunna manipulera data i listor och objekt.

## VIKTIGT

Varukorgen skall vara en lista med objekt som baseras på en ny klass eller datatyp. Denna klass/datatyp skall innehålla en produkt men också hur många av denna produkt som varukorgen har. Ibland kan det behövas mer information i detta objekt, men minst skall klassen innhålla produkt och antal på något sätt.

## Teknik

- HTML
- SCSS
- TypeScript

## Krav - Betyg G

- En landningssida (startsida)
- En produktsida (Produktdetaljer)
- En kassasida
- En varukorg
- Kunna lägga produkter i varukorgen
- Simulera att ett köp genomförs på kassasidan
- Beräkna fram ett totalpris på produkterna i varukorgen
- Att informationen i varukorgen lagras genom utökade objekt, inte bara en produkt
- Att kunna öka/minska antalet produkter i varukorgen.
- Att kunna öka/minska antalet produkter på kassasidan
- Koden skall vara mycket väl strukturerad, väl formaterad samt innehålla god namngivning

## Styling

Försök att arbeta med så mycket styling ni hinner. Det är en rolig uppgift att ha med i ett portfolio framöver. Se till att era animationer är subtila. Arbeta med hero-images, kanske med lite video/ljud. Och skapa en bra struktur mer er scss redan från början.

## Krav för styling

Det är inget krav att video och ljud används.
Partials bör användas.
Mixins skall användas om möjligt, t.ex. för mediaqueries.
Ingen dubbelstyling, används mixins i sådana fall.

## 🔍 ESLint-varningar:


## 🏆 **Betyg: IG**
📌 **Motivering:** Utifrån den kod som faktiskt finns i repot uppfylls inte G-kraven för webbshoppen. Projektet består i praktiken av en statisk landningssida med styling: index.html samt src/style.scss, medan src/main.ts endast importerar SCSS och saknar all nödvändig TypeScript-logik. Det finns ingen implementerad produktdata/produktlista i TS, ingen varukorgsmodell (utökat objekt med produkt + antal), ingen localStorage-hantering, inga event handlers för att lägga till/öka/minska produkter, ingen totalpris-beräkning och ingen kassasida eller produktsida (produktdetaljer) i de visade filerna. Dessutom länkar index.html till style.css trots att stylingen ligger i src/style.scss, vilket tyder på att filkoppling/byggflöde inte är korrekt matchat. Sammantaget saknas centrala funktioner och sidor som krävs för betyget G, därför blir slutbetyget IG.

💡 **Förbättringsförslag:**  
Funktionalitet (måste för G):
- Skapa en Product-modell och en CartItem-typ/klass som minst innehåller { product, quantity }.
- Implementera varukorgslogik i TypeScript: addToCart(product), increaseQuantity(productId), decreaseQuantity(productId), removeItem(productId).
- Lägg till en localStorage-service (t.ex. getCart()/saveCart()) och hantera JSON.parse säkert (try/catch + validering av format).
- Bygg en produktsida (produktdetaljer) och en kassasida som egna sidor/filer och implementera navigation mellan sidor.
- Implementera totalpris-beräkning från varukorgens items och simulera köp på kassasidan (t.ex. “Genomför köp” tömmer varukorgen).
- Koppla UI-element (knappar/ikonknappar) till riktig TS-logik via event listeners och uppdatera DOM:en när varukorgen ändras.

Kodstruktur/kvalitet:
- Dela upp src/ i t.ex. models/, services/, pages/ och components/ för tydligare ansvar och bättre namngivning.
- Säkerställ att byggflödet är korrekt: i Vite bör du normalt importera SCSS i main.ts och låta bundlern generera CSS, och undvika att länka till en CSS-fil som inte finns.

SCSS/styling (krav och best practice):
- Dela upp SCSS i partials (t.ex. _variables.scss, _mixins.scss, _layout.scss, _components.scss) och importera i en main.scss.
- Skapa mixins för media queries och gör layouten responsiv (t.ex. grid från 3 kolumner till 1–2 på mindre skärmar; undvik fasta bredder som 450px utan brytpunkter).

Frontend-detaljer:
- Säkerställ att bildvägar/asset-hantering fungerar i Vite (public/ eller korrekt import).
- Förbättra tillgänglighet: aria-label på ikonknappar och tydliga fokus-stilar.

Du har en bra grund i HTML-struktur och en tydlig visuell riktning i SCSS—nästa steg är att koppla på den faktiska webbshop-logiken i TypeScript och bygga de obligatoriska sidorna. Fortsätt så, det här kan bli riktigt bra när funktionaliteten kommer på plats!

## 👥 Gruppbidrag

| Deltagare | Antal commits | Commit % | Uppgiftskomplettering | Totalt bidrag |
| --------- | -------------- | -------- | ---------------------- | ------------- |
| amwa00 | 83 | 41.1% | 0.25 | 0.31 |
| Jessica Näsman | 60 | 29.7% | 0.25 | 0.27 |
| Linda | 33 | 16.3% | 0.25 | 0.22 |
| Farzad Sanaie | 26 | 12.9% | 0.25 | 0.2 |


### 📊 Förklaring
- **Antal commits**: Antalet commits som personen har gjort
- **Commit %**: Procentuell andel av totala commits
- **Uppgiftskomplettering**: Poäng baserad på mappning av README-krav mot kodbidrag 
- **Totalt bidrag**: Viktad bedömning av personens totala bidrag (40% commits, 60% uppgiftskomplettering)
