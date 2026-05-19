import { useEffect } from "react";
import { getBlogPost } from "./blogPosts";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Blog, { BlogArticle } from "./pages/Blog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Safety from "./pages/Safety";
import BlogPreview from "./sections/BlogPreview";
import CommunityFlow from "./sections/CommunityFlow";
import CreateProfile from "./sections/CreateProfile";
import Exchange from "./sections/Exchange";
import Hero from "./sections/Hero";
import HowItWorks from "./sections/HowItWorks";
import LocalOpportunities from "./sections/LocalOpportunities";
import Profiles, { ProfileDetail } from "./pages/Profiles";
import Waitlist from "./sections/Waitlist";
import WhoFor from "./sections/WhoFor";

export default function App() {
  const path = window.location.pathname;
  const isAboutPage = path === "/about";
  const isBlogPage = path === "/blog";
  const isBlogArticlePage = path.startsWith("/blog/");
  const blogSlug = isBlogArticlePage ? decodeURIComponent(path.replace("/blog/", "")) : "";
  const isPrivacyPolicyPage = path === "/privacy-policy";
  const isSafetyPage = path === "/safety";
  const isProfilesPage = path === "/profiles";
  const isProfileDetailPage = path.startsWith("/profiles/");

  useEffect(() => {
    const post = blogSlug ? getBlogPost(blogSlug) : null;
    const title = post
      ? `${post.title} | CONECLY`
      : isBlogPage
        ? "Community Stories & Tips | CONECLY"
        : isAboutPage
          ? "About | CONECLY"
          : isSafetyPage
            ? "Safety | CONECLY"
            : isPrivacyPolicyPage
              ? "Privacy Policy | CONECLY"
              : isProfilesPage || isProfileDetailPage
                ? "Local Profiles | CONECLY"
                : "CONECLY | Trusted local help nearby";
    const description = post
      ? post.summary
      : isBlogPage
        ? "Founder-led local stories, practical guides, safety tips, and community advice from CONECLY."
        : "CONECLY helps you offer support, ask for help, and connect with people close to home.";

    document.title = title;
    setMetaDescription(description);
  }, [blogSlug, isAboutPage, isBlogPage, isPrivacyPolicyPage, isProfileDetailPage, isProfilesPage, isSafetyPage]);

  return (
    <div className="min-h-screen bg-conecly-paper font-sans text-conecly-ink">
      <Header />
      <main>
        {isBlogArticlePage ? (
          <BlogArticle slug={blogSlug} />
        ) : isBlogPage ? (
          <Blog />
        ) : isProfileDetailPage ? (
          <ProfileDetail />
        ) : isAboutPage ? (
          <About />
        ) : isPrivacyPolicyPage ? (
          <PrivacyPolicy />
        ) : isSafetyPage ? (
          <Safety />
        ) : isProfilesPage ? (
          <Profiles />
        ) : (
          <>
            <Hero />
            <HowItWorks />
            <WhoFor />
            <Exchange />
            <LocalOpportunities />
            <CreateProfile />
            <Profiles headingLevel="h2" />
            <CommunityFlow />
            <BlogPreview />
            <Waitlist />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

function setMetaDescription(content) {
  let tag = document.querySelector('meta[name="description"]');

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", "description");
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}
