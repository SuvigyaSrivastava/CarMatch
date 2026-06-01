export interface Car {
  id: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  price_lakh: number;
  fuel_type: "Petrol" | "Diesel" | "Electric" | "CNG" | "Hybrid";
  transmission: "Manual" | "Automatic" | "CVT" | "DCT" | "AMT";
  body_type: "Hatchback" | "Sedan" | "SUV" | "MPV" | "Luxury";
  seating_capacity: number;
  mileage_kmpl: number;
  engine_cc: number;
  power_bhp: number;
  safety_rating_ncap: number;
  boot_space_litres: number;
  ground_clearance_mm: number;
  features: string[];
  best_for: string[];
  pros: string[];
  cons: string[];
  user_rating: number;
  review_summary: string;
}

export interface CarRecommendation {
  car: Car;
  match_score: number;
  match_reason: string;
  trade_offs: string;
}

export interface RecommendResponse {
  recommendations: CarRecommendation[];
  summary: string;
  clarifying_question?: string;
}
