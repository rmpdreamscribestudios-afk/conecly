import {
  Compass,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Search,
  Sprout,
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
  "Skill swaps",
  "Micro-volunteering",
  "Community events",
  "Local projects",
  "Borrow and lend",
  "Neighborhood asks",
];

export const nearbyOpenings = [
  ["Garden morning", "2 helpers wanted", "0.4 km"],
  ["Spanish practice circle", "Open invite", "0.8 km"],
  ["Borrow a projector", "Available this week", "1.2 km"],
];

export const communityFlow = [
  ["Notice", "See what is emerging close to home."],
  ["Offer", "Share time, skills, space, or a need."],
  ["Gather", "Meet around a clear local purpose."],
  ["Return", "Let trust and momentum compound."],
];
