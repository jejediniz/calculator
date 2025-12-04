import React, { useEffect, useRef, useState } from "react";
import "./NotesPanel.css";

const STORAGE_KEY = "myapp_notes_v1";

export default function NotesPanel() {
  const [notes, setNotes] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [query, setQuery] = useState("");

  // Editor local (manual save)
  const [localTitle, setLocalTitle] = useState("");
  const [localBody, setLocalBody] = useState("");

  const titleRef = useRef(null);

  // load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setNotes(parsed);
        if (parsed.length > 0) {
          setActiveId(parsed[0].id);
          setLocalTitle(parsed[0].title);
          setLocalBody(parsed[0].body);
        }
      }
    } catch {
      setNotes([]);
    }
  }, []);

  // persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  // select note (sync local editor)
  const selectNote = (id) => {
    const n = notes.find((x) => x.id === id);
    if (!n) return;
    setActiveId(n.id);
    setLocalTitle(n.title);
    setLocalBody(n.body);
    requestAnimationFrame(() => {
      titleRef.current?.focus();
      titleRef.current?.select?.();
    });
  };

  // create
  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Nova nota",
      body: "",
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    // seleciona nova nota
    setActiveId(newNote.id);
    setLocalTitle(newNote.title);
    setLocalBody(newNote.body);
    requestAnimationFrame(() => titleRef.current?.focus());
  };

  // save manual
 const handleSave = () => {
  if (!activeId) return;

  // 1. Salva a nota atual
  setNotes((prev) =>
    prev.map((n) =>
      n.id === activeId
        ? {
            ...n,
            title: localTitle,
            body: localBody,
            updatedAt: new Date().toISOString(),
          }
        : n
    )
  );

  // 2. Cria automaticamente uma nova nota vazia
  const newNote = {
    id: Date.now(),
    title: "Nova nota",
    body: "",
    updatedAt: new Date().toISOString(),
  };

  // 3. Adiciona no topo da lista
  setNotes((prev) => [newNote, ...prev]);

  // 4. Seta como ativa
  setActiveId(newNote.id);

  // 5. Limpa o editor imediatamente
  setLocalTitle("");
  setLocalBody("");

  // 6. Foca o campo de título da nova nota
  requestAnimationFrame(() => {
    titleRef.current?.focus();
  });
};

  // remove
  const removeNote = (id) => {
    const remaining = notes.filter((n) => n.id !== id);
    setNotes(remaining);
    if (id === activeId) {
      if (remaining.length > 0) {
        // seleciona a primeira nota restante
        const next = remaining[0];
        setActiveId(next.id);
        setLocalTitle(next.title);
        setLocalBody(next.body);
      } else {
        setActiveId(null);
        setLocalTitle("");
        setLocalBody("");
      }
    }
  };

  const filtered = notes.filter((n) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (n.title + " " + n.body).toLowerCase().includes(q);
  });

  return (
    <div className="notes-panel">
      <div className="notes-header">
        <h3 className="notes-title">Anotações</h3>

        <div className="notes-controls">
          <input
            className="notes-search"
            placeholder="Pesquisar notas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Pesquisar notas"
          />
          <button className="btn-create" onClick={createNote} aria-label="Criar nota">
            Criar nota
          </button>
        </div>
      </div>

      <div className="notes-body-column">
        {/* EDITOR em cima */}
        <section className="notes-editor">
          {activeId ? (
            <>
              <input
                ref={titleRef}
                className="note-title-input"
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                placeholder="Título da nota"
                aria-label="Título da nota"
              />

              <textarea
                className="note-body-input"
                value={localBody}
                onChange={(e) => setLocalBody(e.target.value)}
                placeholder="Escreva sua nota aqui..."
                aria-label="Corpo da nota"
              />

              <div className="editor-actions-row">
                <button className="btn-save" onClick={handleSave}>
                  Salvar nota
                </button>
              </div>
            </>
          ) : (
            <div className="notes-empty">Nenhuma nota selecionada</div>
          )}
        </section>

        {/* LISTA embaixo do editor */}
        <aside className="notes-list-below" aria-label="Lista de notas">
          {filtered.length === 0 ? (
            <div className="empty-list">Nenhuma nota</div>
          ) : (
            filtered.map((n) => (
              <div
                key={n.id}
                className={`note-row ${n.id === activeId ? "active" : ""}`}
                onClick={() => selectNote(n.id)}
              >
                <div className="note-row-left">
                  <div className="note-row-title">{n.title}</div>
                  <div className="note-row-date">{new Date(n.updatedAt).toLocaleString()}</div>
                </div>

                <button
                  className="del-row"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeNote(n.id);
                  }}
                  aria-label={`Excluir ${n.title}`}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </aside>
      </div>
    </div>
  );
}
