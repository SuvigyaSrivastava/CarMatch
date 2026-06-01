import { CarRecommendation } from "@/types";

interface Props {
  recommendation: CarRecommendation;
  rank: number;
}

function scoreColor(score: number) {
  if (score >= 80) return "bg-[#14532d] text-[#22c55e]";
  if (score >= 60) return "bg-[#713f12] text-[#eab308]";
  return "bg-[#450a0a] text-[#ef4444]";
}

function safetyStars(rating: number) {
  return "\u2605".repeat(rating) + "\u2606".repeat(Math.max(0, 5 - rating));
}

export default function CarCard({ recommendation, rank }: Props) {
  const { car, match_score, match_reason, trade_offs } = recommendation;
  const specs = [
    [
      "MILEAGE",
      car.fuel_type === "Electric"
        ? `${car.mileage_kmpl} km range`
        : `${car.mileage_kmpl} kmpl`,
    ],
    ["SEATING", `${car.seating_capacity} seats`],
    ["SAFETY", safetyStars(car.safety_rating_ncap)],
    ["TRANSMISSION", car.transmission],
  ];

  return (
    <article className="rounded-2xl border border-[#242424] bg-[#141414] p-5 transition-colors duration-200 hover:border-[#2563eb] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-[13px] font-semibold text-[#2563eb]">#{rank}</span>
            <h2 className="text-xl font-semibold leading-tight text-[#f5f5f5]">
              {car.make} {car.model} {car.variant}
            </h2>
            <span className="text-sm text-[#737373]">{car.year}</span>
          </div>
        </div>
        <span
          className={`w-fit rounded-full px-3 py-1 text-[13px] font-semibold ${scoreColor(match_score)}`}
        >
          {match_score}% match
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <p className="text-2xl font-semibold text-[#2563eb]">
          Rs {car.price_lakh.toFixed(2)} Lakhs
        </p>
        <span className="rounded-full border border-[#242424] bg-[#0f0f0f] px-3 py-1 text-xs font-medium text-[#a3a3a3]">
          {car.fuel_type}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {specs.map(([label, value]) => (
          <div
            key={label}
            className="rounded-[10px] border border-[#1e1e1e] bg-[#0f0f0f] px-3.5 py-2.5"
          >
            <p className="text-[11px] font-normal uppercase leading-none text-[#737373]">
              {label}
            </p>
            <p className="mt-2 text-sm font-semibold text-[#f5f5f5]">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-r-[10px] border-l-[3px] border-[#2563eb] bg-[#0d1117] px-4 py-3">
        <p className="text-sm leading-[1.6] text-[#d1d5db]">
          <span className="mr-2">{"\uD83C\uDFAF"}</span>
          {match_reason}
        </p>
      </div>

      <div className="mt-3 rounded-r-[10px] border-l-[3px] border-[#525252] bg-[#0f0f0f] px-4 py-3">
        <p className="text-sm leading-[1.6] text-[#9ca3af]">
          <span className="mr-2">{"\u2696\uFE0F"}</span>
          {trade_offs}
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <ul className="space-y-2">
          {car.pros.map((pro) => (
            <li key={pro} className="flex gap-2 text-[13px] leading-5 text-[#86efac]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#22c55e]" />
              {pro}
            </li>
          ))}
        </ul>
        <ul className="space-y-2">
          {car.cons.map((con) => (
            <li key={con} className="flex gap-2 text-[13px] leading-5 text-[#fca5a5]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ef4444]" />
              {con}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
