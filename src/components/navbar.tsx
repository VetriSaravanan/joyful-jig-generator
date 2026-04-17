import { useEffect, useState } from "react";

type LinkItem = {
  href: string;
  label: string;
  icon: string;        // emoji icon
  bg: string;          // background color (var)
  rest: string;        // rest rotation
  peak: string;        // peak rotation for swing
  delay: string;       // animation delay
};

const links: LinkItem[] = [
  { href: "#home",          label: "Home",     icon: "🏠", bg: "var(--crimson)", rest: "-4deg", peak: "4deg",  delay: "0s"   },
  { href: "#about",         label: "About",    icon: "🧑‍🏫", bg: "var(--cyan)",    rest: "3deg",  peak: "-3deg", delay: ".25s" },
  { href: "#programs",      label: "Programs", icon: "🎨", bg: "var(--royal)",   rest: "-3deg", peak: "3deg",  delay: ".5s"  },
  { href: "#playground",    label: "Play",     icon: "🛝", bg: "var(--crimson)", rest: "4deg",  peak: "-4deg", delay: ".15s" },
  { href: "#gallery",       label: "Gallery",  icon: "🖼️", bg: "var(--cyan)",    rest: "-3deg", peak: "3deg",  delay: ".4s"  },
  { href: "#blogs",         label: "Blogs",    icon: "📚", bg: "var(--royal)",   rest: "3deg",  peak: "-3deg", delay: ".6s"  },
  { href: "#announcements", label: "Notices",  icon: "📢", bg: "var(--crimson)", rest: "-4deg", peak: "4deg",  delay: ".1s"  },
  { href: "#reach-us",      label: "Contact",  icon: "📞", bg: "var(--cyan)",    rest: "3deg",  peak: "-3deg", delay: ".35s" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const ids = links.map((l) => l.href.slice(1));
      let cur = "home";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - 140 <= 0) cur = id;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all"
        style={{
          backgroundColor: "oklch(0.97 0.02 60 / 0.97)",
          backdropFilter: "blur(12px)",
          borderBottom: `3px solid var(--navy)`,
          padding: scrolled ? "8px 0 14px" : "12px 0 22px",
          boxShadow: scrolled ? "0 6px 20px oklch(0.27 0.12 275 / .15)" : "none",
        }}
      >
        {/* Top rail / "rope" line where tiles hang from */}
        <div
          aria-hidden
          className="hidden lg:block absolute left-0 right-0 pointer-events-none"
          style={{
            top: scrolled ? 70 : 78,
            height: 2,
            background:
              "repeating-linear-gradient(90deg, var(--navy) 0 8px, transparent 8px 14px)",
            opacity: .35,
          }}
        />

        <div className="max-w-[1320px] mx-auto px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 shrink-0">
            <div
              className="flex items-center justify-center rounded-full font-bold"
              style={{
                width: 54, height: 54,
                background: "var(--navy)",
                fontFamily: "var(--font-play)",
                fontSize: 26,
                color: "var(--cream)",
                border: "3px solid var(--cyan)",
                boxShadow: "0 4px 12px oklch(0.27 0.12 275 / .35)",
              }}
            >
              P
            </div>
            <div className="leading-tight" style={{ fontFamily: "var(--font-play)" }}>
              <div className="text-[18px] font-bold" style={{ color: "var(--navy)" }}>Payitragam</div>
              <div className="text-[11px] font-medium" style={{ color: "var(--crimson)", fontFamily: "var(--font-body)" }}>
                E for Education, P for Payitragam
              </div>
            </div>
          </a>

          {/* Desktop hanging tiles */}
          <ul className="hidden lg:flex items-end gap-2 list-none m-0 p-0">
            {links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`hang-tile-wrap ${isActive ? "is-active" : ""}`}
                    style={
                      {
                        animationDelay: l.delay,
                        ["--rest" as string]: l.rest,
                        ["--peak" as string]: l.peak,
                      } as React.CSSProperties
                    }
                  >
                    <span
                      className="hang-tile"
                      style={{ background: l.bg }}
                      aria-hidden
                    >
                      <span style={{ fontSize: 26, lineHeight: 1, filter: "drop-shadow(0 1px 0 rgba(0,0,0,.15))" }}>
                        {l.icon}
                      </span>
                    </span>
                    <span className="hang-tile-label">{l.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <a href="#reach-us" className="btn-toy btn-toy-primary hidden md:inline-flex !py-2.5 !px-6 !text-sm shrink-0">
            ✨ Enroll Now
          </a>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] cursor-pointer p-1.5"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span style={{ width: 26, height: 3, background: "var(--navy)", borderRadius: 2 }} />
            <span style={{ width: 26, height: 3, background: "var(--navy)", borderRadius: 2 }} />
            <span style={{ width: 26, height: 3, background: "var(--navy)", borderRadius: 2 }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="fixed left-0 right-0 z-40 lg:hidden p-4"
          style={{
            top: 84,
            background: "var(--background)",
            borderBottom: "3px solid var(--navy)",
            boxShadow: "0 8px 24px oklch(0.27 0.12 275 / .15)",
          }}
        >
          <ul className="list-none grid grid-cols-4 gap-3 m-0 p-2">
            {links.map((l) => (
              <li key={l.href} className="flex justify-center">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex flex-col items-center gap-1.5"
                >
                  <span
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: 56, height: 56,
                      background: l.bg,
                      border: "3px solid #fff",
                      boxShadow: "0 4px 0 oklch(0 0 0 / .15), 0 8px 18px oklch(0.27 0.12 275 / .25)",
                      fontSize: 24,
                    }}
                  >
                    {l.icon}
                  </span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wide"
                    style={{ color: "var(--navy)", fontFamily: "var(--font-play)" }}
                  >
                    {l.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#reach-us"
            onClick={() => setOpen(false)}
            className="btn-toy btn-toy-primary w-full justify-center mt-4 !py-3"
          >
            ✨ Enroll Now
          </a>
        </div>
      )}
    </>
  );
}
