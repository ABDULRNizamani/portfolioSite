import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap } from "../../lib/gsap"
import { JOURNEY } from "../../data/content"

// Helper to generate a curved SVG path dynamically based on height
function generateCurvedPath(height, width = 100) {
  if (!height) return ""
  const segments = Math.max(3, Math.floor(height / 250)) // Create a wave every ~250px
  const segmentHeight = height / segments
  
  let path = `M ${width / 2} 0`
  
  for (let i = 0; i < segments; i++) {
    const isRight = i % 2 === 0
    const startY = i * segmentHeight
    const endY = (i + 1) * segmentHeight
    const controlPointX = isRight ? width : 0
    
    // Cubic bezier curve for smooth weaving
    path += ` C ${controlPointX} ${startY + segmentHeight / 3}, ${controlPointX} ${endY - segmentHeight / 3}, ${width / 2} ${endY}`
  }
  
  return path
}

function Journey() {
  const containerRef = useRef(null)
  const pathRef = useRef(null)
  const cardRefs = useRef([])
  const [spineHeight, setSpineHeight] = useState(0)

  cardRefs.current = []
  const registerCard = (el) => {
    if (el) cardRefs.current.push(el)
  }

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

      cardRefs.current.forEach((card) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "back.out(1.2)", // Gives a slight "pop" effect like the video
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [spineHeight])

  // Set the width of the SVG curve area
  const svgWidth = 120 
  const curvedPath = generateCurvedPath(spineHeight, svgWidth)

  return (
    <section
      id="journey"
      className="relative min-h-screen bg-[#e4dfd1] px-6 py-24 text-[#0f0f0f] md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-4xl font-bold sm:text-5xl">
          The Journey
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-center text-lg text-[#0f0f0f]/70">
          From a classroom in Tando Qaiser to shipping products people actually use.
        </p>

        <div ref={containerRef} className="relative mt-32">
          
          {/* Curved SVG Track */}
          <div className="absolute left-1/2 top-0 h-full w-[120px] -translate-x-1/2 pointer-events-none">
            <svg
              className="h-full w-full overflow-visible"
              viewBox={`0 0 ${svgWidth} ${spineHeight || 1}`}
              aria-hidden="true"
            >
              <path
                d={curvedPath}
                stroke="#0f0f0f"
                strokeOpacity="0.08"
                strokeWidth="2"
                fill="none"
              />
              <path
                ref={pathRef}
                d={curvedPath}
                stroke="#0f0f0f" // Changed to match the dark line drawing in the video
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          <ol className="relative flex flex-col gap-24 md:gap-32">
            {JOURNEY.map((item, index) => {
              const isLeft = index % 2 === 0
              return (
                <li
                  key={item.id}
                  className={`relative flex w-full flex-col md:flex-row ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* The interactive dot that rests on the line */}
                  <span
                    className="absolute left-1/2 top-8 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-[#e4dfd1] bg-[#fdff29] shadow-[0_0_0_4px_rgba(15,15,15,1)]"
                    aria-hidden="true"
                  />

                  {/* Card Container */}
                  <div
                    ref={registerCard}
                    className={`relative z-20 w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ${
                      isLeft ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <p className="text-sm font-bold uppercase tracking-widest text-[#0f0f0f]/40">
                      {item.stage}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-bold">
                      {item.headline}
                    </h3>
                    <p className="mt-4 leading-relaxed text-[#0f0f0f]/70">
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