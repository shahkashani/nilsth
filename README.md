# PHP møter React

En enkel app som implementerer et typeahead søk. Både server og klient.

Kildekoden er i `src`. Kompilert kode lander i `dist`. Når du skal kjøre koden
din på et webhotell, laster du bare opp hele `dist` mappa. Trenger ikke noe mer
enn det som ligger der. Flere instrukser nedenfor.

Testa det her og det ser ut til å fungere: http://dev.shahkashani.com/

Tror dette kan være en grei måte å gjøre det på som gir deg tilbake til alt av
moderne JavaScript med en PHP server og en måte å hoste det på. JavaScript
kompilering skjer via [Parcel](https://parceljs.org/).

Tankegangen er rett og slett å bruke en eksisterende web-server / webhotell til
å servere kompilert JavaScript og PHP sammen.

Klienten og serveren har en veldig løs kobling; det vil si at du aldri burde
generere HTML med PHP i denne verden. Gjør du det, blir det etterhvert utrolig
forvirrende hva klienten gjør og hva serveren gjør.

Tanken er heller at all data kommer fra PHP serveren (som JavaScript objekter /
JSON), og all rendering skjer via React.

I dette eksemplet er resultatet fra serveren en ganske enkel array med strenger
som blir forvandlet til UI komponenter du kan klikke på for å søke i YouTube,
men du kan jo forestille deg at det er akkurat slik nesten alt av web
applikasjoner fungerer uansett hvor komplisert eller enkel funksjonaliteten er.

Noe som overhodet ikke er dekket er her "routing", altså hvordan applikasjonen
din kan ha forskjellige sub-sider. Dette er ganske rett fram og er dekket her:
https://reach.tech/router/

Du kan rett og slett erstatte App/index.jsx med eksemplet på den siden.

# Utvikling

Første gangen:

1. Sørg for at du har node installert. Gjerne versjon 12.
2. Sørg for at PHP er installert. Det skal følge med Mac, du kan teste det med
   `php -v`
3. `npm install` for å installere ting og tang (og håp at du ikke får en
   node-gyp feilmelding som mange sliter med om dagen.)

Deretter når du skal utvikle sånn til vanlig:

1. `npm run dev`
2. Gå til http://localhost:9000/

Du kan endre både JavaScript og PHP filer i `src` mappa, refreshe browseren og
se endringene dine. Det kan hende du må skru av cache i Chrome dev tools.

# Hosting

1. `npm run build` - dette gjør du lokalt altså
2. Ta hele `dist` mappa og last opp til web-hotellet. That's it.

Hvis du vil teste ut produksjonsversjonen lokalt, kjører du bare `npm start`
etter en build.

# Filter

Her er en ganske kjapp oppsummering av alle filene her.

1. `package.json` - noe npm bruker for å holde styr på biblioteker. Det er også
   her alt av kommandoer (`npm run dev` etc.) er definert. Som du vet kan du
   legge til flere biblioteker med `npm install`
2. `src/index.html` - jeg tror Parcel har et bibliotek som gjør at dette også
   kan være en php fil, men jeg kjørte HTML for nå. Dette er både hovedinngangen
   til appen din (når du hoster den, er dette fila som kjøres), men en viktig
   greia er at denne fila er et clue til Parcel om hva som må kompileres. Hvis
   du ser på `dist/index.html` så ser du at den er identisk, bortsett fra CSS og
   JS filnavn er endret. Dette er ressurser som Parcel har kompilert fra super
   nymotens JavaScript til JavaScript som alle browsere klarer å tolke.
3. `src/index.jsx` - dette er rett og slett JavaScript fila som `index.html`
   først laster inn. Ofte kalles dette din JavaScript "entrypoint". Disse filene
   pleier å være ganske små og bare laste inn globale ting som trengs, som
   f.eks. bootstrap CSS. `JSX` er en React greie. Du vet at HTML tags er f.eks.
   `<div>`, `<input>`, etc. `JSX` betyr bare at dette er en fil hvor utvikleren har 
   introdusert nye tags / komponenter, som f.eks. `<App>` eller `<SearchResult>`.
4. `src/component/App/index.jsx` - siden entrypoints pleier å være ganske små,
   har jeg puttet mesteparten av funksjonaliteten her isteden. Det er hipp som
   happ om sånne App filer ligger i samme mappe som entrypointen eller i
   components mappa sammen med andre, mye mindre, ting. Helt opp til deg.
5. `src/api/search.php` - dette er altså en av server tjenestene som vår klient
   bruker. Jeg har konfigurert Parcel til å bare kopiere over alle disse PHP
   filene i `src/api` til `dist/api`. Siden det er der alt kompilert JavaScript
   lever, og egentlig ALT lastes fra, så må jo også PHP ligge der. Hver gang du
   endrer en PHP fil i `src` mappa, vil dev serveren / watcheren til Parcel se
   denne endringen og kopiere den over til `dist`.
