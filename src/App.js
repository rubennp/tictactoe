import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Cassella from './components/Cassella';
import Tauler from './components/Tauler';
import Btn from './components/Btn';
import Configura from './components/Configura';
import Icon from './components/Icon';

import { 
  calcPuntuacio,
  millorTirada, 
  hihaGuanyador, 
  hihaTirades,
  chJugadorMax,
  BUIT,
  X,
  O,
  HUMA,
  IA,
  simbol
} from './utils';

const COMENÇA_IA = 3;
const EMPAT = 3;
const ROW = 0, COL = 1;

const resetTauler = () => [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
const resetPuntuacio = () => [0, 0, 0, 0, 0, 0, 0, 0];
const resetJugadors = () => { return { [X]: HUMA, [O]: IA } };

/* 
 * App: main Component
 */
export default function App() {
  const [jugador, setJugador] = useState(0);
  const [jugadors, setJugadors] = useState(resetJugadors);
  const [tauler, setTauler] = useState(resetTauler);
  const [puntuacio, setPuntuacio] = useState(resetPuntuacio);
  const [guanya, setGuanya] = useState(null);
  const [idxGuanya, setIdxGuanya] = useState(null);
  const [millorTiradaIA, setMillorTiradaIA] = useState(null);
  const [hihaConfig, setHiHaConfig] = useState(false);

  const resetJoc = cfg => {
    setJugador(0);
    if (!cfg) setJugadors(resetJugadors);
    setTauler(resetTauler);
    setPuntuacio(resetPuntuacio);
    setGuanya(null);
    setIdxGuanya(null);
    setMillorTiradaIA(null);
    setHiHaConfig(cfg);
  };

  const handleJugada = (row, col) => {
    setTauler(prev => {
      if (prev[row][col] === BUIT) prev[row][col] = jugador === COMENÇA_IA ? X : jugador;
      return [...prev];
    });

    setPuntuacio(prev => calcPuntuacio([...puntuacio], row, col, jugador === COMENÇA_IA ? X : jugador));
  };

  useEffect(function canviJugador() {
    setJugador(prev => prev === X || prev === COMENÇA_IA ? O : X);
  }, [tauler]);

  useEffect(function comprovaGuanyador() {
    const guanyador = hihaGuanyador(puntuacio);
    if (guanyador) {
      setGuanya(guanyador.jugador);
      setIdxGuanya(guanyador.linia);
    } else if (!hihaTirades(tauler) && !guanya) setGuanya(EMPAT);
  }, [puntuacio, guanya, tauler]);
  
  useEffect(function millorTiradaIA() {
    if ((jugadors[jugador] === IA && !guanya) || jugador === COMENÇA_IA)
      setMillorTiradaIA(millorTirada([...tauler], [...puntuacio], jugador === COMENÇA_IA ? X : jugador));
  }, [jugador]);

  useEffect(function tiraIA() {
    millorTiradaIA && handleJugada(parseInt(millorTiradaIA[ROW]), parseInt(millorTiradaIA[COL]));
  }, [millorTiradaIA]);

  useEffect(() => {
    chJugadorMax(
      jugadors[X] === IA ? true : false,
      jugadors[O] === IA ? true : false
    );
  }, [jugadors]);

  return (
    <main>
      <header>
          <h1>Tres en ratlla</h1>
      </header>
      {!hihaConfig ?
      <>
        <section className="info" >
          <p>Clicla el botó rodó de sota cada símbol<br/>per canviar-ne el jugador</p>
          <Configura jugadors={jugadors} setJugadors={setJugadors} />
        </section>
        <footer>
          <BtnJuga onClick={() => {
            setHiHaConfig(true);
            if (jugadors[X] === IA) setJugador(COMENÇA_IA);
          }}>Juga!</BtnJuga>
        </footer>
      </>
      :
      <>
        <Tauler>
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
        </Tauler>
        <footer>
          <div>
            {!guanya && <p>{jugador === 0 || jugador === COMENÇA_IA ? "Calculant..." : <span>Juga <Icon>{simbol[jugador]}</Icon></span>}</p>}
            {(guanya && guanya === EMPAT) && <p>Empat!</p>}
            {(guanya && guanya < EMPAT) && <p>Guanya <Icon>{simbol[guanya]}</Icon>!</p>}
          </div>
          <OpcionsJoc>
            <Btn onClick={() => {
              resetJoc(true);
            }}>Torna a { guanya ? "jugar!" : "començar"}</Btn>
            <Btn onClick={() => {
              resetJoc(false);
            }}>Configura</Btn>
          </OpcionsJoc>
        </footer>
      </>
      }
    </main>
  );
};

const OpcionsJoc = styled.div`
  display: flex;
  flex-direction: row;

  div {
    margin: 0 1em;
    font-size: 1.25em;
  }
`;

const BtnJuga = styled(Btn)`
  width: 25%;
  font-size: 1.5em;
`;
