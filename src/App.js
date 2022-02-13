import { useEffect, useState } from 'react';
import Cassella from './components/Cassella';
import Tauler from './styles/Tauler';
import Button from './styles/Button';

const resetTauler = () => [...Array(3)].map(() => [...Array(3)].fill(0));
const resetPuntuacio = () => [...Array(8)].fill(0);
const GUANYA1 = 30, GUANYA2 = 300;

export default function App() {
  const [jugador, setJugador] = useState(0);
  const [joc, setJoc] = useState(resetTauler);
  const [puntuacio, setPuntuacio] = useState(resetPuntuacio);
  const [guanya, setGuanya] = useState(null);
  const [idxGuanya, setIdxGuanya] = useState(null);

  const resetJoc = () => {
    setJoc(resetTauler);
    setPuntuacio(resetPuntuacio);
    setGuanya(null);
    setIdxGuanya(null);
    setJugador(0);
  };

  const handleJugada = (r, c) => {
    setJoc(prevJoc => {
      if (prevJoc[r][c] === 0) prevJoc[r][c] = jugador;
      return [...prevJoc];
    });
    
    let prevPuntuacio = puntuacio;

    // puntuacio[0, 1, 2] (columnes):
    prevPuntuacio[c] += 10**jugador;
    // puntuacio[3, 4, 5] (files):
    prevPuntuacio[r+3] += 10**jugador;
    // puntuacio[6] (diagonal ↘︎):
    if (c === r) prevPuntuacio[6] += 10**jugador;
    // puntuacio[7] (diagonal ↗︎):
    const key = `${r}${c}`;
    if (key === "02" || key === "11" || key === "20")
      prevPuntuacio[7] += 10**jugador;

    setPuntuacio([...prevPuntuacio]);
  };

  useEffect(function canviJugador() {
    setJugador(prevJugador => prevJugador === 1 ? 2 : 1);
  }, [joc]);

  useEffect(function comprovaGuanyador() {
    puntuacio.forEach((el, idx) => {
      if (el === GUANYA1) {
        setGuanya(1);
        setIdxGuanya(idx);
      } else if (el === GUANYA2) {
        setGuanya(2);
        setIdxGuanya(idx);
      } else if (!joc.flat().includes(0) && !guanya) {
        setGuanya(3);
      }
    });
  }, [puntuacio, guanya, joc]);
  
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
        {guanya && <Button onClick={() => {
          resetJoc();
        }}>Tornar a jugar!</Button>}
      </div>
    </main>
  );
};