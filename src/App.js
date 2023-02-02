import { useState } from "react";
import "./App.css"
import Board from "./Components/Board";

function App() {

  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  //올바르지 않은 '미래'기록을 모두 버리는 것을 보장
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;

  if (winner) {
    status = `Winner:  ${winner}`;
  } else {
    status = `Next Player ${xIsNext ? 'X' : 'O'}`;

  }

  const handleClick = (i) => {

    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = history[newHistory.length - 1];
    //불변성 지켜주기
    const newSquares = newCurrent.squares.slice();

    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, { squares: newSquares }]);
    setXIsNext(prev => !prev);

    setStepNumber(newHistory.length);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }



  const moves = history.map((step, index) => {
    const desc = index ? 'Go to move #' + index : 'Go to game start';
    return (
      <li key={index}>
        <button className="move-button" onClick={() => jumpTo(index)}>{desc}</button>
      </li>
    )
  });


  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div className='status'>{status}</div>

        <ol>{moves}</ol>
      </div>

    </div>
  );
}

export default App;
