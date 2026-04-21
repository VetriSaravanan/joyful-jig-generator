import { useState } from "react";
import { Sparkles, MoreHorizontal } from "lucide-react";
import { NAV_ITEMS } from "./NavConfig";
import { useScrollSpy, useScrollDirection } from "@/hooks/use-scroll-spy";
import { MoreSheet } from "./MoreSheet";

export function BottomNav() {
  const items = NAV_ITEMS.filter((i) => i.inMobileBottom);
  const active = useScrollSpy(NAV_ITEMS.map((i) => i.id));
  const hidden = useScrollDirection();
  const [moreOpen, setMoreOpen] = useState(false);

  // Insert FAB slot in middle. items has 4 entries (Home, Programs, Gallery, Contact).
  // Layout: Home | Programs | [FAB Enroll] | Gallery | Contact. We'll render 5 cells with FAB in center, plus a "More" trigger replaces last? No — keep 4 nav + center FAB.
  const left = items.slice(0, 2);
  const right = items.slice(2, 4);

  return (
    <>
      <nav
        aria-label="Primary mobile"
        className={`fixed inset-x-0 bottom-0 z-50 transition-transform duration-200 md:hidden ${hidden ? "translate-y-full" : "translate-y-0"}`}
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div
          className="relative mx-auto flex h-16 items-stretch justify-between border-t-2 bg-card/95 px-2 backdrop-blur"
          style={{
            borderColor: "var(--border)",
            boxShadow: "0 -8px 24px oklch(0.27 0.12 275 / .15)",
          }}
        >
          {left.map((item) => (
            <BottomItem key={item.id} item={item} active={active === item.id} />
          ))}

          {/* Center FAB Enroll */}
          <a
            href="#contact"
            aria-label="Enroll Now"
            className="relative -mt-6 flex h-14 w-14 items-center justify-center self-start rounded-full text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            style={{
              background: "var(--crimson)",
              border: "4px solid var(--cream)",
              boxShadow: "0 6px 0 oklch(0.42 0.18 25), 0 12px 24px oklch(0.60 0.22 25 / .45)",
            }}
          >
            <Sparkles size={24} />
          </a>

          {right.map((item) => (
            <BottomItem key={item.id} item={item} active={active === item.id} />
          ))}

          {/* More trigger (small, top-right corner of bar) */}
          <button
            type="button"
            aria-label="More menu"
            onClick={() => setMoreOpen(true)}
            className="absolute -top-3 right-2 flex h-7 w-7 items-center justify-center rounded-full border-2 bg-card shadow"
            style={{ borderColor: "var(--border)", color: "var(--navy)" }}
          >
            <MoreHorizontal size={14} />
          </button>
        </div>
      </nav>

      <MoreSheet open={moreOpen} onClose={() => setMoreOpen(false)} />
    </>
  );
}

function BottomItem({ item, active }: { item: (typeof NAV_ITEMS)[number]; active: boolean }) {
  const Icon = item.icon;
  return (
    <a
      href={item.href}
      aria-current={active ? "page" : undefined}
      className="relative flex min-w-[56px] flex-1 flex-col items-center justify-center gap-0.5 px-1 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      style={{ color: active ? "var(--crimson)" : "var(--navy)" }}
    >
      {active && (
        <span
          aria-hidden
          className="absolute left-1/2 top-0 h-[3px] w-8 -translate-x-1/2 rounded-full"
          style={{ background: "var(--crimson)" }}
        />
      )}
      <Icon size={22} strokeWidth={active ? 2.5 : 2} />
      <span
        className="text-[10px] font-bold uppercase tracking-wide"
        style={{ fontFamily: "var(--font-play)" }}
      >
        {item.label}
      </span>
    </a>
  );
}
