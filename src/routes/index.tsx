import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ClipboardList,
  Compass,
  GaugeCircle,
  HelpCircle,
  Inbox,
  LayoutGrid,
  PlaneTakeoff,
  RefreshCw,
  Users,
} from "lucide-react";
import { ActionLink } from "@/components/ActionButton";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Marquee } from "@/components/Marquee";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { SplitHeading } from "@/components/SplitHeading";
import {
  BeforeAfter,
  ChalkChecklist,
  Chalkboard,
  DependencyDial,
  FlowBoard,
  ProductGlyph,
  StickyWall,
  SymptomGrid,
  Whiteboard,
} from "@/components/Explainers";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neostrategy — Build a business that does not depend on you" },
      {
        name: "description",
        content:
          "Systems and Operations Strategy for founder-led service businesses in Nairobi and across East Africa. We find where your business depends on you, then build what lets the work move without you.",
      },
      { property: "og:title", content: "Neostrategy — Build a business that does not depend on you" },
      {
        property: "og:description",
        content:
          "You do not have a motivation problem. You have a founder dependency problem. We build the systems that fix it.",
      },

      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const stages = [
  {
    label: "Start small",
    title: "The Clarity Session",
    body: "One hour on the thing that is stuck right now. You leave with a straight answer and a clear next step.",
    glyph: "dial",
    icon: Compass,
  },
  {
    label: "Start here",
    title: "The Founder Operating Systems Audit",
    body: "We map how your business actually runs and find where it depends on you. You keep the diagnosis and the plan.",
    glyph: "map",
    icon: LayoutGrid,
  },
  {
    label: "Then build",
    title: "The Calm Execution Install",
    body: "Thirty days to build the systems the Audit found. Map, Define, Install, Embed.",
    glyph: "stack",
    icon: ClipboardList,
  },
  {
    label: "Then keep it alive",
    title: "The Founder Operations Partnership",
    body: "Ongoing operational support so the systems change as the business changes, without creating a new dependency.",
    glyph: "checklist",
    icon: GaugeCircle,
  },
  {
    label: "Then earn beyond your time",
    title: "The Wealth Arc",
    body: "Once the business runs without you, we turn what you know into assets that earn beyond your calendar.",
    glyph: "book",
    icon: Compass,
  },
] as const;


const symptoms = [
  { icon: Inbox, text: "Your inbox decides your day before you do." },
  { icon: Users, text: "The team waits for you before anything moves." },
  { icon: RefreshCw, text: "The same five questions come back every week." },
  { icon: HelpCircle, text: "You are the only person who knows the answers." },
  { icon: ClipboardList, text: "Monday is for the business. By Wednesday you are back inside it." },
  { icon: PlaneTakeoff, text: "No real holiday, because you are not sure it would hold." },
];

const principles = [
  {
    title: "Your client journey ends when you get paid, not when you deliver.",
    body: "Getting paid is part of the system, not the admin afterwards.",
  },
  {
    title: "We write things down for the next two people.",
    body: "Your staff will move on. That is the reason to document, not to skip it.",
  },
  {
    title: "You keep the relationship. The work moves behind you.",
    body: "Your clients still get you. You stop being the person doing everything.",
  },
  {
    title: "Moving fast is not the problem.",
    body: "Keep the speed. Remove the parts that break under it.",
  },
];

const installBoards = [
  {
    kicker: "The audit",
    title: "We map how the business actually runs",
    kind: "flow" as const,
  },
  {
    kicker: "The install",
    title: "The team gets systems they can stand on",
    kind: "stack" as const,
  },
  {
    kicker: "The training",
    title: "We teach the system, not just hand it over",
    kind: "checklist" as const,
  },
  {
    kicker: "The dashboard",
    title: "You see the business without being in it",
    kind: "dial" as const,
  },
];

const heroHeadline = "Your business is growing but everything still comes back to you.";

function Hero() {
  const reduced = useReducedMotion();
  const words = heroHeadline.split(" ");

  return (
    <section className="gradient-page relative overflow-hidden">
      <div className="container-page relative grid items-center gap-10 pt-14 pb-12 md:pt-20 md:pb-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
        <div>
          <motion.p
            className="font-ui text-[0.66rem] uppercase tracking-[0.3em] text-primary"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Operations consultancy · Nairobi, working across East Africa
          </motion.p>

          <h1 className="font-display mt-5 text-[2.4rem] leading-[1.05] md:text-[3.4rem] lg:text-[3.9rem]">
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className={`inline-block ${i >= words.length - 4 ? "text-gradient-teal" : ""}`}
                initial={reduced ? false : { opacity: 0, y: 22, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.05 * i, ease: [0.22, 0.61, 0.36, 1] }}
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </h1>

          <Reveal delay={0.4} className="mt-6 max-w-xl">
            <p className="text-lg leading-relaxed text-foreground/80">
              Your team waits for your decisions. Clients still need you personally. The same
              questions land in your inbox every week. The more revenue you make, the harder it gets
              to step away.
            </p>
            <p className="font-display mt-4 text-xl leading-snug md:text-2xl">
              You do not have a motivation problem. You have a founder dependency problem.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">
              We find where your business depends on you. Then we build what lets the work move
              without you holding every piece.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ActionLink to="/contact" size="lg" className="group sm:flex-1">
                Find out where you are the bottleneck
                <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </ActionLink>
              <ActionLink to="/newsletter" variant="outline" size="lg" className="sm:flex-1">
                Get the free Flow Map
              </ActionLink>
            </div>
            <p className="font-ui mt-4 text-sm text-muted-foreground">
              Book a strategic call. We will identify what is keeping you in the middle, and what
              needs to change first.
            </p>
          </Reveal>
        </div>


        <motion.div
          initial={reduced ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <Whiteboard
            kicker="The founder bottleneck"
            title="Where does the work stop?"
            caption="Every arrow that passes through you is a queue."
          >
            <FlowBoard
              steps={[
                { label: "Enquiry", leak: "you reply" },
                { label: "Proposal", leak: "you write it" },
                { label: "Delivery", leak: "you check it" },
                { label: "Paid", leak: "you chase it" },
              ]}
            />
            <div className="mt-6 border-t border-dashed border-primary/25 pt-5">
              <DependencyDial
                value={82}
                label="of the steps above cannot finish without the founder."
                caption="This is the number the Audit moves."
              />
            </div>
          </Whiteboard>
        </motion.div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <>
      <Hero />

      {/* The problem — signals, not paragraphs */}
      <section className="border-t border-border/60">
        <div className="container-page section-y grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <Reveal>
            <p className="font-ui text-[0.66rem] uppercase tracking-[0.28em] text-primary">
              The problem
            </p>
            <p className="font-display mt-4 text-2xl leading-snug md:text-[2.05rem]">
              You built a successful business. Somewhere along the way, you became its operating
              system.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-foreground/80">
              Your knowledge lives in your head. Your processes live in scattered documents,
              WhatsApp messages and people&rsquo;s memories. Your team has responsibilities, but not
              clear ownership. Your tools exist, but they do not talk to each other. And the
              decisions only you can make keep multiplying.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">
              This is not because you are disorganised. It is because the business was built around
              you.
            </p>
            <p className="font-hand mt-5 inline-block -rotate-1 rounded-sm bg-note-yellow px-3 py-1.5 text-2xl text-charcoal">
              That is a design problem. Design problems can be fixed.
            </p>
          </Reveal>


          <Reveal delay={0.1}>
            <Whiteboard kicker="Six signals" title="Tick the ones you recognise">
              <SymptomGrid items={symptoms} />
            </Whiteboard>
          </Reveal>
        </div>
      </section>

      {/* Built for how business actually works here */}
      <section className="gradient-deep relative overflow-hidden text-offwhite">
        <div className="container-page section-y relative">
          <Reveal className="max-w-3xl">
            <p className="font-ui text-[0.66rem] uppercase tracking-[0.28em] text-offwhite/70">
              Why most systems advice does not work here
            </p>
          </Reveal>
          <SplitHeading
            text="Built for how business actually works here."
            className="font-display mt-4 max-w-3xl text-[2.05rem] leading-[1.08] md:text-5xl"
          />

          <div className="mt-9 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <Chalkboard kicker="The playbook problem" title="The books assume a market you are not in.">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="font-ui text-[0.58rem] uppercase tracking-[0.24em] text-offwhite/50">
                    The textbook assumes
                  </p>
                  <ChalkChecklist
                    className="mt-3 opacity-60"
                    items={[
                      "Clients who pay on time",
                      "Plenty of good people to hire",
                      "Contracts that hold",
                      "Customers happy to be handed over",
                    ]}
                  />
                </div>
                <div>
                  <p className="font-ui text-[0.58rem] uppercase tracking-[0.24em] text-offwhite/50">
                    Your actual week
                  </p>
                  <ChalkChecklist
                    className="mt-3"
                    items={[
                      "Late payment is normal, not unusual",
                      "You will train the same role three times",
                      "A contract is a starting point",
                      "Your best client will call you anyway",
                    ]}
                  />
                </div>
              </div>
              <p className="font-chalk mt-6 text-xl text-offwhite/85">
                So we build differently.
              </p>
            </Chalkboard>

            <div className="grid gap-px overflow-hidden rounded-xl border border-offwhite/12 bg-offwhite/12 sm:grid-cols-2 lg:grid-cols-1">
              {principles.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.06}>
                  <div className="group h-full bg-[color-mix(in_oklab,var(--charcoal)_55%,transparent)] p-6 transition-colors duration-500 hover:bg-[color-mix(in_oklab,var(--teal)_18%,transparent)]">
                    <span className="font-ui text-[0.58rem] uppercase tracking-[0.3em] text-offwhite/45">
                      0{i + 1}
                    </span>
                    <h3 className="font-display mt-3 text-lg leading-snug text-offwhite md:text-xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-offwhite/70">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "Founder Operating Systems Audit",
          "Calm Execution Install",
          "Client flow to cash",
          "SOPs and delegation",
          "Team accountability",
          "Operations partnership",
        ]}
      />

      {/* What we install */}
      <section className="gradient-wash border-y border-border/50">
        <div className="container-page section-y">
          <Reveal className="max-w-3xl">
            <p className="font-ui text-[0.66rem] uppercase tracking-[0.28em] text-primary">
              What we install
            </p>
            <h2 className="font-display mt-4 text-3xl leading-tight md:text-[2.6rem]">
              Not advice. Not a strategy deck. We build the thing.
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {installBoards.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.07}>
                <div className="lift flex h-full flex-col rounded-lg border border-border/70 bg-background/70 p-4">
                  <div className="h-32 overflow-hidden rounded-md">
                    <ProductGlyph kind={b.kind} />
                  </div>
                  <p className="font-ui mt-4 text-[0.6rem] uppercase tracking-[0.26em] text-primary">
                    {b.kicker}
                  </p>
                  <p className="font-display mt-2 text-lg leading-snug">{b.title}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-6">
            <BeforeAfter
              before={{
                title: "Before the install",
                items: [
                  "Answers live in the founder's head",
                  "Delivery changes with whoever is free",
                  "Cash arrives whenever someone remembers to chase",
                  "Holidays cost more than they are worth",
                ],
              }}
              after={{
                title: "After the install",
                items: [
                  "Answers live in a place the team can reach",
                  "Delivery holds whoever runs it",
                  "Invoicing and follow-up are part of the flow",
                  "The business keeps its promises while you are away",
                ],
              }}
            />
          </Reveal>
        </div>
      </section>

      {/* The path */}
      <section className="border-t border-border/60">
        <div className="container-page section-y">
          <Reveal className="max-w-2xl">
            <p className="font-ui text-[0.66rem] uppercase tracking-[0.28em] text-primary">
              How we work together
            </p>
            <h2 className="font-display mt-4 text-3xl leading-tight md:text-4xl">
              First we free you from the business. Then we help you earn more from what you know.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">
              You do not have to commit to a giant transformation. We start with the problem that
              matters most.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {stages.map((stage, i) => (
              <Reveal key={stage.title} delay={i * 0.08}>
                <article className="lift group flex h-full flex-col rounded-lg border border-border/70 bg-background/60 p-4">
                  <div className="h-28 overflow-hidden rounded-md">
                    <ProductGlyph kind={stage.glyph} />
                  </div>
                  <p className="font-ui mt-4 flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.26em] text-primary">
                    <stage.icon className="size-3.5" />
                    {stage.label}
                  </p>
                  <h3 className="font-display mt-2 text-lg leading-tight">{stage.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/75">{stage.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-8">
            <ActionLink to="/services" variant="outline" className="group">
              See how we work
              <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </ActionLink>
          </Reveal>
        </div>
      </section>

      {/* Four clients at a time */}
      <section className="border-t border-border/60">
        <div className="container-page section-y grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <p className="font-ui text-[0.66rem] uppercase tracking-[0.28em] text-primary">
              Four clients at a time
            </p>
            <h2 className="font-display mt-4 text-3xl leading-tight md:text-[2.4rem]">
              We work with four businesses at a time.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">
              Doing this properly means being inside a business, not advising it from outside. Four
              is what one practice can do well.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <StickyWall
              columns="grid-cols-1 xs:grid-cols-2"
              notes={[
                { label: "Seat 01", text: "In the business weekly, not on a monthly call." },
                { label: "Seat 02", text: "Built with your team, in your language." },
                { label: "Seat 03", text: "We stay until it holds without us." },
                { label: "Seat 04", text: "Sometimes booked. Always worth the wait." },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* Why Neostrategy */}
      <section className="border-t border-border/60 bg-teal-wash">
        <div className="container-page section-y grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <p className="font-ui text-[0.66rem] uppercase tracking-[0.28em] text-primary">
              Why Neostrategy
            </p>
            <h2 className="font-display mt-4 text-3xl leading-tight md:text-[2.4rem]">
              We do not advise from the sidelines. We build inside the business.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground/80">
              Most consultants hand you recommendations. We build the systems with you, using the
              real work, the real clients, the real team and the real bottlenecks.
            </p>
            <p className="font-display mt-4 text-xl">We build the thing.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <StickyWall
              columns="grid-cols-1 xs:grid-cols-2"
              notes={[
                { label: "Worthless", text: "A process document nobody follows" },
                { label: "Worthless", text: "A dashboard nobody looks at" },
                { label: "Worthless", text: "A system that only works when you are there" },
                { label: "Worth building", text: "Operations that hold on the hard days" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* Products */}

      <section className="border-t border-border/60">
        <div className="container-page section-y grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <Whiteboard kicker="The shelf" title="Same frameworks, packaged">
              <div className="grid grid-cols-3 gap-3">
                {(["book", "grid", "map"] as const).map((k) => (
                  <div key={k} className="h-24 overflow-hidden rounded-md">
                    <ProductGlyph kind={k} />
                  </div>
                ))}
              </div>
            </Whiteboard>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-ui text-[0.66rem] uppercase tracking-[0.28em] text-primary">
              Products
            </p>
            <h2 className="font-display mt-4 text-3xl leading-tight md:text-4xl">
              Not ready to work together? Start with the tools.
            </h2>
            <p className="mt-4 text-lg text-foreground/75">
              The same frameworks we use with clients, packaged so you can use them yourself.
            </p>
            <ActionLink to="/shop" className="mt-7">
              See the tools
            </ActionLink>
          </Reveal>
        </div>
      </section>

      {/* The free guide */}
      <section className="gradient-deep relative overflow-hidden text-offwhite">
        <div className="container-page section-y relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight md:text-5xl">
              Before you write another SOP, work out which ones you actually need.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-offwhite/85">
              Most founders know they need systems. They just do not know which ones to build first.
              So they start documenting everything, get overwhelmed, then stop.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-offwhite/85">
              The Founder&rsquo;s Flow Map is the one page we use to see how work really moves
              through a business. It shows you the five things worth documenting first. Free. No
              funnel. No endless emails.
            </p>
            <NewsletterForm
              tone="dark"
              className="mt-7 max-w-xl"
              source="home"
              cta="Send me the free Flow Map"
            />

          </Reveal>
          <Reveal delay={0.1}>
            <Chalkboard kicker="Inside the map" title="First message → money landed">
              <ChalkChecklist
                items={[
                  "Where enquiries actually arrive",
                  "Who decides, and how long they take",
                  "The handover that keeps dropping",
                  "The step nobody owns",
                  "The five processes to write down first",
                ]}
              />
            </Chalkboard>
          </Reveal>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
