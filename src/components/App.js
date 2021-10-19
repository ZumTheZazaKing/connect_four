import { lazy, Suspense, useReducer, } from 'react';
import { Context } from '../data/context';
import { winningArrays } from '../data/winningArrays';

const Main = lazy(() => import('./Main').then(module => ({default:module.Main})));

function App() {

  const gameReducer = (state, action) => {

    switch (action.type){

      case "togglePlayer":
        return {
          ...state,
          board:action.board,
          currentPlayer:action.nextPlayer
        }

      case "endGame":
        return {
          ...state,
          gameOver:true,
          message:action.message
        }

      case "newGame":
        return{
          ...initialGameState
        }

        default:
          throw Error("Action not valid");

    }
  
  }

  const initialGameState = {
    player1:1,
    player2:2,
    currentPlayer:1,
    board:[
      "", "", "", "", "", "", "",
      "", "", "", "", "", "", "",
      "", "", "", "", "", "", "",
      "", "", "", "", "", "", "",
      "", "", "", "", "", "", "",
      "", "", "", "", "", "", "",
    ],
    gameOver:false,
    message:''
  }

  const [gameState, dispatchGameState] = useReducer(gameReducer, initialGameState);

  const newGame = () => {
    dispatchGameState({type:"newGame"})
  }

  const checkBoard = (board) => {

    for (var i = 0; i < winningArrays.length; i++){
      const square1 = board[winningArrays[i][0]];
      const square2 = board[winningArrays[i][1]];
      const square3 = board[winningArrays[i][2]];
      const square4 = board[winningArrays[i][3]];

      if(
        square1 === "player-one" &&
        square2 === "player-one" &&
        square3 === "player-one" &&
        square4 === "player-one"
      ){
        dispatchGameState({type:"endGame", message:"Yellow Wins"});
      }
      if(
        square1 === "player-two" &&
        square2 === "player-two" &&
        square3 === "player-two" &&
        square4 === "player-two"
      ){
        dispatchGameState({type:"endGame", message:"Red Wins"});
      }

    }

  }

  const play = e => {

    if(gameState.gameOver)return;

    let board = [...gameState.board];
    let nextPlayer = gameState.currentPlayer === gameState.player1
      ? gameState.player2
      : gameState.player1

    let index = parseInt(e.target.id);
    let validAddition = 7;

    while(board[index + validAddition] === ""){
      index += validAddition;
    }

    if(e.target.className === "token "){

      if(gameState.currentPlayer === 1){
        board[index] = "player-one";

      } else {
        board[index] = "player-two";
      }
      dispatchGameState({type:"togglePlayer", board, nextPlayer});
    }
    checkBoard(board);
  }

  


  

  return (
    <div className="App">
      
      <Suspense fallback={<div id="loading"><h1>Loading...</h1></div>}>
        <Context.Provider value={{
          gameState, dispatchGameState,
          play, newGame
        }}>

        <Main/>

        </Context.Provider>
      </Suspense>

    </div>
  );
}

export default App;
