// src/hooks/useCalculator.js
import { useEffect, useState, useCallback } from "react";
import { evaluateExpression } from "../utils/math"; // ajuste caminho se necessário

export default function useCalculator(initial = "") {
  const [expression, setExpression] = useState(initial);
  const [display, setDisplay] = useState("");
  const [lastKey, setLastKey] = useState(null); // para highlight do keypad

  useEffect(() => {
    setDisplay(expression || "0");
  }, [expression]);

  const append = useCallback((value) => {
    setExpression((prev) => {
      // evita múltiplos pontos seguidos sem número
      if (value === "." && /\.\d*$/.test(prev)) return prev;
      return prev + value;
    });
    setLastKey(value);
  }, []);

  const clear = useCallback(() => {
    setExpression("");
    setLastKey("C");
  }, []);

  const backspace = useCallback(() => {
    setExpression((prev) => prev.slice(0, -1));
    setLastKey("DEL");
  }, []);

  const evaluate = useCallback(() => {
    try {
      const res = evaluateExpression(expression || "0");
      setExpression(String(res));
      setLastKey("=");
    } catch (err) {
      setDisplay("Erro");
    }
  }, [expression]);

  useEffect(() => {
    const onKeyDown = (e) => {
      // não intercepta quando o usuário está digitando em input/textarea/contentEditable
      const active = document.activeElement;
      if (!active) return;
      const tag = active.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || active.isContentEditable) return;

      const key = e.key;

      // Mapeamento direto de teclas
      if (/\d/.test(key)) { // 0-9
        append(key);
        e.preventDefault();
        return;
      }

      if (key === ".") {
        append(".");
        e.preventDefault();
        return;
      }

      if (key === "+" || key === "-" || key === "*" || key === "/") {
        append(key);
        e.preventDefault();
        return;
      }

      if (key === "Enter" || key === "=") {
        evaluate();
        e.preventDefault();
        return;
      }

      if (key === "Backspace") {
        backspace();
        e.preventDefault();
        return;
      }

      if (key === "Escape" || key.toLowerCase() === "c") {
        clear();
        e.preventDefault();
        return;
      }

      if (key === "(" || key === ")") {
        append(key);
        e.preventDefault();
        return;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [append, backspace, clear, evaluate]);

  return {
    expression,
    display,
    append,
    clear,
    backspace,
    evaluate,
    lastKey,
    setExpression
  };
}
