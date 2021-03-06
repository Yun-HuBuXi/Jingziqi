import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props){
  return (
    <button className="square" 
    onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board(props){
  function renderSquare(i) {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)}/>;
  }
 
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game(){
  let [history, setHistory] = useState([{squares: Array(9).fill(null),}],)
  let [xIstrue, setX] = useState(true)
  let [stepNubmer, setS] = useState(0)
  const current = history[stepNubmer];
  const squares = current.squares.slice()
  const winner = calculateWinner(squares)
  const moves = history.map((step, move) => {
    const devc = move ? "Go to move #" + move: "Go to game start";
    return (
      <li key={move} >
        <button onClick={() => jumpTo(move)}>{devc}</button>
      </li>
    )
  }
  )
  const handleClick = (i) => {
    history = history.slice(0, stepNubmer+1)
    if ( winner || squares[i]) {  
      return;
    }
    squares[i] = xIstrue ? "X" : "O";
    setHistory(history.concat([{squares: squares}]))
    setX(!xIstrue)
    setS(history.length)
  }
  let status;
  if (!winner && squares.includes(null)) {
    status = 'Next player: '+ (xIstrue ? "X":"O");
  } if (!winner && !squares.includes(null)) {
    status = "No Winner"
  } if (winner) {
    status = "Winner:" + winner
  } 
  const jumpTo = (step) => {
    stepNubmer = step
    setX((stepNubmer % 2 === 0))
    setS(stepNubmer)
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================
ReactDOM.render(
<Game />,
document.getElementById('root')
);