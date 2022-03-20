/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Cassella from './components/Cassella';
import Btn from './components/Btn';
import Configura from './components/Configura';
import Icon from './components/Icon';

import { 
  calcPuntuacio, millorTirada, hihaGuanyador, hihaTirades, canviaMax,
  BUIT, X, O, HUMA, IA, icoJugadors, icoFitxa
} from './utils';

const EMPAT = 3;

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
      prev[row][col] = jugador;
      return [...prev];
    });

    setPuntuacio(calcPuntuacio([...puntuacio], row, col, jugador));
  };

  useEffect(function canviJugador() {
    setJugador(prev => prev === X ? O : X);
  }, [tauler]);

  useEffect(function comprovaGuanyador(guanyador = hihaGuanyador(puntuacio)) {
    if (guanyador) {
      setGuanya(guanyador.jugador);
      setIdxGuanya(guanyador.linia);
    } else if (!hihaTirades(tauler) && !guanya) setGuanya(EMPAT);
  }, [puntuacio, guanya, tauler]);
  
  useEffect(function millorTiradaIA() {
    if (jugadors[jugador] === IA && !guanya)
      setMillorTiradaIA(millorTirada([...tauler], [...puntuacio], jugador));
  }, [jugador, hihaConfig]);

  useEffect(function tiraIA() {
    millorTiradaIA && handleJugada(millorTiradaIA.row, millorTiradaIA.col);
  }, [millorTiradaIA]);

  useEffect(function canviaJugadorMax() {
    canviaMax(jugadors[X] === IA ? true : false);
  }, [jugadors]);

  return (
    <main>
      <header>
          <h1>Tres en ratlla</h1>
      </header>
      {!hihaConfig ?
      <>
        <section>
          <p>Clicla el botó rodó de sota cada símbol<br/>per canviar-ne el jugador</p>
          <Configura jugadors={jugadors} setJugadors={setJugadors} />
        </section>
        <footer>
          <BtnJuga onClick={() => {
            setHiHaConfig(true);
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
          <section>
            {!guanya && <p>{jugador === 0 || jugadors[jugador] === IA ? "Calculant..." : <span>Juga <Icon>{icoFitxa[jugador]}</Icon></span>}</p>}
            {(guanya && guanya === EMPAT) && <p>Empat!</p>}
            {(guanya && guanya < EMPAT) && <p>Guanya <Icon>{jugadors[X] === jugadors[O] ? icoFitxa[guanya] : icoJugadors[jugadors[guanya]]}</Icon>!</p>}
          </section>
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

const Tauler = styled.div`
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

const BtnJuga = styled(Btn)`
  width: 25%;
  font-size: 1.5em;
`;