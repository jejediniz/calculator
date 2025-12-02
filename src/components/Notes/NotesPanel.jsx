// Importa o React e o hook personalizado de notas
import React from "react";
import { useNotes } from "../../hooks/useNotes";

// Painel de notas: lista, filtro, criação, exclusão e editor
export default function NotesPanel() {
  // Obtém do hook todos os dados e ações sobre notas
  const {
    notes,          // lista completa de notas
    activeId,       // id da nota atualmente selecionada
    setActiveId,    // define a nota ativa
    createNote,     // cria nova nota
    deleteNote,     // exclui uma nota
    updateNote,     // atualiza título/conteúdo
    reorderToTop,   // reordena a nota para o topo (recente)
  } = useNotes();

  // Calcula a nota ativa (objeto) a partir do id
  // Memoizado para evitar recomputações desnecessárias
  const activeNote = React.useMemo(
    () => notes.find((n) => n.id === activeId) ?? null,
    [notes, activeId]
  );

  // Estados do filtro de busca e do editor (campos controlados)
  const [filter, setFilter] = React.useState("");
  const [editingTitle, setEditingTitle] = React.useState("");
  const [editingContent, setEditingContent] = React.useState("");

  // Sincroniza o editor quando a nota ativa muda
  // (carrega título e conteúdo da nota selecionada)
  React.useEffect(() => {
    setEditingTitle(activeNote?.title ?? "");
    setEditingContent(activeNote?.content ?? "");
  }, [activeNote?.id, activeNote?.title, activeNote?.content]);

  // Autosave com debounce (salva após 600ms sem digitação)
  const saveTimerRef = React.useRef(null);
  React.useEffect(() => {
    if (!activeNote) return;

    // Limpa um timer pendente, se houver
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    // Agenda um salvamento "preguiçoso"
    saveTimerRef.current = setTimeout(() => {
      try {
        // Salva conteúdo apenas se mudou em relação ao original
        if (editingContent !== activeNote.content) {
          updateNote(activeNote.id, { content: editingContent });
          // Move a nota para o topo ao alterar conteúdo
          reorderToTop(activeNote.id);
        }
        // Salva título apenas se mudou
        if (editingTitle !== activeNote.title) {
          updateNote(activeNote.id, { title: editingTitle });
        }
      } catch (err) {
        // Falha silenciosa (ex.: localStorage indisponível)
        // console.error(err);
      }
    }, 600);

    // Limpa o timer ao desmontar ou antes de reagendar
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }
    };
  }, [
    editingContent,
    editingTitle,
    activeNote?.id,
    activeNote?.content,
    activeNote?.title,
    updateNote,
    reorderToTop,
  ]);

  // Cria uma nova nota e a seleciona
  function handleNew() {
    const id = createNote();
    // Em alguns cenários createNote já define a ativa; garantindo a seleção
    if (id) {
      setActiveId(id);
    }
  }

  // Exclui nota com confirmação
  function handleDelete(e, id) {
    e.stopPropagation(); // evita disparar o clique de seleção do item
    if (!id) return;
    if (window.confirm("Excluir nota? Esta ação não pode ser desfeita.")) {
      deleteNote(id);
    }
  }

  // Lista filtrada de notas (memoizada)
  // Filtro atua somente sobre o título, case-insensitive
  const filtered = React.useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter((n) => (n.title || "").toLowerCase().includes(q));
  }, [notes, filter]);

  // Renderização
  return (
    // Painel lateral (aside) com largura fixa máx.
    <aside style={{ width: 360, maxWidth: "38vw", marginLeft: 18 }}>
      {/* Barra de busca + botão Nova nota */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ flex: 1 }}>
          <input
            placeholder="Procurar notas..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="calc-btn"
            style={{ height: 44, padding: "0 12px", borderRadius: 10, fontSize: "0.95rem" }}
            aria-label="Procurar notas" // acessibilidade
          />
        </div>

        <button
          onClick={handleNew}
          className="calc-btn"
          style={{ width: 44, height: 44, borderRadius: 10 }}
          aria-label="Nova nota"
          title="Nova nota"
        >
          +
        </button>
      </div>

      {/* Colunas: lista (esquerda) + editor (direita) */}
      <div style={{ display: "flex", gap: 12 }}>
        {/* Lista de notas */}
        <div style={{ width: 140 }}>
          <div
            style={{
              maxHeight: 420,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {/* Mensagem quando filtro não retorna itens */}
            {filtered.length === 0 && <div className="btn-label-small">Nenhuma nota</div>}

            {/* Itens de nota */}
            {filtered.map((n) => {
              const isActive = n.id === activeId;
              return (
                <div
                  key={n.id}
                  onClick={() => setActiveId(n.id)} // seleciona nota
                  className={`calc-btn ${isActive ? "active" : ""}`} // destaque da nota ativa
                  style={{ justifyContent: "space-between", padding: "10px 8px", cursor: "pointer" }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setActiveId(n.id); // acessibilidade via teclado
                  }}
                >
                  {/* Título + data de atualização */}
                  <div style={{ textAlign: "left", minWidth: 0 }}>
                    <div style={{ fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {n.title || "Sem título"}
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(190,239,255,0.6)" }}>
                      {n.updatedAt ? new Date(n.updatedAt).toLocaleString() : ""}
                    </div>
                  </div>

                  {/* Botão excluir da nota */}
                  <div style={{ marginLeft: 8 }}>
                    <button
                      onClick={(e) => handleDelete(e, n.id)}
                      className="btn-label-small"
                      aria-label={`Excluir nota ${n.title}`}
                      title="Excluir"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Editor da nota selecionada */}
        <div style={{ flex: 1 }}>
          {activeNote ? (
            <div>
              {/* Campo de título (controlado) */}
              <input
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                className="calc-btn"
                style={{ marginBottom: 8, height: 44, padding: "0 10px", fontWeight: 700 }}
                placeholder="Título"
                aria-label="Título da nota"
              />

              {/* Campo de conteúdo (controlado) */}
              <textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                placeholder="Digite suas anotações aqui. Salvo automaticamente."
                style={{
                  width: "100%",
                  minHeight: 260,
                  resize: "vertical",
                  padding: 12,
                  borderRadius: 10,
                  background: "rgba(5,10,20,0.45)",
                  color: "#bfefff",
                  border: "1px solid rgba(255,255,255,0.03)",
                }}
                aria-label="Conteúdo da nota"
              />
            </div>
          ) : (
            // Mensagem quando nenhuma nota está selecionada
            <div className="btn-label-small">Selecione ou crie uma nota para começar</div>
          )}
        </div>
      </div>
    </aside>
  );
}
