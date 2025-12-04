export function evaluateExpression(expr) {
  if (!/^[0-9+\-*/().\s]+$/.test(expr)) throw new Error("Caracteres inválidos");

  // eslint-disable-next-line no-new-func
  const fn = new Function(`return (${expr})`);
  const res = fn();

  if (typeof res !== "number" || !isFinite(res)) throw new Error("Erro no cálculo");

  return Math.round((res + Number.EPSILON) * 100000000) / 100000000;
}
