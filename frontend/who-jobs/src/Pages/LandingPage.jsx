import FinalCTA from "../Components/FinalCTA";
import { Footer } from "../Components/Footer";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import ShowcaseSection from "../Components/ShowcaseSection";
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
