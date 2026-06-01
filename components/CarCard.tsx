import { CarRecommendation } from "@/types";

interface Props {
  recommendation: CarRecommendation;
  rank: number;
}

function scoreColor(score: number) {
  if (score >= 80) return "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30";
  if (score >= 60) return "bg-amber-500/15 text-amber-300 ring-amber-400/30";
  return "bg-red-500/15 text-red-300 ring-red-400/30";
}

function stars(rating: number) {
  const rounded = Math.round(rating);
  return "★".repeat(rounded) + "☆".repeat(Math.max(0, 5 - rounded));
}

export default function CarCard({ recommendation, rank }: Props) {
  const { car, match_score, match_reason, trade_offs } = recommendation;
  const specs = [
    ["Fuel", car.fuel_type],
    ["Gearbox", car.transmission],
    ["Mileage", car.fuel_type === "Electric" ? `${car.mileage_kmpl} km range` : `${car.mileage_kmpl} kmpl`],
    ["Seats", `${car.seating_capacity}`],
    ["NCAP", `${car.safety_rating_ncap} stars`],
  ];

  return (
    <article className="rounded-lg border border-white/10 bg-[#1a1a1a] p-5 shadow-2xl shadow-black/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-blue-300">Pick #{rank}</p>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            {car.make} {car.model} {car.variant} <span className="text-gray-400">{car.year}</span>
          </h2>
          <p className="mt-2 text-lg font-semibold text-white">Rs {car.price_lakh.toFixed(2)} L</p>
        </div>
        <span className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ring-1 ${scoreColor(match_score)}`}>
          {match_score}% match
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {specs.map(([label, value]) => (
          <div key={label} className="rounded-md border border-white/10 bg-white/[0.03] p-3">
            <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
            <p className="mt-1 text-sm font-medium text-gray-100">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        <div className="rounded-md border border-blue-400/20 bg-blue-500/10 p-4">
          <p className="text-sm font-semibold text-blue-200">🎯 Why it matches</p>
          <p className="mt-2 text-sm leading-6 text-gray-200">{match_reason}</p>
        </div>
        <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
          <p className="text-sm font-semibold text-gray-200">⚖️ Trade-offs</p>
          <p className="mt-2 text-sm leading-6 text-gray-400">{trade_offs}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-emerald-300">Pros</p>
          <ul className="mt-2 space-y-1 text-sm text-gray-300">
            {car.pros.map((pro) => (
              <li key={pro} className="flex gap-2"><span className="text-emerald-400">+</span>{pro}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-red-300">Cons</p>
          <ul className="mt-2 space-y-1 text-sm text-gray-300">
            {car.cons.map((con) => (
              <li key={con} className="flex gap-2"><span className="text-red-400">-</span>{con}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
        <p className="text-sm text-gray-400">{car.review_summary}</p>
        <p className="text-sm text-amber-300" aria-label={`${car.user_rating} out of 5`}>
          {stars(car.user_rating)} <span className="text-gray-400">{car.user_rating.toFixed(1)}</span>
        </p>
      </div>
    </article>
  );
}
