import { useState } from "react";

export default function Tictactoe() {
  const [player, setPlayer] = useState("X");
  const [gameActive, setGameActive] = useState(true);
  const [gameState, setGameState] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [drawScore, setDrawScore] = useState(0);
  const [status, setStatus] = useState("Player X's turn");
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleClick(index) {
    if (gameState[index] !== "" || !gameActive) return;
    const newGameState = [...gameState];
    newGameState[index] = player;
    setGameState(newGameState);
    cheeckWinner(newGameState);
  }

  function cheeckWinner(newGameState) {
    let winner = false;

    for (const pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (
        newGameState[a] &&
        newGameState[a] === newGameState[b] &&
        newGameState[a] === newGameState[c]
      ) {
        winner = true;
        break;
      }
    }

    if (winner) {
      setStatus(`Player ${player} wins`);
      setGameActive(false);

      if (player === "X") {
        setXScore((prev) => prev + 1);
      } else {
        setOScore((prev) => prev + 1);
      }
      return;
    }

    if (!newGameState.includes("")) {
      setStatus("Draw!");

      setDrawScore((prev) => prev + 1);

      setGameActive(false);

      return;
    }

    const nextPlayer = player === "X" ? "O" : "X";
    setPlayer(nextPlayer);
    setStatus(`Next ${nextPlayer}'s turn`);
  }

  function newGame() {
    setPlayer("X");

    setGameActive(true);

    setGameState(["", "", "", "", "", "", "", "", ""]);

    setStatus("Player X's turn");
  }

  function resetScores() {
    setXScore(0);
    setOScore(0);
    setDrawScore(0);
  }

  return (
    <div className="main">
      <h2>Tic-Tac-Toe</h2>
      <p className="para1">Play, Compete and Have Fun</p>
      <div className="drawXO-score">
        <div className="x-box boxes">
          <p className="para2">Player X</p>
          <p className="x-score">{xScore}</p>
        </div>
        <div className="draw-box boxes">
          <p className="para2">draw</p>
          <p className="draw-score">{drawScore}</p>
        </div>
        <div className="o-box boxes">
          <p className="para2">Player O</p>
          <p className="o-score">{oScore}</p>
        </div>
      </div>

      <div className="board">
        {gameState.map((cell, index) => (
          <button
            className="cell"
            key={index}
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      <p className="status">{status}</p>

      <div className="buttons">
        <button onClick={newGame}>New Game</button>
        <button onClick={resetScores}>Reset Scores</button>
      </div>
    </div>
  );
}
