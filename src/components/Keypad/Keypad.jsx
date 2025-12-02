// Importa o React e o componente Button, usado para criar cada tecla da calculadora
import React from "react";
import Button from "../Button/Button";

/* 
  Função auxiliar que verifica se uma determinada tecla (label) 
  está atualmente pressionada (pressedKey).
  Retorna true se for a mesma tecla, para aplicar o efeito visual "ativo".
*/
const isActiveLabel = (label, pressedKey) => {
  if (!pressedKey) return false;   // Se nenhuma tecla está pressionada, retorna falso
  return label === pressedKey;     // Retorna verdadeiro se a tecla atual for a pressionada
};

// Define o componente Keypad (teclado da calculadora)
export default function Keypad({ onInput, onClear, onDel, onEvaluate, pressedKey }) {
  return (
    // Container principal do teclado
    // role="grid" e aria-label="Teclado" → melhoram a acessibilidade (leitores de tela)
    <div className="keypad" role="grid" aria-label="Teclado">

      {/* ----- Primeira linha: comandos principais ----- */}
      <Button 
        label="C"                          // Rótulo do botão
        onClick={onClear}                  // Função chamada ao clicar → limpa tudo
        className="btn-danger"             // Classe CSS (para cor diferente)
        active={isActiveLabel("C", pressedKey)} // Aplica destaque se a tecla "C" estiver pressionada
      />

      <Button 
        label="(" 
        onClick={() => onInput("(")}       // Adiciona "(" na expressão
        active={isActiveLabel("(", pressedKey)} 
      />

      <Button 
        label=")" 
        onClick={() => onInput(")")}       // Adiciona ")" na expressão
        active={isActiveLabel(")", pressedKey)} 
      />

      <Button 
        label="DEL" 
        onClick={onDel}                    // Apaga o último caractere
        className="btn-label-small"        // Classe CSS com estilo menor
        active={isActiveLabel("DEL", pressedKey)} 
      />

      {/* ----- Segunda linha: números e divisão ----- */}
      <Button label="7" onClick={() => onInput("7")} active={isActiveLabel("7", pressedKey)} />
      <Button label="8" onClick={() => onInput("8")} active={isActiveLabel("8", pressedKey)} />
      <Button label="9" onClick={() => onInput("9")} active={isActiveLabel("9", pressedKey)} />
      <Button 
        label="÷" 
        onClick={() => onInput("/")}        // Adiciona operador de divisão
        className="btn-operator" 
        active={isActiveLabel("÷", pressedKey)} 
      />

      {/* ----- Terceira linha: números e multiplicação ----- */}
      <Button label="4" onClick={() => onInput("4")} active={isActiveLabel("4", pressedKey)} />
      <Button label="5" onClick={() => onInput("5")} active={isActiveLabel("5", pressedKey)} />
      <Button label="6" onClick={() => onInput("6")} active={isActiveLabel("6", pressedKey)} />
      <Button 
        label="×" 
        onClick={() => onInput("*")}        // Adiciona operador de multiplicação
        className="btn-operator" 
        active={isActiveLabel("×", pressedKey)} 
      />

      {/* ----- Quarta linha: números e subtração ----- */}
      <Button label="1" onClick={() => onInput("1")} active={isActiveLabel("1", pressedKey)} />
      <Button label="2" onClick={() => onInput("2")} active={isActiveLabel("2", pressedKey)} />
      <Button label="3" onClick={() => onInput("3")} active={isActiveLabel("3", pressedKey)} />
      <Button 
        label="-" 
        onClick={() => onInput("-")}        // Adiciona operador de subtração
        className="btn-operator" 
        active={isActiveLabel("-", pressedKey)} 
      />

      {/* ----- Quinta linha: zero, ponto e adição ----- */}
      <Button 
        label="0" 
        onClick={() => onInput("0")} 
        className="col-span-2"              // Faz o botão "0" ocupar duas colunas
        active={isActiveLabel("0", pressedKey)} 
      />

      <Button 
        label="." 
        onClick={() => onInput(".")}        // Adiciona ponto decimal
        active={isActiveLabel(".", pressedKey)} 
      />

      <Button 
        label="+" 
        onClick={() => onInput("+")}        // Adiciona operador de adição
        className="btn-operator" 
        active={isActiveLabel("+", pressedKey)} 
      />

      {/* ----- Última linha: botão de resultado (=) ----- */}
      <Button
        label="=" 
        onClick={onEvaluate}                // Executa o cálculo da expressão
        className="col-span-4 btn-equal"    // Ocupa toda a linha, com estilo especial
        active={isActiveLabel("=", pressedKey)} 
      />
    </div>
  );
}
