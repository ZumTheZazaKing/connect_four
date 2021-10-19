import { useContext } from 'react';
import { Context } from '../data/context';

import { Cell } from './Cell';

export function Main(){

    let { gameState, play } = useContext(Context);

    return (<div id="Main">

        <div id="board">
            {gameState.board && gameState.board.map((row, i) => <Cell play={play} cellNumber={i} value={row} key={i}/>)}
        </div>

    </div>)
}