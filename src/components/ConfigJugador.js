import Bttn from '../styles/Bttn.styled';

import { X, O, HUMA, IA, icoJugadors, icoFitxa } from '../utils';

export default function ConfigJugador ({jugador, jugadors, setJugadors}) {
    const jugador2 = jugador === X ? O : X;
    return (
        <div>
            {icoFitxa[jugador]} 
            <Bttn className="jugador" onClick={() => {
                setJugadors(prev => { return {
                    [jugador]: prev[jugador] === HUMA ? IA : HUMA,
                    [jugador2]: prev[jugador2] === IA ? HUMA : prev[jugador2],
                }});
            }}>{icoJugadors[jugadors[jugador]]}</Bttn>
        </div>
    );
};