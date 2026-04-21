import { X } from "lucide-react";
import { MORE_ITEMS, NAV_ITEMS } from "./NavConfig";

type Props = {
  open: boolean;
  onClose: () => void;
  /** When true, show the entire primary list (used for tablet hamburger). When false, show only the overflow items (mobile "More"). */
  full?: boolean;
};

export function MoreSheet({ open, onClose, full = false }: Props) {
  if (!open) return null;
  const items = full ? NAV_ITEMS : MORE_ITEMS;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm md:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-3xl bg-card p-6 shadow-2xl md:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
        style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-play)", color: "var(--navy)" }}>
            {full ? "Menu" : "More"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-border hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
          >
            <X size={20} />
          </button>
        </div>

        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={onClose}
                  className="flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-border p-3 text-center transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 hover:[@media(hover:hover)]:-translate-y-1"
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow"
                    style={{ background: item.bg }}
                  >
                    <Icon size={22} />
                  </span>
                  <span
                    className="text-[11px] font-bold uppercase tracking-wide"
                    style={{ color: "var(--navy)", fontFamily: "var(--font-play)" }}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#contact"
          onClick={onClose}
          className="btn-toy btn-toy-primary mt-5 w-full justify-center"
        >
          ✨ Enroll Now
        </a>
      </div>
    </div>
  );
}
