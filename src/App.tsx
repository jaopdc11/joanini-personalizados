import { Hero } from '@/components/sections/Hero'
import { Differentials } from '@/components/sections/Differentials'
import { About } from '@/components/sections/About'
import { Categories } from '@/components/sections/Categories'
import { Gallery } from '@/components/sections/Gallery'
import { HowToOrder } from '@/components/sections/HowToOrder'
import { Testimonials } from '@/components/sections/Testimonials'
import { Faq } from '@/components/sections/Faq'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'
import { ScriptDivider } from '@/components/decor/ScriptDivider'
import { SakuraRain } from '@/components/decor/SakuraRain'

import { StickyWhatsApp } from '@/components/ui/StickyWhatsApp'
import { Navbar } from '@/components/ui/Navbar'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <SakuraRain count={6} opacity={0.5} />
        <Hero />
        <ScriptDivider variant="heart" />
        <Differentials />
        <About />
        <Categories />
        <ScriptDivider variant="heart" text="vem ver" />
        <Gallery />
        <HowToOrder />
        <Testimonials />
        <Faq />
        <Contact />
        <Footer />
        <StickyWhatsApp />
      </main>
    </>
  )
}
