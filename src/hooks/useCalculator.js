// Importa o hook useReducer do React e a função evaluateExpression (que faz os cálculos)
import { useReducer } from "react";
import { evaluateExpression } from "../utils/math";

// Estado inicial da calculadora
const initialState = {
  display: "0", // O display começa mostrando "0"
};

// Função "reducer" — responsável por modificar o estado da calculadora
function reducer(state, action) {
  switch (action.type) {
    // Caso o usuário digite um número ou operador
    case "INPUT":
      return {
        // Se o display estiver em "0", substitui pelo valor digitado
        // Caso contrário, concatena o novo valor ao que já existe
        display: state.display === "0" ? action.value : state.display + action.value,
      };

    // Limpa todo o display
    case "CLEAR":
      return { display: "0" };

    // Apaga o último caractere digitado
    // Se não restar nada, volta para "0"
    case "DELETE":
      return { display: state.display.slice(0, -1) || "0" };

    // Avalia (calcula) a expressão matemática digitada
    case "EVALUATE":
      try {
        // Usa a função evaluateExpression para calcular o resultado
        return { display: String(evaluateExpression(state.display)) };
      } catch {
        // Caso ocorra erro (ex: expressão inválida), mostra "Error"
        return { display: "Error" };
      }

    // Caso o tipo de ação não seja reconhecido, retorna o estado atual sem alteração
    default:
      return state;
  }
}

// Hook personalizado que encapsula toda a lógica da calculadora
export function useCalculator() {
  // useReducer gerencia o estado da calculadora com base no reducer e estado inicial
  const [state, dispatch] = useReducer(reducer, initialState);

  // Retorna o valor atual do display e funções para manipular a calculadora
  return {
    display: state.display,                   // Valor mostrado na tela
    input: (v) => dispatch({ type: "INPUT", value: v }),     // Insere número ou operador
    clear: () => dispatch({ type: "CLEAR" }),                 // Limpa tudo
    del: () => dispatch({ type: "DELETE" }),                  // Apaga último dígito
    evaluate: () => dispatch({ type: "EVALUATE" }),           // Calcula o resultado
  };
}
