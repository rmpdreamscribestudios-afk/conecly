export const blogAuthors = {
  founder: {
    name: "CONECLY Team",
    role: "Founder/Admin",
    bio: "Founder-led notes from CONECLY on safer, calmer local connection.",
  },
};

export const blogPosts = [
  {
    slug: "moving-day-checklist-calm-local-move",
    title: "A calmer moving day checklist for local moves",
    summary:
      "A practical checklist for planning a small move, asking for help clearly, and keeping the day steady.",
    category: "Moving tips",
    publishedAt: "2026-05-18",
    image: "/assets/moving.png",
    authorKey: "founder",
    publishingStatus: "published",
    source: "admin",
    featured: true,
    readTime: "4 min read",
    sections: [
      {
        heading: "Start with the exact job",
        body: [
          "Before asking neighbours or local helpers, write down what the move actually involves. Count the stairs, name the heavy pieces, confirm elevator access, and be honest about boxes that still need packing.",
          "Clear details help the right person say yes. They also protect everyone from a job becoming bigger, longer, or more stressful than expected.",
        ],
      },
      {
        heading: "Make the day easier to say yes to",
        body: [
          "Share the pickup area, drop-off area, time window, expected length, payment or exchange, and whether tools such as dollies, straps, or blankets are available.",
          "If you are asking friends or neighbours, offer a simple plan: where to park, what to lift first, and what can wait. Small clarity is a kindness.",
        ],
      },
      {
        heading: "Keep safety ordinary and visible",
        body: [
          "Lift less than you think you can, take breaks, and avoid rushing awkward items through tight spaces. If a task feels unsafe, pause and change the plan.",
          "For new local connections, keep communication in writing until details are settled, meet in daylight when possible, and let someone know who is helping.",
        ],
      },
    ],
  },
  {
    slug: "move-out-cleaning-checklist",
    title: "A move-out cleaning checklist that feels manageable",
    summary:
      "A room-by-room guide for rental handoffs, shared homes, and last-minute apartment resets.",
    category: "Cleaning checklists",
    publishedAt: "2026-05-12",
    image: "/assets/cleaner.png",
    authorKey: "founder",
    publishingStatus: "published",
    source: "admin",
    featured: true,
    readTime: "5 min read",
    sections: [
      {
        heading: "Work from high to low",
        body: [
          "Start with shelves, fans, cabinets, and trim before floors. Dust and crumbs travel downward, so this order saves repeat work.",
          "Keep one bag for garbage, one box for items that belong elsewhere, and one small kit for cleaning supplies. Fewer decisions make the job lighter.",
        ],
      },
      {
        heading: "Focus on the handoff areas",
        body: [
          "Kitchens and bathrooms usually carry the most visual weight. Clean appliances, sinks, counters, mirrors, toilets, tubs, and the floor edges where dust gathers.",
          "Take quick photos when the space is finished, especially in rentals or shared homes. Good records can prevent confusion later.",
        ],
      },
      {
        heading: "Ask for local help early",
        body: [
          "If you need a cleaner, be specific about the square footage, rooms, timing, supplies, and whether the home will be empty.",
          "A clear request helps a local cleaner quote fairly and arrive prepared, which is better for both sides.",
        ],
      },
    ],
  },
  {
    slug: "caregiving-check-ins-for-neighbours",
    title: "Thoughtful check-ins for older neighbours and caregivers",
    summary:
      "Simple ways to offer practical support without overstepping boundaries or making assumptions.",
    category: "Caregiving advice",
    publishedAt: "2026-05-05",
    image: "/assets/caregiver.png",
    authorKey: "founder",
    publishingStatus: "published",
    source: "admin",
    featured: true,
    readTime: "3 min read",
    sections: [
      {
        heading: "Ask before helping",
        body: [
          "Good support starts with consent. Instead of taking over, ask what would actually be useful: groceries, a walk, a ride, a phone call, or help carrying something heavy.",
          "Respect a no. Trust grows when people feel they can accept help without losing control of their day.",
        ],
      },
      {
        heading: "Keep support specific",
        body: [
          "Specific offers are easier to accept than broad ones. Try a clear window, a clear task, and a clear boundary, such as picking up two grocery items after work.",
          "For caregivers, small reliable help can matter more than big promises. Consistency is part of care.",
        ],
      },
      {
        heading: "Notice safety without creating pressure",
        body: [
          "If something seems urgent or unsafe, contact emergency services or the appropriate local support first. Community help should not replace professional care in serious situations.",
          "For everyday support, communicate patiently, protect private information, and keep family or trusted contacts involved when the person wants that.",
        ],
      },
    ],
  },
  {
    slug: "new-to-calgary-first-local-steps",
    title: "New to Calgary: first local steps that help a place feel familiar",
    summary:
      "Grounded ideas for finding services, meeting neighbours, and learning a new city at a human pace.",
    category: "Calgary guides",
    publishedAt: "2026-04-28",
    image: "",
    authorKey: "founder",
    publishingStatus: "published",
    source: "admin",
    featured: false,
    readTime: "4 min read",
    sections: [
      {
        heading: "Build a small map first",
        body: [
          "Start with the places that make daily life work: groceries, transit stops, clinics, libraries, parks, repair shops, and community centres.",
          "A neighbourhood becomes less abstract when you know where to go for ordinary needs.",
        ],
      },
      {
        heading: "Look for repeated local rhythms",
        body: [
          "Farmers markets, library programs, school boards, community associations, and local volunteer groups can show how an area actually moves week to week.",
          "You do not need to join everything. Returning to one or two familiar places is often enough to begin feeling oriented.",
        ],
      },
      {
        heading: "Ask clearly and locally",
        body: [
          "When asking for recommendations, name your area, budget, timing, and what matters most. Good questions help neighbours give practical answers.",
          "CONECLY is being built for this kind of grounded local exchange: useful, respectful, and close to home.",
        ],
      },
    ],
  },
];

export function getPublishedPosts() {
  return blogPosts
    .filter((post) => post.publishingStatus === "published")
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

export function getFeaturedPosts(limit = 3) {
  return getPublishedPosts()
    .filter((post) => post.featured)
    .slice(0, limit);
}

export function getBlogPost(slug) {
  return getPublishedPosts().find((post) => post.slug === slug);
}

export function getAuthor(post) {
  return blogAuthors[post.authorKey] ?? blogAuthors.founder;
}

export function formatPostDate(date) {
  return new Intl.DateTimeFormat("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}
