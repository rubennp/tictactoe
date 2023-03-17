import InfoJocStyled from "../styles/InfoJoc.styled";

import { 
    X, O, IA, icoJugadors, icoFitxa, EMPAT,
} from '../utils';

export default function InfoJoc ({ guanya, jugador, jugadors }) {
    return (
      <InfoJocStyled>
        {!guanya && <p>{jugador === 0 || jugadors[jugador] === IA ? "Calculant..." : <span>Juga {icoFitxa[jugador]}</span>}</p>}
        {(guanya && guanya === EMPAT) && <p>Empat!</p>}
        {(guanya && guanya !== EMPAT) && <p>Guanya {jugadors[X] === jugadors[O] ? icoFitxa[guanya] : icoJugadors[jugadors[guanya]]}</p>}
      </InfoJocStyled>
    );
};