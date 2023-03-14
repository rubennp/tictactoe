import styled from 'styled-components';

import Btn from './Btn';
import Configura from './Configura';

export default function Home ({
    jugadors,
    setJugadors,
    setHiHaConfig,
  }) {
    return (
      <>
        <section>
          <p>Clicla el botó rodó de sota cada símbol<br/>per canviar-ne el jugador</p>
          <Configura jugadors={jugadors} setJugadors={setJugadors} />
        </section>
        <section>
          <BtnJuga onClick={() => {
            setHiHaConfig(true);
          }}>Juga!</BtnJuga>
        </section>
      </>
    );
};

const BtnJuga = styled(Btn)`
  width: 25%;
  font-size: 1.5em;
`;