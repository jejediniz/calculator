// Importa o React e outros componentes necessários
import React from "react";
import Display from "../Display/Display";       // Componente responsável por mostrar os números e resultados
import Keypad from "../Keypad/Keypad";          // Componente responsável pelos botões da calculadora
import { useCalculator } from "../../hooks/useCalculator";  // Hook personalizado que gerencia a lógica da calculadora

// Define o componente principal da calculadora
export default function Calculator() {

  // Extrai funções e valores do hook personalizado useCalculator
  // display → valor atual mostrado no display
  // input → função para inserir um número ou operador
  // clear → limpa todos os dados
  // del → apaga o último caractere
  // evaluate → realiza o cálculo da expressão
  const { display, input, clear, del, evaluate } = useCalculator();

  // Estado local que guarda qual tecla está sendo pressionada (para animação visual)
  const [pressed, setPressed] = React.useState(null);

  // Função que faz o mapeamento das teclas do teclado físico para os rótulos da interface (UI)
  const mapKeyToLabel = (key) => {
    const map = {
      "/": "÷",
      "*": "×",
      "Enter": "=",
      "=": "=",
      "Backspace": "DEL",
      "Delete": "C",
      "(": "(",
      ")": ")",
      ".": ".",
      "+": "+",
      "-": "-",
    };
    // Se a tecla for um número (0 a 9), retorna ela mesma
    if (/^[0-9]$/.test(key)) return key;
    // Caso contrário, retorna o mapeamento ou null se não existir
    return map[key] ?? null;
  };

  // Função que trata eventos de teclas pressionadas (keydown)
  function handleKeyDown(e) {

    // Ignora eventos se o usuário estiver digitando em um campo de texto
    const active = document.activeElement;
    if (
      active &&
      (active.tagName === "INPUT" ||
        active.tagName === "TEXTAREA" ||
        active.isContentEditable)
    ) {
      return;
    }

    const key = e.key;

    // Verifica se a tecla é um número, operador ou comando aceito
    if (
      /[0-9+\-*/().]/.test(key) ||
      key === "Enter" ||
      key === "Backspace" ||
      key === "Delete"
    ) {

      // Se for número ou operador → envia para a função de entrada (input)
      if (/[0-9]/.test(key) || /[+\-*/().]/.test(key)) {
        // Mantém '*' e '/' no formato interno
        const char = key === "*" ? "*" : key === "/" ? "/" : key;
        input(char);

      // Se for Enter → realiza o cálculo
      } else if (key === "Enter") {
        evaluate();

      // Se for Backspace → apaga o último caractere
      } else if (key === "Backspace") {
        del();

      // Se for Delete → limpa tudo
      } else if (key === "Delete") {
        clear();
      }

      // Identifica qual botão visual deve ser "pressionado" (efeito visual)
      const label = mapKeyToLabel(key);
      if (label) {
        setPressed(label);
        // Após 150ms, remove o destaque da tecla
        window.setTimeout(() => setPressed(null), 150);
      }

      // Impede que o navegador execute ações padrão (ex: apagar texto em input)
      e.preventDefault();
    }
  }

  // useEffect para adicionar o evento de tecla quando o componente é montado
  React.useEffect(() => {
    // Adiciona o ouvinte do evento de teclado
    window.addEventListener("keydown", handleKeyDown);

    // Remove o evento quando o componente for desmontado
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Renderiza a interface da calculadora
  return (
    <div className="calc-panel" role="application" aria-label="Calculadora">
      {/* Elementos decorativos e informativos */}
      <div className="calc-accent" aria-hidden="true" />
      <div className="calc-sub">Calculadora — modo tecnológico</div>

      {/* Exibe o display com o valor atual */}
      <Display value={display} />

      {/* Exibe o teclado com todas as funções e ações */}
      <Keypad
        onInput={input}         // Função para inserir valores
        onClear={clear}         // Função para limpar tudo
        onDel={del}             // Função para apagar o último valor
        onEvaluate={evaluate}   // Função para calcular o resultado
        pressedKey={pressed}    // Indica qual tecla está sendo pressionada visualmente
      />
    </div>
  );
}
