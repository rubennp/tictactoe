import ConfigJugador from './ConfigJugador';

import ConfigStyled from '../styles/Config.styled';

export default function Config({ jugadors, setJugadors}) {
    return (
        <ConfigStyled>
            {Object.keys(jugadors).map(j => 
                <ConfigJugador key={j} jugador={parseInt(j)} jugadors={jugadors} setJugadors={setJugadors} />
            )}
        </ConfigStyled>
    );
};