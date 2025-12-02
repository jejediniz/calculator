// Importa hooks do React para gerenciar estado, efeitos colaterais e funções otimizadas
import { useEffect, useState, useCallback } from "react";

// Chave usada para armazenar as notas no localStorage do navegador
const STORAGE_KEY = "calc_notes_v1";

// Função auxiliar que retorna a data e hora atual no formato ISO (ex: 2025-12-02T10:15:30Z)
function nowISO() {
  return new Date().toISOString();
}

// Hook personalizado que gerencia todas as operações de notas
export function useNotes() {
  // Estado que guarda todas as notas
  // Inicializa lendo do localStorage (caso existam notas salvas)
  const [notes, setNotes] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY); // Lê dados salvos
      return raw ? JSON.parse(raw) : []; // Converte JSON em array ou retorna vazio
    } catch {
      return []; // Se falhar (ex: localStorage desativado), retorna lista vazia
    }
  });

  // Estado que guarda o ID da nota atualmente selecionada
  const [activeId, setActiveId] = useState(notes[0]?.id ?? null);

  // Efeito responsável por salvar automaticamente as notas no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); // Salva as notas como string JSON
    } catch {
      // Falha silenciosa (ex: modo privado sem acesso ao localStorage)
    }
  }, [notes]); // Executa sempre que a lista de notas muda

  // Cria uma nova nota e a define como ativa
  const createNote = useCallback(() => {
    const id = Math.random().toString(36).slice(2, 9); // Gera ID único (pseudo-aleatório)
    const newNote = {
      id,
      title: "Nova nota",  // Título padrão
      content: "",         // Conteúdo inicial vazio
      updatedAt: nowISO(), // Data e hora de criação
    };
    setNotes((prev) => [newNote, ...prev]); // Adiciona no topo da lista
    setActiveId(id); // Define como nota ativa
    return id; // Retorna o ID da nova nota (útil para seleção imediata)
  }, []);

  // Exclui uma nota pelo ID
  const deleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id)); // Remove a nota do array
    setActiveId((prev) => (prev === id ? null : prev));  // Se a nota excluída estava ativa, limpa a seleção
  }, []);

  // Atualiza uma nota específica (título, conteúdo, etc.)
  const updateNote = useCallback((id, patch) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, ...patch, updatedAt: nowISO() } // Mescla dados novos e atualiza a data
          : n
      )
    );
  }, []);

  // Move a nota atualizada para o topo da lista (mais recente)
  const reorderToTop = useCallback((id) => {
    setNotes((prev) => {
      const idx = prev.findIndex((n) => n.id === id); // Encontra a posição da nota
      if (idx <= 0) return prev; // Se já está no topo, nada muda
      const item = prev[idx]; // Pega a nota
      const rest = prev.filter((_, i) => i !== idx); // Remove a nota da posição antiga
      return [item, ...rest]; // Reinsere no topo
    });
  }, []);

  // Retorna todos os dados e funções para o componente usar
  return {
    notes,          // Lista completa de notas
    activeId,       // ID da nota ativa
    setActiveId,    // Função para definir a nota ativa
    createNote,     // Cria nova nota
    deleteNote,     // Exclui nota
    updateNote,     // Atualiza nota
    reorderToTop,   // Move nota para o topo
  };
}
