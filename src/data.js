import {
  BookOpenCheck,
  BriefcaseBusiness,
  Compass,
  HeartHandshake,
  Home,
  MapPin,
  MessageCircle,
  PackageCheck,
  Paintbrush,
  Search,
  ShieldCheck,
  Sprout,
  UsersRound,
} from "lucide-react";

export const navigation = [
  { label: "How it works", href: "#how" },
  { label: "For locals", href: "#people" },
  { label: "Exchange", href: "#exchange" },
  { label: "Waitlist", href: "#waitlist" },
];

export const steps = [
  {
    title: "Set your local radius",
    text: "Choose the neighborhoods and nearby places that actually shape your day.",
    icon: MapPin,
  },
  {
    title: "Discover what is open",
    text: "See invitations, skills, events, requests, and local exchanges gathered into one living feed.",
    icon: Search,
  },
  {
    title: "Connect with context",
    text: "Reach out with a shared purpose, a gentle introduction, and fewer awkward cold starts.",
    icon: MessageCircle,
  },
];

export const audiences = [
  {
    title: "People new to a place",
    text: "Find welcoming first steps, useful nearby groups, and people who make a city feel more knowable.",
    icon: Compass,
  },
  {
    title: "Local makers and helpers",
    text: "Share skills, small services, resources, and invitations without needing to become a brand.",
    icon: Sprout,
  },
  {
    title: "Community organizers",
    text: "Surface gatherings, calls for help, and recurring opportunities with a calm, trusted presence.",
    icon: HeartHandshake,
  },
];

export const exchangeItems = [
  "Local services",
  "Cleaning jobs",
  "Moving help",
  "Tutors",
  "Local gigs",
  "Community support",
];

export const nearbyOpenings = [
  ["Apartment reset", "Cleaner needed Friday", "0.4 km"],
  ["Math confidence", "Tutor for grade 8", "0.8 km"],
  ["Move a bookcase", "Two helpers wanted", "1.2 km"],
];

export const communityFlow = [
  ["Ask", "Post a specific local need with timing, place, and intent."],
  ["Match", "Find nearby people with the right skill, availability, or care."],
  ["Help", "Coordinate the job, lesson, errand, or support moment clearly."],
  ["Return", "Let trust, reputation, and opportunity compound locally."],
];

export const localOpportunities = [
  {
    title: "Local services",
    text: "Everyday help from people nearby: repairs, errands, setup, prep, and practical support.",
    icon: Home,
    accent: "teal",
    tags: ["Repairs", "Errands"],
  },
  {
    title: "Cleaning jobs",
    text: "Trusted home, rental, and event resets with clear expectations before anyone arrives.",
    icon: Paintbrush,
    accent: "amber",
    tags: ["Homes", "Turnovers"],
  },
  {
    title: "Moving help",
    text: "Find extra hands for lifts, packing, small moves, and the awkward parts of transition.",
    icon: PackageCheck,
    accent: "clay",
    tags: ["Lifting", "Packing"],
  },
  {
    title: "Tutors",
    text: "Local subject support, language practice, music lessons, and confidence-building sessions.",
    icon: BookOpenCheck,
    accent: "lilac",
    tags: ["Lessons", "Practice"],
  },
  {
    title: "Local gigs",
    text: "Short, useful jobs for hosts, makers, students, freelancers, and neighborhood teams.",
    icon: BriefcaseBusiness,
    accent: "emerald",
    tags: ["Shifts", "Projects"],
  },
  {
    title: "Community support",
    text: "Mutual aid, volunteer calls, elder check-ins, group rides, and neighbor-to-neighbor care.",
    icon: HeartHandshake,
    accent: "forest",
    tags: ["Mutual aid", "Care"],
  },
];

export const supportSignals = [
  {
    title: "Verified intent",
    text: "Requests frame the need, neighborhood, timing, and expected exchange before people connect.",
    icon: ShieldCheck,
  },
  {
    title: "Human context",
    text: "Profiles and local circles make support feel less anonymous and more accountable.",
    icon: UsersRound,
  },
  {
    title: "Opportunity exchange",
    text: "Money, barter, volunteering, lending, and shared projects can sit in one calm local layer.",
    icon: Sprout,
  },
];
