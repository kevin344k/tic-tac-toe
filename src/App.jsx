import { useState } from "react";
import confetti from "canvas-confetti";
import "./App.css";
import { Square } from "./components/Square";
import { TURNS } from "./constants.js";
import { checkWinnerFrom,checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.x);
  //null es que nbo ahy ganador, false es que hay un empate.
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setWinner(null);
  };

  const updateBoard = (index) => {
    //no actualizamos esta posiscion si ya tiene algo
    if (board[index] || winner) return;
    //actualizar el tablero
    const newBoard = [...board];

    newBoard[index] = turn;

    setBoard(newBoard);
    console.log(newBoard);
    //cambiar el turno
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);

    //revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner((prevWinner) => {
        console.log(`Ganador: ${newWinner},el anterior era ${prevWinner}`);
        return newWinner;
      }); //actualiza el estado
    } else if (checkEndGame(newBoard)) {
      setWinner(false); //empate
    } //TO DO:check if game is over
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>
    </main>
  );
}

export default App;
