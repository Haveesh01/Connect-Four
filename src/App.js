import React, { useState, useRef } from "react";
import "./App.css";

const ROWS = 6;
const COLS = 7;
const RED_TURN = 1;
const YELLOW_TURN = 2;

function getEmptyBoard() {
  return Array(ROWS * COLS).fill(0);
}

function hasPlayerWon(player, pieces) {
  for (let index = 0; index < 42; index++) {
    // Horizontal
    if (
      index % 7 < 4 &&
      pieces[index] === player &&
      pieces[index + 1] === player &&
      pieces[index + 2] === player &&
      pieces[index + 3] === player
    ) {
      return true;
    }
    // Vertical
    if (
      index < 21 &&
      pieces[index] === player &&
      pieces[index + 7] === player &&
      pieces[index + 14] === player &&
      pieces[index + 21] === player
    ) {
      return true;
    }
    // Diagonal /
    if (
      index % 7 < 4 &&
      index < 18 &&
      pieces[index] === player &&
      pieces[index + 8] === player &&
      pieces[index + 16] === player &&
      pieces[index + 24] === player
    ) {
      return true;
    }
    // Diagonal \
    if (
      index % 7 >= 3 &&
      index < 21 &&
      pieces[index] === player &&
      pieces[index + 6] === player &&
      pieces[index + 12] === player &&
      pieces[index + 18] === player
    ) {
      return true;
    }
  }
  return false;
}

function App() {
  const [pieces, setPieces] = useState(getEmptyBoard());
  const [playerTurn, setPlayerTurn] = useState(RED_TURN);
  const [hoverColumn, setHoverColumn] = useState(-1);
  const [modal, setModal] = useState({
    show: false,
    message: "",
    winner: null,
  });
  const [animatingCell, setAnimatingCell] = useState(null);
  const boardRef = useRef();

  function handleColumnClick(column) {
    if (animatingCell !== null || modal.show) return;
    const colArr = pieces.filter((_, idx) => idx % 7 === column);
    const availableRow = colArr.lastIndexOf(0);
    if (availableRow === -1) return;

    const idx = availableRow * 7 + column;
    setAnimatingCell(idx);
    setTimeout(() => {
      const newPieces = [...pieces];
      newPieces[idx] = playerTurn;
      setPieces(newPieces);
      setAnimatingCell(null);
      checkGameWinOrDraw(newPieces);
    }, 400); // Match animation duration
  }

  function checkGameWinOrDraw(newPieces) {
    if (!newPieces.includes(0)) {
      setModal({ show: true, message: "The game is draw!", winner: null });
      return;
    }
    if (hasPlayerWon(playerTurn, newPieces)) {
      setModal({
        show: true,
        message: `${playerTurn === RED_TURN ? "Red" : "Yellow"} has Won!`,
        winner: playerTurn,
      });
      return;
    }
    setPlayerTurn(playerTurn === RED_TURN ? YELLOW_TURN : RED_TURN);
  }

  function handleMouseEnter(column) {
    setHoverColumn(column);
  }

  function handleReset() {
    setPieces(getEmptyBoard());
    setPlayerTurn(RED_TURN);
    setHoverColumn(-1);
    setModal({ show: false, message: "", winner: null });
    setAnimatingCell(null);
  }

  // Render board cells
  const cells = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const idx = row * COLS + col;
      let piece = null;
      if (pieces[idx] !== 0) {
        piece = (
          <div
            className={"piece" + (animatingCell === idx ? " dropping" : "")}
            data-placed="true"
            data-player={pieces[idx]}
            key={`piece-${idx}`}
          />
        );
      } else if (animatingCell === idx) {
        piece = (
          <div
            className="piece dropping"
            data-placed="true"
            data-player={playerTurn}
            key={`piece-${idx}`}
          />
        );
      } else if (hoverColumn === col && pieces[col] === 0 && row === 0) {
        piece = (
          <div
            className="piece"
            data-placed="false"
            data-player={playerTurn}
            key={`hover-piece-${idx}`}
          />
        );
      }
      cells.push(
        <div
          className="cell"
          key={idx}
          onMouseEnter={() => handleMouseEnter(col)}
          onClick={() => handleColumnClick(col)}
        >
          {piece}
        </div>
      );
    }
  }

  return (
    <div>
      <h1>CONNECT 4</h1>
      <div id="board">{cells}</div>
      {modal.show && (
        <div id="modal-container" style={{ display: "block" }}>
          <div id="modal-content">
            <h2>Game Over</h2>
            <p
              id="modal-message"
              data-winner={modal.winner ? modal.winner : undefined}
            >
              {modal.message}
            </p>
            <button id="reset" onClick={handleReset}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
