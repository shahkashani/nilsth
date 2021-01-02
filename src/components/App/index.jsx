import React, { useState } from 'react';

import SearchResults from '../SearchResults/index';
import { debounce } from 'lodash';
import styled from 'styled-components';

export default function App() {
  /**
   * Dette er selve kjernen i React. Du lagrer data i "state", og når denne
   * "staten" endrer seg, så rendres komponent på nytt. Så, det du "return"'er
   * nedenfor er rett og slett bare HTML elementer basert på hvordan staten ser
   * ut.
   *
   * Et eksempel er:
   *
   * {isLoading && <LoadingContainer>Loading...</LoadingContainer>}
   *
   * Dette er bare en måte å si:
   *
   * {isLoading ? <LoadingContainer>Loading...</LoadingContainer> : null}
   *
   * Du kan evt. gjøre det slik:
   *
   * var loadingContainer =  null;
   * if (isLoading) {
   *   loadingContainer = <LoadingContainer>Loading...</LoadingContainer>;
   * }
   *
   * return <AppContainer>{loadingContainer}</AppContainer>
   *
   * Du bygger rett og slett HTML'en din basert på hvordan data'en din ser ut.
   */
  const [isLoading, setIsLoading] = useState(false); // false er ønsket default verdi til dette state-feltet 
  const [errorMessage, setErrorMessage] = useState(null); // null er ønsket default verdien
  const [results, setResults] = useState([]); // En tom aray er ønsket default verdi her

  const onTextInputChange = async (event) => {
    setResults([]);
    setErrorMessage(null);

    const searchTerm = event.target.value;

    if (searchTerm.length === 0) {
      return;
    }

    // Dette får React til å endre "state" og rendre "Loading..." teksten nedenfor
    setIsLoading(true);

    // Dette er den moderne måte å gjøre AJAX call på. Og await er bare en
    // lettere måte å gjøre å håndrere JavaScript Promises:
    // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
    const response = await fetch(
      `api/search.php?q=${encodeURIComponent(searchTerm)}`
    );

    setIsLoading(false);
    
    if (!response.ok) {
      setErrorMessage('Failed while calling the server');
      return;
    }

    try {
      const results = await response.json();
      if (results.length === 0) {
        setErrorMessage(`No search results found for ${searchTerm}`);
        return;
      }
      setErrorMessage(null);
      setResults(results);
    } catch (err) {
      setErrorMessage(`Failed while parsing the server response: ${err}`);
    }
  };

  // Sånn at vi ikke søker på hver eneste tastetrykk, men venter 250ms etter at
  // brukeren har sluttet å taste
  const debouncedOnTextInputChange = debounce(onTextInputChange, 250);

  return (
    <AppContainer>
      <StyledInput
        type="text"
        onChange={debouncedOnTextInputChange}
        placeholder="Search for a song by your favorite band"
      />
      {isLoading && <LoadingContainer>Loading...</LoadingContainer>}
      {errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}
      {results.length > 0 && <SearchResults results={results} />}
    </AppContainer>
  );
}

// Dette virker kanskje som litt mye nytt på en gang, og du trenger ikke bruker
// "styled-components" (det er ikke en del av React), men jeg synes det er en
// litt grei måte å slippe å ha masse forskjellige CSS filer og klassenavn
// overalt. Noe av poenget med React er at stilene, HTMLen og selve JavaScripten
// til komponentene lever nærme hverandre.

// Dette blir egentlig akkurat det som å skrive:
// .someClassName { border: 2px solid gray; // etc... }
// <input class="someClassName" />
//
// Når vi bruker <StyledInput ...> over, så er det egentlig en helt vanlig HTML
// <input ...> med noe CSS tilknyttet.
const StyledInput = styled.input`
  border: 2px solid gray;
  border-radius: 40px;
  width: 400px;
  background: transparent;
  color: white;
  font-weight: regular;
  font-size: 20px;
  padding: 10px 20px;
  outline: 0;
  margin-bottom: 10px;
  &:focus {
    border-color: white;
  }
`;

const AppContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingContainer = styled.div`
  opacity: 0.5;
`;

const ErrorContainer = styled.div`
  color: red;
`;
