import Tauler from './Tauler';
import InfoJoc from './InfoJoc';

import Bttn from '../styles/Bttn.styled';
import OpcionsJoc from '../styles/OpcionsJoc.styled';

import { JUGA, CONFIGURA, } from '../utils';

export default function Joc ({
  tauler,
  handleJugada,
  idxGuanya,
  guanya,
  jugador,
  jugadors,
  resetJoc
}) {
  return (
    <>
      <Tauler tauler={tauler} handleJugada={handleJugada} idxGuanya={idxGuanya} />
      <section>
        <InfoJoc guanya={guanya} jugador={jugador} jugadors={jugadors} />
        <OpcionsJoc>
          <Bttn onClick={() => {
            resetJoc(JUGA);
          }}>Torna a { guanya ? "jugar!" : "començar"}</Bttn>
          <Bttn onClick={() => {
            resetJoc(CONFIGURA);
          }}>Configura</Bttn>
        </OpcionsJoc>
      </section>
    </>
  );
};