import styled from 'styled-components';

import { BUIT } from '../utils';

const CassellaStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: .5px solid grey;
    font-size: 2.5rem;
    
    :hover {
      ${({row, col, tauler, guanya }) => {
          if (!guanya && tauler[row][col] === BUIT) {
            return `
                background-color: oldlace;
                cursor: pointer;
            `;
          } else {
              return `cursor: not-allowed;`;
          }
      }}
  }
`;

export default CassellaStyled;