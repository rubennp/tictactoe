import styled from 'styled-components';

import Btn from './Btn';
import Icon from './Icon';
import { X, O, HUMA, IA, icoJugadors, icoFitxa } from '../utils';

export default function Configura({ jugadors, setJugadors}) {
    return (
        <ConfiguraStyles>
            <div>
                <Icon>{icoFitxa[X]}</Icon>
                <Btn onClick={() => {
                    setJugadors(prev => { return {
                        [X]: prev[X] === HUMA ? IA : HUMA,
                        [O]: prev[O] === IA ? HUMA : prev[O],
                    }});
                }}><Icon>{icoJugadors[jugadors[X]]}</Icon></Btn>
            </div>
            <div>
                <Icon>{icoFitxa[O]}</Icon>
                <Btn onClick={() => {
                    setJugadors(prev => { return {
                        [O]: prev[O] === HUMA ? IA : HUMA,
                        [X]: prev[X] === IA ? HUMA : prev[X],
                    }});
                }}><Icon>{icoJugadors[jugadors[O]]}</Icon></Btn>
            </div>
        </ConfiguraStyles>
    );
};

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