import styled from "styled-components";

const simbol = [ "", "❌", "⭕️"];

export default function Cassella({ r, c, joc, jugada }) {
    return (
        <CassellaStyles 
            r={r} 
            c={c} 
            joc={joc} 
            onClick={() => {
                jugada(r, c)
            }}>
            {simbol[joc[r][c]]}
        </CassellaStyles>
    );
};

const CassellaStyles = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: .5px solid gray;
    font-size: 3rem;
  
    :hover {
      ${({r, c, joc}) => {
          if (joc[r][c] === 0) {
            return `
                background-color: white;
                cursor: pointer;
            `
          }
      }}
  }
`;