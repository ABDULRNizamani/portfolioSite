import { useEffect, useRef } from "react"
import {
  FaBolt,
  FaBrain,
  FaDiagramProject,
  FaGooglePlay,
  FaLayerGroup,
  FaMagnifyingGlass,
  FaRocket,
} from "react-icons/fa6"
import { gsap } from "../../lib/gsap"
import { scrollToTarget } from "../../lib/smoothScroll"
import { PERSON, PROJECTS } from "../../data/content"

// Kept exact import path as requested
import heroPhoto from "../../assets/hero.png"

const NAV_LEFT = [
  { label: "Home", href: "#home" },
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
]

const NAV_RIGHT = [
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

const BADGES = [
  { label: "Self-Taught", icon: FaBrain },
  { label: "Full-Stack", icon: FaLayerGroup },
  { label: "Fast Learner", icon: FaBolt },
  { label: "Ships Products", icon: FaRocket },
  { label: "Detail-Oriented", icon: FaMagnifyingGlass },
]

// Terms to display inside the moving blue strip
const STRIP_TERMS = [
  "FULL-STACK DEVELOPER",
  "•",
  "AI ENGINEERING",
  "•",
  "REACT & GSAP",
  "•",
  "PROBLEM SOLVER",
  "•",
  "PRODUCT BUILDER",
  "•",
]

function Hero() {
  const rootRef = useRef(null)

  // Entrance & Marquee animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure absolute center positioning is locked via GSAP transforms
      gsap.set("[data-hero-photo]", { xPercent: -50 })

      // 1. Infinite Horizontal Ticker for the Blue Strip
      gsap.to("[data-marquee-track]", {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "none",
      })

      // 2. Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from("[data-hero-name]", { opacity: 0, y: -30, duration: 1 })
        .from("[data-hero-nav]", { y: -10, opacity: 0, duration: 0.6 }, "-=0.6")
        .from("[data-hero-strip]", { scaleX: 0, opacity: 0, duration: 0.8 }, "-=0.4")
        .from("[data-hero-photo]", { y: 80, opacity: 0, duration: 1 }, "-=0.8")
        .from("[data-hero-headline]", { y: 30, opacity: 0, duration: 0.7 }, "-=0.6")
        .from("[data-hero-badge]", { x: 30, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.5")
        .from("[data-hero-stat]", { x: -30, opacity: 0, duration: 0.6, stagger: 0.15 }, "-=0.6")
        .from("[data-hero-cta]", { scale: 0.9, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.4")
        .from("[data-hero-blurb]", { opacity: 0, duration: 0.6 }, "-=0.3")
        .from("[data-hero-tagline]", { opacity: 0, duration: 0.5 }, "-=0.3")
    }, rootRef)

    return () => ctx.revert()
  }, [])

  const handleNavClick = (event, href) => {
    event.preventDefault()
    scrollToTarget(href)
  }

  return (
    <section
      ref={rootRef}
      id="home"
      className="relative h-screen w-full overflow-hidden bg-[#dcd7c9] text-[#111111] font-sans select-none"
    >
      {/* 1. Giant Background Wordmark (Top Layer 0) */}
      <h1
        data-hero-name
        className="pointer-events-none absolute inset-x-0 top-[-2vw] z-0 text-center font-black uppercase tracking-tight text-[#e2ff00] text-[clamp(10rem,28vw,32rem)] leading-none"
      >
        {PERSON.shortName}
      </h1>

      {/* 2. Navigation bar positioned right below the giant wordmark */}
      <nav
        data-hero-nav
        className="absolute top-[32%] inset-x-0 z-30 flex items-center justify-between px-8 md:px-16 text-xs md:text-sm font-extrabold uppercase tracking-wider text-black"
      >
        <ul className="flex items-center gap-4 md:gap-6">
          {NAV_LEFT.map((link, idx) => (
            <li key={link.href} className="flex items-center gap-4 md:gap-6">
              {idx > 0 && <span className="text-black/40 font-normal">|</span>}
              <a
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className="transition-opacity hover:opacity-60"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <ul className="hidden sm:flex items-center gap-4 md:gap-6">
          {NAV_RIGHT.map((link, idx) => (
            <li key={link.href} className="flex items-center gap-4 md:gap-6">
              {idx > 0 && <span className="text-black/40 font-normal">|</span>}
              <a
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className="transition-opacity hover:opacity-60"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 3. Angled Blue Marquee Strip (Layer z-[5] -> Behind Photo, Above Wordmark) */}
      <div
        data-hero-strip
        className="pointer-events-none absolute top-[48%] left-[-10%] z-[5] flex w-[120%] -rotate-3 overflow-hidden bg-[#0044ff] py-3 text-white shadow-2xl border-y-2 border-[#e2ff00]"
      >
        <div
          data-marquee-track
          className="flex w-max items-center whitespace-nowrap font-black tracking-widest text-sm md:text-lg uppercase"
        >
          {/* Render duplicated lists to create an endless loop */}
          {[...STRIP_TERMS, ...STRIP_TERMS, ...STRIP_TERMS, ...STRIP_TERMS].map((term, idx) => (
            <span key={idx} className="mx-4 text-[#e2ff00] last:text-white">
              {term}
            </span>
          ))}
        </div>
      </div>

      {/* 4. Hero Portrait (Centered via left-1/2 and GSAP xPercent: -50) */}
      <div
        data-hero-photo
        className="absolute bottom-0 left-1/2 z-10 pointer-events-none"
      >
        <img
          src={heroPhoto}
          alt={PERSON.name}
          className="h-[75vh] md:h-[88vh] w-auto max-w-[95vw] object-contain object-bottom drop-shadow-2xl"
        />
      </div>

      {/* 5. Left Stat Cards (Glassmorphism overlay) */}
      <div className="absolute left-[5%] bottom-[22%] z-20 hidden sm:flex flex-col gap-4 md:left-[8%]">
        <div
          data-hero-stat
          className="flex items-center gap-4 rounded-xl bg-white/20 p-4 border border-white/30 backdrop-blur-md shadow-lg text-white"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e2ff00] text-black">
            <FaDiagramProject className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xl font-extrabold leading-none">{PROJECTS.length}+</div>
            <div className="text-[11px] font-semibold text-white/90">Projects Shipped</div>
          </div>
        </div>

        <div
          data-hero-stat
          className="flex items-center gap-4 rounded-xl bg-white/20 p-4 border border-white/30 backdrop-blur-md shadow-lg text-white"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e2ff00] text-black">
            <FaGooglePlay className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xl font-extrabold leading-none">1</div>
            <div className="text-[11px] font-semibold text-white/90">App Live on Google Play</div>
          </div>
        </div>
      </div>

      {/* 6. Center Headline Overlay */}
      <div
        data-hero-headline
        className="pointer-events-none absolute left-1/2 bottom-[10%] z-20 w-full -translate-x-1/2 text-center"
      >
        <h2 className="font-black text-[clamp(1.75rem,3.8vw,3.2rem)] leading-[1] tracking-tight text-white drop-shadow-lg">
          Full-Stack,
          <br />
          Built
          <br />
          By Doing.
        </h2>

        {/* 7. CTAs right under headline */}
        <div className="pointer-events-auto mt-4 flex items-center justify-center gap-3">
          <a
            data-hero-cta
            href="#projects"
            onClick={(event) => handleNavClick(event, "#projects")}
            className="rounded-xl bg-[#e2ff00] px-5 py-2.5 text-xs md:text-sm font-black text-black shadow-lg transition-transform duration-200 hover:scale-105"
          >
            View My Work
          </a>
          <a
            data-hero-cta
            href="#contact"
            onClick={(event) => handleNavClick(event, "#contact")}
            className="rounded-xl bg-[#e2ff00] px-5 py-2.5 text-xs md:text-sm font-black text-black shadow-lg transition-transform duration-200 hover:scale-105"
          >
            Let's Talk
          </a>
        </div>
      </div>

      {/* 8. Right Badge Panel (Glassmorphism vertical list) */}
      <div className="absolute right-[5%] bottom-[25%] z-20 hidden sm:flex flex-col gap-2 rounded-2xl bg-white/15 p-3 border border-white/20 backdrop-blur-md shadow-xl lg:right-[8%]">
        {BADGES.map(({ label, icon: Icon }) => (
          <div
            key={label}
            data-hero-badge
            className="flex items-center justify-between gap-3 px-3 py-1.5 text-xs font-bold text-white"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#e2ff00] text-black">
              <Icon className="h-3 w-3" />
            </span>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* 9. Bottom-Left Tagline */}
      <div
        data-hero-tagline
        className="absolute left-[5%] bottom-[4%] z-20 hidden text-xs font-semibold text-black/70 sm:block md:left-[8%]"
      >
        <p>The {PERSON.role}.</p>
        <p>That's {PERSON.shortName}.</p>
      </div>

      {/* 10. Bottom-Right Blurb */}
      <p
        data-hero-blurb
        className="absolute right-[5%] bottom-[4%] z-20 hidden max-w-[280px] text-right text-xs font-medium leading-tight text-black/70 sm:block md:right-[8%]"
      >
        Self-taught full-stack developer, shipping real products, now moving toward AI engineering.
      </p>
    </section>
  )
}

export default Hero