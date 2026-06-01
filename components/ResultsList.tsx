import { RecommendResponse } from "@/types";
import CarCard from "@/components/CarCard";

interface Props {
  result: RecommendResponse | null;
}

export default function ResultsList({ result }: Props) {
  if (!result) {
    return (
      <div className="rounded-lg border border-dashed border-white/15 bg-white/[0.03] p-8 text-center text-gray-400">
        Your recommendations will appear here.
      </div>
    );
  }

  if (!result.recommendations?.length) {
    return (
      <div className="rounded-lg border border-white/10 bg-[#1a1a1a] p-8 text-center text-gray-300">
        No confident matches came back. Try adding a budget, body style, fuel type, or seating need.
      </div>
    );
  }

  return (
    <section className="space-y-5">
      <div className="rounded-lg border border-blue-400/20 bg-blue-500/10 p-4 text-sm leading-6 text-blue-100">
        {result.summary}
      </div>

      {result.recommendations.map((recommendation, index) => (
        <CarCard
          key={recommendation.car.id}
          recommendation={recommendation}
          rank={index + 1}
        />
      ))}

      {result.clarifying_question ? (
        <div className="ml-auto max-w-2xl rounded-lg rounded-br-sm border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-gray-200">
          {result.clarifying_question}
        </div>
      ) : null}
    </section>
  );
}
