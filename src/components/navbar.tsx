import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#programs", label: "Programs" },
  { href: "#playground", label: "Playground" },
  { href: "#gallery", label: "Gallery" },
  { href: "#blogs", label: "Blogs" },
  { href: "#announcements", label: "Notices" },
  { href: "#reach-us", label: "Contact" },
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
        if (el && el.getBoundingClientRect().top - 130 <= 0) cur = id;
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
          backgroundColor: "oklch(0.99 0.012 80 / 0.96)",
          backdropFilter: "blur(12px)",
          borderBottom: `3px solid var(--border)`,
          padding: scrolled ? "6px 0" : "10px 0",
          boxShadow: scrolled ? "0 6px 20px oklch(0 0 0 / .06)" : "none",
        }}
      >
        <div className="max-w-[1240px] mx-auto px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-full text-secondary font-bold"
              style={{
                width: 52, height: 52,
                background: "var(--navy)",
                fontFamily: "var(--font-play)",
                fontSize: 26,
                color: "var(--secondary)",
                boxShadow: "0 4px 12px oklch(0.71 0.18 40 / .3)",
              }}
            >
              P
            </div>
            <div className="leading-tight" style={{ fontFamily: "var(--font-play)" }}>
              <div className="text-[17px] text-navy" style={{ color: "var(--navy)" }}>Payitragam</div>
              <div className="text-[11px] font-medium" style={{ color: "var(--primary)", fontFamily: "var(--font-body)" }}>
                E for Education, P for Payitragam
              </div>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1 list-none">
            {links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm font-semibold px-3.5 py-2 rounded-full transition-colors"
                    style={{
                      color: isActive ? "var(--primary)" : "var(--foreground)",
                      backgroundColor: isActive ? "oklch(0.71 0.18 40 / .12)" : "transparent",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <a href="#reach-us" className="btn-toy btn-toy-primary hidden sm:inline-flex !py-2.5 !px-6 !text-sm">
            ✨ Enroll Now
          </a>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] cursor-pointer p-1.5"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span style={{ width: 26, height: 2.5, background: "var(--navy)", borderRadius: 2, transition: ".3s" }} />
            <span style={{ width: 26, height: 2.5, background: "var(--navy)", borderRadius: 2 }} />
            <span style={{ width: 26, height: 2.5, background: "var(--navy)", borderRadius: 2 }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="fixed left-0 right-0 z-40 lg:hidden p-4"
          style={{
            top: 76,
            background: "var(--background)",
            borderBottom: "3px solid var(--border)",
            boxShadow: "0 8px 24px oklch(0 0 0 / .08)",
          }}
        >
          <ul className="list-none space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl font-semibold text-[15px]"
                  style={{ color: "var(--navy)" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#reach-us"
                onClick={() => setOpen(false)}
                className="btn-toy btn-toy-primary w-full justify-center mt-3 !py-3"
              >
                ✨ Enroll Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
