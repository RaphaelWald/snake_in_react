import { useState } from "react";
import "./Node.css";
import React from "react";

const Node = (props) => {
  const [color, setColor] = useState("node");
  return (
    <div
      className={color}
      onClick={() => setColor(color === "node green" ? "node" : "node green")}
    ></div>
  );
};

export default Node;
