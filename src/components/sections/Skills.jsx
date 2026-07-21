import { useEffect, useRef } from "react"
import { gsap } from "../../lib/gsap"
import { SKILLS, VALUE_PROPS } from "../../data/content"
import { SKILL_ICONS } from "../ui/skillIcons"

function SkillItem({ label }) {
  const Icon = SKILL_ICONS[label]
  return (
    <li className="flex items-center gap-3 text-sm text-[#0f0f0f]/80 sm:text-base">
      {Icon ? (
        <Icon
          className="h-4 w-4 shrink-0 text-[#0f0f0f]/60"
          aria-hidden="true"
        />
      ) : (
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f0f0f]/40"
          aria-hidden="true"
        />
      )}
      <span>{label}</span>
    </li>
  )
}

function Skills() {
  const sectionRef = useRef(null)
  const blockRefs = useRef([])
  const propRefs = useRef([])

  // Reset each render, same registration pattern used in Journey/Projects.
  blockRefs.current = []
  propRefs.current = []
  const registerBlock = (el) => {
    if (el) blockRefs.current.push(el)
  }
  const registerProp = (el) => {
    if (el) propRefs.current.push(el)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(blockRefs.current, {
        y: 32,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })

      gsap.from(propRefs.current, {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: propRefs.current[0],
          start: "top 88%",
          toggleActions: "play none none none",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="bg-[#cfc8b6] px-6 py-24 text-[#0f0f0f] md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Skills
        </h2>
        <p className="mt-4 max-w-xl text-[#0f0f0f]/60">
          Tools pulled straight from the projects above — nothing on this
          list is untested.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(SKILLS).map(([category, items]) => (
            <div
              key={category}
              ref={registerBlock}
              className="rounded-2xl border border-[#0f0f0f]/10 bg-[#0f0f0f]/[0.03] p-6"
            >
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-[#0f0f0f]/50">
                {category}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {items.map((item) => (
                  <SkillItem key={item} label={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 border-t border-[#0f0f0f]/10 pt-16">
          <h3 className="font-display text-2xl font-semibold sm:text-3xl">
            What I Bring
          </h3>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {VALUE_PROPS.map((prop) => (
              <div key={prop.title} ref={registerProp}>
                <h4 className="font-display text-base font-semibold sm:text-lg">
                  {prop.title}
                </h4>
                <p className="mt-2 text-sm text-[#0f0f0f]/70 sm:text-base">
                  {prop.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
