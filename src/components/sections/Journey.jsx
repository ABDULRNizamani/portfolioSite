import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap } from "../../lib/gsap"
import { JOURNEY } from "../../data/content"

function Journey() {
  const containerRef = useRef(null)
  const pathRef = useRef(null)
  const cardRefs = useRef([])
  const [spineHeight, setSpineHeight] = useState(0)

  // Reset each render so the array only ever holds refs to currently
  // mounted cards, repopulated below via the ref callback before effects run.
  cardRefs.current = []
  const registerCard = (el) => {
    if (el) cardRefs.current.push(el)
  }

  // Track the container's real height so the connecting line's SVG viewBox
  // (and therefore the length GSAP animates) always matches the current
  // layout — recalculated on any resize/breakpoint change.
  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const measure = () => setSpineHeight(container.offsetHeight)
    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!spineHeight || !pathRef.current) return

    const ctx = gsap.context(() => {
      const path = pathRef.current
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })

      // Scrub ties the draw progress directly to scroll position, which is
      // what makes it bidirectional for free: scrolling down increases
      // scroll progress (line draws forward), scrolling up decreases it
      // (line retracts) — no separate reverse-case logic needed.
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom bottom",
          scrub: true,
        },
      })

      // Individual card reveals are simpler one-shot fade/translate-ins.
      cardRefs.current.forEach((card) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [spineHeight])

  return (
    <section
      id="journey"
      className="relative bg-[#cfc8b6] px-6 py-24 text-[#0f0f0f] md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">
          Journey
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-[#0f0f0f]/70">
          From a classroom in Tando Qaiser to shipping products people
          actually use.
        </p>

        <div ref={containerRef} className="relative mt-20">
          {/* Track + scrub-drawn accent line. Positioned at left-6 on
              mobile (spine-on-left layout) and centered from md: up, where
              cards alternate left/right of it. */}
          <svg
            className="pointer-events-none absolute left-6 top-0 h-full w-3 -translate-x-1/2 md:left-1/2"
            viewBox={`0 0 12 ${spineHeight || 1}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={`M 6 0 L 6 ${spineHeight || 1}`}
              stroke="#0f0f0f"
              strokeOpacity="0.12"
              strokeWidth="3"
              fill="none"
            />
            <path
              ref={pathRef}
              d={`M 6 0 L 6 ${spineHeight || 1}`}
              stroke="#fdff29"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          <ol className="relative flex flex-col gap-16 md:gap-24">
            {JOURNEY.map((item, index) => {
              const isLeft = index % 2 === 0
              return (
                <li
                  key={item.id}
                  className="relative grid grid-cols-1 items-start md:grid-cols-2 md:items-center md:gap-x-16"
                >
                  <span
                    className="absolute left-6 top-1.5 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-[#cfc8b6] bg-[#0f0f0f] md:left-1/2"
                    aria-hidden="true"
                  />

                  <div
                    ref={registerCard}
                    className={`pl-14 md:pl-0 ${
                      isLeft
                        ? "md:col-start-1 md:pr-16 md:text-right"
                        : "md:col-start-2 md:pl-16"
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#0f0f0f]/50">
                      {item.stage}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-semibold sm:text-xl">
                      {item.headline}
                    </h3>
                    <p className="mt-2 text-sm text-[#0f0f0f]/70 sm:text-base">
                      {item.body}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default Journey
