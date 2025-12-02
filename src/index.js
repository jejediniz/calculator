// Importa o React — necessário para usar JSX e criar componentes
import React from 'react';

// Importa o ReactDOM — responsável por renderizar a aplicação React no navegador
import ReactDOM from 'react-dom/client';

// Importa o arquivo de estilos globais (aplica configurações visuais a toda a aplicação)
import "./styles/globals.css";

// Importa o componente principal do aplicativo (App.jsx)
import App from './App';

// Cria a raiz da aplicação React
// "document.getElementById('root')" faz referência à <div id="root"></div> no arquivo index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o aplicativo dentro da div #root
root.render(
  // React.StrictMode é um modo de desenvolvimento que ajuda a detectar problemas
  // Ele não afeta a aplicação em produção
  <React.StrictMode>
    <App />  {/* Renderiza o componente principal da aplicação */}
  </React.StrictMode>
);

// Comentário informativo (gerado automaticamente pelo create-react-app):
// Explica que é possível medir o desempenho da aplicação (opcional)
// usando uma função de log ou ferramenta de análise (como Google Analytics)
