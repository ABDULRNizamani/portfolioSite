import Hero from "./components/sections/Hero"
import HomeToJourney from "./components/sections/HomeToJourney"
import Journey from "./components/sections/Journey"
import SectionTransition from "./components/layout/SectionTransition"
import Projects from "./components/sections/Projects"
import Footer from "./components/sections/Footer"
import Sidebar from "./components/sections/sidebar"

export default function App() {
  return (
    <main className="relative w-full bg-[#0f0f0f]">
      {/* 1. Hero stays completely full-width at the top */}
      <Hero />

      {/* 2. The main flex container for the Sidebar + Content */}
      <div className="flex w-full">
        
        {/* Sidebar pinned to the left */}
        <div className="sticky top-0 z-50 h-screen w-[280px] shrink-0">
          <Sidebar />
        </div>

        {/* 3. The scrolling content column on the right */}
        <div className="flex w-[calc(100%-280px)] flex-1 flex-col overflow-hidden">
          
          {/* Unchanged: Your animated feeder line component */}
          <HomeToJourney />
          
          {/* Unchanged: Journey section */}
          <Journey />

          {/* Unchanged: Safe wrapper for the 3D pinning effect */}
          <SectionTransition>
            <Projects />
          </SectionTransition>

          {/* Fade in footer as well */}
          <SectionTransition>
            <Footer />
          </SectionTransition>
          
        </div>
      </div>
    </main>
  )
}