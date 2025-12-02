// Importa o React (necessário para criar componentes funcionais)
import React from "react";

// Importa os componentes principais do aplicativo
import Calculator from "./components/Calculator/Calculator";  // Componente da calculadora
import NotesPanel from "./components/Notes/NotesPanel";       // Componente do painel de notas

// Importa estilos globais (cores, fontes e resets de CSS)
import "./styles/globals.css";

// Componente principal do aplicativo
export default function App() {
  return (
    // Container externo da aplicação
    <div
      style={{
        minHeight: "100vh",            // Ocupa toda a altura da tela
        display: "flex",               // Usa flexbox para centralizar
        alignItems: "center",          // Centraliza verticalmente
        justifyContent: "center",      // Centraliza horizontalmente
        padding: 20,                   // Espaçamento interno
      }}
    >
      {/* Container interno que alinha a calculadora e o painel de notas lado a lado */}
      <div
        style={{
          display: "flex",             // Coloca os elementos lado a lado (linha)
          gap: 18,                     // Espaço entre a calculadora e o painel de notas
          alignItems: "flex-start",    // Alinha os topos dos componentes
        }}
      >
        {/* Calculadora interativa */}
        <Calculator />

        {/* Painel de anotações (Notas vinculadas ao app) */}
        <NotesPanel />
      </div>
    </div>
  );
}
