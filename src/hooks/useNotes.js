import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "my_calc_notes_v1";

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setNotes(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {}
  }, [notes]);

  function createNote() {
    const note = { id: uuidv4(), title: "Nova nota", body: "", pinned: false, createdAt: Date.now() };
    setNotes((n) => [note, ...n]);
    setActiveId(note.id);
    return note.id;
  }

  function deleteNote(id) {
    setNotes((n) => n.filter((x) => x.id !== id));
    if (activeId === id) setActiveId(null);
  }

  function updateNote(id, data) {
    setNotes((n) => n.map((x) => (x.id === id ? { ...x, ...data, updatedAt: Date.now() } : x)));
  }

  return { notes, activeId, setActiveId, createNote, deleteNote, updateNote };
}
