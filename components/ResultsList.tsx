import { RecommendResponse } from "@/types";
import CarCard from "@/components/CarCard";

interface Props {
  result: RecommendResponse | null;
  loading: boolean;
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-[#242424] bg-[#141414] p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="h-4 w-10 animate-pulse rounded bg-[#1a1a1a]" />
          <div className="h-6 w-64 max-w-full animate-pulse rounded bg-[#1a1a1a]" />
        </div>
        <div className="h-6 w-24 animate-pulse rounded-full bg-[#1a1a1a]" />
      </div>
      <div className="mt-5 h-8 w-44 animate-pulse rounded bg-[#1a1a1a]" />
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-16 animate-pulse rounded-[10px] bg-[#1a1a1a]" />
        ))}
      </div>
      <div className="mt-5 h-20 animate-pulse rounded-r-[10px] bg-[#1a1a1a]" />
      <div className="mt-3 h-20 animate-pulse rounded-r-[10px] bg-[#1a1a1a]" />
    </div>
  );
}

export default function ResultsList({ result, loading }: Props) {
  if (loading) {
    return (
      <section className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </section>
    );
  }

  if (!result?.recommendations?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#242424] bg-[#141414] p-8 text-center text-sm text-[#737373]">
        No confident matches came back. Try adding a budget, body style, fuel type, or seating need.
      </div>
    );
  }

  return (
    <section className="space-y-4">
      {result.recommendations.map((recommendation, index) => (
        <CarCard
          key={recommendation.car.id}
          recommendation={recommendation}
          rank={index + 1}
        />
      ))}

      {result.clarifying_question ? (
        <div className="flex gap-3 rounded-xl border border-dashed border-[#2563eb] bg-[#141414] px-5 py-4">
          <span>{"\uD83D\uDCAC"}</span>
          <div>
            <p className="text-sm leading-6 text-white">{result.clarifying_question}</p>
            <p className="mt-1 text-xs text-[#737373]">Refine your search below ↓</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
