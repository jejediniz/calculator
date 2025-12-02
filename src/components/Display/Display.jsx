// Importa o React, necessário para criar componentes funcionais em React
import React from "react";

// Define e exporta o componente Display
// Ele recebe uma propriedade (prop) chamada "value", que contém o valor a ser exibido no display da calculadora
export default function Display({ value }) {
  return (
    // Div externa com uma pequena margem superior
    <div style={{ marginTop: 10 }}>
      
      {/* 
        Área principal do display da calculadora.
        role="status" → informa aos leitores de tela que este elemento mostra um valor dinâmico.
        aria-live="polite" → garante que mudanças no conteúdo sejam anunciadas de forma não intrusiva.
      */}
      <div className="calc-display" role="status" aria-live="polite">

        {/* 
          Div interna responsável por exibir o valor na tela.
          As propriedades de estilo garantem que o texto:
          - ocupe 100% da largura disponível
          - não quebre linha (whiteSpace: "nowrap")
          - esconda qualquer conteúdo que ultrapasse o limite do display (overflow: "hidden")
          - mostre reticências (...) caso o texto seja muito longo (textOverflow: "ellipsis")
        */}
        <div
          style={{
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {/* Exibe o valor atual passado pela prop "value" */}
          {value}
        </div>
      </div>
    </div>
  );
}
