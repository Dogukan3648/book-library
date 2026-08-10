import { useState } from "react";

function NotesEditor({ item, onSave }) {
  const [note, setNote] = useState(item.notes ?? "");

  return (
    <div className="mt-4">
      <label
        htmlFor={`notes-${item.bookId}`}
        className="mb-1 block text-sm text-slate-500"
      >
        Notes
      </label>

      <textarea
        id={`notes-${item.bookId}`}
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Write your notes about this book..."
        rows={3}
        className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-500"
      />

      <button
        type="button"
        onClick={() => onSave(item.bookId, note)}
        className="mt-2 cursor-pointer rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
      >
        Save Note
      </button>
    </div>
  );
}

export default NotesEditor;
