import React from "react";

export default function Board({
  pieces,
  animatingCell,
  playerTurn,
  hoverColumn,
  onCellClick,
  onCellHover,
}) {
  const ROWS = 6;
  const COLS = 7;
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
          onMouseEnter={() => onCellHover(col)}
          onClick={() => onCellClick(col)}
        >
          {piece}
        </div>
      );
    }
  }
  return <div id="board">{cells}</div>;
}
