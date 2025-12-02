// Função responsável por avaliar (calcular) uma expressão matemática em formato de texto
export function evaluateExpression(expr) {
  // Remove todos os caracteres que não sejam números, operadores matemáticos,
  // parênteses ou ponto decimal.
  // Isso é uma etapa de segurança para evitar execução de código malicioso.
  const sanitized = expr.replace(/[^0-9+\-*/().]/g, "");

  /*
    IMPORTANTE:
    - Nunca se deve usar "eval()" diretamente por motivos de segurança.
    - Aqui, usamos o construtor "Function" para criar dinamicamente
      uma função que retorna o resultado da expressão sanitizada.
    - Como o input foi filtrado, só restam caracteres matemáticos válidos.
    - Exemplo: expr = "2+3*(4-1)" → retorna 11
  */
  // eslint-disable-next-line no-new-func
  return Function(`return (${sanitized})`)();
}
