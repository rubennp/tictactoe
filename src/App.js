/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';

import Home from './components/Home';
import Joc from './components/Joc';
import Social from './components/Social';
import BttnBio from './styles/BttnBio.styled';

import { 
  calcPuntuacio, millorTirada, hihaGuanyador, hihaTirades, canviaMax,
  X, O, HUMA, IA, EMPAT,
} from './utils';

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
          <BttnBio src="./img/foto.jpg" />
      </header>
      {!hihaConfig ?
        <Home 
          jugadors={jugadors}
          setJugadors={setJugadors}
          setHiHaConfig={setHiHaConfig} 
        />
      :
        <Joc 
          tauler={tauler} 
          handleJugada={handleJugada} 
          idxGuanya={idxGuanya}
          guanya={guanya}
          jugador={jugador}
          jugadors={jugadors}
          resetJoc={resetJoc}
        />
      }
      <footer>
          <Social ico="li" href="https://www.linkedin.com/in/rubennp/" />
          <Social ico="gh" href="https://github.com/rubennp/tres-en-ratlla" />
      </footer>
    </main>
  );
};