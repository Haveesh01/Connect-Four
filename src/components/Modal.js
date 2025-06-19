import React from "react";

export default function Modal({ show, message, winner, onReset }) {
  if (!show) return null;
  return (
    <div id="modal-container" style={{ display: "block" }}>
      <div id="modal-content">
        <h2>Game Over</h2>
        <p id="modal-message" data-winner={winner ? winner : undefined}>
          {message}
        </p>
        <button id="reset" onClick={onReset}>
          Play Again
        </button>
      </div>
    </div>
  );
}
