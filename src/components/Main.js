import { useContext } from 'react';
import { Context } from '../data/context';

import { Cell } from './Cell';

export function Main(){

    let { gameState, play, newGame } = useContext(Context);

    return (<div id="Main">

        <button onClick={() => newGame()} className={gameState.gameOver ? "" : "hidden"}>New Game</button>

        <div id="board">
            {gameState.board && gameState.board.map((row, i) => <Cell play={play} cellNumber={i} value={row} key={i}/>)}
        </div>

        <h2>{gameState.message}</h2>

    </div>)
}