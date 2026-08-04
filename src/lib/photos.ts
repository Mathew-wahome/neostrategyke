import session from "@/assets/photo-session.jpg";
import team from "@/assets/photo-team.jpg";
import systems from "@/assets/photo-systems.jpg";
import calm from "@/assets/photo-calm.jpg";
import workshop from "@/assets/photo-workshop.jpg";
import kit from "@/assets/photo-kit.jpg";
import coaching from "@/assets/photo-coaching.jpg";
import texture from "@/assets/photo-texture.jpg";
import founderAsset from "@/assets/mary-njoroge.png.asset.json";

export const founderPhoto = founderAsset.url;

export const photos = {
  session: {
    src: session,
    alt: "Operations consultant mapping a workflow with two founders in a Nairobi office",
  },
  team: {
    src: team,
    alt: "A small team mapping processes across a wall of notes and diagrams",
  },
  systems: {
    src: systems,
    alt: "Hands writing a system checklist beside a laptop showing an operations dashboard",
  },
  calm: {
    src: calm,
    alt: "A founder standing calmly at a window above the Nairobi skyline at golden hour",
  },
  workshop: {
    src: workshop,
    alt: "A facilitator walking a small group through a simple operations framework",
  },
  kit: {
    src: kit,
    alt: "The Service Founder Systems Starter Kit laid out as printed templates and dividers",
  },
  coaching: {
    src: coaching,
    alt: "A one-to-one coaching conversation between a consultant and a founder",
  },
  texture: {
    src: texture,
    alt: "Soft curved architectural forms in off-white and deep teal light",
  },
} as const;

export type Photo = (typeof photos)[keyof typeof photos];

export const carouselSlides = [
  {
    photo: photos.session,
    kicker: "The audit",
    title: "We map how the business actually runs",
    body: "Not how the org chart says it runs. Where the decisions bottleneck, where delivery leaks, where the founder is the single point of failure.",
  },
  {
    photo: photos.team,
    kicker: "The install",
    title: "The team gets systems they can stand on",
    body: "SOPs, delegation paths, onboarding, delivery rhythms. Built with your people, in your language, for the way you actually work.",
  },
  {
    photo: photos.workshop,
    kicker: "The training",
    title: "We teach the system, not just hand it over",
    body: "A system nobody understands is a document. We walk the team through it until it becomes how the business behaves.",
  },
  {
    photo: photos.systems,
    kicker: "The dashboard",
    title: "You see the business without being in it",
    body: "KPIs, reporting rhythms and reviews so you can tell whether the week worked without sitting inside every task.",
  },
  {
    photo: photos.calm,
    kicker: "The result",
    title: "The founder gets their attention back",
    body: "Calm execution: the business keeps moving on the days you are not in it, and grows on the days you are.",
  },
] as const;
