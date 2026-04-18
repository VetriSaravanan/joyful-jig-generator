import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase, BUCKETS } from "@/lib/supabase";
import { toast } from "sonner";
import { Card, Field, Button, ImageUpload, FormBlock, PageHeader, Save, NumberField } from "@/components/admin-ui";

export const Route = createFileRoute("/admin/home")({
  component: HomePage,
});

type Home = {
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

function HomePage() {
  const [data, setData] = useState<Home | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { load(); }, []);
  async function load() {
    const { data: rows, error } = await supabase
      .from("home_content")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1);
    if (error) { toast.error(error.message); return; }
    if (rows && rows.length) setData(rows[0] as Home);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    const { id, ...rest } = data;
    const { error } = await supabase.from("home_content")
      .update({ ...rest, updated_at: new Date().toISOString() }).eq("id", id);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Home content saved");
  }

  if (!data) return <div className="text-muted-foreground">Loading…</div>;
  const set = <K extends keyof Home>(k: K, v: Home[K]) => setData({ ...data, [k]: v });

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="Home Section" subtitle="Hero, CTAs and homepage stats" />
      <FormBlock onSubmit={save}>
        <Card>
          <h3 className="font-semibold mb-4">Hero</h3>
          <div className="space-y-4">
            <Field label="Title" value={data.hero_title} onChange={(v) => set("hero_title", v)} required />
            <Field label="Subtitle" value={data.hero_subtitle} onChange={(v) => set("hero_subtitle", v)} textarea />
            <div>
              <span className="block text-sm font-medium mb-1.5">Hero Background Image</span>
              <ImageUpload value={data.hero_bg_url} onChange={(u) => set("hero_bg_url", u)} bucket={BUCKETS.hero} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="CTA 1 Text" value={data.cta1_text} onChange={(v) => set("cta1_text", v)} />
              <Field label="CTA 1 Link" value={data.cta1_link} onChange={(v) => set("cta1_link", v)} />
              <Field label="CTA 2 Text" value={data.cta2_text} onChange={(v) => set("cta2_text", v)} />
              <Field label="CTA 2 Link" value={data.cta2_link} onChange={(v) => set("cta2_link", v)} />
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-4">Stats Counter</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <NumberField label="Years" value={data.stat_years} onChange={(v) => set("stat_years", v)} />
            <NumberField label="Students" value={data.stat_students} onChange={(v) => set("stat_students", v)} />
            <NumberField label="Teachers" value={data.stat_teachers} onChange={(v) => set("stat_teachers", v)} />
            <NumberField label="Branches" value={data.stat_branches} onChange={(v) => set("stat_branches", v)} />
          </div>
        </Card>

        <Button type="submit" disabled={saving}>
          <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save Home"}
        </Button>
      </FormBlock>
    </div>
  );
}
