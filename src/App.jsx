import { useEffect } from "react"
import { initSmoothScroll, destroySmoothScroll } from "./lib/smoothScroll"
import Hero from "./components/sections/Hero"
import HomeToJourney from "./components/sections/HomeToJourney"
import Journey from "./components/sections/Journey"
import Projects from "./components/sections/Projects"
import Skills from "./components/sections/Skills"
import Footer from "./components/sections/Footer"
import SectionTransition from "./components/layout/SectionTransition"

function App() {
  useEffect(() => {
    initSmoothScroll()
    return () => destroySmoothScroll()
  }, [])

  return (
    <main className="bg-[#cfc8b6] text-[#0f0f0f]">
      {/* Base intro sections flow naturally */}
      <Hero />
      <HomeToJourney />

      {/* Each section transitions smoothly without breaking child pinning */}
      <SectionTransition>
        <Journey />
      </SectionTransition>

      <SectionTransition>
        <Projects />
      </SectionTransition>

      <SectionTransition>
        <Skills />
      </SectionTransition>

      <Footer />
    </main>
  )
}

export default App