import TaulerStyled from "../styles/Tauler.styled";
import Cassella from "./Cassella";

export default function Tauler ({ tauler, handleJugada, idxGuanya }) {
    return (
        <TaulerStyled>
            {tauler.map((row, rowidx) => {
                return row.map((col, colidx) => {
                return <Cassella 
                    key={`${rowidx}${colidx}`} 
                    jugada={handleJugada}
                    row={rowidx}
                    col={colidx}
                    tauler={tauler}
                    guanya={idxGuanya}
                    />
                });
            })}
        </TaulerStyled>
    );
};