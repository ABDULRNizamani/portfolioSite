// Central GSAP setup — registers ScrollTrigger once, module-level, so any
// file that imports `gsap`/`ScrollTrigger` from here is guaranteed the
// plugin is already registered regardless of import order.
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
