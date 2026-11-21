import { defineConfig } from "vite";

// `vercel dev` sets VERCEL=1 and routes /api to the server service itself.
// Only use the local proxy for plain `npm run dev` without Vercel.
const proxy = process.env.VERCEL
  ? undefined
  : {
      "/api": "http://localhost:3001",
    };

export default defineConfig({
  server: { proxy },
});
