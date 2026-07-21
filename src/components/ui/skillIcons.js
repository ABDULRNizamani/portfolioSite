// Maps the exact skill label strings from content.js -> a matching
// react-icons component. Keyed by exact string (not fuzzy-matched) since
// SKILLS in content.js is a small, fixed list — this avoids substring
// collisions (e.g. "CSS" vs "Tailwind CSS"). Entries with no real logo in
// Simple Icons (LangGraph, Groq, Tavily) are left unmapped; Skills.jsx
// falls back to a plain bullet for those so the grid never shows a broken
// or wrong icon.
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiExpo,
  SiFastapi,
  SiPostgresql,
  SiSupabase,
  SiDocker,
  SiDigitalocean,
  SiNginx,
  SiLangchain,
  SiGooglegemini,
} from "react-icons/si"

export const SKILL_ICONS = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  HTML: SiHtml5,
  CSS: SiCss,
  "React 19": SiReact,
  "Next.js 16": SiNextdotjs,
  "Next.js App Router": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  "React Native": SiReact,
  Expo: SiExpo,
  FastAPI: SiFastapi,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  Docker: SiDocker,
  "DigitalOcean VPS": SiDigitalocean,
  Nginx: SiNginx,
  LangChain: SiLangchain,
  "Gemini 2.5 Flash": SiGooglegemini,
}
