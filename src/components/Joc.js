import styled from 'styled-components';

import Icon from './Icon';
import Btn from './Btn';
import Cassella from './Cassella';

import { 
    X, O, IA, icoJugadors, icoFitxa, EMPAT
} from '../utils';

export default function Joc ({
    tauler,
    handleJugada,
    idxGuanya,
    guanya,
    jugador,
    jugadors,
    resetJoc
  }) {
    return (
      <>
        <Tauler tauler={tauler} handleJugada={handleJugada} idxGuanya={idxGuanya} />
        <section>
          <section>
            {!guanya && <p>{jugador === 0 || jugadors[jugador] === IA ? "Calculant..." : <span>Juga <Icon>{icoFitxa[jugador]}</Icon></span>}</p>}
            {(guanya && guanya === EMPAT) && <p>Empat!</p>}
            {(guanya && guanya !== EMPAT) && <p>Guanya <Icon>{jugadors[X] === jugadors[O] ? icoFitxa[guanya] : icoJugadors[jugadors[guanya]]}</Icon>!</p>}
          </section>
          <OpcionsJoc>
            <Btn onClick={() => {
              resetJoc(true);
            }}>Torna a { guanya ? "jugar!" : "començar"}</Btn>
            <Btn onClick={() => {
              resetJoc(false);
            }}>Configura</Btn>
          </OpcionsJoc>
        </section>
      </>
    );
  };
  
  const Tauler = ({ tauler, handleJugada, idxGuanya }) => {
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
  
  const TaulerStyled = styled.div`
    display: grid;
    width: 300px;
    height: 300px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    margin: 0;
    padding: 0;
    border: .5px solid grey;
  `;
  
  const OpcionsJoc = styled.div`
    display: flex;
    flex-direction: row;
  
    div {
      margin: 0 1em;
      font-size: 2vw;
    }
  `;