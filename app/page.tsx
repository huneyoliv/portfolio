import { Header } from "../components/Header"
import { Hero } from "../components/Hero"
import { About } from "../components/About"
import { Skills } from "../components/Skills"
import { Projects } from "../components/Projects"
import { Education } from "../components/Education"
import { Contact } from "../components/Contact"
import { Footer } from "../components/Footer"
import { AppProvider } from "../contexts/AppContext"

export default function Home() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </AppProvider>
  )
}
