import Node from "./Node";

import "./Grid.css";
import React, { useState } from "react";

const Grid = () => {
  const lenX = window.innerWidth / 30;
  const lenY = window.innerHeight / 30;

  const nodes = [];
  for (let i = 0; i < lenX; i++) {
    const row = [];
    for (let j = 0; j < lenY; j++) {
      row.push(<Node key={10 * i + j} x={i} y={j}></Node>);
    }
    nodes.push(row);
  }

  return <div className="container">{nodes}</div>;
};

export default Grid;
