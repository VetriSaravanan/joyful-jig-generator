import { useMemo, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { SiteContentProvider, useSiteContent } from "@/components/site-content";

function HomeContentView() {
  const { loading, settings, home, about, sections, galleryCategories, galleryImages, blogs, announcements, branches } = useSiteContent();
  const [galleryFilter, setGalleryFilter] = useState("all");
  const [form, setForm] = useState({ name: "", phone: "", email: "", age: "", msg: "" });
  const [submitting, setSubmitting] = useState(false);

  const visibleGallery = useMemo(() => {
    if (galleryFilter === "all") return galleryImages;
    const category = galleryCategories.find((item) => item.slug === galleryFilter);
    return galleryImages.filter((item) => item.category_id === category?.id);
  }, [galleryCategories, galleryFilter, galleryImages]);

  const submitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return toast.error("Name and phone are required");
    setSubmitting(true);
    const { error } = await supabase.from("enquiries").insert({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      child_age: form.age || null,
      message: form.msg.trim() || null,
    });
    setSubmitting(false);
    if (error) return toast.error(error.message);
    setForm({ name: "", phone: "", email: "", age: "", msg: "" });
    toast.success("Enquiry sent successfully");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;

  return (
    <main className="bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#home" className="flex min-w-0 items-center gap-3">
            {settings?.logo_url ? (
              <img src={settings.logo_url} alt={settings.school_name || "School logo"} className="h-12 w-12 rounded-full border object-cover" />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">P</div>
            )}
            <div className="min-w-0">
              <div className="truncate font-semibold">{settings?.school_name || "Payitragam Preschool"}</div>
              <div className="truncate text-xs text-muted-foreground">{settings?.tagline || "E for Education, P for Payitragam"}</div>
            </div>
          </a>
          <div className="flex items-center gap-2">
            <a href="#contact" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">{home?.cta1_text || "Enroll Now"}</a>
            <a href="/admin" className="rounded-full border px-4 py-2 text-sm font-medium">Admin</a>
          </div>
        </div>
      </header>

      <section id="home" className="border-b bg-muted/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-14">
          <div className="order-2 lg:order-1">
            <p className="mb-3 inline-flex rounded-full bg-secondary/20 px-3 py-1 text-xs font-medium text-foreground">Tirunelveli preschool</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{home?.hero_title || "Learning is Fun & Joyful Here!"}</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">{home?.hero_subtitle || "A pioneer in Multiple-Intelligence-based Learning in Tirunelveli."}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={home?.cta1_link || "#contact"} className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">{home?.cta1_text || "Enroll Now"}</a>
              <a href={home?.cta2_link || "#gallery"} className="rounded-full border px-5 py-3 text-sm font-semibold">{home?.cta2_text || "Take a Tour"}</a>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                [home?.stat_years || 0, "Years"],
                [home?.stat_students || 0, "Students"],
                [home?.stat_teachers || 0, "Teachers"],
                [home?.stat_branches || 0, "Branches"],
              ].map(([value, label]) => (
                <div key={String(label)} className="rounded-2xl border bg-card p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{value}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            {home?.hero_bg_url ? (
              <img src={home.hero_bg_url} alt={home.hero_title || "Preschool hero"} className="h-[320px] w-full rounded-[2rem] border object-cover shadow-lg sm:h-[420px]" loading="eager" />
            ) : (
              <div className="flex h-[320px] items-center justify-center rounded-[2rem] border bg-card text-8xl shadow-lg sm:h-[420px]">🏫</div>
            )}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border bg-card p-6">
            <h2 className="text-3xl font-bold">About Us</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{about?.who_we_are_text || "About content will appear here."}</p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[2rem] border bg-card p-6">
              <h3 className="text-lg font-semibold">Mission</h3>
              <p className="mt-2 text-muted-foreground">{about?.mission || "Mission content will appear here."}</p>
            </div>
            <div className="rounded-[2rem] border bg-card p-6">
              <h3 className="text-lg font-semibold">Vision</h3>
              <p className="mt-2 text-muted-foreground">{about?.vision || "Vision content will appear here."}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="bg-muted/40 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold">Programs</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {sections.map((section) => (
              <article key={section.section_key} className="rounded-[2rem] border bg-card p-6">
                <h3 className="text-xl font-semibold">{section.title || section.section_key}</h3>
                <p className="mt-3 text-muted-foreground">{section.description}</p>
                {!!section.features.length && (
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {section.features.slice(0, 6).map((feature) => <li key={feature}>• {feature}</li>)}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold">Gallery</h2>
            <p className="mt-2 text-muted-foreground">Images uploaded from admin now render here.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[{ id: "all", name: "All", slug: "all", order_index: 0 }, ...galleryCategories.filter((item) => item.slug !== "all")].map((cat) => (
              <button key={cat.slug} onClick={() => setGalleryFilter(cat.slug)} className={galleryFilter === cat.slug ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" : "rounded-full border px-4 py-2 text-sm font-medium"}>{cat.name}</button>
            ))}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {visibleGallery.map((image) => (
            <figure key={image.id} className="overflow-hidden rounded-[1.5rem] border bg-card">
              <img src={image.image_url} alt={image.caption || "Gallery image"} className="aspect-square w-full object-cover" loading="lazy" />
              {image.caption && <figcaption className="p-3 text-sm text-muted-foreground">{image.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </section>

      <section id="blogs" className="bg-muted/40 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold">Latest Blogs</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {blogs.slice(0, 3).map((blog) => (
              <article key={blog.id} className="rounded-[2rem] border bg-card p-4">
                {blog.cover_url ? <img src={blog.cover_url} alt={blog.title} className="mb-4 h-48 w-full rounded-[1.25rem] object-cover" loading="lazy" /> : <div className="mb-4 flex h-48 items-center justify-center rounded-[1.25rem] border bg-muted text-6xl">📚</div>}
                <p className="text-xs text-muted-foreground">{blog.author} • {new Date(blog.created_at).toLocaleDateString()}</p>
                <h3 className="mt-2 text-lg font-semibold">{blog.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{blog.excerpt || "Published from the admin panel."}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="announcements" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="text-3xl font-bold">Announcements</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {announcements.slice(0, 4).map((item) => (
            <article key={item.id} className="rounded-[2rem] border bg-card p-5">
              <div className="mb-2 flex items-center gap-2">
                {item.is_pinned && <span className="rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">Pinned</span>}
                <span className="text-xs text-muted-foreground">{item.announcement_date}</span>
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-muted/40 py-12">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border bg-card p-6">
            <h2 className="text-3xl font-bold">Visit or Call Us</h2>
            <div className="mt-5 space-y-4">
              {branches.map((branch) => (
                <div key={branch.id} className="rounded-2xl border p-4">
                  <h3 className="font-semibold">{branch.branch_name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{branch.address}</p>
                  <p className="mt-2 text-sm">📞 {branch.phone}</p>
                </div>
              ))}
              <div className="rounded-2xl border p-4 text-sm text-muted-foreground">
                <div>Phone: {settings?.phone1} {settings?.phone2 ? `/ ${settings.phone2}` : ""}</div>
                <div className="mt-1">Email: {settings?.email}</div>
              </div>
            </div>
          </div>
          <form onSubmit={submitEnquiry} className="rounded-[2rem] border bg-card p-6">
            <h2 className="text-3xl font-bold">Send an Enquiry</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="rounded-xl border bg-background px-4 py-3" />
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" className="rounded-xl border bg-background px-4 py-3" />
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="rounded-xl border bg-background px-4 py-3 sm:col-span-2" />
              <input value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="Child age" className="rounded-xl border bg-background px-4 py-3 sm:col-span-2" />
              <textarea value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} placeholder="Message" rows={4} className="rounded-xl border bg-background px-4 py-3 sm:col-span-2" />
            </div>
            <button disabled={submitting} className="mt-4 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{submitting ? "Sending…" : "Send Enquiry"}</button>
          </form>
        </div>
      </section>

      <footer className="border-t bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-semibold">{settings?.school_name || "Payitragam Preschool"}</div>
            <div className="text-muted-foreground">{settings?.tagline || "E for Education, P for Payitragam"}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="/admin" className="rounded-full bg-secondary px-4 py-2 font-medium text-secondary-foreground">Admin Panel</a>
            {settings?.fb_url && <a href={settings.fb_url} target="_blank" rel="noreferrer" className="rounded-full border px-4 py-2">Facebook</a>}
            {settings?.ig_url && <a href={settings.ig_url} target="_blank" rel="noreferrer" className="rounded-full border px-4 py-2">Instagram</a>}
            {settings?.yt_url && <a href={settings.yt_url} target="_blank" rel="noreferrer" className="rounded-full border px-4 py-2">YouTube</a>}
          </div>
        </div>
      </footer>
    </main>
  );
}

export function LiveHomePage() {
  return (
    <SiteContentProvider>
      <HomeContentView />
    </SiteContentProvider>
  );
}