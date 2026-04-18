import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase, BUCKETS, uploadFile } from "@/lib/supabase";
import { toast } from "sonner";
import { Card, Field, Button, FormBlock, PageHeader, Save, Trash2, Upload, Plus, X } from "@/components/admin-ui";

export const Route = createFileRoute("/admin/sections")({
  component: SectionsPage,
});

type Section = {
  id: string;
  section_key: string;
  title: string;
  description: string;
  features: string[];
  photos: string[];
};

const KEYS = [
  { key: "playground", label: "Playground" },
  { key: "nursery", label: "Nursery" },
  { key: "junior_kg", label: "Junior KG" },
  { key: "senior_kg", label: "Senior KG" },
];

function SectionsPage() {
  const [activeKey, setActiveKey] = useState("playground");
  const [data, setData] = useState<Section | null>(null);
  const [newFeature, setNewFeature] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => { load(activeKey); }, [activeKey]);
  async function load(k: string) {
    setData(null);
    const { data: row, error } = await supabase
      .from("sections_content").select("*").eq("section_key", k).maybeSingle();
    if (error) { toast.error(error.message); return; }
    if (row) {
      setData({
        ...row,
        features: Array.isArray(row.features) ? row.features : [],
        photos: Array.isArray(row.photos) ? row.photos : [],
      } as Section);
    } else {
      setData({ id: "", section_key: k, title: "", description: "", features: [], photos: [] });
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    const payload = {
      section_key: data.section_key,
      title: data.title,
      description: data.description,
      features: data.features,
      photos: data.photos,
      updated_at: new Date().toISOString(),
    };
    const { error } = data.id
      ? await supabase.from("sections_content").update(payload).eq("id", data.id)
      : await supabase.from("sections_content").insert(payload);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Saved");
    load(activeKey);
  }

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length || !data) return;
    setUploading(true);
    try {
      const urls = await Promise.all(files.map((f) => uploadFile(BUCKETS.sections, f, data.section_key)));
      setData({ ...data, photos: [...data.photos, ...urls] });
      toast.success(`Uploaded ${urls.length} image(s)`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  if (!data) return <div className="text-muted-foreground">Loading…</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader title="Programs Content" subtitle="Edit Playground / Nursery / Junior KG / Senior KG" />

      <div className="flex flex-wrap gap-2">
        {KEYS.map((k) => (
          <button
            key={k.key}
            onClick={() => setActiveKey(k.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeKey === k.key ? "bg-primary text-primary-foreground" : "bg-card border hover:bg-muted"
            }`}
          >
            {k.label}
          </button>
        ))}
      </div>

      <FormBlock onSubmit={save}>
        <Card>
          <Field label="Title" value={data.title} onChange={(v) => setData({ ...data, title: v })} required />
          <div className="mt-4">
            <Field label="Description" value={data.description} onChange={(v) => setData({ ...data, description: v })} textarea rows={4} />
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-3">Key Features</h3>
          <ul className="space-y-2 mb-3">
            {data.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg">
                <span className="flex-1 text-sm">✓ {f}</span>
                <button
                  type="button"
                  onClick={() => setData({ ...data, features: data.features.filter((_, idx) => idx !== i) })}
                  className="text-destructive p-1 hover:bg-destructive/10 rounded"
                  aria-label="Remove feature"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Add a feature…"
              className="flex-1 px-3 py-2 rounded-lg border bg-background text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (newFeature.trim()) {
                    setData({ ...data, features: [...data.features, newFeature.trim()] });
                    setNewFeature("");
                  }
                }
              }}
            />
            <Button
              type="button"
              onClick={() => {
                if (newFeature.trim()) {
                  setData({ ...data, features: [...data.features, newFeature.trim()] });
                  setNewFeature("");
                }
              }}
            >
              <Plus className="w-4 h-4" /> Add
            </Button>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-3">Photos</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
            {data.photos.map((url, i) => (
              <div key={i} className="relative">
                <img src={url} alt="" className="w-full aspect-square object-cover rounded-lg border" />
                <button
                  type="button"
                  onClick={() => setData({ ...data, photos: data.photos.filter((_, idx) => idx !== i) })}
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
                  aria-label="Remove photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-background cursor-pointer hover:bg-muted text-sm">
            <Upload className="w-4 h-4" /> {uploading ? "Uploading…" : "Upload photos"}
            <input type="file" multiple accept="image/*" className="hidden" onChange={onUpload} disabled={uploading} />
          </label>
        </Card>

        <Button type="submit" disabled={saving}>
          <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save Section"}
        </Button>
      </FormBlock>
    </div>
  );
}
