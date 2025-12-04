// src/components/Calculator/Keypad.jsx
import React from "react";
import "./Keypad.css";

const keys = [
  ["C", "(", ")", "DEL"],
  ["7","8","9","/"],
  ["4","5","6","*"],
  ["1","2","3","-"],
  ["0",".","+","="]
];

export default function Keypad({ onPress, activeKey }) {
  return (
    <div className="keypad">
      {keys.flat().map((k) => (
        <button
          key={k}
          className={"key " + (activeKey === k ? "active" : "") + (k === "=" ? "equals" : "")}
          onClick={() => onPress(k)}
        >
          {k}
        </button>
      ))}
    </div>
  );
}
