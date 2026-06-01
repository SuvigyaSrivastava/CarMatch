# CarMatch

CarMatch is an AI-powered car recommendation engine for confused Indian car buyers. A user can describe what they need in plain English, such as `family SUV under Rs 20L with 5-star safety`, and the app returns a ranked shortlist of cars with match scores, reasons, trade-offs, key specs, pros, cons, and user ratings.

## 1. What did you build and why?

I built a conversational car finder for Indian buyers who often know their needs but do not know how to translate them into a shortlist. Instead of making users filter through dozens of listings, CarMatch lets them describe their budget, body type, family size, mileage needs, fuel preference, safety expectations, and lifestyle in one sentence.

The app then recommends 3-5 cars from a static dataset of 50 Indian-market cars and explains why each one fits. The goal is to make car discovery feel closer to talking to a knowledgeable advisor than browsing a classifieds grid.

## 2. What did you deliberately cut?

I deliberately cut features that would make the product broader but not necessarily better for this assignment:

- User accounts and saved searches
- Dealer inventory and live on-road pricing
- EMI, insurance, and loan calculators
- Car image galleries and comparison tables
- Real-time availability by city
- A separate backend service

Those are valuable additions, but the core assignment is the recommendation loop: understand a natural-language query, rank suitable cars, and explain the decision clearly. I kept the scope focused there.

## 3. What's your tech stack and why?

- **Next.js 14 App Router**: Full-stack app structure with pages and API routes in one deployable project.
- **TypeScript**: Safer data contracts for cars, recommendations, and API responses.
- **Tailwind CSS**: Fast, consistent styling for a responsive dark UI.
- **Static JSON dataset**: Simple, deterministic source of truth for 50 cars without database overhead.
- **Gemini 2.5 Flash via `@google/genai`**: Handles intent understanding, ranking, and explanation generation.
- **Vercel target**: Natural fit for a Next.js app with serverless API routes.

This stack keeps the app easy to run locally, easy to deploy, and focused on product behavior rather than infrastructure.

## 4. What did you delegate to AI vs do manually?

AI handles the subjective recommendation work: interpreting the user's query, deciding which requirements matter most, ranking matching cars, writing tailored explanations, and calling out honest trade-offs.

I handled the application structure manually: defining the data schema, creating the TypeScript types, building the UI states, wiring the API route, enforcing dataset-only recommendations in the prompt, adding validation, keeping secrets out of source control, and verifying the app with lint/build checks.

## 5. Where did the tools help most? Where did they get in the way?

The tools helped most with scaffolding the app quickly, generating repetitive UI structure, and shaping the recommendation prompt into a strict JSON contract.

They got in the way when generated defaults did not match the assignment exactly. `create-next-app@latest` initially produced newer framework versions than the requested Next.js 14, so I pinned the dependencies back manually. There were also a few environment-specific issues around local process/file locks during builds, which needed manual cleanup.

## 6. If you had another 4 hours, what would you add?

I would add deterministic pre-filtering before the Gemini call so hard constraints like budget, fuel type, seating, and safety rating are enforced before the model ranks anything. I would also add a proper comparison view, car images, source notes for prices/specs, a fallback local ranking mode, and API tests for the recommendation route.

## Running locally

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Add your Gemini key to `.env.local`:

```bash
GEMINI_API_KEY=your_key_here
```

Then open:

```text
http://localhost:3000
```
