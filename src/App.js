import { useEffect, useState } from 'react';
import Cassella from './components/Cassella';
import { Tauler } from './styles/Tauler';

export default function App() {
  const [jugador, setJugador] = useState(0);
  const [joc, setJoc] = useState([
    [0,0,0],
    [0,0,0],
    [0,0,0],  
  ]);

  const handleJugada = (r, c) => {
    setJoc(prev => {
      if (prev[r][c] === 0) prev[r][c] = jugador;
      return [...prev];
    });
  };

  useEffect(() => {
    setJugador(prev => prev === 1 ? 2 : 1);
  }, [joc]);

  return (
    <main>
      <Tauler>
        {joc.map((row, rowidx) => {
          return row.map((col, colidx) => {
            return <Cassella 
                key={`${rowidx}${colidx}`} 
                jugada={handleJugada}
                r={rowidx}
                c={colidx}
                joc={joc}
              />
          });
        })}
      </Tauler>
    </main>
  );
};