import { useEffect, useRef } from "react"
import { gsap } from "../../lib/gsap"
import { PROJECTS } from "../../data/content"

// Import project screenshots in order from the assets folder
import project1Img from "../../assets/project1.png"
import project2Img from "../../assets/project2.png"
import project3Img from "../../assets/project3.png"

const PROJECT_IMAGES = [project1Img, project2Img, project3Img]

function ProjectImage({ src, name }) {
  if (src) {
    return (
      <img
        src={src}
        alt={`${name} project screenshot`}
        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />
    )
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#1a1a1a] p-6 text-center">
      <span className="font-display text-base font-semibold text-[#cfc8b6]/70 sm:text-lg">
        {name}
      </span>
      <span className="text-[10px] uppercase tracking-wide text-[#cfc8b6]/30">
        Screenshot coming soon
      </span>
    </div>
  )
}

function Projects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const cardsRef = useRef([])

  cardsRef.current = []
  const registerCard = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const cards = cardsRef.current

      // 1. Create the main horizontal scroll tween
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth)
      
      const scrollTween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 1, // Lenis smoothing
          snap: {
            snapTo: 1 / (PROJECTS.length - 1),
            duration: { min: 0.2, max: 0.6 },
            ease: "power2.inOut",
          },
          invalidateOnRefresh: true,
        },
      })

      // 2. Maximum Prominence 3D Effect
      cards.forEach((card) => {
        const wrapper = card.parentElement

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            containerAnimation: scrollTween, 
            start: "left right", 
            end: "right left",   
            scrub: true,
          },
        })

        // Extreme parameters: 
        // 75deg rotation, 30% scale, full opacity fade, and sharper power3 easing
        // This makes it feel like it's swinging in from very far away
        tl.fromTo(
          card,
          { scale: 0.3, opacity: 0, rotateY: -75 },
          { scale: 1, opacity: 1, rotateY: 0, duration: 1, ease: "power3.out" }
        ).to(
          card,
          { scale: 0.3, opacity: 0, rotateY: 75, duration: 1, ease: "power3.in" }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative flex h-screen w-full flex-col justify-center overflow-hidden bg-[#0f0f0f] text-[#cfc8b6]"
    >
      {/* Fixed Header Overlay */}
      <div className="absolute left-0 top-8 z-20 w-full pointer-events-none px-6 md:px-12 lg:top-12 lg:px-20">
        <h2 className="font-display text-2xl font-bold sm:text-3xl md:text-4xl pointer-events-auto w-max">
          Selected Work
        </h2>
        <p className="mt-1 max-w-xl text-xs text-[#cfc8b6]/60 sm:text-sm pointer-events-auto">
          Three shipped products, start to finish — idea, build, and deployment.
        </p>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={trackRef}
        className="flex h-full w-max items-center pt-20"
      >
        {PROJECTS.map((project, index) => {
          const imageSrc = PROJECT_IMAGES[index] || project.image
          const ImageWrapper = project.link ? "a" : "div"

          return (
            <div
              key={project.id}
              className="flex w-screen shrink-0 items-center justify-center px-6 md:px-12 lg:px-20"
              // Dropping perspective to 800px highly exaggerates the 3D focal distortion
              style={{ perspective: "800px" }}
            >
              <div
                ref={registerCard}
                className="flex h-[78vh] min-h-[500px] max-h-[800px] w-full max-w-5xl flex-col rounded-3xl border border-white/10 bg-[#1a1a1a]/90 p-5 shadow-2xl backdrop-blur-md md:p-8"
              >
                {/* Top Section: Text Content */}
                <div className="flex shrink-0 flex-col items-start text-left">
                  <div className="flex w-full flex-wrap items-center justify-between gap-2">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-display text-xl font-semibold text-[#fdff29] md:text-3xl">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-xl font-bold text-white md:text-3xl">
                        {project.name}
                      </h3>
                    </div>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-[#fdff29] transition-all hover:border-[#fdff29]/60 hover:bg-white/10"
                      >
                        {project.linkText || "Visit Site"} ↗
                      </a>
                    )}
                  </div>

                  {project.role && (
                    <span className="mt-2 inline-block rounded border border-[#4f7ef8]/30 bg-[#4f7ef8]/15 px-2.5 py-0.5 text-xs font-medium text-[#85a8ff]">
                      Role: {project.role}
                    </span>
                  )}

                  <p className="mt-3 text-sm leading-relaxed text-[#cfc8b6]/80 md:text-base">
                    {project.pitch}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {project.stats?.map((stat) => (
                      <span
                        key={stat}
                        className="rounded-full bg-[#fdff29] px-3 py-1 text-xs font-semibold text-[#0f0f0f]"
                      >
                        {stat}
                      </span>
                    ))}
                    {project.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-[#cfc8b6]/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Section: Clickable Large Image */}
                <ImageWrapper
                  href={project.link}
                  target={project.link ? "_blank" : undefined}
                  rel={project.link ? "noopener noreferrer" : undefined}
                  className={`group relative mt-6 flex w-full flex-1 overflow-hidden rounded-2xl border border-white/10 bg-[#121212] ${
                    project.link ? "cursor-pointer" : ""
                  }`}
                >
                  <ProjectImage src={imageSrc} name={project.name} />

                  {/* Hover Overlay Indicator */}
                  {project.link && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0f0f0f]/30 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                      <span className="translate-y-4 rounded-full bg-[#fdff29] px-6 py-3 font-display text-sm font-bold tracking-wide text-[#0f0f0f] shadow-xl transition-transform duration-300 group-hover:translate-y-0">
                        Visit Project ↗
                      </span>
                    </div>
                  )}
                </ImageWrapper>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Projects