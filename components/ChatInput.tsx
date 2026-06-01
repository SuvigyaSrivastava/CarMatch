"use client";

import { FormEvent, useState } from "react";

interface Props {
  onSearch: (query: string) => void;
  loading: boolean;
  initialValue?: string;
}

export default function ChatInput({ onSearch, loading, initialValue = "" }: Props) {
  const [query, setQuery] = useState(initialValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || loading) return;
    onSearch(trimmed);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-white/10 bg-[#1a1a1a] p-3 shadow-2xl shadow-black/30">
      <textarea
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        disabled={loading}
        rows={4}
        className="min-h-28 w-full resize-none rounded-md border border-white/10 bg-black/30 p-4 text-base text-white outline-none transition focus:border-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
        placeholder="Tell me what you're looking for... (e.g. 'SUV under 20 lakhs for a family of 5, good safety, petrol automatic')"
      />
      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          disabled={loading || query.trim().length < 3}
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Finding
            </>
          ) : (
            "Find My Car ->"
          )}
        </button>
      </div>
    </form>
  );
}
