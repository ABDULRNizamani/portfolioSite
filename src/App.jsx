import { useEffect } from "react"
import { initSmoothScroll, destroySmoothScroll } from "./lib/smoothScroll"
import Hero from "./components/sections/Hero"
import Journey from "./components/sections/Journey"
import Projects from "./components/sections/Projects"
import Skills from "./components/sections/Skills"
import Footer from "./components/sections/Footer"

function App() {
  useEffect(() => {
    initSmoothScroll()
    return () => destroySmoothScroll()
  }, [])

  return (
    <main className="bg-[#cfc8b6] text-[#0f0f0f]">
      <Hero />
      <Journey />
      <Projects />
      <Skills />
      <Footer />
    </main>
  )
}

export default App
