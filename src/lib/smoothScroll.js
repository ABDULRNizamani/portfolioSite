// Wires Lenis (smooth scroll) to GSAP's ticker/ScrollTrigger, per Phase 0's
// requirement: Lenis's raf loop is driven by gsap.ticker (not a separate
// requestAnimationFrame loop), and Lenis's scroll events push updates into
// ScrollTrigger. Without this sync, scrub-linked animations (Journey's
// timeline line) visibly lag behind the actual scroll position.
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "./gsap"

let lenis = null
let tickerCallback = null

export function initSmoothScroll() {
  if (lenis) return lenis

  lenis = new Lenis({
    autoRaf: false,
  })

  lenis.on("scroll", ScrollTrigger.update)

  tickerCallback = (time) => {
    // gsap.ticker reports elapsed time in seconds; Lenis expects ms.
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(tickerCallback)
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function destroySmoothScroll() {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback)
    tickerCallback = null
  }
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
}

export function getLenis() {
  return lenis
}

/**
 * Smooth-scrolls to a target (selector string, element, or offset) using
 * Lenis so anchor-link clicks and programmatic scrolls share the exact same
 * eased motion as manual scrolling.
 */
export function scrollToTarget(target, options = {}) {
  if (lenis) {
    lenis.scrollTo(target, {
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options,
    })
    return
  }
  // Fallback if Lenis hasn't initialized yet for some reason.
  if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" })
  }
}
