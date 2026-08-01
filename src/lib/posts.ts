export type Post = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readingTime: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "founder-dependency-is-a-design-problem",
    title: "Founder dependency is a design problem",
    category: "Systems",
    excerpt:
      "If the business stops when you step away, that is not a discipline issue. It is a structure that was never drawn.",
    date: "2026-07-14",
    readingTime: "5 min read",
    body: [
      "Most founders describe the same week. The inbox sets the agenda, the team waits for answers, and the work that would actually move the business forward keeps sliding to next week.",
      "The instinct is to treat this as a personal failing: better focus, earlier mornings, a stricter calendar. But the pattern repeats across very different founders with very different habits, which tells you it is not about the person.",
      "It is about design. A business that was never built to run without its founder will always route every decision back through them. Redesign the routing and the week changes, without anyone working harder.",
      "Start by writing down every decision that only you can make this week. That list is your roadmap.",
    ],
  },
  {
    slug: "what-calm-execution-actually-looks-like",
    title: "What calm execution actually looks like",
    category: "Operations",
    excerpt:
      "Calm is not a mood. It is what a business feels like when delivery is predictable and the team knows what happens next.",
    date: "2026-06-28",
    readingTime: "4 min read",
    body: [
      "Calm execution is often mistaken for slowness. It is the opposite. A calm business moves faster because nothing waits for a decision that has already been made once.",
      "In practice it looks like this: delivery follows the same shape every time, ownership is obvious, and the weekly rhythm surfaces problems before clients do.",
      "None of that requires more software. It requires the handful of systems that hold the business together to be written down, agreed, and actually used.",
    ],
  },
  {
    slug: "the-first-three-systems-to-install",
    title: "The first three systems to install",
    category: "Playbook",
    excerpt:
      "Before dashboards and automations, three systems carry most of the weight in a service business.",
    date: "2026-06-09",
    readingTime: "6 min read",
    body: [
      "Client onboarding, delivery, and the weekly operating rhythm. Install those three and most of the daily chaos in a service business quietly disappears.",
      "Onboarding sets the expectation. Delivery makes the work repeatable. The weekly rhythm is where the business looks at itself honestly, on a schedule, instead of only when something breaks.",
      "Everything else — reporting, KPIs, automation — sits on top of these. Build them in the wrong order and the top layer keeps collapsing.",
    ],
  },
];

export function findPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
