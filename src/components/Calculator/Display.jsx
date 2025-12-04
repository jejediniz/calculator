import React from "react";
import "./Display.css";

export default function Display({ value }) {
  return (
    <div className="calc-display">
      <div className="calc-display-value">{value || "0"}</div>
    </div>
  );
}
