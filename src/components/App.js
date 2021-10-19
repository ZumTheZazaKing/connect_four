import { lazy, Suspense, useReducer, } from 'react';
import { Context } from '../data/context';

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

  const [gameState, dispatchGameState] = useReducer(gameReducer, initialGameState)

  const play = e => {

    let board = [...gameState.board];
    let nextPlayer = gameState.currentPlayer === gameState.player1
      ? gameState.player2
      : gameState.player1

    if(e.target.className === "token "){
      if(gameState.currentPlayer === 1){
        board[e.target.id] = "player-one";

      } else {
        board[e.target.id] = "player-two";
      }
      dispatchGameState({type:"togglePlayer", board, nextPlayer});
    }
  }

  


  

  return (
    <div className="App">
      
      <Suspense fallback={<h1>Loading...</h1>}>
        <Context.Provider value={{
          gameState, dispatchGameState,
          play
        }}>

        <Main/>

        </Context.Provider>
      </Suspense>

    </div>
  );
}

export default App;
