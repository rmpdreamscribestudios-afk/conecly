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
  { label: "Local opportunities", href: "#opportunities" },
  { label: "Create profile", href: "#create-profile" },
  { label: "Waitlist", href: "#waitlist" },
];

export const serviceCategories = [
  "Cleaning",
  "Moving help",
  "Tutoring",
  "Caregiving",
  "Nanny / childcare",
  "Elder support",
  "Pet care",
  "Handyman",
  "Snow removal",
  "Yard work",
  "Event help",
  "Creative services",
  "Other",
];

export const sampleProfiles = [
  {
    name: "Maya",
    category: "Cleaning",
    area: "Parkdale",
    type: "Offer",
    text: "Reliable apartment resets, move-out cleans, and weekly upkeep for nearby homes.",
    contact: "Email Maya",
  },
  {
    name: "Jon",
    category: "Moving help",
    area: "Roncesvalles",
    type: "Request",
    text: "Looking for one extra set of hands to move a desk and boxes this Saturday morning.",
    contact: "Contact Jon",
  },
  {
    name: "Ari",
    category: "Tutoring",
    area: "Little Italy",
    type: "Offer",
    text: "Patient math and science tutoring for middle school students after school or weekends.",
    contact: "Email Ari",
  },
  {
    name: "Nadia",
    category: "Elder support",
    area: "The Junction",
    type: "Offer",
    text: "Friendly check-ins, grocery walks, and light home support for older neighbours.",
    contact: "Contact Nadia",
  },
  {
    name: "Theo",
    category: "Pet care",
    area: "Leslieville",
    type: "Request",
    text: "Seeking occasional dog walks on long workdays from someone close by.",
    contact: "Contact Theo",
  },
  {
    name: "Sam",
    category: "Creative services",
    area: "Kensington",
    type: "Offer",
    text: "Simple poster, menu, and social graphics for local events and small businesses.",
    contact: "Email Sam",
  },
];

export const steps = [
  {
    title: "Choose your area",
    text: "Tell CONECLY where nearby means for you.",
    icon: MapPin,
  },
  {
    title: "Find local help",
    text: "See offers, requests, small jobs, and community support close to home.",
    icon: Search,
  },
  {
    title: "Reach out simply",
    text: "Start with a clear need, a kind message, and a reason to connect.",
    icon: MessageCircle,
  },
];

export const audiences = [
  {
    title: "People new to a place",
    text: "Find friendly first steps, useful local groups, and people who make a place feel familiar.",
    icon: Compass,
  },
  {
    title: "Local makers and helpers",
    text: "Share skills, small services, tools, and invitations in a simple, personal way.",
    icon: Sprout,
  },
  {
    title: "Community organizers",
    text: "Share gatherings, calls for help, and regular ways for neighbours to show up.",
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
    text: "Trusted help for homes, rentals, events, and the cleanups that make life easier.",
    icon: Paintbrush,
    accent: "amber",
    tags: ["Homes", "Turnovers"],
  },
  {
    title: "Moving help",
    text: "Find extra hands for lifting, packing, small moves, and getting settled.",
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
    text: "Short, useful jobs for hosts, makers, students, freelancers, and neighbourhood teams.",
    icon: BriefcaseBusiness,
    accent: "emerald",
    tags: ["Shifts", "Projects"],
  },
  {
    title: "Community support",
    text: "Mutual aid, volunteer calls, elder check-ins, group rides, and neighbour-to-neighbour care.",
    icon: HeartHandshake,
    accent: "forest",
    tags: ["Mutual aid", "Care"],
  },
];

export const supportSignals = [
  {
    title: "Clear requests",
    text: "Each request explains the need, place, timing, and what kind of help is wanted.",
    icon: ShieldCheck,
  },
  {
    title: "Real people",
    text: "Profiles help support feel personal, respectful, and easier to trust.",
    icon: UsersRound,
  },
  {
    title: "Different ways to help",
    text: "Paid work, volunteering, lending, and shared projects can all live side by side.",
    icon: Sprout,
  },
];
