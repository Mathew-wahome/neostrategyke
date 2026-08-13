import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { brand } from "@/lib/brand";
import mark from "@/assets/ns-mark.png.asset.json";
import markLight from "@/assets/ns-mark-light.png.asset.json";
import { ActionLink } from "./ActionButton";
import { NewsletterForm } from "./NewsletterForm";
import { ScrollProgress } from "./ScrollProgress";
import type { ReactNode } from "react";

const nav = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/shop", label: "Shop" },
  { to: "/blog", label: "Blog" },
  { to: "/newsletter", label: "Free guide" },
  { to: "/contact", label: "Contact" },
] as const;

function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" aria-label={`${brand.name} home`} className="group inline-flex items-center">
      <img
        src={dark ? markLight.url : mark.url}
        alt={`${brand.name} monogram`}
        width={512}
        height={524}
        className="h-11 w-auto transition-transform duration-500 ease-out group-hover:scale-[1.04] md:h-12"
      />
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-sm">
      <div className="container-page flex h-20 items-center justify-between">
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
          className="md:hidden"
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
      <div className="container-page py-20 md:py-28">
        <p className="font-display max-w-2xl text-3xl leading-tight md:text-4xl">{brand.tagline}</p>

        <div className="mt-16 grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-ui text-xs uppercase tracking-[0.18em] text-offwhite/60">
              The weekly letter
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-offwhite/85">
              10 Systems Every Founder Needs, free, plus one letter a week.
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
              <li>{brand.email}</li>
              <li>{brand.location}</li>
              <li>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-offwhite"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="font-ui mt-16 flex flex-col justify-between gap-4 border-t border-offwhite/15 pt-8 text-xs text-offwhite/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {brand.name}. Founded by {brand.founder}.
          </p>
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
