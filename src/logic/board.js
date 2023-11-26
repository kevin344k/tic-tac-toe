import { WINNER_COMBOS} from "../constants.js";


export   const checkWinnerFrom = (boardToCheck) => {
    //revisamos todas las conbinaciones ganadoras
    //para ver si x u o ganó
    for ( let combo of WINNER_COMBOS) {
      let [a, b, c] = combo;
      console.log([a, b, c]);
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        console.log(boardToCheck[a]);
        return boardToCheck[a];
      }
      //si no hay ganador
      
    }
    return null;
  };
  export const checkEndGame = (newBoard) => {
    //revisamos si hjay un empate
    //si no hay más espacios vacíos
    //en el tablero
    return newBoard.every((square) => square !== null);
  };
