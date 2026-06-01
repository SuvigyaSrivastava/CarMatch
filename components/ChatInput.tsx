"use client";

import { FormEvent, useState } from "react";

interface Props {
  onSearch: (query: string) => void;
  loading: boolean;
  mode?: "landing" | "compact";
  error?: string | null;
}

export default function ChatInput({
  onSearch,
  loading,
  mode = "landing",
  error,
}: Props) {
  const [query, setQuery] = useState("");
  const compact = mode === "compact";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || loading) return;
    onSearch(trimmed);
    setQuery("");
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className={
          compact
            ? "flex w-full flex-col gap-3 sm:flex-row"
            : "mx-auto flex w-full max-w-[640px] flex-col gap-3"
        }
      >
        <textarea
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          disabled={loading}
          rows={compact ? 1 : 3}
          className={[
            "w-full resize-none rounded-2xl border border-[#242424] bg-[#141414] text-[16px] text-[#f5f5f5] outline-none transition-colors placeholder:text-[#525252] focus:border-[#2563eb] disabled:cursor-not-allowed disabled:opacity-60",
            compact
              ? "min-h-[52px] flex-1 rounded-xl px-4 py-3 sm:max-h-[52px]"
              : "min-h-20 px-6 py-5",
          ].join(" ")}
          placeholder={
            compact
              ? "Refine your search or ask a follow-up..."
              : "e.g. Family SUV under Rs 20 lakhs, good safety rating, petrol automatic..."
          }
        />
        <button
          type="submit"
          disabled={loading || query.trim().length < 3}
          className={[
            "inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-6 text-[16px] font-semibold text-white transition duration-200 hover:scale-[1.01] hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:bg-[#242424] disabled:text-[#737373] disabled:hover:scale-100",
            compact ? "sm:w-[120px]" : "w-full",
          ].join(" ")}
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              {compact ? "Search" : "Finding cars..."}
            </>
          ) : compact ? (
            "Search ->"
          ) : (
            "Find My Car ->"
          )}
        </button>
      </form>
      {error ? (
        <p className="mx-auto mt-3 flex max-w-[640px] items-center gap-2 text-[13px] text-[#ef4444]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
