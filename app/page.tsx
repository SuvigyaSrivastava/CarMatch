"use client";

import { useState } from "react";
import ChatInput from "@/components/ChatInput";
import ResultsList from "@/components/ResultsList";
import { RecommendResponse } from "@/types";

type Message = { role: "user" | "assistant"; content: string };

const examples = [
  "Family SUV under Rs 20L with 5-star safety",
  "First car, hatchback, petrol, under Rs 8L",
  "Premium sedan, automatic, don't care about mileage",
];

export default function Home() {
  const [history, setHistory] = useState<Message[]>([]);
  const [result, setResult] = useState<RecommendResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(userQuery: string) {
    setLoading(true);
    setError(null);

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
        throw new Error(payload?.error ?? "API error");
      }

      const data = (await response.json()) as RecommendResponse;
      setResult(data);
      setHasSearched(true);
      setHistory([
        ...newHistory,
        {
          role: "assistant",
          content: JSON.stringify(data),
        },
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
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
  }

  if (!hasSearched) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-10">
        <section className="w-full max-w-3xl">
          <div className="mb-8 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">
              AI car finder
            </p>
            <h1 className="text-5xl font-semibold tracking-normal text-white sm:text-7xl">
              CarMatch
            </h1>
            <p className="mt-4 text-lg text-gray-400">
              Tell us what you need. We&apos;ll find your car.
            </p>
          </div>

          <div className="mb-5 flex flex-wrap justify-center gap-3">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => handleSearch(example)}
                disabled={loading}
                className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-200 transition hover:border-blue-400/60 hover:bg-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {example}
              </button>
            ))}
          </div>

          <ChatInput onSearch={handleSearch} loading={loading} />
          {error ? <p className="mt-4 text-center text-sm text-red-300">{error}</p> : null}
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-44">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0f0f0f]/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-semibold text-white">CarMatch</h1>
            <p className="text-xs text-gray-500">AI car recommendations for India</p>
          </div>
          <button
            type="button"
            onClick={startOver}
            className="rounded-md border border-white/10 px-3 py-2 text-sm text-gray-200 transition hover:border-blue-400/60 hover:bg-white/[0.04]"
          >
            Start over
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-8">
        {error ? (
          <div className="mb-5 rounded-lg border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        ) : null}
        <ResultsList result={result} />
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#0f0f0f]/95 px-4 py-4 backdrop-blur">
        <div className="mx-auto max-w-5xl">
          <ChatInput onSearch={handleSearch} loading={loading} />
        </div>
      </div>
    </main>
  );
}
