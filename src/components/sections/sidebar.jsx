import { useEffect, useState } from "react"
import { FaLinkedinIn, FaGithub, FaHome, FaMapSigns, FaBriefcase, FaEnvelope, FaCopy } from "react-icons/fa"
import { PERSON, SKILL_ICONS } from "../../data/content" 
import { scrollToTarget } from "../../lib/smoothScroll" // Added smooth scroll import

const THEMES = {
  journey: {
    aside: "bg-[#e4dfd1] border-[#0f0f0f]/10",
    card: "bg-white border-transparent",
    textMain: "text-[#0f0f0f]",
    textMuted: "text-[#0f0f0f]/70",
    iconBtn: "bg-[#0f0f0f]/5 text-[#0f0f0f] hover:bg-[#0f0f0f]/10 hover:text-black",
    navIdle: "bg-[#0f0f0f]/5 text-[#0f0f0f] hover:bg-[#0f0f0f]/10",
  },
  projects: {
    aside: "bg-[#0f0f0f] border-white/10",
    card: "bg-[#1a1a1a] border-white/5 shadow-lg",
    textMain: "text-[#cfc8b6]",
    textMuted: "text-[#cfc8b6]/70",
    iconBtn: "bg-white/5 text-[#cfc8b6] hover:bg-[#fdff29] hover:text-[#0f0f0f]",
    navIdle: "bg-white/5 text-[#cfc8b6] hover:bg-white/10",
  },
  contact: {
    aside: "bg-[#cfc8b6] border-[#0f0f0f]/10",
    card: "bg-[#dfd7c3] border-transparent",
    textMain: "text-[#0f0f0f]",
    textMuted: "text-[#0f0f0f]/70",
    iconBtn: "bg-[#0f0f0f]/5 text-[#0f0f0f] hover:bg-[#0f0f0f]/10 hover:text-black",
    navIdle: "bg-[#0f0f0f]/5 text-[#0f0f0f] hover:bg-[#0f0f0f]/10",
  }
}

function Sidebar() {
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState("journey")
  const skillEntries = Object.entries(SKILL_ICONS)
  
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSON.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    const sectionIds = ["journey", "projects", "contact"]
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-30% 0px -60% 0px" } 
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const theme = THEMES[activeSection] || THEMES.journey

  const navItems = [
    { label: "Home", href: "#home", id: "home", icon: <FaHome /> }, 
    { label: "Journey", href: "#journey", id: "journey", icon: <FaMapSigns /> },
    { label: "Projects", href: "#projects", id: "projects", icon: <FaBriefcase /> },
    { label: "Contact", href: "#contact", id: "contact", icon: <FaEnvelope /> },
  ]

  // Added handler to intercept clicks and route them to Lenis
  const handleNavClick = (e, href) => {
    e.preventDefault()
    scrollToTarget(href)
  }

  return (
    <aside className={`sticky top-0 flex h-screen w-[280px] flex-col gap-3 overflow-y-auto p-4 hide-scrollbar border-r transition-colors duration-700 ease-in-out ${theme.aside}`}>
      
      {/* 1. Header Card */}
      <div className={`flex flex-col rounded-2xl p-5 border transition-colors duration-700 ease-in-out ${theme.card}`}>
        <div className="flex items-center justify-between">
          <div className="rounded-md bg-[#fdff29] px-3 py-1 font-display text-xl font-black text-black">
            ARNIZ<span className="text-sm">®</span>
          </div>
          <div className="flex gap-2">
            <a 
              href={PERSON.links.github} 
              target="_blank" 
              rel="noreferrer"
              className={`flex h-8 w-8 items-center justify-center rounded-md text-xl transition-all duration-500 ${theme.iconBtn}`}
            >
              <FaGithub />
            </a>
            <a 
              href={PERSON.links.linkedin} 
              target="_blank" 
              rel="noreferrer"
              className={`flex h-8 w-8 items-center justify-center rounded-md text-xl transition-all duration-500 ${theme.iconBtn}`}
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        <p className={`mt-6 text-base font-medium leading-relaxed transition-colors duration-700 ${theme.textMuted}`}>
          {PERSON.taglineOptions[0]}
        </p>
      </div>

      {/* 2. Stats Card */}
      <div className={`flex rounded-2xl p-5 text-center border transition-colors duration-700 ease-in-out ${theme.card}`}>
        <div className={`flex flex-1 flex-col border-r px-2 transition-colors duration-700 ${theme.aside.split(' ')[1]}`}>
          <span className="font-display text-3xl font-black text-[#fdff29] drop-shadow-sm">100+</span>
          <span className={`mt-1 text-sm font-bold leading-tight transition-colors duration-700 ${theme.textMuted}`}>Active Users</span>
        </div>
        <div className="flex flex-1 flex-col px-2">
          <span className="font-display text-3xl font-black text-[#fdff29] drop-shadow-sm">3+</span>
          <span className={`mt-1 text-sm font-bold leading-tight transition-colors duration-700 ${theme.textMuted}`}>Shipped Projects</span>
        </div>
      </div>

      {/* 3. Navigation Card */}
      <nav className={`flex flex-col gap-2 rounded-2xl p-4 border transition-colors duration-700 ease-in-out ${theme.card}`}>
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)} // Bound the smooth scroll handler here
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-bold uppercase tracking-wide transition-all duration-500 ${
                isActive 
                  ? "bg-[#fdff29] text-black" 
                  : theme.navIdle
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </a>
          )
        })}
      </nav>

      {/* 4. Marquee Card */}
      <div className={`flex flex-col justify-center overflow-hidden rounded-2xl py-4 border transition-colors duration-700 ease-in-out ${theme.card}`}>
        <div className="flex w-max animate-marquee gap-6 pl-6">
          {[...skillEntries, ...skillEntries].map(([name, Icon], idx) => (
            <div key={idx} className={`flex items-center gap-2 transition-colors duration-700 ${theme.textMain}`}>
              {Icon && <Icon className="h-5 w-5" />}
              <span className="text-sm font-bold uppercase">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Email Box */}
      <div className={`rounded-2xl p-4 border transition-colors duration-700 ease-in-out ${theme.card}`}>
        <button 
          onClick={handleCopyEmail}
          className={`flex w-full items-center justify-between rounded-lg px-4 py-3 transition-all duration-500 ${theme.navIdle}`}
        >
          <span className={`truncate text-base font-medium transition-colors duration-700 ${theme.textMain}`}>
            {copied ? "Copied!" : PERSON.email}
          </span>
          <FaCopy className={`ml-2 flex-shrink-0 transition-colors duration-700 ${theme.textMuted}`} />
        </button>
      </div>

      {/* 6. CTA Button */}
      <a 
        href="/resume.pdf"
        target="_blank"
        rel="noreferrer"
        className="mt-auto block w-full rounded-2xl bg-[#fdff29] py-4 text-center text-xl font-black uppercase text-black transition-transform hover:scale-[1.02] shadow-[0_0_15px_rgba(253,255,41,0.15)] shrink-0"
      >
        Resume
      </a>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </aside>
  )
}

export default Sidebar