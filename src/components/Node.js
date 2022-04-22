import { useState, memo } from "react";
import "./Node.css";
import React from "react";

const Node = ({ key, x, y, color }) => {
  return (
    <div
      className={color}
      onClick={() => {
        console.log(`props.x: ${x} props.y: ${y}`);
      }}
    ></div>
  );
};

export default Node;
