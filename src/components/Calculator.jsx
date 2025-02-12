import React, { useState } from 'react';
import "./Calculator.css"; // Importando o arquivo de estilos

const Calculator = () => {
  // useState para armazenar a expressão matemática
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);

  // Função para atualizar a expressão ao clicar nos botões
  const handleClick = (value) => {
    setExpression(prev => prev + value);
  };

  // Função para limpar a expressão
  const clearExpression = () => {
    setExpression("");
    setResult(null);
  };

  // Função para calcular o resultado
  const calculateResult = () => {
    try {
      setResult(eval(expression)); // eval avalia a expressão matemática
    } catch {
      setResult("Erro");
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <input type="text" value={expression} readOnly />
        <div className="result">{result !== null ? result : ""}</div>
      </div>
      <div className="buttons">
        {["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "*", "0", ".", "=", "/"].map((char) => (
          <button key={char} onClick={() => char === "=" ? calculateResult() : handleClick(char)}>
            {char}
          </button>
        ))}
        <button className="clear" onClick={clearExpression}>C</button>
      </div>
    </div>
  );
};

export default Calculator;
