import Node from "./Node";

import "./Grid.css";
import React, { useState } from "react";

const random = (max) => Math.floor(Math.random() * max);

const Grid = () => {
  const lenX = parseInt(window.innerWidth / 31);
  const lenY = parseInt(window.innerHeight / 31);
  const y = random(lenY - 1);
  const x = random(lenX - 1);
  const initGrid = () => {
    const gr = [...Array(lenY)].map((e) => [...Array(lenX)].fill("node"));
    gr[y][x] = "node blue";
    return gr;
  };

  const [grid, setGrid] = useState(initGrid());

  const [direction, setDirection] = useState("right");
  const [gameState, setGameState] = useState(true);
  const [bonus, setBonus] = useState([random(lenY - 1), random(lenX - 1)]);
  const [queue, setQueue] = useState([
    [20, 20],
    [20, 21],
    [20, 22],
    [20, 23],
  ]);

  const updateSnake = () => {
    const gridCopy = structuredClone(grid);
    const q = structuredClone(queue);
    const [yHead, xHead] = q[q.length - 1];
    gridCopy[yHead][xHead] = "node green";
    if (yHead === bonus[0] || xHead === bonus[1]) {
      const newY = random(lenY - 1);
      const newX = random(lenX - 1);
      console.log(`NewBonusX: ${newX}, NewBonusY: ${newY}`);
      gridCopy[newY][newX] = "node blue";
      setBonus([newY, newX]);
    } else {
      const [yTail, xTail] = q.shift();
      gridCopy[yTail][xTail] = "node";
    }

    if (
      direction === "right" &&
      xHead + 1 < lenX &&
      isNotInQueue(q, yHead, xHead + 1)
    ) {
      q.push([yHead, xHead + 1]);
    } else if (
      direction === "up" &&
      yHead - 1 >= 0 &&
      isNotInQueue(q, yHead - 1, xHead)
    ) {
      q.push([yHead - 1, xHead]);
    } else if (
      direction === "left" &&
      xHead - 1 >= 0 &&
      isNotInQueue(q, yHead, xHead - 1)
    ) {
      q.push([yHead, xHead - 1]);
    } else if (
      direction === "down" &&
      yHead + 1 < lenY &&
      isNotInQueue(q, yHead + 1, xHead)
    ) {
      q.push([yHead + 1, xHead]);
    } else {
      for (let [y, x] of q) {
        gridCopy[y][x] = "node red";
        setGameState(false);
      }
    }
    setGrid(gridCopy);
    setQueue(q);
  };

  const isNotInQueue = (q, y, x) => {
    for (let [qy, qx] of q) {
      if (qy === y && qx === x) return false;
    }
    return true;
  };

  if (gameState) {
    setTimeout(() => {
      updateSnake();
    }, 10);
  }

  const changeSnakeDirection = (event) => {
    switch (event.keyCode) {
      case 37:
        setDirection((prevState) =>
          prevState !== "right" ? "left" : prevState
        );
        break;
      case 38:
        setDirection((prevState) => (prevState !== "down" ? "up" : prevState));
        break;
      case 39:
        setDirection((prevState) =>
          prevState !== "left" ? "right" : prevState
        );
        break;
      case 40:
        setDirection((prevState) => (prevState !== "up" ? "down" : prevState));
        break;
      default:
        break;
    }
  };

  return (
    <div
      tabIndex="0"
      className="container"
      onKeyDown={(event) => {
        changeSnakeDirection(event);
      }}
    >
      {grid.map((row, rowIdx) =>
        row.map((node, idx) => (
          <Node key={idx} x={idx} y={rowIdx} color={node}></Node>
        ))
      )}
    </div>
  );
};

export default Grid;
