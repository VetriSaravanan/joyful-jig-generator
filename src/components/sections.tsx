import { useEffect, useRef, useState } from "react";
import { SectionDeco } from "./decorations";
import { supabase, SUPABASE_CONFIGURED } from "@/lib/supabase";
import { toast } from "sonner";

/* ============= HERO ============= */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const dur = 1800; const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min((t - start) / dur, 1);
              setVal(Math.floor(p * target));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden flex items-center"
      style={{
        minHeight: "auto",
        background: "linear-gradient(135deg, oklch(0.95 0.04 230) 0%, oklch(0.97 0.03 70) 40%, oklch(0.96 0.04 320) 100%)",
      }}
    >
      <SectionDeco variant="hero" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center pt-10 pb-12 lg:pt-20 lg:pb-16">
          {/* Text */}
          <div>
            <div
              className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full mb-5"
              style={{
                border: "2.5px solid var(--secondary)",
                fontFamily: "var(--font-play)",
                fontSize: 13,
                color: "var(--navy)",
                fontWeight: 700,
                boxShadow: "0 4px 12px oklch(0.88 0.16 90 / .25)",
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pop" style={{ background: "var(--primary)" }} />
              Est. 2018 • Tirunelveli's #1 Preschool
            </div>

            <h1
              className="leading-[1.05] mb-5"
              style={{
                fontFamily: "var(--font-play)",
                fontSize: "clamp(34px, 5vw, 62px)",
                color: "var(--navy)",
                textShadow: "3px 3px 0 var(--secondary), 5px 5px 0 oklch(0 0 0 / .07)",
              }}
            >
              Learning is <span style={{ color: "var(--primary)" }}>Fun</span> &
              <br />
              <span style={{ color: "var(--accent)" }}>Joyful</span> Here!
            </h1>

            <p className="text-[17px] leading-[1.7] mb-8 max-w-[490px]" style={{ color: "var(--muted-foreground)" }}>
              A pioneer in Multiple-Intelligence-based Learning and Development in Tirunelveli.
              We nurture every child's unique potential through Montessori, Reggio Emilia & Play Way approach. 🎨
            </p>

            <div className="flex flex-wrap gap-4 mb-9">
              <a href="#reach-us" className="btn-toy btn-toy-primary">⭐ Enroll Now</a>
              <a href="#gallery" className="btn-toy btn-toy-secondary">🖼️ Take a Tour</a>
            </div>

            <div className="flex flex-wrap gap-4">
              {[
                { num: 7, suf: "+", label: "Years" },
                { num: 500, suf: "+", label: "Students" },
                { num: 20, suf: "+", label: "Teachers" },
                { num: 2, suf: "", label: "Branches" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-card text-center px-5 py-3.5 rounded-2xl"
                  style={{ border: "2.5px solid var(--border)", boxShadow: "0 4px 12px oklch(0 0 0 / .05)" }}
                >
                  <div style={{ fontFamily: "var(--font-play)", fontSize: 30, color: "var(--primary)", lineHeight: 1 }}>
                    <Counter target={s.num} suffix={s.suf} />
                  </div>
                  <div className="text-xs font-semibold mt-1" style={{ color: "var(--muted-foreground)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative flex justify-center items-center">
            <div className="w-full max-w-[480px] relative">
              {/* Floating cards */}
              <div
                className="absolute z-20 animate-float"
                style={{
                  top: -16, left: -30,
                  background: "#fff", borderRadius: 14, border: "2px solid var(--border)",
                  padding: "10px 16px", boxShadow: "0 8px 24px oklch(0 0 0 / .12)",
                  fontSize: 13, fontWeight: 700, fontFamily: "var(--font-play)",
                  color: "var(--teal)", display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap",
                }}
              >
                🌿 Reggio Emilia
              </div>
              <div
                className="absolute z-20 animate-float-r"
                style={{
                  bottom: -16, right: -30,
                  background: "#fff", borderRadius: 14, border: "2px solid var(--border)",
                  padding: "10px 16px", boxShadow: "0 8px 24px oklch(0 0 0 / .12)",
                  fontSize: 13, fontWeight: 700, fontFamily: "var(--font-play)",
                  color: "var(--accent)", display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap",
                }}
              >
                ❤️ Montessori
              </div>
              <div
                className="absolute z-20 animate-pop"
                style={{
                  top: "35%", right: -50,
                  background: "#fff", borderRadius: 14, border: "2px solid var(--border)",
                  padding: "10px 16px", boxShadow: "0 8px 24px oklch(0 0 0 / .12)",
                  fontSize: 13, fontWeight: 700, fontFamily: "var(--font-play)",
                  color: "var(--primary)", display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap",
                }}
              >
                ⭐ Play Way
              </div>

              <div
                className="bg-card relative overflow-hidden"
                style={{
                  borderRadius: 28,
                  border: "3px solid var(--border)",
                  padding: 28,
                  boxShadow: "var(--shadow-toy-lg)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{
                    height: 6,
                    background: "linear-gradient(90deg, var(--primary), var(--secondary), var(--accent), var(--teal))",
                  }}
                />
                <div
                  className="w-full flex items-center justify-center relative overflow-hidden mb-5"
                  style={{
                    height: 280,
                    background: "linear-gradient(135deg, oklch(0.95 0.04 230) 0%, oklch(0.97 0.03 70) 100%)",
                    borderRadius: 20,
                    border: "2px solid var(--border)",
                  }}
                >
                  {/* floating emojis */}
                  <span className="absolute text-[28px] animate-float" style={{ top: "10%", left: "8%" }}>🎨</span>
                  <span className="absolute text-[28px] animate-float-r" style={{ top: "15%", right: "8%" }}>📚</span>
                  <span className="absolute text-[28px] animate-bounce-fun" style={{ bottom: "20%", left: "10%" }}>⭐</span>
                  <span className="absolute text-[28px] animate-float" style={{ bottom: "15%", right: "10%", animationDelay: "1s" }}>🎭</span>
                  <span className="absolute text-[28px] animate-wiggle" style={{ top: "45%", left: "3%" }}>🎶</span>
                  <span className="text-[90px] animate-bounce-fun z-[1]">🏫</span>
                </div>
                <div className="flex items-center justify-between">
                  <div
                    className="text-xs font-bold px-4 py-1.5 rounded-full"
                    style={{
                      background: "var(--muted)",
                      border: "1.5px solid var(--border)",
                      color: "var(--primary)",
                      fontFamily: "var(--font-play)",
                    }}
                  >
                    🏅 Multiple Intelligence
                  </div>
                  <div
                    className="text-xs font-semibold px-4 py-1.5 rounded-full text-white"
                    style={{ background: "var(--navy)", fontFamily: "var(--font-body)" }}
                  >
                    10:1 Ratio
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============= WHY ============= */
const features = [
  { icon: "🌍", title: "International Curriculum", desc: "Multiple Intelligence-based international curriculum delivering holistic development across all learning domains.", color: "var(--primary)", bg: "oklch(0.71 0.18 40 / .1)" },
  { icon: "🌿", title: "Reggio Emilia", desc: "Child-led inquiry, collaborative projects, and environment as the third teacher — letting curiosity guide discovery.", color: "var(--accent)", bg: "oklch(0.65 0.21 17 / .1)" },
  { icon: "🧩", title: "Montessori Method", desc: "Hands-on, self-paced learning with specially designed materials that build independence, focus, and confidence.", color: "var(--teal)", bg: "oklch(0.78 0.14 175 / .12)" },
  { icon: "🎮", title: "Play Way Approach", desc: "Learning through play — because the best classroom is one where children don't even know they're studying!", color: "var(--secondary)", bg: "oklch(0.88 0.16 90 / .15)" },
  { icon: "👩‍🏫", title: "Well-Trained Teachers", desc: "Certified, loving, and child-centric teachers who understand every child's unique learning style.", color: "var(--purple)", bg: "oklch(0.55 0.16 305 / .12)" },
  { icon: "👶", title: "10:1 Child-Adult Ratio", desc: "Low ratio ensures every child receives personalized attention, guidance, and love throughout the day.", color: "var(--teal)", bg: "oklch(0.78 0.14 175 / .12)" },
];

export function Why() {
  return (
    <section id="why" className="relative overflow-hidden py-24" style={{ background: "var(--card)" }}>
      <SectionDeco variant="stars" />
      <div
        className="absolute -top-16 -right-16 pointer-events-none"
        style={{
          width: 300, height: 300,
          background: "radial-gradient(circle, oklch(0.88 0.16 90 / .18) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="text-center">
          <div
            className="section-label"
            style={{ background: "oklch(0.71 0.18 40 / .12)", color: "var(--primary)", border: "1.5px solid oklch(0.71 0.18 40 / .25)" }}
          >
            ✨ Why Payitragam?
          </div>
          <h2 className="section-title">Why Choose Our Preschool?</h2>
          <p className="section-sub">
            We blend the best global methodologies to create a rich, nurturing learning environment where every child shines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="toy-card" style={{ borderTop: `4px solid ${f.color}`, background: "var(--background)" }}>
              <span
                className="absolute"
                style={{ top: 16, right: 18, fontFamily: "var(--font-play)", fontSize: 48, color: "oklch(0 0 0 / .05)", lineHeight: 1 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div
                className="flex items-center justify-center mb-4"
                style={{
                  width: 70, height: 70, borderRadius: 20,
                  background: f.bg, fontSize: 32,
                  border: "2px solid oklch(1 0 0 / .5)",
                }}
              >
                <span>{f.icon}</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-play)", fontSize: 20, color: "var(--navy)", marginBottom: 10 }}>
                {f.title}
              </h3>
              <p className="text-[14px] leading-[1.7]" style={{ color: "var(--muted-foreground)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============= ABOUT ============= */
export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-24"
      style={{ background: "linear-gradient(135deg, oklch(0.96 0.04 320) 0%, var(--muted) 100%)" }}
    >
      <SectionDeco variant="garden" />
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div
              className="bg-card text-center relative overflow-hidden"
              style={{ borderRadius: 28, border: "3px solid var(--border)", padding: 36, boxShadow: "var(--shadow-toy)" }}
            >
              <div
                className="absolute top-0 left-0 right-0"
                style={{ height: 5, background: "linear-gradient(90deg, var(--primary), var(--accent), var(--teal))" }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] opacity-[.07]">🎓</div>
              <div
                style={{
                  fontFamily: "var(--font-play)", fontSize: 80, color: "var(--primary)", lineHeight: 1,
                  textShadow: "4px 4px 0 oklch(0.71 0.18 40 / .2)",
                }}
              >
                2018
              </div>
              <div className="text-[15px] font-semibold mt-1" style={{ color: "var(--muted-foreground)" }}>Founded in Tirunelveli</div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {[
                  { num: "500+", lbl: "Students", c: "var(--primary)", bg: "oklch(0.71 0.18 40 / .1)" },
                  { num: "2", lbl: "Branches", c: "var(--teal)", bg: "oklch(0.78 0.14 175 / .12)" },
                  { num: "20+", lbl: "Teachers", c: "var(--accent)", bg: "oklch(0.65 0.21 17 / .1)" },
                  { num: "7+", lbl: "Years", c: "var(--purple)", bg: "oklch(0.55 0.16 305 / .12)" },
                ].map((m) => (
                  <div key={m.lbl} style={{ background: m.bg, borderRadius: 14, padding: 14 }} className="text-center">
                    <div style={{ fontFamily: "var(--font-play)", fontSize: 28, color: m.c }}>{m.num}</div>
                    <div className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{m.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="absolute animate-float"
              style={{
                bottom: -20, right: -20, background: "#fff", borderRadius: 16,
                border: "2.5px solid var(--border)", padding: "14px 18px",
                boxShadow: "var(--shadow-toy)", fontFamily: "var(--font-play)", textAlign: "center",
              }}
            >
              <div className="text-[22px]">🏅</div>
              <div style={{ fontSize: 13, color: "var(--navy)", marginTop: 4 }}>Certified</div>
            </div>
            <div
              className="absolute animate-float-r"
              style={{
                top: -20, left: -20, background: "#fff", borderRadius: 16,
                border: "2.5px solid var(--border)", padding: "14px 18px",
                boxShadow: "var(--shadow-toy)", fontFamily: "var(--font-play)", textAlign: "center",
              }}
            >
              <div className="text-[22px]">🌟</div>
              <div style={{ fontSize: 13, color: "var(--navy)", marginTop: 4 }}>Trusted</div>
            </div>
          </div>

          <div>
            <div
              className="section-label"
              style={{ background: "oklch(0.65 0.21 17 / .1)", color: "var(--accent)", border: "1.5px solid oklch(0.65 0.21 17 / .25)" }}
            >
              ℹ️ About Us
            </div>
            <h2 className="section-title">Who Are We?</h2>
            <p className="text-[15.5px] leading-[1.8] mb-5" style={{ color: "var(--muted-foreground)" }}>
              We <strong style={{ color: "var(--navy)" }}>NELLAIAPPAR KANTHIMATHI PAYITRAGAM</strong> are a trailblazer in Multiple-Intelligence-based Learning and Development, located in Tirunelveli, Tamilnadu. Founded in 2018, our primary focus is on providing training for both students and teachers.
            </p>
            <p className="text-[15.5px] leading-[1.8] mb-5" style={{ color: "var(--muted-foreground)" }}>
              We proudly operate Preschools in South Balabakiya Nagar and Maharaja Nagar. We also offer Diploma Courses in Montessori and Early Childhood Education Teacher Training.
            </p>
            <div className="flex flex-wrap gap-2.5 mb-7">
              {[
                { lbl: "Montessori", c: "var(--teal)", bg: "oklch(0.78 0.14 175 / .12)", b: "oklch(0.78 0.14 175 / .35)" },
                { lbl: "Reggio Emilia", c: "var(--primary)", bg: "oklch(0.71 0.18 40 / .1)", b: "oklch(0.71 0.18 40 / .3)" },
                { lbl: "Play Way", c: "oklch(0.5 0.13 80)", bg: "oklch(0.88 0.16 90 / .18)", b: "oklch(0.88 0.16 90 / .4)" },
                { lbl: "Diploma Courses", c: "var(--purple)", bg: "oklch(0.55 0.16 305 / .12)", b: "oklch(0.55 0.16 305 / .3)" },
              ].map((p) => (
                <div
                  key={p.lbl}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold"
                  style={{ background: p.bg, color: p.c, border: `2px solid ${p.b}`, fontFamily: "var(--font-play)" }}
                >
                  ✅ {p.lbl}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-card rounded-2xl p-4" style={{ border: "2px solid var(--border)" }}>
                <h4 style={{ fontFamily: "var(--font-play)", fontSize: 14, color: "var(--primary)", marginBottom: 6 }}>
                  🎯 Our Mission
                </h4>
                <p className="text-[12.5px] leading-[1.6]" style={{ color: "var(--muted-foreground)" }}>
                  Provide every child a safe, joyful environment that nurtures their unique multiple intelligences.
                </p>
              </div>
              <div className="bg-card rounded-2xl p-4" style={{ border: "2px solid var(--border)" }}>
                <h4 style={{ fontFamily: "var(--font-play)", fontSize: 14, color: "var(--accent)", marginBottom: 6 }}>
                  👁️ Our Vision
                </h4>
                <p className="text-[12.5px] leading-[1.6]" style={{ color: "var(--muted-foreground)" }}>
                  Become the most trusted name in early childhood education across Tamilnadu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============= PROGRAMS ============= */
const programs = [
  {
    key: "playground", emoji: "🛝", tab: "Playground", age: "All Ages",
    title: "Our Playground", color: "var(--primary)",
    bg: "linear-gradient(135deg, oklch(0.95 0.04 220), oklch(0.97 0.04 150))",
    desc: "Designed with child safety as the top priority. Spacious outdoor areas, age-appropriate equipment, and a 10:1 child-to-adult ratio give every child the space to explore, play, and grow.",
    features: ["Safe outdoor play equipment", "10:1 Child-Adult Ratio", "Spacious play area", "Supervised at all times", "Age-appropriate activities", "Nature exploration zone"],
  },
  {
    key: "nursery", emoji: "🌸", tab: "Nursery", age: "2–3 Years",
    title: "Nursery", color: "var(--accent)",
    bg: "linear-gradient(135deg, oklch(0.95 0.04 0), oklch(0.97 0.03 70))",
    desc: "Our Nursery program uses Montessori and Reggio Emilia approaches to introduce toddlers to learning through play, sensory experiences, and gentle guided exploration in a warm home-like environment.",
    features: ["Montessori-inspired learning", "Sensory play activities", "Language development", "Social skill building", "Art and music exploration", "Gentle daily routines"],
  },
  {
    key: "junior", emoji: "🌟", tab: "Junior KG", age: "3–4 Years",
    title: "Junior KG", color: "oklch(0.5 0.13 80)",
    bg: "linear-gradient(135deg, oklch(0.97 0.06 95), oklch(0.97 0.03 70))",
    desc: "Junior KG builds on early foundations with Multiple Intelligence-based activities. We nurture linguistic, logical, musical, spatial, and interpersonal intelligences through structured yet playful curriculum.",
    features: ["Multiple Intelligence approach", "Reggio Emilia projects", "Number and letter readiness", "Creative arts program", "Physical education", "International curriculum"],
  },
  {
    key: "senior", emoji: "🎓", tab: "Senior KG", age: "4–5 Years",
    title: "Senior KG", color: "var(--purple)",
    bg: "linear-gradient(135deg, oklch(0.93 0.04 305), oklch(0.95 0.04 0))",
    desc: "Senior KG prepares children for primary school with confidence. Our child-centric approach ensures academic readiness while maintaining the joy of learning through play, collaboration, and critical thinking.",
    features: ["School readiness program", "Reading and writing foundation", "Mathematical thinking", "Science exploration", "Leadership activities", "Parent-teacher collaboration"],
  },
];

export function Programs() {
  const [active, setActive] = useState("playground");
  const cur = programs.find((p) => p.key === active)!;
  return (
    <section id="programs" className="relative overflow-hidden py-24" style={{ background: "var(--card)" }}>
      <SectionDeco variant="school" />
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="text-center">
          <div
            className="section-label"
            style={{ background: "oklch(0.78 0.14 175 / .12)", color: "var(--teal)", border: "1.5px solid oklch(0.78 0.14 175 / .3)" }}
          >
            📚 Our Programs
          </div>
          <h2 className="section-title">Explore Our Classes</h2>
          <p className="section-sub">
            Age-appropriate programs designed with love, expertise, and a whole lot of fun for every little learner!
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {programs.map((p) => {
            const isActive = active === p.key;
            return (
              <button
                key={p.key}
                onClick={() => setActive(p.key)}
                className="px-6 py-3 rounded-full font-bold text-[14px] transition-all"
                style={{
                  fontFamily: "var(--font-play)",
                  background: isActive ? p.color : "var(--background)",
                  color: isActive ? "#fff" : "var(--navy)",
                  border: `2.5px solid ${isActive ? p.color : "var(--border)"}`,
                  boxShadow: isActive ? `0 6px 0 oklch(0 0 0 / .12)` : "none",
                  transform: isActive ? "translateY(-2px)" : "translateY(0)",
                }}
              >
                {p.emoji} {p.tab}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div
              className="inline-block px-4 py-1.5 rounded-full mb-4 text-[13px] font-bold"
              style={{ border: `2px solid ${cur.color}`, color: cur.color, fontFamily: "var(--font-play)" }}
            >
              {cur.emoji} {cur.age}
            </div>
            <h3 style={{ fontFamily: "var(--font-play)", fontSize: 36, color: "var(--navy)", marginBottom: 14 }}>
              {cur.title}
            </h3>
            <p className="text-[15px] leading-[1.8] mb-6" style={{ color: "var(--muted-foreground)" }}>
              {cur.desc}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 list-none">
              {cur.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[14px]" style={{ color: "var(--foreground)" }}>
                  <span
                    className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] mt-0.5"
                    style={{ background: cur.color, color: "#fff" }}
                  >
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#reach-us" className="btn-toy btn-toy-primary mt-7">📞 Enquire about {cur.tab}</a>
          </div>

          <div
            className="relative rounded-[28px] overflow-hidden flex items-center justify-center"
            style={{
              background: cur.bg,
              border: "3px solid var(--border)",
              minHeight: 380,
              boxShadow: "var(--shadow-toy)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0"
              style={{ height: 6, background: `linear-gradient(90deg, ${cur.color}, var(--primary))` }}
            />
            <div className="text-[180px] animate-bounce-fun">{cur.emoji}</div>
            <Star color="var(--secondary)" position={{ top: "10%", right: "10%" }} />
            <Star color="var(--accent)" delay={0.6} position={{ bottom: "10%", left: "10%" }} />
            <Star color="var(--primary)" delay={1.2} position={{ top: "50%", left: "5%" }} small />
          </div>
        </div>
      </div>
    </section>
  );
}

function Star({
  color, delay = 0, position, small = false,
}: { color: string; delay?: number; position: React.CSSProperties; small?: boolean }) {
  const size = small ? 18 : 26;
  return (
    <svg
      viewBox="0 0 26 26"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-twinkle absolute"
      style={{ width: size, height: size, animationDelay: `${delay}s`, ...position }}
      aria-hidden
    >
      <polygon points="13,2 15.5,9.5 23,9.5 17,14.5 19.5,22 13,17.5 6.5,22 9,14.5 3,9.5 10.5,9.5" fill={color} />
    </svg>
  );
}

/* ============= PLAYGROUND ============= */
const playItems = [
  { icon: "🛝", title: "Outdoor Equipment", desc: "Safe, age-appropriate play structures for all ages" },
  { icon: "👶", title: "10:1 Ratio", desc: "Personal attention for every single child" },
  { icon: "🌿", title: "Nature Zone", desc: "Explore and learn from the natural world" },
  { icon: "🎨", title: "Creative Corner", desc: "Art, craft and creative exploration area" },
  { icon: "🔒", title: "100% Safe", desc: "CCTV-monitored, fully secured campus" },
  { icon: "🌞", title: "Open Air Space", desc: "Spacious outdoor learning environment" },
];

export function Playground() {
  return (
    <section
      id="playground"
      className="relative overflow-hidden py-24"
      style={{ background: "linear-gradient(135deg, oklch(0.95 0.05 220) 0%, oklch(0.97 0.04 150) 100%)" }}
    >
      <SectionDeco variant="sunny" />
      <svg
        className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none"
        viewBox="0 0 1200 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,40 Q300,0 600,40 Q900,80 1200,40 L1200,80 L0,80Z" fill="var(--teal)" />
      </svg>
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="text-center">
          <div
            className="section-label"
            style={{ background: "oklch(0.78 0.14 175 / .15)", color: "var(--teal)", border: "1.5px solid oklch(0.78 0.14 175 / .3)" }}
          >
            🛝 Play & Explore
          </div>
          <h2 className="section-title">Our Playground</h2>
          <p className="section-sub">Safe, spacious, and packed with fun — our playground is where children discover the wonder of the world!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playItems.map((p) => (
            <div key={p.title} className="toy-card text-center" style={{ background: "var(--card)" }}>
              <div
                className="mx-auto flex items-center justify-center mb-4 animate-bounce-fun"
                style={{
                  width: 80, height: 80, borderRadius: 24, fontSize: 38,
                  background: "linear-gradient(135deg, var(--secondary), var(--primary))",
                  boxShadow: "0 6px 16px oklch(0.71 0.18 40 / .25)",
                }}
              >
                {p.icon}
              </div>
              <h3 style={{ fontFamily: "var(--font-play)", fontSize: 19, color: "var(--navy)", marginBottom: 8 }}>{p.title}</h3>
              <p className="text-[14px] leading-[1.6]" style={{ color: "var(--muted-foreground)" }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============= GALLERY ============= */
const galCategories = ["All", "Classroom", "Events", "Playground", "Activities", "Celebrations"];
const galleryItems = [
  { cat: "Classroom", emoji: "📚", title: "Story Time", grad: "linear-gradient(135deg, oklch(0.85 0.1 40), oklch(0.88 0.16 90))" },
  { cat: "Events", emoji: "🎉", title: "Annual Day", grad: "linear-gradient(135deg, oklch(0.65 0.21 17), oklch(0.74 0.19 0))" },
  { cat: "Playground", emoji: "🛝", title: "Outdoor Fun", grad: "linear-gradient(135deg, oklch(0.78 0.14 175), oklch(0.83 0.22 135))" },
  { cat: "Activities", emoji: "🎨", title: "Art & Craft", grad: "linear-gradient(135deg, oklch(0.55 0.16 305), oklch(0.74 0.19 0))" },
  { cat: "Celebrations", emoji: "🎂", title: "Birthday Party", grad: "linear-gradient(135deg, oklch(0.88 0.16 90), oklch(0.65 0.21 17))" },
  { cat: "Classroom", emoji: "🧩", title: "Montessori Materials", grad: "linear-gradient(135deg, oklch(0.78 0.14 175), oklch(0.55 0.16 305))" },
  { cat: "Events", emoji: "🎤", title: "Talent Show", grad: "linear-gradient(135deg, oklch(0.71 0.18 40), oklch(0.88 0.16 90))" },
  { cat: "Activities", emoji: "🌱", title: "Garden Day", grad: "linear-gradient(135deg, oklch(0.83 0.22 135), oklch(0.78 0.14 175))" },
];

export function Gallery() {
  const [filter, setFilter] = useState("All");
  const items = filter === "All" ? galleryItems : galleryItems.filter((g) => g.cat === filter);
  return (
    <section id="gallery" className="relative overflow-hidden py-24" style={{ background: "var(--card)" }}>
      <SectionDeco variant="balloons" />
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="text-center">
          <div
            className="section-label"
            style={{ background: "oklch(0.55 0.16 305 / .12)", color: "var(--purple)", border: "1.5px solid oklch(0.55 0.16 305 / .3)" }}
          >
            🖼️ Gallery
          </div>
          <h2 className="section-title">Moments at Payitragam</h2>
          <p className="section-sub">Every day is a celebration! Peek into the joyful world of Payitragam Preschools.</p>
        </div>

        <div className="flex flex-wrap gap-2.5 justify-center mb-8">
          {galCategories.map((c) => {
            const isActive = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className="px-5 py-2 rounded-full text-[13px] font-bold transition-all"
                style={{
                  fontFamily: "var(--font-play)",
                  background: isActive ? "var(--primary)" : "var(--background)",
                  color: isActive ? "#fff" : "var(--navy)",
                  border: `2px solid ${isActive ? "var(--primary)" : "var(--border)"}`,
                }}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden cursor-pointer group transition-transform"
              style={{
                aspectRatio: "1 / 1",
                background: it.grad,
                border: "3px solid var(--border)",
                boxShadow: "var(--shadow-toy)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px) rotate(-1deg)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0) rotate(0)")}
            >
              <div className="absolute inset-0 flex items-center justify-center text-[80px]">{it.emoji}</div>
              <div
                className="absolute bottom-0 left-0 right-0 p-3 text-white text-[13px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: "linear-gradient(0deg, oklch(0 0 0 / .7), transparent)",
                  fontFamily: "var(--font-play)",
                }}
              >
                {it.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============= BLOGS ============= */
const blogs = [
  { tag: "Parenting", color: "var(--primary)", date: "Apr 12, 2025", title: "10 Tips to Make Mornings Easier with Toddlers", excerpt: "Smooth out chaotic mornings with these tried-and-tested tricks every preschool parent should know.", emoji: "🌅" },
  { tag: "Learning", color: "var(--teal)", date: "Apr 8, 2025", title: "Why Multiple Intelligence Matters", excerpt: "Discover how Howard Gardner's theory shapes the way we teach at Payitragam.", emoji: "🧠" },
  { tag: "Activities", color: "var(--accent)", date: "Apr 1, 2025", title: "5 Sensory Play Ideas You Can Try at Home", excerpt: "Easy, safe, and fun activities to boost your child's curiosity and motor skills.", emoji: "🎨" },
];

export function Blogs() {
  return (
    <section id="blogs" className="relative overflow-hidden py-24" style={{ background: "var(--muted)" }}>
      <SectionDeco variant="playful" />
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="text-center">
          <div
            className="section-label"
            style={{ background: "oklch(0.71 0.18 40 / .12)", color: "var(--primary)", border: "1.5px solid oklch(0.71 0.18 40 / .25)" }}
          >
            📝 Blog
          </div>
          <h2 className="section-title">From Our World</h2>
          <p className="section-sub">Tips, stories, and insights from the Payitragam family for parents and early childhood educators.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((b, i) => (
            <article key={i} className="toy-card flex flex-col" style={{ background: "var(--card)" }}>
              <div
                className="rounded-2xl mb-4 flex items-center justify-center text-[64px]"
                style={{
                  height: 180,
                  background: `linear-gradient(135deg, ${b.color}, var(--secondary))`,
                  border: "2px solid var(--border)",
                }}
              >
                {b.emoji}
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="px-3 py-1 rounded-full text-[11px] font-bold text-white"
                  style={{ background: b.color, fontFamily: "var(--font-play)" }}
                >
                  {b.tag}
                </span>
                <span className="text-[12px]" style={{ color: "var(--muted-foreground)" }}>{b.date}</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-play)", fontSize: 19, color: "var(--navy)", marginBottom: 8 }}>{b.title}</h3>
              <p className="text-[14px] leading-[1.65] mb-4" style={{ color: "var(--muted-foreground)" }}>{b.excerpt}</p>
              <a href="#" className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-bold" style={{ color: b.color, fontFamily: "var(--font-play)" }}>
                Read more →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============= ANNOUNCEMENTS ============= */
const announcements = [
  { type: "🎉", color: "var(--primary)", date: "Apr 15, 2025", title: "Admissions Open for 2025–26", desc: "Limited seats available across Playground, Nursery, Junior KG and Senior KG. Reserve your spot today!" },
  { type: "👩‍🏫", color: "var(--teal)", date: "Jun 3, 2025", title: "Montessori Teacher Training Batch", desc: "New diploma cohort starting in June. Enrollment open for aspiring early-childhood educators." },
  { type: "🌞", color: "var(--secondary)", date: "May 5, 2025", title: "Summer Camp Registration Live", desc: "Two weeks of art, music, sports and storytelling for ages 3–7. Spots fill fast!" },
  { type: "🏅", color: "var(--accent)", date: "Mar 28, 2025", title: "Annual Day Highlights", desc: "Thank you parents for an unforgettable evening. Photos and videos now available in our gallery." },
];

export function Announcements() {
  return (
    <section
      id="announcements"
      className="relative overflow-hidden py-24"
      style={{ background: "var(--navy)" }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500, height: 500, top: -200, right: -200, borderRadius: "50%",
          background: "radial-gradient(circle, oklch(0.71 0.18 40 / .15) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 300, height: 300, bottom: -100, left: -100, borderRadius: "50%",
          background: "radial-gradient(circle, oklch(0.78 0.14 175 / .15) 0%, transparent 70%)",
        }}
      />
      <div className="deco-layer deco-mobile-hide">
        <Star color="var(--secondary)" position={{ top: "12%", left: "8%" }} />
        <Star color="var(--accent)" delay={0.7} position={{ top: "20%", right: "10%" }} />
        <Star color="var(--primary)" delay={1.4} position={{ bottom: "20%", left: "20%" }} />
        <Star color="var(--teal)" delay={1} position={{ bottom: "30%", right: "15%" }} small />
      </div>
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="text-center">
          <div
            className="section-label"
            style={{ background: "oklch(1 0 0 / .12)", color: "#fff", border: "1.5px solid oklch(1 0 0 / .25)" }}
          >
            📢 Notices
          </div>
          <h2 className="section-title" style={{ color: "#fff" }}>Announcements</h2>
          <p className="section-sub" style={{ color: "oklch(1 0 0 / .7)" }}>
            Stay updated with the latest news, events, and important notices from Payitragam.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {announcements.map((a, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 transition-transform hover:-translate-y-1"
              style={{
                background: "oklch(1 0 0 / .06)",
                border: `2px solid oklch(1 0 0 / .12)`,
                borderLeft: `5px solid ${a.color}`,
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="shrink-0 flex items-center justify-center rounded-2xl text-[28px]"
                  style={{ width: 60, height: 60, background: `${a.color}`, boxShadow: `0 6px 16px oklch(0 0 0 / .3)` }}
                >
                  {a.type}
                </div>
                <div className="flex-1">
                  <div className="text-[12px] font-semibold mb-1" style={{ color: "oklch(1 0 0 / .6)" }}>{a.date}</div>
                  <h3 style={{ fontFamily: "var(--font-play)", fontSize: 18, color: "#fff", marginBottom: 6 }}>{a.title}</h3>
                  <p className="text-[14px] leading-[1.6]" style={{ color: "oklch(1 0 0 / .75)" }}>{a.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============= CONTACT ============= */
export function ReachUs() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", age: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Name and phone are required");
      return;
    }
    if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone.trim())) {
      toast.error("Please enter a valid phone number");
      return;
    }
    setSubmitting(true);
    try {
      if (SUPABASE_CONFIGURED) {
        const { error } = await supabase.from("enquiries").insert({
          name: form.name.trim().slice(0, 100),
          phone: form.phone.trim().slice(0, 20),
          email: form.email.trim().slice(0, 255) || null,
          child_age: form.age || null,
          message: form.msg.trim().slice(0, 1000) || null,
        });
        if (error) throw error;
      }
      setSent(true);
      toast.success("Enquiry sent! We will contact you soon.");
      setForm({ name: "", phone: "", email: "", age: "", msg: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to send enquiry";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reach-us" className="relative overflow-hidden py-24" style={{ background: "var(--card)" }}>
      <SectionDeco variant="festive" />
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="text-center">
          <div
            className="section-label"
            style={{ background: "oklch(0.71 0.18 40 / .12)", color: "var(--primary)", border: "1.5px solid oklch(0.71 0.18 40 / .25)" }}
          >
            📍 Find Us
          </div>
          <h2 className="section-title">Reach Us</h2>
          <p className="section-sub">Visit us at either of our two branches — we'd love to meet you and your little one!</p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-10">
          {[
            { num: "9003845060", lbl: "Branch 1" },
            { num: "9952740025", lbl: "Branch 2" },
          ].map((p) => (
            <a
              key={p.num}
              href={`tel:${p.num}`}
              className="flex items-center gap-3 px-6 py-3.5 rounded-full"
              style={{
                background: "linear-gradient(135deg, var(--primary), var(--accent))",
                color: "#fff", boxShadow: "0 6px 0 oklch(0.5 0.16 36)",
                fontFamily: "var(--font-play)",
              }}
            >
              <span className="text-[20px]">📞</span>
              <span className="font-bold text-[16px]">{p.num}</span>
              <span className="text-[12px] opacity-80">• {p.lbl}</span>
            </a>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {[
            { name: "Branch 1 — South Balabakiya Nagar", addr: "122A, 6th Cross Street, South Balabakiya Nagar, Tirunelveli - 627001", color: "var(--primary)" },
            { name: "Branch 2 — Maharaja Nagar", addr: "Maharaja Nagar, Tirunelveli, Tamilnadu - 627011", color: "var(--teal)" },
          ].map((b) => (
            <div key={b.name} className="toy-card" style={{ background: "var(--background)" }}>
              <div className="flex items-start gap-4">
                <div
                  className="shrink-0 flex items-center justify-center rounded-2xl text-[28px]"
                  style={{ width: 60, height: 60, background: `${b.color}`, color: "#fff" }}
                >
                  📍
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-play)", fontSize: 18, color: "var(--navy)", marginBottom: 6 }}>{b.name}</h3>
                  <p className="text-[14px] leading-[1.6]" style={{ color: "var(--muted-foreground)" }}>{b.addr}</p>
                  <div className="flex gap-2 mt-3 text-[12px]" style={{ color: "var(--muted-foreground)" }}>
                    <span>🕘 Mon–Fri 9am–5pm</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="max-w-3xl mx-auto rounded-3xl p-8 sm:p-10 relative overflow-hidden"
          style={{
            background: "var(--background)",
            border: "3px solid var(--border)",
            boxShadow: "var(--shadow-toy-lg)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0"
            style={{ height: 6, background: "linear-gradient(90deg, var(--primary), var(--secondary), var(--accent), var(--teal))" }}
          />
          <h3 className="text-center mb-6" style={{ fontFamily: "var(--font-play)", fontSize: 24, color: "var(--navy)" }}>
            ✉️ Send Us an Enquiry
          </h3>
          <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Your Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Enter your name" />
            <Field label="Phone Number *" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="Your phone number" />
            <Field label="Email Address" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="Your email (optional)" />
            <div>
              <label className="block text-[13px] font-bold mb-1.5" style={{ color: "var(--navy)", fontFamily: "var(--font-play)" }}>Child's Age</label>
              <select
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-colors"
                style={{ background: "var(--card)", border: "2px solid var(--border)", color: "var(--foreground)" }}
              >
                <option value="">Select age</option>
                <option>Below 2 years</option>
                <option>2–3 years (Nursery)</option>
                <option>3–4 years (Junior KG)</option>
                <option>4–5 years (Senior KG)</option>
                <option>5+ years</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[13px] font-bold mb-1.5" style={{ color: "var(--navy)", fontFamily: "var(--font-play)" }}>Message</label>
              <textarea
                value={form.msg}
                onChange={(e) => setForm({ ...form, msg: e.target.value })}
                rows={4}
                placeholder="Any questions or additional information..."
                className="w-full px-4 py-3 rounded-xl text-[14px] outline-none resize-y"
                style={{ background: "var(--card)", border: "2px solid var(--border)", color: "var(--foreground)" }}
              />
            </div>
            <div className="sm:col-span-2 text-center">
              <button type="submit" disabled={submitting} className="btn-toy btn-toy-primary disabled:opacity-60">
                {submitting ? "Sending…" : "✉️ Send Enquiry"}
              </button>
              {sent && (
                <div
                  className="mt-4 inline-block px-5 py-2.5 rounded-full text-[13px] font-bold"
                  style={{ background: "oklch(0.78 0.14 175 / .2)", color: "var(--teal)", fontFamily: "var(--font-play)" }}
                >
                  🎉 Enquiry sent! We will contact you soon.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text",
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block text-[13px] font-bold mb-1.5" style={{ color: "var(--navy)", fontFamily: "var(--font-play)" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-colors"
        style={{ background: "var(--card)", border: "2px solid var(--border)", color: "var(--foreground)" }}
      />
    </div>
  );
}

/* ============= FOOTER ============= */
export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-16 pb-6" style={{ background: "var(--navy)", color: "#fff" }}>
      <div className="deco-layer deco-mobile-hide">
        <Star color="var(--secondary)" position={{ top: "10%", right: "8%" }} small />
        <Star color="var(--accent)" delay={0.5} position={{ bottom: "30%", left: "5%" }} />
        <Star color="var(--primary)" delay={1.1} position={{ top: "20%", left: "15%" }} small />
      </div>
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="flex items-center justify-center rounded-full font-bold"
                style={{
                  width: 52, height: 52, background: "var(--secondary)", color: "var(--navy)",
                  fontFamily: "var(--font-play)", fontSize: 28,
                }}
              >
                P
              </div>
              <div style={{ fontFamily: "var(--font-play)" }}>
                <div className="text-[18px]">Payitragam</div>
                <div className="text-[11px]" style={{ color: "oklch(1 0 0 / .65)", fontFamily: "var(--font-body)" }}>
                  Nellaiappar Kanthimathi
                </div>
              </div>
            </div>
            <p className="text-[13.5px] leading-[1.7]" style={{ color: "oklch(1 0 0 / .7)" }}>
              E for Education, P for Payitragam — Tirunelveli's premier Multiple Intelligence Preschool since 2018. Montessori, Reggio Emilia & Play Way approach.
            </p>
            <div className="flex gap-2.5 mt-4">
              {[
                { i: "📘", c: "oklch(0.45 0.18 250)" },
                { i: "📷", c: "oklch(0.55 0.2 0)" },
                { i: "▶️", c: "oklch(0.55 0.22 27)" },
                { i: "💬", c: "oklch(0.7 0.18 145)" },
              ].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex items-center justify-center rounded-full transition-transform hover:-translate-y-0.5"
                  style={{ width: 38, height: 38, background: s.c, fontSize: 16 }}
                >
                  {s.i}
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Quick Links" links={[
            ["#home", "Home"], ["#about", "About Us"], ["#programs", "Programs"],
            ["#gallery", "Gallery"], ["#blogs", "Blogs"], ["#reach-us", "Contact Us"],
          ]} />

          <FooterCol title="Programs" links={[
            ["#playground", "Playground"], ["#programs", "Nursery"], ["#programs", "Junior KG"],
            ["#programs", "Senior KG"], ["#reach-us", "Diploma Courses"],
          ]} />

          <div>
            <h4 className="mb-4" style={{ fontFamily: "var(--font-play)", fontSize: 16, color: "var(--secondary)" }}>Contact</h4>
            <ContactRow icon="📍" text="122A, 6th Cross Street, South Balabakiya Nagar, Tirunelveli - 627001" />
            <ContactRow icon="📞" text="9003845060 / 9952740025" />
            <ContactRow icon="✉️" text="payitragam@gmail.com" />
            <ContactRow icon="🕘" text="Mon–Fri 9am–5pm | Sat 9am–1pm" />
          </div>
        </div>
        <div className="pt-5 text-center text-[13px]" style={{ borderTop: "1px solid oklch(1 0 0 / .12)", color: "oklch(1 0 0 / .6)" }}>
          © 2025 <b style={{ color: "#fff" }}>Nellaiappar Kanthimathi Payitragam</b>. All rights reserved. Made with ❤️ for little learners in Tirunelveli.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="mb-4" style={{ fontFamily: "var(--font-play)", fontSize: 16, color: "var(--secondary)" }}>{title}</h4>
      <ul className="space-y-2 list-none">
        {links.map(([href, label]) => (
          <li key={label}>
            <a
              href={href}
              className="text-[13.5px] transition-colors hover:text-white"
              style={{ color: "oklch(1 0 0 / .7)" }}
            >
              → {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactRow({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-start gap-2.5 mb-3 text-[13px]" style={{ color: "oklch(1 0 0 / .75)" }}>
      <span className="text-[15px] mt-0.5">{icon}</span>
      <span className="leading-[1.55]">{text}</span>
    </div>
  );
}

/* ============= FLOATING BUTTONS ============= */
export function FloatingButtons() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed right-5 bottom-5 z-40 flex flex-col gap-3">
      {show && (
        <button
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center justify-center rounded-full text-white transition-transform hover:-translate-y-1"
          style={{
            width: 50, height: 50, fontSize: 22,
            background: "var(--primary)",
            boxShadow: "0 6px 0 oklch(0.5 0.16 36), 0 10px 20px oklch(0.71 0.18 40 / .3)",
          }}
        >
          ↑
        </button>
      )}
      <a
        href="https://wa.me/919003845060"
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="flex items-center justify-center rounded-full text-white transition-transform hover:-translate-y-1 animate-pop"
        style={{
          width: 56, height: 56, fontSize: 26,
          background: "oklch(0.7 0.18 145)",
          boxShadow: "0 6px 0 oklch(0.5 0.16 145), 0 10px 20px oklch(0.7 0.18 145 / .35)",
        }}
      >
        💬
      </a>
    </div>
  );
}
