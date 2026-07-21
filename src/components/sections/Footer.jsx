import { useEffect, useRef, useState } from "react"
import {
  FaGithub,
  FaLinkedin,
  FaGooglePlay,
  FaCopy,
  FaCheck,
  FaDownload,
} from "react-icons/fa6"
import { gsap } from "../../lib/gsap"
import { PERSON } from "../../data/content"

const SOCIAL_LINKS = [
  { label: "GitHub", href: PERSON.links.github, Icon: FaGithub },
  { label: "LinkedIn", href: PERSON.links.linkedin, Icon: FaLinkedin },
  { label: "Play Store", href: PERSON.links.playstore, Icon: FaGooglePlay },
]

function Footer() {
  const contentRef = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 32,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      })
    }, contentRef)

    return () => ctx.revert()
  }, [])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSON.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API can fail (permissions, insecure context) — fail
      // quietly, the email is still visible to select and copy manually.
    }
  }

  const year = new Date().getFullYear()

  return (
    <footer
      id="contact"
      className="bg-[#cfc8b6] px-6 py-24 text-[#0f0f0f] md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div ref={contentRef} className="border-t border-[#0f0f0f]/10 pt-16">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Let's Talk
          </h2>
          <p className="mt-4 max-w-md text-[#0f0f0f]/60">
            {PERSON.status}. Reach out directly, or find me on GitHub and
            LinkedIn.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-base font-medium sm:text-lg">
              {PERSON.email}
            </span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-[#0f0f0f]/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors duration-200 hover:bg-[#0f0f0f]/5"
            >
              {copied ? (
                <>
                  <FaCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Copied
                </>
              ) : (
                <>
                  <FaCopy className="h-3.5 w-3.5" aria-hidden="true" />
                  Copy email
                </>
              )}
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#0f0f0f] px-5 py-2.5 text-sm font-semibold text-[#cfc8b6] transition-transform duration-200 hover:scale-[1.03]"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-[#0f0f0f]/30 px-5 py-2.5 text-sm font-semibold transition-colors duration-200 hover:bg-[#0f0f0f]/5"
            >
              <FaDownload className="h-4 w-4" aria-hidden="true" />
              Resume
            </a>
          </div>

          <p className="mt-16 text-xs text-[#0f0f0f]/50">
            © {year} Abdul Rehman Nizamani (Arniz)
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
