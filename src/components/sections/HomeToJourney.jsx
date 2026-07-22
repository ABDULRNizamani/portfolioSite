import { useEffect, useRef } from "react"
import { gsap } from "../../lib/gsap"

function HomeToJourney() {
  const containerRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const line = lineRef.current
      if (!line) return

      const length = line.getTotalLength()
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })

      // Draws the feeder line downward as the user scrolls out of Hero
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 15%",
          scrub: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative flex h-32 w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#dcd7c9] to-[#cfc8b6] select-none"
      aria-hidden="true"
    >
      {/* Subtle scroll indicator text */}
      <span className="mb-3 text-[11px] font-extrabold uppercase tracking-widest text-[#0f0f0f]/40 animate-pulse">
        The Origin
      </span>

      {/* Connecting SVG line that feeds directly into Journey's timeline */}
      <svg
        className="h-16 w-3 overflow-visible"
        viewBox="0 0 12 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background track */}
        <path
          d="M 6 0 L 6 64"
          stroke="#0f0f0f"
          strokeOpacity="0.12"
          strokeWidth="3"
        />
        {/* Scrub-animated yellow accent line */}
        <path
          ref={lineRef}
          d="M 6 0 L 6 64"
          stroke="#fdff29"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default HomeToJourney