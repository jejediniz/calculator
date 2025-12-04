// src/App.jsx
import React from "react";
import Calculator from "./components/Calculator/Calculator";
import NotesPanel from "./components/Notes/NotesPanel";
import "./App.css";

export default function App() {
  return (
    <div className="app-root">
      <div className="app-center">
        <div className="panels">
          <Calculator />
          <NotesPanel />
        </div>
      </div>
    </div>
  );
}
