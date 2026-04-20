import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";

export type SiteSettings = {
  id: string;
  school_name: string;
  tagline: string;
  logo_url: string | null;
  favicon_url: string | null;
  phone1: string;
  phone2: string;
  email: string;
  fb_url: string | null;
  ig_url: string | null;
  yt_url: string | null;
  wa_number: string;
};

export type HomeContent = {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_bg_url: string | null;
  cta1_text: string;
  cta1_link: string;
  cta2_text: string;
  cta2_link: string;
  stat_years: number;
  stat_students: number;
  stat_teachers: number;
  stat_branches: number;
};

export type AboutContent = {
  id: string;
  who_we_are_text: string;
  mission: string;
  vision: string;
};

export type SectionContent = {
  id: string;
  section_key: string;
  title: string;
  description: string;
  features: string[];
  photos: string[];
};

export type GalleryCategory = { id: string; name: string; slug: string; order_index: number };
export type GalleryImage = { id: string; image_url: string; caption: string | null; category_id: string | null; order_index: number };
export type BlogPost = { id: string; title: string; slug: string; excerpt: string | null; author: string; cover_url: string | null; status: string; created_at: string };
export type Announcement = { id: string; title: string; description: string | null; badge_color: string; is_pinned: boolean; announcement_date: string };
export type Branch = { id: string; branch_name: string; address: string; map_embed_url: string | null; phone: string; order_index: number };

type SiteContentValue = {
  loading: boolean;
  settings: SiteSettings | null;
  home: HomeContent | null;
  about: AboutContent | null;
  sections: SectionContent[];
  galleryCategories: GalleryCategory[];
  galleryImages: GalleryImage[];
  blogs: BlogPost[];
  announcements: Announcement[];
  branches: Branch[];
};

const SiteContentContext = createContext<SiteContentValue | null>(null);

async function loadLatestRow<T>(table: string) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1);

  if (error) return null;
  return ((data?.[0] as T | undefined) ?? null);
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<SiteContentValue>({
    loading: true,
    settings: null,
    home: null,
    about: null,
    sections: [],
    galleryCategories: [],
    galleryImages: [],
    blogs: [],
    announcements: [],
    branches: [],
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [
        settings,
        home,
        about,
        sectionsRes,
        galleryCategoriesRes,
        galleryImagesRes,
        blogsRes,
        announcementsRes,
        branchesRes,
      ] = await Promise.all([
        loadLatestRow<SiteSettings>("site_settings"),
        loadLatestRow<HomeContent>("home_content"),
        loadLatestRow<AboutContent>("about_content"),
        supabase.from("sections_content").select("*").order("section_key"),
        supabase.from("gallery_categories").select("*").order("order_index"),
        supabase.from("gallery_images").select("*").order("order_index").order("created_at", { ascending: false }),
        supabase.from("blogs").select("id,title,slug,excerpt,author,cover_url,status,created_at").eq("status", "published").order("created_at", { ascending: false }),
        supabase.from("announcements").select("id,title,description,badge_color,is_pinned,announcement_date").order("is_pinned", { ascending: false }).order("announcement_date", { ascending: false }),
        supabase.from("branches").select("*").order("order_index"),
      ]);

      if (cancelled) return;

      setValue({
        loading: false,
        settings,
        home,
        about,
        sections: ((sectionsRes.data ?? []) as SectionContent[]).map((item) => ({
          ...item,
          features: Array.isArray(item.features) ? item.features : [],
          photos: Array.isArray(item.photos) ? item.photos : [],
        })),
        galleryCategories: (galleryCategoriesRes.data ?? []) as GalleryCategory[],
        galleryImages: (galleryImagesRes.data ?? []) as GalleryImage[],
        blogs: (blogsRes.data ?? []) as BlogPost[],
        announcements: (announcementsRes.data ?? []) as Announcement[],
        branches: (branchesRes.data ?? []) as Branch[],
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const memoValue = useMemo(() => value, [value]);

  return <SiteContentContext.Provider value={memoValue}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent must be used inside SiteContentProvider");
  return ctx;
}