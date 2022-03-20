import styled from 'styled-components';

import Btn from './Btn';
import Icon from './Icon';
import { X, O, HUMA, IA, icoJugadors, icoFitxa } from '../utils';

export default function Configura({ jugadors, setJugadors}) {
    return (
        <ConfiguraStyles>
            {Object.keys(jugadors).map(j => 
                <Jugador key={j} jugador={parseInt(j)} jugadors={jugadors} setJugadors={setJugadors} />
            )}
        </ConfiguraStyles>
    );
};

const Jugador = ({jugador, jugadors, setJugadors}) => {
    const jugador2 = jugador === X ? O : X;
    return (
        <div>
            <Icon>{icoFitxa[jugador]}</Icon>
            <Btn onClick={() => {
                setJugadors(prev => { return {
                    [jugador]: prev[jugador] === HUMA ? IA : HUMA,
                    [jugador2]: prev[jugador2] === IA ? HUMA : prev[jugador2],
                }});
            }}><Icon>{icoJugadors[jugadors[jugador]]}</Icon></Btn>
        </div>
    );
}

const ConfiguraStyles = styled.div`
    display: flex;
    flex-direction: row;

    div {   
        span {
            font-size: 48px;
        }

        div {
            width: 4em;
            height: 4em;
            margin: .5em 1em 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 100%;

            span {
                font-size: 3em;
            }
        }
    }
`;