import React from 'react';
import styled from 'styled-components';

/**
 * Dette er akkurat samme som å si:
 * export default function (props) {
 *   const {text} = props;
 *   return <ResultLink>{text}</ResultLink>;
 * }
 * 
 * Eller bare:
 * 
 * export default function (props) {
 *   return <ResultLink>{props.text}</ResultLink>;
 * }
 */
export default function ({ text }) {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(text)}`;
  return <ResultLink href={url} target="_blank">{text}</ResultLink>;
}

const ResultLink = styled.a`
  display: block;
  padding: 5px;
  color: white;
  text-decoration: none;

  &:hover {
    background: white;
    color: black;
  }
`;
