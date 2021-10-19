import { useContext } from 'react';
import { Context } from '../data/context';
import { Cell } from './Cell';
import Button from '@mui/material/Button';

export function Main(){

    let { gameState, play, newGame } = useContext(Context);

    return (<div id="Main">

        <h1>Connect Four</h1>

        <Button variant="contained" onClick={() => newGame()} className={gameState.gameOver ? "" : "hidden"}>New Game</Button>
        <br/>
        <div id="board">
            {gameState.board && gameState.board.map((row, i) => <Cell play={play} cellNumber={i} value={row} key={i}/>)}
        </div>

        <h2>{gameState.message}</h2>

    </div>)
}