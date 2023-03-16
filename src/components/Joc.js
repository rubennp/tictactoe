import styled from 'styled-components';
import Tauler from './Tauler';

import Bttn from '../styles/Bttn.styled';
import OpcionsJoc from '../styles/OpcionsJoc.styled';

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
          <InfoJoc guanya={guanya} jugador={jugador} jugadors={jugadors} />
          <OpcionsJoc>
            <Bttn onClick={() => {
              resetJoc(true);
            }}>Torna a { guanya ? "jugar!" : "començar"}</Bttn>
            <Bttn onClick={() => {
              resetJoc(false);
            }}>Configura</Bttn>
          </OpcionsJoc>
        </section>
      </>
    );
  };

  const InfoJoc = ({ guanya, jugador, jugadors }) => {
    return (
      <InfoJocStyled>
        {!guanya && <p>{jugador === 0 || jugadors[jugador] === IA ? "Calculant..." : <span>Juga {icoFitxa[jugador]}</span>}</p>}
        {(guanya && guanya === EMPAT) && <p>Empat!</p>}
        {(guanya && guanya !== EMPAT) && <p>Guanya {jugadors[X] === jugadors[O] ? icoFitxa[guanya] : icoJugadors[jugadors[guanya]]}</p>}
      </InfoJocStyled>
    );
  };

  const InfoJocStyled = styled.div`
    display: flex;
 
    p {
      font-size: 1.5em;
      padding: 1em;
      text-align: center;

      svg {
        vertical-align: middle;
      }
    }
  `;