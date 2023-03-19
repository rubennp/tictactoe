import Config from './Config';

import Bttn from '../styles/Bttn.styled';

export default function Home ({
    jugadors,
    setJugadors,
    setHiHaConfig,
  }) {
    return (
      <>
        <section>
          <header>
            <p>Clicla el botó rodó de sota cada símbol<br/>per canviar-ne el jugador</p>
          </header>
          <Config jugadors={jugadors} setJugadors={setJugadors} />
        </section>
        <section>
          <Bttn className="juga" onClick={() => {
            setHiHaConfig(true);
          }}>Juga!</Bttn>
        </section>
      </>
    );
};