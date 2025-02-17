import React, { useState, useEffect } from "react";
import "./Calculator.css"; // Importa o CSS estilizado

const Calculator = () => {
  const [expression, setExpression] = useState(""); // Estado para armazenar a expressão
  const [result, setResult] = useState(null); // Estado para armazenar o resultado
  const [history, setHistory] = useState([]); // Estado para armazenar o histórico
  const [activeKey, setActiveKey] = useState(null); // Estado para ativar o zoom nos botões

  // Atualiza a expressão quando os botões são clicados
  const handleClick = (value) => {
    setExpression((prev) => prev + value);
  };

  // Limpa a calculadora
  const clearExpression = () => {
    setExpression("");
    setResult(null);
    setActiveKey("C"); // Ativa o efeito de zoom no botão "C"
    setTimeout(() => setActiveKey(null), 200);
  };

  // Calcula o resultado da expressão
  const calculateResult = () => {
    try {
      const evalResult = eval(expression);
      setResult(evalResult);
      setHistory((prev) => [...prev, `${expression} = ${evalResult}`]); // Adiciona ao histórico
    } catch {
      setResult("Erro");
    }
  };

  // Captura as teclas pressionadas no teclado
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      // Se for um número, operador ou ponto, adiciona à expressão
      if (/[0-9+\-*/.]/.test(key)) {
        setExpression((prev) => prev + key);
        setActiveKey(key); // Ativa o zoom no botão correspondente
        setTimeout(() => setActiveKey(null), 200);
      } else if (key === "Enter") {
        calculateResult();
      } else if (key === "Backspace") {
        setExpression((prev) => prev.slice(0, -1));
      } else if (key === "Escape") {
        clearExpression(); // Agora o botão "C" está vinculado à tecla ESC
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [expression]);

  return (
    <div className="calculator-container">
      {/* Calculadora */}
      <div className="calculator">
        <div className="display">
          <input type="text" value={expression} readOnly />
          <div className="result">{result !== null ? result : ""}</div>
        </div>
        <div className="buttons">
          {["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "*", "0", ".", "=", "/"].map((char) => (
            <button
              key={char}
              onClick={() => (char === "=" ? calculateResult() : handleClick(char))}
              className={`zoom-effect ${activeKey === char ? "zoom-active" : ""}`} // Aplica o efeito de zoom
            >
              {char}
            </button>
          ))}
          <button className={`clear ${activeKey === "C" ? "zoom-active" : ""}`} onClick={clearExpression}>C</button>
        </div>
      </div>

      {/* Histórico de resultados */}
      <div className="history-screen">
        <h3>Histórico</h3>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calculator;
