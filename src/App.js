import { useEffect, useState } from 'react';
import Cassella from './components/Cassella';
import Tauler from './styles/Tauler';
import Button from './styles/Button';
import { 
  calcPuntuacio,
  millorTirada, 
  hihaGuanyador, 
  hihaTirades,
  BUIT,
  X,
  O
} from './util/minimax';

const HUMA = X, IA = O;
const EMPAT = 3;
const ROW = 0, COL = 1;

const resetTauler = () => [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
const resetPuntuacio = () => [0, 0, 0, 0, 0, 0, 0, 0];
const resetJugadors = () => { return { 1: HUMA, 2: IA } };

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

  const resetJoc = () => {
    setJugador(0);
    setJugadors(resetJugadors);
    setTauler(resetTauler);
    setPuntuacio(resetPuntuacio);
    setGuanya(null);
    setIdxGuanya(null);
    setMillorTiradaIA(null);
  };

  const handleJugada = (row, col) => {
    setTauler(prev => {
      if (prev[row][col] === BUIT) prev[row][col] = jugador;
      return [...prev];
    });

    setPuntuacio(prev => calcPuntuacio([...puntuacio], row, col, jugador));
  };

  useEffect(function canviJugador() {
    setJugador(prev => prev === X ? O : X);
  }, [tauler]);

  useEffect(function comprovaGuanyador() {
    const guanyador = hihaGuanyador(puntuacio);
    if (guanyador) {
      setGuanya(guanyador.jugador);
      setIdxGuanya(guanyador.linia);
    } else if (!hihaTirades(tauler) && !guanya) setGuanya(EMPAT);
  }, [puntuacio, guanya, tauler]);
  
  useEffect(function millorTiradaIA() {
    if (jugadors[jugador] === IA && !guanya)
      setMillorTiradaIA(millorTirada([...tauler], [...puntuacio], jugador));
  }, [jugador]);

  useEffect(function tiraIA() {
    millorTiradaIA && handleJugada(parseInt(millorTiradaIA[ROW]), parseInt(millorTiradaIA[COL]));
  }, [millorTiradaIA]);

  return (
    <main>
      <div>
          <h1>Tres en ratlla</h1>
      </div>
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
      <div>
        {!guanya && <p>Juga {jugador}</p>}
        {(guanya && guanya === EMPAT) && <p>Empat!</p>}
        {(guanya && guanya < EMPAT) && <p>Guanya {guanya}!</p>}
        <Button onClick={() => {
          resetJoc();
        }}>Torna a { guanya ? "jugar!" : "començar"}</Button>
      </div>
    </main>
  );
};