import { useEffect, useRef } from "react"
import { gsap } from "../../lib/gsap"
import { PROJECTS } from "../../data/content"

// Neutral placeholder for project screenshots that don't exist yet
// (content.js has `image: null` for all three projects). Swap for a real
// <img> automatically once `project.image` is populated.
function ProjectImage({ project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.name} project screenshot`}
        className="h-full w-full rounded-2xl object-cover"
      />
    )
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#1a1a1a] p-8 text-center">
      <span className="font-display text-lg font-semibold text-[#cfc8b6]/70 sm:text-xl">
        {project.name}
      </span>
      <span className="text-xs uppercase tracking-wide text-[#cfc8b6]/30">
        Screenshot coming soon
      </span>
    </div>
  )
}

function Projects() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  // Reset each render so the array only ever holds refs to currently
  // mounted cards, same pattern as Journey's registerCard.
  cardRefs.current = []
  const registerCard = (el) => {
    if (el) cardRefs.current.push(el)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Lightweight one-shot fade/translate per card — the scrub/reverse
      // treatment is specific to Journey's connector line, not needed here.
      cardRefs.current.forEach((card) => {
        gsap.from(card, {
          y: 48,
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      // Deliberate high-contrast break from the cream palette used
      // everywhere else — the one near-black full-bleed block.
      className="bg-[#0f0f0f] px-6 py-24 text-[#cfc8b6] md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Selected Work
        </h2>
        <p className="mt-4 max-w-xl text-[#cfc8b6]/60">
          Three shipped products, start to finish — idea, build, and
          deployment.
        </p>

        <ol className="mt-16 flex flex-col border-t border-white/10">
          {PROJECTS.map((project, index) => (
            <li
              key={project.id}
              ref={registerCard}
              className="border-b border-white/10 py-10 first:pt-0 md:grid md:grid-cols-12 md:items-center md:gap-10 md:py-14"
            >
              <div className="md:col-span-7">
                <div className="flex items-baseline gap-4">
                  <span className="shrink-0 font-display text-3xl font-semibold text-[#fdff29] sm:text-4xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-semibold sm:text-3xl">
                    {project.name}
                  </h3>
                </div>

                <p className="mt-4 text-sm text-[#cfc8b6]/70 sm:text-base">
                  {project.pitch}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs text-[#cfc8b6]/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.stats.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {project.stats.map((stat) => (
                      <span
                        key={stat}
                        className="rounded-full bg-[#fdff29] px-3 py-1 text-xs font-semibold text-[#0f0f0f]"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-8 aspect-video w-full md:col-span-5 md:mt-0">
                <ProjectImage project={project} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Projects
