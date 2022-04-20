import { useState } from "react";
import "./Node.css";
import React from "react";

const Node = (props) => {
  return (
    <div
      className={props.color}
      onClick={() => {
        console.log(`props.x: ${props.x} props.y: ${props.y}`);
      }}
    ></div>
  );
};

export default Node;
