import Node from "./Node";

import "./Grid.css";
import React, { useState } from "react";

const createStates = (x, y) => {
  const nodesState = [];
  for (let i = 0; i < y; i++) {
    const row = [];
    for (let j = 0; j < x; j++) {
      row.push("node");
    }
    nodesState.push(row);
  }
  return nodesState;
};

const Grid = () => {
  const lenX = parseInt(window.innerWidth / 31);
  const lenY = parseInt(window.innerHeight / 31);

  const [states, setStates] = useState(createStates(lenX, lenY));
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);

  const updateState = (event) => {
    const x = parseInt(event.pageX / 31);
    let y = parseInt(event.pageY / 31);
    let newStates = createStates(lenX, lenY);
    if (!start || (start && end)) {
      newStates[y][x] = "node green";
      setStart([x, y]);
      setEnd(null);
    } else {
      newStates[y][x] = "node red";
      newStates[start[1]][start[0]] = "node green";
      setEnd([x, y]);
    }
    setStates(newStates);
  };

  const createGrid = (states) => {
    console.log(states[10][10]);
    const nodes = [];
    for (let i = 0; i < lenY; i++) {
      const row = [];
      for (let j = 0; j < lenX; j++) {
        row.push(
          <Node
            key={10 * i + j}
            x={j}
            y={i}
            color={states[i][j]}
            text={states[i][j] === "node" ? "" : ">"}
          ></Node>
        );
      }
      nodes.push(row);
    }
    return nodes;
  };

  return (
    <div className="container" onClick={(event) => updateState(event)}>
      {createGrid(states)}
    </div>
  );
};

export default Grid;
