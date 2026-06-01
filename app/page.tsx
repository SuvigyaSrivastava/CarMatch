"use client";

import { useState } from "react";
import ChatInput from "@/components/ChatInput";
import ResultsList from "@/components/ResultsList";
import { RecommendResponse } from "@/types";

type Message = { role: "user" | "assistant"; content: string };

const examples = [
  "Family SUV under Rs 20L, 5-star safety",
  "First car - hatchback - under Rs 8L",
  "Premium sedan - automatic - don't care about mileage",
];

function Logo() {
  return (
    <span className="text-lg font-semibold text-[#f5f5f5]">
      CarMatch<span className="text-[#2563eb]">.</span>
    </span>
  );
}

export default function Home() {
  const [history, setHistory] = useState<Message[]>([]);
  const [result, setResult] = useState<RecommendResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastQuery, setLastQuery] = useState("");

  async function handleSearch(userQuery: string) {
    setLoading(true);
    setError(null);
    setLastQuery(userQuery);
    setHasSearched(true);

    const newHistory: Message[] = [...history, { role: "user", content: userQuery }];

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userQuery, history }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(payload?.error ?? "Something went wrong. Try again.");
      }

      const data = (await response.json()) as RecommendResponse;
      setResult(data);
      setHistory([
        ...newHistory,
        {
          role: "assistant",
          content: JSON.stringify(data),
        },
      ]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  function startOver() {
    setHistory([]);
    setResult(null);
    setError(null);
    setHasSearched(false);
    setLastQuery("");
  }

  if (!hasSearched) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] px-4">
        <header className="fixed left-0 right-0 top-0 z-10 h-14 px-6 py-4">
          <Logo />
        </header>

        <section className="mx-auto flex min-h-screen w-full max-w-[720px] flex-col items-center justify-center py-20 text-center">
          <h1 className="text-4xl font-semibold leading-tight text-[#f5f5f5] sm:text-5xl">
            Find your perfect car.
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-normal text-[#737373]">
            Tell us what you&apos;re looking for. Budget, lifestyle, must-haves - anything.
          </p>

          <div className="mt-10 w-full">
            <ChatInput onSearch={handleSearch} loading={loading} error={error} />
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => handleSearch(example)}
                disabled={loading}
                className="rounded-full border border-[#242424] bg-[#141414] px-4 py-2 text-[13px] text-[#a3a3a3] transition-colors duration-200 hover:border-[#2563eb] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {example}
              </button>
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pb-28">
      <header className="sticky top-0 z-20 h-14 border-b border-[#1a1a1a] bg-[#0a0a0a]">
        <div className="mx-auto flex h-full max-w-[720px] items-center justify-between px-4">
          <Logo />
          <button
            type="button"
            onClick={startOver}
            className="rounded-lg border border-[#242424] px-4 py-2 text-[13px] text-[#a3a3a3] transition-colors duration-200 hover:border-[#ef4444] hover:text-[#ef4444]"
          >
            Start Over
          </button>
        </div>
      </header>

      <section className="border-b border-[#1a1a1a] bg-[#141414]">
        <div className="mx-auto max-w-[720px] px-4 py-4">
          <p className="text-[13px] uppercase tracking-wide text-[#737373]">
            Based on your search: &quot;{lastQuery}&quot;
          </p>
          <p className="mt-1 text-[15px] leading-6 text-white">
            {loading
              ? "Finding cars that match your priorities..."
              : result?.summary ?? "Tell us a little more to refine your shortlist."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[720px] px-4 py-6">
        {error ? (
          <p className="mb-4 flex items-center gap-2 text-[13px] text-[#ef4444]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
            {error}
          </p>
        ) : null}
        <ResultsList result={result} loading={loading} />
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#1a1a1a] bg-[#0a0a0a] px-4 py-3">
        <div className="mx-auto max-w-[720px]">
          <ChatInput
            onSearch={handleSearch}
            loading={loading}
            mode="compact"
            error={error}
          />
        </div>
      </div>
    </main>
  );
}
