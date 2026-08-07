
import Hero from "../Components/landing/Hero";
import Navbar from "../Components/landing/Navbar";
import ShowcaseSection from "../Components/landing/ShowcaseSection";
import FinalCTA from "../Components/landing/FinalCTA";
import Footer from "../Components/landing/Footer"
import { useRole } from "../Hooks/useRole";
import { COLORS } from "../Utils/colors";

export default function LandingPage() {
  const { role, setRole, data } = useRole("candidato");

  return (
    <div className="min-h-screen w-full font-body" style={{ backgroundColor: COLORS.cream }}>
      <Navbar role={role} setRole={setRole} />
      <Hero role={role} setRole={setRole} data={data} />
      <ShowcaseSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
