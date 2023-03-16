import Config from './Config';

import BttnJuga from '../styles/BttnJuga.styled';

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
          <BttnJuga onClick={() => {
            setHiHaConfig(true);
          }}>Juga!</BttnJuga>
        </section>
      </>
    );
};