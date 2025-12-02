// Importa o React — necessário para criar componentes em React
import React from "react";

// Componente funcional "Button"
// Recebe as seguintes propriedades (props):
// - label: texto ou símbolo exibido dentro do botão (ex: "7", "+", "=")
// - onClick: função executada quando o botão é clicado
// - className: classes CSS opcionais para personalização do estilo
// - active: booleano que indica se o botão está ativo (por exemplo, tecla pressionada)
export default function Button({ label, onClick, className = "", active = false }) {
  
  // Monta dinamicamente a string de classes CSS do botão
  // Sempre inclui "calc-btn", depois as classes extras passadas em 'className'
  // Se 'active' for true, adiciona também a classe "active" para destaque visual
  const classes = `calc-btn ${className} ${active ? "active" : ""}`;

  // Retorna o elemento JSX que será renderizado na tela
  // JSX é parecido com HTML, mas interpretado dentro do React
  return (
    <button
      type="button"          // Define o tipo do botão (impede envio de formulários acidental)
      className={classes}    // Aplica as classes CSS montadas acima
      onClick={onClick}      // Atribui a função a ser chamada ao clicar no botão
      aria-pressed={active}  // Acessibilidade: informa se o botão está "pressionado"
    >
      {/* Exibe o texto ou símbolo passado pela prop 'label' */}
      <span>{label}</span>
    </button>
  );
}
