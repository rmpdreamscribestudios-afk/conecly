import Footer from "./components/Footer";
import Header from "./components/Header";
import CommunityFlow from "./sections/CommunityFlow";
import CreateProfile from "./sections/CreateProfile";
import Exchange from "./sections/Exchange";
import Hero from "./sections/Hero";
import HowItWorks from "./sections/HowItWorks";
import LocalOpportunities from "./sections/LocalOpportunities";
import Profiles from "./pages/Profiles";
import Waitlist from "./sections/Waitlist";
import WhoFor from "./sections/WhoFor";

export default function App() {
  const isProfilesPage = window.location.pathname === "/profiles";

  return (
    <div className="min-h-screen bg-conecly-paper font-sans text-conecly-ink">
      <Header />
      <main>
        {isProfilesPage ? (
          <Profiles />
        ) : (
          <>
            <Hero />
            <HowItWorks />
            <WhoFor />
            <Exchange />
            <LocalOpportunities />
            <CreateProfile />
            <CommunityFlow />
            <Waitlist />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
