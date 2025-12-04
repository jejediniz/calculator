// src/components/Calculator/Calculator.jsx
import React from "react";
import useCalculator from "../../hooks/useCalculator";
import Keypad from "./Keypad";
import "./Calculator.css";

export default function Calculator() {
  const { expression, append, clear, backspace, evaluate, lastKey } = useCalculator();


  const handlePress = (key) => {
    if (key === "C") return clear();
    if (key === "DEL") return backspace();
    if (key === "=") return evaluate();
    // números e operadores
    append(key);
  };

  return (
    <div className="calculator-panel">
      <div className="header">Calculadora</div>

      <div className="display">
        <div className="expr">{expression || "0"}</div>
      </div>

      <Keypad onPress={handlePress} activeKey={lastKey} />
    </div>
  );
}
