import styled from "styled-components";

import Icon from './Icon';
import { BUIT, icoFitxa } from '../utils';

const keysGuanyadores = [
    ["00", "10", "20"], // Columna 1
    ["01", "11", "21"], // Columna 2
    ["02", "12", "22"], // Columna 3
    ["00", "01", "02"], // Fila 1
    ["10", "11", "12"], // Fila 2
    ["20", "21", "22"], // Fila 3
    ["00", "11", "22"], // Diagonal 1
    ["02", "11", "20"], // Diagonal 2
];

export default function Cassella({ row, col, tauler, jugada, guanya }) {
    return (
        <CassellaStyles 
            row={row} 
            col={col} 
            tauler={tauler} 
            onClick={!guanya ? () => {
                if (tauler[row][col] === BUIT) jugada(row, col);
            } : null }
            guanya={guanya}
            className={(guanya !== null && keysGuanyadores[guanya].includes(`${row}${col}`)) ? 'guanya' : null}
        >
            <Icon>
                {icoFitxa[tauler[row][col]]}
            </Icon>
        </CassellaStyles>
    );
};

const CassellaStyles = styled.div`
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