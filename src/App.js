import { useEffect, useState } from 'react';
import Cassella from './components/Cassella';
import { Tauler } from './styles/Tauler';

export default function App() {
  const [jugador, setJugador] = useState(0);
  const [joc, setJoc] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [puntuacio, setPuntuacio] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [guanya, setGuanya] = useState(null);
  const [idxGuanya, setIdxGuanya] = useState(null);

  const handleJugada = (r, c) => {
    setJoc(prev => {
      if (prev[r][c] === 0) prev[r][c] = jugador;
      return [...prev];
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
    setJugador(prev => prev === 1 ? 2 : 1);
  }, [joc]);

  useEffect(function comprovaGuanyador() {
    if (!joc.flat().includes(0)) {
      setGuanya(3);
      return;
    } else {
      puntuacio.forEach((el, idx) => {
        if (el === 30) {
          setGuanya(1);
          setIdxGuanya(idx);
          return;
        } else if (el === 300) {
          setGuanya(2);
          setIdxGuanya(idx);
          return;
        }
      });
    }
  }, [puntuacio]);

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
        {(guanya && guanya < 3) &&  <p>Guanya {guanya}!</p>}
      </div>
    </main>
  );
};