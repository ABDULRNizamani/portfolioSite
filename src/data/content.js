// Structured site content — Phase 1.
// Exports: PERSON, JOURNEY, PROJECTS, VALUE_PROPS, SKILLS.

export const PERSON = {
  name: "Abdul Rehman Nizamani",
  shortName: "Arniz",
  role: "Full-Stack Developer",
  location: "Tando Qaiser, Sindh, Pakistan",
  // Pick one — kept as alternatives so the copy can be chosen later.
  taglineOptions: [
    "Self-taught full-stack developer shipping real, used products — now moving toward AI engineering.",
    "Self-taught developer who ships things people actually use, now leveling up into AI engineering.",
    "Full-stack developer, self-taught and product-obsessed — currently pushing into AI engineering.",
  ],
  status: "Open to junior developer roles & internships",
  email: "nizamaniabdulrehman49@gmail.com", // Swap if using a different primary email
  links: {
    github: "https://github.com/ABDULRNizamani",
    linkedin:
      "https://www.linkedin.com/in/abdul-rehman-nizamani-6a5068351/",
    playstore:
      "https://play.google.com/store/apps/details?id=com.abdulrehman.vidnotesai",
  },
}

export const JOURNEY = [
  {
    id: "primary-school",
    stage: "Primary Education",
    headline: "Where it started — Tando Qaiser",
    body: "Primary education at a local school in Tando Qaiser, Sindh. The starting point of everything that followed.",
  },
  {
    id: "matriculation",
    stage: "Matriculation",
    headline: "Moved city for Matric — A+",
    body: "Moved to a nearby city to complete Matriculation (secondary schooling) and achieved an A+ grade.",
  },
  {
    id: "intermediate",
    stage: "Intermediate",
    headline: "Intermediate — A+, now applying to universities",
    body: "Completed Intermediate (higher secondary) with an A+ grade. Currently applying to universities for a Bachelor's program.",
  },
  {
    id: "first-web-dev",
    stage: "First Steps in Web Dev",
    headline: "First contact with JS, HTML, CSS",
    body: "Got into web development for the first time right after Matric — learned JavaScript, HTML, and CSS. Stepped away from it for a while after that.",
  },
  {
    id: "back-to-react",
    stage: "Coming Back — React",
    headline: "Returned more seriously, learned React",
    body: "Came back to web development more seriously, this time learning React. Built small but functional projects and deployed them.",
  },
  {
    id: "nextjs-certification",
    stage: "Next.js & Certification",
    headline: "Next.js, App Router, and a Vercel certification",
    body: "Moved to Next.js — learned the App Router, routing patterns, SEO, and caching. Earned the official Vercel Next.js certification.",
  },
  {
    id: "statisticallyuos",
    stage: "Building StatisticallyUOS",
    headline: "First real full-stack product, built with a cousin",
    body: "Built StatisticallyUOS with cousin Shahzad Nizamani — a full-stack academic platform for University of Sindh students, with CGPA leaderboards, subject stats, and anonymous teacher/subject reviews. Learned Supabase and Postgres here. Now used by 100+ active students.",
  },
  {
    id: "backend-python-fastapi",
    stage: "Going Backend",
    headline: "Python fundamentals, then FastAPI",
    body: "Got interested in backend engineering — learned Python fundamentals and then moved on to FastAPI.",
  },
  {
    id: "webweave",
    stage: "Building WebWeave",
    headline: "An AI research assistant, deployed on a VPS",
    body: "Built WebWeave, an AI research assistant (Next.js + FastAPI + LangGraph), deployed via Docker on a VPS. Learned LangChain/LangGraph and containerized deployment through this project.",
  },
  {
    id: "vidnotes-ai",
    stage: "Building VidNotes AI",
    headline: "Shipped a mobile app to the Play Store",
    body: "Most recently built VidNotes AI, a React Native (Expo) + FastAPI mobile app that turns YouTube videos into study notes with quizzes, flashcards, and an AI tutor. Deployed it to the Google Play Store, with 10+ installs.",
  },
  {
    id: "now",
    stage: "Now",
    headline: "Applying, and looking toward AI engineering",
    body: "Currently applying for junior developer and internship roles, with a longer-term goal of shifting into AI engineering.",
  },
]

export const PROJECTS = [
  {
    id: "statisticallyuos",
    name: "StatisticallyUOS",
    role: "Frontend & SEO Lead",
    link: "https://www.statisticallyuos.tech/",
    linkText: "Live Platform",
    pitch:
      "A centralized academic analytics platform built for University of Sindh students, turning scattered campus data into actionable insights.",
    description:
      "A full-stack academic platform built for University of Sindh students, bringing CGPA leaderboards, subject-level statistics, and anonymous teacher/subject reviews together in one place. Built with a cousin, Shahzad Nizamani, and now used by 100+ active students.",
    tags: [
      "Next.js 16",
      "TypeScript",
      "React 19",
      "Tailwind CSS",
      "FastAPI",
      "PostgreSQL",
      "Supabase",
    ],
    stats: ["100+ Active Students", "0 Legacy Clutter"],
    features: [
      "CGPA & Subject Leaderboards: Filter rankings by department, batch, or surname with trophy badges for top performers.",
      "Deep Subject Analytics: Historical grade distributions (A+ to F), fail severity metrics, and anonymous student reviews.",
      "Integrated ITSC Lookup: Direct results portal bypass for instant student grade lookups without navigating the legacy university system.",
    ],
    detailedRole:
      "Frontend + technical SEO (App Router metadata, JSON-LD, sitemap/robots, Search Console). Backend/data API built by co-developer.",
    links: {
      live: "https://www.statisticallyuos.tech/",
      github: "https://github.com/ABDULRNizamani/SindhUni",
    },
    image: null, // Populated via project1Img inside your JSX
  },
  {
    id: "webweave",
    name: "WebWeave",
    role: "Full-Stack Creator",
    link: "https://web-weave-kappa.vercel.app/",
    linkText: "Try WebWeave",
    pitch:
      "An autonomous AI research assistant that transforms plain-English queries into sourced, fact-checked briefings and structured analytical reports.",
    description:
      "An AI research assistant that runs a multi-step pipeline over a user's query — searching, scraping, validating, summarizing, fact-checking, and formatting the result into a briefing or a longer report. Deployed via Docker on a DigitalOcean VPS.",
    tags: [
      "Next.js",
      "FastAPI",
      "LangGraph",
      "Groq (Llama 3.3)",
      "Tavily",
      "Docker",
      "DigitalOcean VPS",
    ],
    stats: ["LangGraph Engine", "0 Hallucinated Citations"],
    features: [
      "Multi-Step Pipeline: Orchestrates web searching (Tavily), raw HTML scraping, filtration, and summarization using LangGraph.",
      "Automated Fact-Checking: Llama-3.3-70B cross-references generated summaries against raw sources to eliminate hallucinations.",
      "Dual Output Modes: Executive briefings with scored source cards (0–10) or long-form analytical reports with deep breakdowns.",
    ],
    detailedRole: null,
    links: {
      live: "https://web-weave-kappa.vercel.app/",
      github: null,
    },
    image: null, // Populated via project2Img inside your JSX
  },
  {
    id: "vidnotes-ai",
    name: "VidNotes AI",
    role: "Mobile & Backend Developer",
    link: "https://play.google.com/store/apps/details?id=com.abdulrehman.vidnotesai",
    linkText: "Play Store",
    pitch:
      "A mobile study suite that converts hour-long YouTube lectures, documentaries, and playlists into structured study notes, quizzes, and flashcards.",
    description:
      "A React Native (Expo) + FastAPI mobile app that converts YouTube videos into study material — notes, quizzes, flashcards — plus an AI tutor to ask follow-up questions. Deployed to the Google Play Store.",
    tags: [
      "React Native (Expo)",
      "FastAPI",
      "Gemini 2.5 Flash",
      "Groq",
      "Supabase (Postgres)",
      "NativeWind",
    ],
    stats: ["Live on Play Store", "Socratic AI Tutor"],
    features: [
      "Parallel Video Chunking: Generates clean, hierarchical notes (Subjects → Topics → Notes) from YouTube videos or entire playlists using Gemini 2.5 Flash.",
      "Active Recall Suite: Automatically generates multiple-choice quizzes with mistake tracking, flashcards, and daily review questions.",
      "Socratic AI Tutor: An intelligent chatbot with 3 learning modes (Explain, Quiz, Socratic) grounded strictly in your generated notes.",
    ],
    detailedRole: null,
    links: {
      live: null,
      github: null,
      playStore: PERSON.links.playstore,
    },
    image: null, // Populated via project3Img inside your JSX
  },
]

// Phase 4 — short value props for the "What I bring" mini-section.
// Written to read like a junior dev being straight about what they've
// actually done, not agency copy.
export const VALUE_PROPS = [
  {
    title: "Ships end to end",
    body: "I don't stop at a working demo. StatisticallyUOS and VidNotes AI are both built, deployed, and still being used right now.",
  },
  {
    title: "Learns fast, in public",
    body: "Every project here taught me something I didn't know going in — React, then Next.js, then FastAPI, then LangGraph. I pick up what the project needs.",
  },
  {
    title: "Comfortable across the stack",
    body: "Frontend, backend, database, deployment — I've worked in all of it, not just the part that's most fun.",
  },
  {
    title: "Sweats the details that don't show",
    body: "Technical SEO, rate-limit handling, a note lifecycle scheduler — the unglamorous stuff that makes a product actually hold up.",
  },
]

export const SKILLS = {
  Languages: ["JavaScript", "TypeScript", "Python", "HTML", "CSS"],
  Frontend: [
    "React 19",
    "Next.js 16",
    "Next.js App Router",
    "Tailwind CSS",
    "React Native",
    "Expo",
  ],
  Backend: ["FastAPI"],
  "Data & Infra": [
    "PostgreSQL",
    "Supabase",
    "Docker",
    "DigitalOcean VPS",
    "Nginx",
  ],
  "AI/LLM Tooling": [
    "LangChain",
    "LangGraph",
    "Groq (Llama 3.3 70B)",
    "Tavily",
    "Gemini 2.5 Flash",
  ],
}