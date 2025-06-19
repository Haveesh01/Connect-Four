import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Modal from "./components/Modal";

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

  function handleHoverColumn(column) {
    setHoverColumn(column);
  }

  function handleReset() {
    setPieces(getEmptyBoard());
    setPlayerTurn(RED_TURN);
    setHoverColumn(-1);
    setModal({ show: false, message: "", winner: null });
    setAnimatingCell(null);
  }

  return (
    <div>
      <h1>CONNECT 4</h1>
      <Board
        pieces={pieces}
        animatingCell={animatingCell}
        playerTurn={playerTurn}
        hoverColumn={hoverColumn}
        onCellClick={handleColumnClick}
        onCellHover={handleHoverColumn}
      />
      <Modal
        show={modal.show}
        message={modal.message}
        winner={modal.winner}
        onReset={handleReset}
      />
    </div>
  );
}

export default App;
