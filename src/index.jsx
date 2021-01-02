// For async/await, vi kommer nærmere tilbake til dette på. Ikke så viktig.
import 'regenerator-runtime/runtime';

import App from './components/App/index';
import React from 'react';
import { render } from 'react-dom';

/**
 * Det er ganske normalt å holde disse "entrypoint" / index filene små, så alt
 * vi gjør her er å lage en App komponent. Her kan du også bruke React Router
 * til å lage URLer til appen din, f.eks. /accounts, /login etc. til litt mer
 * kompliserte applikasjoner
 */
render(<App />, document.getElementById('app'));
