import {
  Home,
  Palette,
  Image as ImageIcon,
  Phone,
  Info,
  BookOpen,
  Megaphone,
  MapPin,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  id: string;          // matches section id on the page
  href: string;        // anchor like #home
  label: string;       // short label for nav
  icon: LucideIcon;    // lucide icon
  emoji: string;       // playful emoji for desktop tiles
  bg: string;          // brand color token for desktop tile
  /** Visibility per shell */
  inDesktopTop: boolean;
  inMobileBottom: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { id: "home",          href: "#home",          label: "Home",     icon: Home,       emoji: "🏠", bg: "var(--crimson)", inDesktopTop: true,  inMobileBottom: true  },
  { id: "about",         href: "#about",         label: "About",    icon: Info,       emoji: "🧑‍🏫", bg: "var(--cyan)",   inDesktopTop: true,  inMobileBottom: false },
  { id: "programs",      href: "#programs",      label: "Programs", icon: Palette,    emoji: "🎨", bg: "var(--royal)",  inDesktopTop: true,  inMobileBottom: true  },
  { id: "gallery",       href: "#gallery",       label: "Gallery",  icon: ImageIcon,  emoji: "🖼️", bg: "var(--cyan)",   inDesktopTop: true,  inMobileBottom: true  },
  { id: "blogs",         href: "#blogs",         label: "Blogs",    icon: BookOpen,   emoji: "📚", bg: "var(--royal)",  inDesktopTop: true,  inMobileBottom: false },
  { id: "announcements", href: "#announcements", label: "Notices",  icon: Megaphone,  emoji: "📢", bg: "var(--crimson)",inDesktopTop: false, inMobileBottom: false },
  { id: "contact",       href: "#contact",       label: "Contact",  icon: Phone,      emoji: "📞", bg: "var(--cyan)",   inDesktopTop: true,  inMobileBottom: true  },
];

export const ENROLL = {
  id: "enroll",
  href: "#contact",
  label: "Enroll",
  icon: Sparkles,
};

export const MORE_ITEMS: NavItem[] = [
  { id: "about",         href: "#about",         label: "About",    icon: Info,      emoji: "🧑‍🏫", bg: "var(--cyan)",    inDesktopTop: false, inMobileBottom: false },
  { id: "blogs",         href: "#blogs",         label: "Blogs",    icon: BookOpen,  emoji: "📚",  bg: "var(--royal)",   inDesktopTop: false, inMobileBottom: false },
  { id: "announcements", href: "#announcements", label: "Notices",  icon: Megaphone, emoji: "📢",  bg: "var(--crimson)", inDesktopTop: false, inMobileBottom: false },
  { id: "branches",      href: "#contact",       label: "Branches", icon: MapPin,    emoji: "📍",  bg: "var(--royal)",   inDesktopTop: false, inMobileBottom: false },
];
