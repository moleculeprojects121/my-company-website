"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

const SERVICES = [
  {
    icon: "design",
    title: "Product Design",
    desc: "User-centered interfaces that feel effortless and look stunning on every screen.",
  },
  {
    icon: "code",
    title: "Web Development",
    desc: "Fast, accessible, and scalable web apps built with modern best practices.",
  },
  {
    icon: "mobile",
    title: "Mobile Apps",
    desc: "Native-quality iOS and Android experiences your users will love to open.",
  },
  {
    icon: "target",
    title: "Brand Strategy",
    desc: "Positioning and identity systems that make your product impossible to ignore.",
  },
  {
    icon: "cloud",
    title: "Cloud & DevOps",
    desc: "Resilient infrastructure and CI/CD pipelines that scale with your growth.",
  },
  {
    icon: "growth",
    title: "Growth & SEO",
    desc: "Data-driven strategies that turn traffic into loyal, paying customers.",
  },
];

const PROJECTS = [
  { title: "Finflow", category: "Fintech · Web App", gradient: "from-indigo-500 to-purple-500" },
  { title: "Verdant", category: "E-commerce · Branding", gradient: "from-emerald-500 to-teal-400" },
  { title: "Pulse Health", category: "Healthcare · Mobile App", gradient: "from-rose-500 to-orange-400" },
  { title: "Northstar", category: "SaaS · Dashboard", gradient: "from-sky-500 to-indigo-500" },
  { title: "Cargo Bay", category: "Logistics · Platform", gradient: "from-amber-500 to-rose-500" },
  { title: "Loop Studio", category: "Media · Website", gradient: "from-violet-500 to-fuchsia-500" },
];

const TESTIMONIALS = [
  {
    quote:
      "Orbit rebuilt our entire platform in under three months without missing a single deadline. The quality bar was unreal.",
    name: "Sarah Chen",
    role: "CEO, Northstar",
    initials: "SC",
  },
  {
    quote: "The best design partner we’ve worked with. They think like founders, not just vendors.",
    name: "Marcus Reyes",
    role: "Head of Product, Finflow",
    initials: "MR",
  },
  {
    quote: "Communication was flawless and the end result exceeded what we imagined possible.",
    name: "Priya Nair",
    role: "Founder, Verdant",
    initials: "PN",
  },
];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" className="h-5 w-5">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" className="h-5 w-5">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function ServiceIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    design: <path d="M12 3l1.9 4.3L18 9l-4.1 1.7L12 15l-1.9-4.3L6 9l4.1-1.7L12 3z" />,
    code: <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12" />,
    mobile: (
      <>
        <rect x="7" y="3" width="10" height="18" rx="2" />
        <path d="M11 18h2" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
      </>
    ),
    cloud: <path d="M6.5 18a4.5 4.5 0 010-9 5.5 5.5 0 0110.6-1.6A4 4 0 0117.5 15H6.5z" />,
    growth: <path d="M4 17l5-5 3 3 7-8M13 7h6v6" />,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      {paths[name]}
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.9 3.9 6.7-6.7a1 1 0 011.4 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6z" />
    </svg>
  );
}

function Navbar({ onNavigate }: { onNavigate: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/10 bg-slate-950/80 py-3 backdrop-blur-xl" : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-400 to-sky-400 text-sm font-bold text-slate-950">
            O
          </span>
          Orbit
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-slate-300 transition hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={onNavigate}
            className="rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:scale-105 hover:shadow-indigo-500/40"
          >
            Get Started
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-96 border-t border-white/10" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 bg-slate-950/95 px-6 py-4 backdrop-blur-xl">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onNavigate();
            }}
            className="mt-2 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onNavigate }: { onNavigate: () => void }) {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 animate-blob rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="animation-delay-2000 absolute right-1/4 top-20 h-96 w-96 animate-blob rounded-full bg-sky-500/20 blur-3xl" />
        <div className="animation-delay-4000 absolute bottom-0 left-1/3 h-96 w-96 animate-blob rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute inset-0 bg-grid" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Trusted by 500+ teams worldwide
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Crafting Digital Products That{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Drive Growth
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              We partner with ambitious teams to design, build, and scale digital experiences — from the first pixel
              to production.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={onNavigate}
                className="w-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/40 sm:w-auto"
              >
                Get Started
              </button>
              <a
                href="#portfolio"
                className="w-full rounded-full border border-white/15 px-8 py-3.5 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5 sm:w-auto"
              >
                View Our Work
              </a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-20">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Trusted by teams at</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
                {["Nova", "Fluxwave", "Cobalt", "Halogen", "Vertex", "Ember"].map((brand) => (
                  <span key={brand} className="text-lg font-semibold tracking-tight text-slate-300">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function About() {
  const stats = [
    { value: "120+", label: "Projects delivered" },
    { value: "98%", label: "Client satisfaction" },
    { value: "12", label: "Years of experience" },
    { value: "40+", label: "Team experts" },
  ];

  const highlights = [
    "Senior product designers & engineers",
    "Transparent process, weekly demos",
    "Scalable architecture from day one",
    "Post-launch support & iteration",
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-400">About us</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A team obsessed with building things that matter
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-400">
              Founded by designers and engineers who were tired of shipping mediocre software, Orbit brings together
              strategy, design, and engineering under one roof — so your product moves fast without breaking quality.
            </p>
            <ul className="mt-8 space-y-4">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
                    <CheckIcon />
                  </span>
                  <span className="text-sm text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-sky-400/10 blur-2xl" />
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
                <div className="grid grid-cols-2 gap-8">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-3xl font-bold text-white sm:text-4xl">{stat.value}</p>
                      <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-400">Services</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to ship faster
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            End-to-end product capabilities so you can move from idea to launch without juggling five different
            vendors.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-indigo-500/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-400 text-white transition group-hover:scale-110">
                  <ServiceIcon name={service.icon} />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{service.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-400">Portfolio</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Selected work we’re proud of
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            A glimpse at the products, platforms, and brands we’ve helped bring to life.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.title} delay={i * 80}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/10">
                <div
                  className={`flex h-64 items-center justify-center bg-gradient-to-br ${project.gradient} transition duration-500 group-hover:scale-110`}
                >
                  <span className="text-2xl font-bold text-white/90">{project.title}</span>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent p-6 opacity-0 transition duration-300 group-hover:opacity-100">
                  <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300">{project.category}</p>
                  <p className="mt-1 text-lg font-semibold text-white">{project.title}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-400">Testimonials</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Loved by teams around the world
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <StarIcon key={starIndex} />
                  ))}
                </div>
                <p className="mt-6 flex-1 text-sm leading-relaxed text-slate-300">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 text-sm font-semibold text-white">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
  }

  const contactDetails = [
    { label: "Email", value: "hello@orbit.studio" },
    { label: "Phone", value: "+1 (555) 012-3456" },
    { label: "Office", value: "148 King St, San Francisco, CA" },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-400">Contact</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Let’s build something great together
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400">
              Tell us about your project and we’ll get back to you within one business day.
            </p>

            <div className="mt-10 space-y-6">
              {contactDetails.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-white/10 bg-white/5 text-indigo-300">
                    •
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-slate-500">{item.label}</p>
                    <p className="text-sm font-medium text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="text-xs font-medium uppercase tracking-widest text-slate-400">
                    Name
                  </label>
                  <input
                    id="name"
                    required
                    type="text"
                    placeholder="Jane Doe"
                    className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-400/50 focus:bg-white/10"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="email" className="text-xs font-medium uppercase tracking-widest text-slate-400">
                    Email
                  </label>
                  <input
                    id="email"
                    required
                    type="email"
                    placeholder="jane@company.com"
                    className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-400/50 focus:bg-white/10"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="text-xs font-medium uppercase tracking-widest text-slate-400">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-400/50 focus:bg-white/10"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/40"
              >
                {status === "sent" ? "Message Sent ✓" : "Send Message"}
              </button>
              {status === "sent" && (
                <p className="mt-3 text-center text-sm text-emerald-400">Thanks! We’ll be in touch soon.</p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const columns = [
    { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
    { title: "Company", links: ["About", "Careers", "Blog", "Press"] },
    { title: "Resources", links: ["Documentation", "Guides", "Support", "API Status"] },
  ];

  return (
    <footer className="relative border-t border-white/10 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2">
            <a href="#home" className="flex items-center gap-2 text-lg font-semibold text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-400 to-sky-400 text-sm font-bold text-slate-950">
                O
              </span>
              Orbit
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              We design and build digital products for ambitious teams around the world.
            </p>
            <div className="mt-6 flex gap-3">
              {["X", "in", "gh"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-xs text-slate-300 transition hover:border-indigo-400/40 hover:text-white"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-white">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-400 transition hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">© Orbit Studio. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="#" className="transition hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const router = useRouter();
  const goToGetStarted = () => router.push("/get-started");

  return (
    <>
      <Navbar onNavigate={goToGetStarted} />
      <main className="overflow-x-hidden bg-slate-950">
        <Hero onNavigate={goToGetStarted} />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
