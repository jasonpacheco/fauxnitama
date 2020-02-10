import styled from 'styled-components/macro';

export const HistoryList = styled.ul`
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1rem;
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: left;
  li {
    display: flex;

    p {
      margin: 0 0.5rem 0 0;
      padding: 0.2rem;
    }
  }
  li:nth-child(odd) {
    background-color: #eee;
  }
`;

export const DisplayFEN = styled.span`
  font-size: 0.8rem;
  font-family: Helvetica, Arial, sans-serif;
`;
