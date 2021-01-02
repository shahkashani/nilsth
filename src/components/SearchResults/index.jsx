import React from 'react';
import SearchResult from '../SearchResult/index';
import styled from 'styled-components';

/**
 * Hvis du husker fra App/index.jsx:
 * <SearchResults results={results} />
 * 
 * Alt som kommer etter navnet på komponenten er "props".
 * 
 * Kan utvides hypotetisk slik: <SearchResults results={results} color="red" maxHeight={300} />
 * 
 * Og du henter da "color" og "maxHeight" fra prop enten ved å bare si
 * "props.color" og "prop.maxHeight", eller noe slikt:
 *    
 * const { results, maxHeight, color } = props; 
 */
export default function (props) {
  const { results } = props; 
  /**
   * Map nedenfor er bare en måte å forvandle søkeresultat til HTML elementer /
   * React komponenter på. Du kan også gjøre det sånn:
   *
   * const searchResultElements = []; 
   * results.forEach(function(item) {
   *   searchResultElements.push(<SearchResult text={item} />);
   * });
   *
   * return (<SearchResultContainer> 
   *   {searchResultElements}
   * </SearchResultContainer>)
   */

  return (
    <SearchResultContainer>
      {results.map((songName) => (
        // "key" er bare noe React ber om for optimalisering
        // (https://reactjs.org/docs/lists-and-keys.html), Det viktigste her er
        // at vi lager en ny "SearchResult" komponent med variabelen "text", som
        // denne komponentene leser inn og rendrer.
        <SearchResult key={songName} text={songName} />
      ))}
    </SearchResultContainer>
  );
}

const SearchResultContainer = styled.div`
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 10px;
  max-height: 300px;
  overflow: auto;
`;
