# CarMatch

## 1. What did you build and why?

I built CarMatch, a conversational car recommendation app for Indian buyers who know their needs but may not know which car maps to them. The user can describe a use case like "family SUV under Rs 20L with 5-star safety", and the app returns a ranked shortlist with match scores, reasons, trade-offs, pros, cons, specs, and ratings.

## 2. What did you deliberately cut?

I cut user accounts, saved searches, real dealer inventory, EMI calculators, insurance quotes, live pricing, and image galleries. Those would make the app broader, but the assignment's core value is the recommendation reasoning loop, so I kept the product focused on query-to-shortlist quality.

## 3. What's your tech stack and why?

The app uses Next.js 14 with the App Router, TypeScript, Tailwind CSS, a static JSON dataset, and a Next.js API route. This keeps deployment simple on Vercel, avoids a separate backend, and still gives a clean boundary between the UI and recommendation logic. Gemini 2.5 Flash is used through Google's official `@google/genai` SDK because the available key is a Gemini key, and JSON response MIME type helps keep the API response structured for rendering.

## 4. What did you delegate to AI vs do manually?

AI handles the natural-language interpretation, ranking, and explanation generation. Manually, I defined the schema, built the UI states, created the dataset shape, wired the API route, enforced budget and dataset-only rules in the system prompt, and kept API keys out of source control.

## 5. Where did the tools help most? Where did they get in the way?

The tools helped most in scaffolding the Next.js app quickly, filling repetitive component structure, and keeping the recommendation prompt consistent with the typed response schema. They got in the way where generated defaults did not match the assignment exactly, especially `create-next-app@latest` producing newer framework versions than the requested Next.js 14, so I pinned the dependencies back manually.

## 6. If you had another 4 hours, what would you add?

I would add deterministic pre-filtering before the AI call, richer car images, source notes for prices and specs, a comparison table, budget sliders, saved recommendation sessions, and tests for the API route. I would also add a fallback local ranking mode so the app can still show useful results if the OpenAI API is unavailable.

## Running Locally

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Add your Gemini key to `.env.local` before testing recommendations:

```bash
GEMINI_API_KEY=your_key_here
```
