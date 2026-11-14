import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ProblemSection from '../components/ProblemSection'
import SolutionSection from '../components/SolutionSection'
import LearningPreview from '../components/LearningPreview'
import ScamDemo from '../components/ScamDemo'
import QuizPreview from '../components/QuizPreview'
import ProgressPreview from '../components/ProgressPreview'
import AudienceSection from '../components/AudienceSection'
import ResourcesSection from '../components/ResourcesSection'
import ImpactSection from '../components/ImpactSection'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <LearningPreview />
        <ScamDemo />
        <QuizPreview />
        <ProgressPreview />
        <AudienceSection />
        <ResourcesSection />
        <ImpactSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
