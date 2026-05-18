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
  { label: "How it works", href: "/#how" },
  { label: "About", href: "/about" },
  { label: "Profiles", href: "/profiles" },
  { label: "Create profile", href: "/#create-profile" },
  { label: "Waitlist", href: "/#waitlist" },
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
    id: "sample-maya",
    firstName: "Maya",
    city: "Parkdale",
    participationType: "Offer help",
    serviceCategory: "Cleaning",
    bio: "Reliable apartment resets, move-out cleans, and weekly upkeep for nearby homes.",
    availability: "Weekday mornings",
    rate: "$28/hr",
    contactMethod: "Email",
    contactDetails: "maya@example.com",
  },
  {
    id: "sample-jon",
    firstName: "Jon",
    city: "Roncesvalles",
    participationType: "Need help",
    serviceCategory: "Moving help",
    bio: "Looking for one extra set of hands to move a desk and boxes this Saturday morning.",
    availability: "Saturday morning",
    rate: "$40 flat",
    contactMethod: "Text message",
    contactDetails: "Text after 5pm",
  },
  {
    id: "sample-ari",
    firstName: "Ari",
    city: "Little Italy",
    participationType: "Offer help",
    serviceCategory: "Tutoring",
    bio: "Patient math and science tutoring for middle school students after school or weekends.",
    availability: "After school",
    rate: "$35/hr",
    contactMethod: "Email",
    contactDetails: "ari@example.com",
  },
  {
    id: "sample-nadia",
    firstName: "Nadia",
    city: "The Junction",
    participationType: "Both",
    serviceCategory: "Elder support",
    bio: "Friendly check-ins, grocery walks, and light home support for older neighbours.",
    availability: "Flexible afternoons",
    rate: "Volunteer or barter",
    contactMethod: "Phone",
    contactDetails: "Call for details",
  },
  {
    id: "sample-theo",
    firstName: "Theo",
    city: "Leslieville",
    participationType: "Need help",
    serviceCategory: "Pet care",
    bio: "Seeking occasional dog walks on long workdays from someone close by.",
    availability: "Occasional weekdays",
    rate: "$18/walk",
    contactMethod: "Email",
    contactDetails: "theo@example.com",
  },
  {
    id: "sample-sam",
    firstName: "Sam",
    city: "Kensington",
    participationType: "Offer help",
    serviceCategory: "Creative services",
    bio: "Simple poster, menu, and social graphics for local events and small businesses.",
    availability: "Evenings",
    rate: "Project-based",
    contactMethod: "Email",
    contactDetails: "sam@example.com",
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
