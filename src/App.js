import { useEffect, useState } from 'react';
import Cassella from './components/Cassella';
import Tauler from './styles/Tauler';
import Button from './styles/Button';
import { calcPuntuacio, millorTirada, hihaGuanyador } from './util/minimax';

const resetTauler = () => [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
const resetPuntuacio = () => [0, 0, 0, 0, 0, 0, 0, 0];
const resetJugadors = () => { return { 1: HUMA, 2: IA } };

const X = 1, O = 2;
const HUMA = 1, IA = 2;
const EMPAT = 3;

/* 
 * App: main Component
 */
export default function App() {
  const [jugador, setJugador] = useState(0);
  const [jugadors, setJugadors] = useState(resetJugadors);
  const [joc, setJoc] = useState(resetTauler);
  const [puntuacio, setPuntuacio] = useState(resetPuntuacio);
  const [guanya, setGuanya] = useState(null);
  const [idxGuanya, setIdxGuanya] = useState(null);
  const [millor, setMillorTirada] = useState(null);

  const resetJoc = () => {
    setJugador(0);
    setJugadors(resetJugadors);
    setJoc(resetTauler);
    setPuntuacio(resetPuntuacio);
    setGuanya(null);
    setIdxGuanya(null);
    setMillorTirada(null);
  };

  const handleJugada = (r, c) => {
    setJoc(prevJoc => {
      if (prevJoc[r][c] === 0) prevJoc[r][c] = jugador;
      return [...prevJoc];
    });

    setPuntuacio(prevPuntuacio => calcPuntuacio([...puntuacio], r, c, jugador));
  };

  useEffect(function canviJugador() {
    setJugador(prevJugador => prevJugador === X ? O : X);
  }, [joc]);

  useEffect(function comprovaGuanyador() {
    const guanyador = hihaGuanyador(puntuacio);
    if (guanyador) {
      setGuanya(guanyador.jugador);
      setIdxGuanya(guanyador.linia);
    } else if (!joc.flat().includes(0) && !guanya) setGuanya(EMPAT);
  }, [puntuacio, guanya, joc]);
  
  useEffect(() => {
    if (jugadors[jugador] === IA && !guanya)
      setMillorTirada(millorTirada([...joc], [...puntuacio], jugador));
  }, [jugador]);

  useEffect(() => {
    millor && console.log(`${millor[0]} - ${millor[1]}`);
    millor && handleJugada(parseInt(millor[0]), parseInt(millor[1]));
  }, [millor]);

  return (
    <main>
      <div>
          <h1>Tres en ratlla</h1>
      </div>
      <Tauler>
        {joc.map((row, rowidx) => {
          return row.map((col, colidx) => {
            return <Cassella 
                key={`${rowidx}${colidx}`} 
                jugada={handleJugada}
                r={rowidx}
                c={colidx}
                joc={joc}
                guanya={idxGuanya}
              />
          });
        })}
      </Tauler>
      <div>
        {!guanya && <p>Juga {jugador}</p>}
        {(guanya && guanya === 3) && <p>Empat!</p>}
        {(guanya && guanya < 3) && <p>Guanya {guanya}!</p>}
        <Button onClick={() => {
          resetJoc();
        }}>Torna a { guanya ? "jugar!" : "començar"}</Button>
      </div>
    </main>
  );
};