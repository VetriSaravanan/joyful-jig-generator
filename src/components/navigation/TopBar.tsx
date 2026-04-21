import { useEffect, useState } from "react";
import { Menu, Phone, MessageCircle } from "lucide-react";
import { NAV_ITEMS } from "./NavConfig";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { MoreSheet } from "./MoreSheet";
import { useSiteContent } from "@/components/site-content";

export function TopBar() {
  const { settings } = useSiteContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const desktopItems = NAV_ITEMS.filter((i) => i.inDesktopTop);
  const active = useScrollSpy(desktopItems.map((i) => i.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const phone = settings?.phone1?.replace(/\s+/g, "") || "";
  const wa = settings?.wa_number?.replace(/\D+/g, "") || "";

  return (
    <>
      {/* Skip link for a11y */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <nav
        className="fixed left-0 right-0 top-0 z-50 transition-all"
        style={{
          backgroundColor: "oklch(0.97 0.02 60 / 0.97)",
          backdropFilter: "blur(12px)",
          borderBottom: "3px solid var(--navy)",
          padding: scrolled ? "8px 0 12px" : "12px 0 18px",
          boxShadow: scrolled ? "0 6px 20px oklch(0.27 0.12 275 / .15)" : "none",
        }}
        aria-label="Primary"
      >
        {/* Desktop hanging-rope */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 hidden lg:block"
          style={{
            top: scrolled ? 70 : 78,
            height: 2,
            background:
              "repeating-linear-gradient(90deg, var(--navy) 0 8px, transparent 8px 14px)",
            opacity: 0.35,
          }}
        />

        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-3 px-4 sm:px-6">
          {/* Logo */}
          <a href="#home" className="flex shrink-0 items-center gap-3">
            {settings?.logo_url ? (
              <img
                src={settings.logo_url}
                alt={settings.school_name || "Payitragam"}
                className="h-12 w-12 rounded-full border-2 object-cover sm:h-[54px] sm:w-[54px]"
                style={{ borderColor: "var(--cyan)" }}
              />
            ) : (
              <div
                className="flex items-center justify-center rounded-full font-bold"
                style={{
                  width: 48,
                  height: 48,
                  background: "var(--navy)",
                  fontFamily: "var(--font-play)",
                  fontSize: 22,
                  color: "var(--cream)",
                  border: "3px solid var(--cyan)",
                }}
              >
                P
              </div>
            )}
            <div className="leading-tight" style={{ fontFamily: "var(--font-play)" }}>
              <div className="text-[16px] font-bold sm:text-[18px]" style={{ color: "var(--navy)" }}>
                {settings?.school_name || "Payitragam"}
              </div>
              <div
                className="hidden text-[11px] font-medium xl:block"
                style={{ color: "var(--crimson)", fontFamily: "var(--font-body)" }}
              >
                {settings?.tagline || "E for Education, P for Payitragam"}
              </div>
            </div>
          </a>

          {/* Desktop hanging tiles */}
          <ul className="m-0 hidden list-none items-end gap-2 p-0 lg:flex">
            {desktopItems.map((l, idx) => {
              const isActive = active === l.id;
              const Icon = l.icon;
              const rest = idx % 2 === 0 ? "-3deg" : "3deg";
              const peak = idx % 2 === 0 ? "3deg" : "-3deg";
              return (
                <li key={l.id}>
                  <a
                    href={l.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`hang-tile-wrap ${isActive ? "is-active" : ""} focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 rounded-full`}
                    style={
                      {
                        animationDelay: `${idx * 0.12}s`,
                        ["--rest" as string]: rest,
                        ["--peak" as string]: peak,
                      } as React.CSSProperties
                    }
                  >
                    <span className="hang-tile" style={{ background: l.bg }} aria-hidden>
                      <span className="hidden xl:inline" style={{ fontSize: 26, lineHeight: 1 }}>
                        {l.emoji}
                      </span>
                      <Icon className="xl:hidden" size={22} />
                    </span>
                    <span className="hang-tile-label">{l.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right cluster */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Mobile quick-call icons */}
            {phone && (
              <a
                href={`tel:${phone}`}
                aria-label="Call us"
                className="flex h-11 w-11 items-center justify-center rounded-full md:hidden"
                style={{ background: "var(--cyan)", color: "var(--navy)" }}
              >
                <Phone size={20} />
              </a>
            )}
            {wa && (
              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full md:hidden"
                style={{ background: "#25D366", color: "#fff" }}
              >
                <MessageCircle size={20} />
              </a>
            )}

            {/* Enroll CTA — desktop + tablet */}
            <a
              href="#contact"
              className="btn-toy btn-toy-primary !hidden !py-2.5 !px-5 !text-sm md:!inline-flex"
            >
              ✨ Enroll Now
            </a>

            {/* Hamburger — tablet only */}
            <button
              className="hidden h-11 w-11 items-center justify-center rounded-full border-2 border-border md:flex lg:!hidden"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      <MoreSheet open={open} onClose={() => setOpen(false)} full />
    </>
  );
}
