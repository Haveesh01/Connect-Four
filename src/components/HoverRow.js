import React from "react";

export default function HoverRow({
  cols,
  hoverColumn,
  playerTurn,
  onCellHover,
  onCellClick,
}) {
  return (
    <div
      style={{
        width: "70vmin",
        display: "grid",
        gridTemplateColumns: `repeat(${cols},1fr)`,
      }}
    >
      {Array.from({ length: cols }).map((_, c) => (
        <div
          className="cell"
          key={`hover-${c}`}
          onMouseEnter={() => onCellHover(c)}
          onMouseLeave={() => onCellHover(-1)}
          onClick={() => onCellClick(c)}
          style={{
            cursor: "pointer",
            height: "40px",
            background: "transparent",
          }}
        >
          {hoverColumn === c && (
            <div
              className="piece"
              data-placed="false"
              data-player={playerTurn}
              style={{
                transition: "transform 0.2s",
                transform: "translateY(0)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
