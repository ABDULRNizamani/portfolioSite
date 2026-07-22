import { useEffect, useRef } from "react"
import { gsap } from "../../lib/gsap"

export default function SectionTransition({ children }) {
  const wrapperRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Strictly animating opacity prevents the browser from creating a new 
      // containing block. This ensures GSAP's pin inside the Projects component 
      // anchors to the actual viewport screen and waits for the horizontal scroll to finish.
      gsap.fromTo(
        wrapperRef.current,
        { 
          opacity: 0.15,
        },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 85%",
            end: "top 20%",
            scrub: true,
          },
        }
      )
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    // No 'will-change', 'filter', or 'transform' classes here
    <div ref={wrapperRef} className="relative w-full">
      {children}
    </div>
  )
}