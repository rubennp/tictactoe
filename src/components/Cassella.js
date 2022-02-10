import styled from "styled-components";

const simbol = [ "", "❌", "⭕️"];
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

export default function Cassella({ r, c, joc, jugada, guanya }) {
    return (
        <CassellaStyles 
            r={r} 
            c={c} 
            joc={joc} 
            onClick={!guanya ? () => {
                if (joc[r][c] === 0) jugada(r, c);
            } : null }
            guanya={guanya}
            className={(guanya !== null && keysGuanyadores[guanya].includes(`${r}${c}`)) ? 'guanya' : null}
        >
            <span>
                {simbol[joc[r][c]]}
            </span>
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
      ${({r, c, joc, guanya }) => {
          if (!guanya && joc[r][c] === 0) {
            return `
                background-color: lightgrey;
                cursor: pointer;
            `
          }
      }}
  }
`;