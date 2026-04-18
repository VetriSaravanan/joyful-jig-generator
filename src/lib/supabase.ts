import { createClient } from "@supabase/supabase-js";

// External Supabase project (publishable key only — never paste secret keys client-side)
const SUPABASE_URL = "https://YOUR-PROJECT-REF.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_gEyZpzyR2Pi2XF_UTiMzog_04IcJaAC";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: "payitragam-auth",
  },
});

// Storage bucket names (must match buckets created in Supabase Storage)
export const BUCKETS = {
  logos: "logos",
  gallery: "gallery",
  team: "team-photos",
  blogs: "blog-covers",
  sections: "section-photos",
  hero: "hero-images",
} as const;

export async function uploadFile(bucket: string, file: File, prefix = ""): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${prefix}${prefix ? "/" : ""}${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
