import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { brand } from "@/lib/brand";
import mark from "@/assets/ns-mark.png";
import markLight from "@/assets/ns-mark-light.png";
import { ActionLink } from "./ActionButton";
import { NewsletterForm } from "./NewsletterForm";
import { ScrollProgress } from "./ScrollProgress";
import type { ReactNode } from "react";

const nav = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/shop", label: "Products" },
  { to: "/blog", label: "Blog" },
  { to: "/newsletter", label: "Free guide" },
  { to: "/contact", label: "Contact" },
] as const;

function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      to="/"
      aria-label={`${brand.name} home`}
      className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
    >
      <img
        src={dark ? markLight : mark}
        alt={`${brand.name} monogram`}
        width={512}
        height={524}
        className="h-9 w-auto shrink-0 transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:h-10 md:h-11"
      />
      <div className="flex min-w-0 flex-col">
        <span
          className={`font-display truncate text-base leading-none tracking-tight transition-colors sm:text-lg md:text-xl ${
            dark ? "text-offwhite" : "text-foreground"
          }`}
        >
          {brand.name}
        </span>
        <span
          className={`font-ui mt-0.5 truncate text-[9px] uppercase tracking-[0.16em] transition-colors sm:text-[10px] sm:tracking-[0.22em] ${
            dark ? "text-offwhite/70" : "text-muted-foreground"
          }`}
        >
          Founder Operating System
        </span>
      </div>
    </Link>
  );
}


function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-sm">
      <div className="container-page grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 md:flex md:h-20 md:justify-between">
        <Wordmark />
        <nav className="font-ui hidden items-center gap-8 text-sm md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="link-sweep text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <ActionLink to="/contact" size="sm" variant="primary">
            Book a call
          </ActionLink>
        </div>
        <button
          className="-mr-1 shrink-0 justify-self-end p-1 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="font-ui container-page flex flex-col gap-1 py-4 text-sm">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-2 text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <ActionLink to="/contact" size="sm" className="mt-3 self-start" onClick={() => setOpen(false)}>
              Book a call
            </ActionLink>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-teal-deep text-offwhite">
      <div className="container-page py-14 md:py-28">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:gap-16">
          <Link to="/" aria-label={`${brand.name} home`} className="group flex flex-col items-start gap-3">
            <img
              src={markLight}
              alt={`${brand.name} monogram`}
              width={512}
              height={524}
              className="h-20 w-auto opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.04] md:h-24"
            />
            <div className="flex flex-col">
              <span className="font-display text-2xl leading-none tracking-tight text-offwhite md:text-3xl">
                {brand.name}
              </span>
              <span className="font-ui mt-1 text-[10px] uppercase tracking-[0.22em] text-offwhite/70">
                Founder Operating System
              </span>
            </div>
          </Link>
          <p className="font-display max-w-2xl text-2xl leading-tight md:text-3xl">{brand.tagline}</p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-ui text-xs uppercase tracking-[0.18em] text-offwhite/60">
              The weekly letter
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-offwhite/85">
              The Founder&rsquo;s Flow Map, free, plus one letter a week.
            </p>
            <NewsletterForm tone="dark" className="mt-5 max-w-md" source="footer" />
          </div>

          <div className="font-ui text-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-offwhite/60">Explore</p>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-offwhite/85 transition-colors hover:text-offwhite">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="font-ui text-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-offwhite/60">Contact</p>
            <ul className="mt-4 space-y-2 text-offwhite/85">
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="transition-colors hover:text-offwhite"
                >
                  {brand.email}
                </a>
              </li>
              <li>{brand.location}</li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-offwhite">
                  Book a discovery call
                </Link>
              </li>

              {brand.linkedinUrl ? (
                <li>
                  <a
                    href={brand.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-offwhite"
                  >
                    LinkedIn
                  </a>
                </li>
              ) : null}
              <li>
                <a href={`https://${brand.domain}`} className="transition-colors hover:text-offwhite">
                  {brand.domain}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="font-ui mt-16 flex flex-col justify-between gap-4 border-t border-offwhite/15 pt-8 text-xs text-offwhite/60 sm:flex-row">
          <p>© 2026 {brand.name}. Built so the business can run without you.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="transition-colors hover:text-offwhite">
              Terms
            </Link>
            <Link to="/privacy" className="transition-colors hover:text-offwhite">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
