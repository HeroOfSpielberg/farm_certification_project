"use client";

import { useState, useEffect, useRef } from "react";

const COLORS = {
  soil: "#1a1a0e",
  soilLight: "#2a2a1a",
  canopy: "#1b3a2d",
  leaf: "#2e7d4f",
  leafBright: "#3da863",
  gold: "#c9a227",
  goldLight: "#e8c84a",
  cream: "#f5f0e8",
  creamDark: "#e8dfd0",
  warmWhite: "#faf8f4",
  bark: "#6b4e3d",
  clay: "#c4713b",
  mist: "rgba(255,255,255,0.06)",
};

const TIERS = [
  {
    name: "Seedling",
    price: "25,000",
    period: "/year",
    description: "For brands beginning their regenerative journey",
    features: [
      "Fund regenerative transition for smallholder farming communities",
      "Quarterly impact reports with farm-level data",
      "Raíz Partner badge for marketing use",
      "Access to public impact dashboard",
      "Direct farmer community updates",
    ],
    accent: COLORS.leaf,
    popular: false,
  },
  {
    name: "Canopy",
    price: "100,000",
    period: "/year",
    description: "For companies building regenerative supply chains",
    features: [
      "Dedicated partnership across Guatemala & Laos operations",
      "Monthly impact reports with satellite verification",
      "Raíz Certified sourcing rights for your products",
      "Named community partnership (your brand on the ground)",
      "Carbon credit allocation from verified sequestration",
      "Annual origin visit for your sustainability team",
    ],
    accent: COLORS.goldLight,
    popular: true,
  },
  {
    name: "Watershed",
    price: "Custom",
    period: "",
    description: "For enterprises transforming entire supply chains",
    features: [
      "Multi-geography sponsorship scaled to your goals",
      "Custom methodology co-development",
      "White-label dashboard for your ESG reporting",
      "Priority carbon credit access at preferential rates",
      "Board-level impact presentations",
      "Co-branded research with university partners",
    ],
    accent: COLORS.clay,
    popular: false,
  },
];

const METRICS = [
  { value: "2", label: "Pilot Countries", suffix: "" },
  { value: "5", label: "Pillars Measured", suffix: "" },
  { value: "60", label: "Revenue to Farmers", suffix: "%+" },
  { value: "0", label: "Cost to Farmers", suffix: "" },
];

const PILLARS = [
  { icon: "◉", name: "Soil Health", desc: "Organic matter, microbial biomass, aggregate stability — measured annually, tracked continuously" },
  { icon: "◎", name: "Carbon", desc: "Soil organic carbon + above-ground biomass, quantified with published methodology and satellite verification" },
  { icon: "❋", name: "Biodiversity", desc: "Shade tree diversity, pollinator habitat, ground cover — quarterly transects and photo monitoring" },
  { icon: "◈", name: "Water", desc: "Infiltration rates, erosion control, riparian buffers — protecting watersheds farm by farm" },
  { icon: "◇", name: "Community", desc: "Income growth, knowledge transfer, cooperative health, gender inclusion — because regeneration is human too" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Navbar({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 40px", height: 72,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(26,26,14,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.4s ease",
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, cursor: "pointer" }} onClick={() => onNavigate("hero")}>
        <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: COLORS.cream, letterSpacing: -0.5 }}>Raíz</span>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.leafBright, display: "inline-block", marginBottom: 2 }} />
      </div>
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {[["How It Works", "how"], ["Marketplace", "marketplace"], ["Impact", "impact"], ["Team", "team"]].map(([label, id]) => (
          <span key={id} onClick={() => onNavigate(id)} style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(245,240,232,0.7)",
            cursor: "pointer", letterSpacing: 0.5, textTransform: "uppercase" as const,
            transition: "color 0.3s",
          }}
          onMouseEnter={e => (e.target as HTMLElement).style.color = COLORS.cream}
          onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(245,240,232,0.7)"}
          >{label}</span>
        ))}
        <button onClick={() => onNavigate("marketplace")} style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
          color: COLORS.soil, background: COLORS.goldLight,
          border: "none", borderRadius: 6, padding: "10px 24px",
          cursor: "pointer", letterSpacing: 0.5, textTransform: "uppercase" as const,
          transition: "all 0.3s",
        }}
        onMouseEnter={e => { (e.target as HTMLElement).style.background = COLORS.gold; (e.target as HTMLElement).style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { (e.target as HTMLElement).style.background = COLORS.goldLight; (e.target as HTMLElement).style.transform = "translateY(0)"; }}
        >Partner With Us</button>
      </div>
    </nav>
  );
}

function Hero({ id }: { id: string }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section id={id} style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", position: "relative",
      background: `radial-gradient(ellipse at 30% 20%, ${COLORS.canopy} 0%, ${COLORS.soil} 60%, #0d0d08 100%)`,
      padding: "120px 40px 80px",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px",
      }} />

      <div style={{ maxWidth: 900, textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease 0.2s",
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
            color: COLORS.leafBright, letterSpacing: 3, textTransform: "uppercase" as const,
            display: "block", marginBottom: 24,
          }}>Regenerative Agriculture Platform</span>
        </div>

        <h1 style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: "clamp(48px, 7vw, 88px)", lineHeight: 1.05,
          color: COLORS.cream, margin: "0 0 32px", fontWeight: 400,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s ease 0.4s",
        }}>
          The people who grow it<br />
          <span style={{ color: COLORS.goldLight }}>should profit from it.</span>
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 20, lineHeight: 1.7,
          color: "rgba(245,240,232,0.65)", maxWidth: 620, margin: "0 auto 48px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s ease 0.6s",
        }}>
          Raíz is a vertically integrated platform connecting corporate sustainability investment
          directly to smallholder coffee and cacao farmers — with radical transparency and
          university-verified impact.
        </p>

        <div style={{
          display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s ease 0.8s",
        }}>
          <button onClick={() => document.getElementById("marketplace")?.scrollIntoView({ behavior: "smooth" })} style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
            color: COLORS.soil, background: COLORS.goldLight,
            border: "none", borderRadius: 8, padding: "16px 40px",
            cursor: "pointer", letterSpacing: 0.5,
            transition: "all 0.3s",
          }}
          onMouseEnter={e => { (e.target as HTMLElement).style.background = COLORS.gold; (e.target as HTMLElement).style.transform = "translateY(-2px)"; (e.target as HTMLElement).style.boxShadow = "0 8px 30px rgba(201,162,39,0.3)"; }}
          onMouseLeave={e => { (e.target as HTMLElement).style.background = COLORS.goldLight; (e.target as HTMLElement).style.transform = "translateY(0)"; (e.target as HTMLElement).style.boxShadow = "none"; }}
          >Explore Partnerships</button>
          <button onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })} style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
            color: COLORS.cream, background: "transparent",
            border: `1px solid rgba(245,240,232,0.2)`, borderRadius: 8, padding: "16px 40px",
            cursor: "pointer", letterSpacing: 0.5,
            transition: "all 0.3s",
          }}
          onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = "rgba(245,240,232,0.5)"; (e.target as HTMLElement).style.background = "rgba(245,240,232,0.05)"; }}
          onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = "rgba(245,240,232,0.2)"; (e.target as HTMLElement).style.background = "transparent"; }}
          >How It Works</button>
        </div>
      </div>

      <div style={{
        display: "flex", gap: 0, marginTop: 80, flexWrap: "wrap", justifyContent: "center",
        borderTop: "1px solid rgba(245,240,232,0.08)", paddingTop: 40, width: "100%", maxWidth: 800,
        opacity: loaded ? 1 : 0, transition: "opacity 1.2s ease 1.2s",
      }}>
        {METRICS.map((m, i) => (
          <div key={i} style={{
            flex: "1 1 140px", textAlign: "center", padding: "0 24px",
            borderRight: i < METRICS.length - 1 ? "1px solid rgba(245,240,232,0.08)" : "none",
          }}>
            <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 40, color: COLORS.goldLight }}>
              {m.value}{m.suffix}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(245,240,232,0.45)", letterSpacing: 1.5, textTransform: "uppercase" as const, marginTop: 4 }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks({ id }: { id: string }) {
  const steps = [
    { num: "01", title: "We embed with farming communities", desc: "Raíz extension agents work on the ground with smallholder coffee and cacao producers — not as auditors, but as partners. We provide technical guidance on regenerative practices: agroforestry design, soil management, shade canopy optimization, composting systems." },
    { num: "02", title: "Improvement generates data", desc: "Every farm visit produces data — soil samples, GPS-mapped boundaries, canopy photographs, practice records. Combined with satellite remote sensing, this creates a continuous, granular picture of regeneration that no annual audit can match." },
    { num: "03", title: "Data drives certification and carbon", desc: "Our published methodology quantifies carbon sequestration and regenerative progress across five pillars. Independent university partners verify the science. Everything is published on a public ledger. We don't ask you to trust us — we ask you to verify." },
    { num: "04", title: "Your investment flows to producers", desc: "A minimum of 60% of all revenue returns directly to farming communities. Your partnership funds extension services, direct payments, and community infrastructure — while generating verified impact claims for your sustainability reporting." },
  ];

  return (
    <section id={id} style={{
      background: COLORS.warmWhite, padding: "120px 40px", position: "relative",
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: COLORS.leaf, letterSpacing: 3, textTransform: "uppercase" as const }}>The Model</span>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(36px, 5vw, 52px)", color: COLORS.soil, margin: "12px 0 16px", fontWeight: 400, lineHeight: 1.15 }}>
            Extension. Certification.<br />Carbon. Market Access.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#666", maxWidth: 600, lineHeight: 1.7, marginBottom: 64 }}>
            One organization. One flywheel. The entity that helps farmers improve is the same one that certifies and funds those improvements.
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{
                background: "white", borderRadius: 12, padding: 36,
                border: "1px solid rgba(26,26,14,0.06)",
                boxShadow: "0 2px 20px rgba(26,26,14,0.04)",
                height: "100%",
                transition: "all 0.4s ease",
                cursor: "default",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(26,26,14,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 20px rgba(26,26,14,0.04)"; }}
              >
                <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 48, color: COLORS.creamDark, display: "block", marginBottom: 16 }}>{s.num}</span>
                <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 22, color: COLORS.soil, fontWeight: 400, margin: "0 0 12px" }}>{s.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#777", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Fieldwork({ id }: { id: string }) {
  const photos = [
    { src: "/images/field-coffee.jpg", caption: "Sorting coffee beans with smallholder producers, Laos" },
    { src: "/images/field-compost.jpg", caption: "Building composting infrastructure with farming community, Laos" },
  ];

  return (
    <section id={id} style={{
      background: COLORS.creamDark, padding: "80px 40px",
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: COLORS.leaf, letterSpacing: 3, textTransform: "uppercase" as const }}>On The Ground</span>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 40px)", color: COLORS.soil, margin: "12px 0 0", fontWeight: 400 }}>
              This work is already underway.
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 24 }}>
          {photos.map((p, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div style={{
                borderRadius: 12, overflow: "hidden",
                boxShadow: "0 4px 24px rgba(26,26,14,0.1)",
              }}>
                <div style={{ position: "relative", paddingBottom: "66%", background: COLORS.soil }}>
                  <img src={p.src} alt={p.caption} style={{
                    position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                    objectFit: "cover",
                  }} />
                </div>
                <div style={{ padding: "16px 20px", background: "white" }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#777", margin: 0, lineHeight: 1.5 }}>{p.caption}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars({ id }: { id: string }) {
  return (
    <section id={id} style={{
      background: COLORS.soil, padding: "120px 40px", position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />
      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: COLORS.leafBright, letterSpacing: 3, textTransform: "uppercase" as const }}>Beyond Carbon</span>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(36px, 5vw, 52px)", color: COLORS.cream, margin: "12px 0 16px", fontWeight: 400, lineHeight: 1.15 }}>
            Five pillars of regeneration
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "rgba(245,240,232,0.55)", maxWidth: 560, lineHeight: 1.7, marginBottom: 64 }}>
            Carbon is one piece. We measure holistic regeneration — because a farm that sequesters carbon but destroys biodiversity isn't regenerative.
          </p>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {PILLARS.map((p, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{
                display: "flex", alignItems: "center", gap: 24, padding: "28px 32px",
                background: "rgba(245,240,232,0.03)", borderRadius: 8,
                transition: "all 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(245,240,232,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(245,240,232,0.03)"; }}
              >
                <span style={{ fontSize: 28, width: 48, textAlign: "center", color: COLORS.goldLight, flexShrink: 0 }}>{p.icon}</span>
                <div>
                  <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 20, color: COLORS.cream, fontWeight: 400, margin: "0 0 6px" }}>{p.name}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(245,240,232,0.5)", lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marketplace({ id }: { id: string }) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", company: "", role: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (formData.email && formData.name) {
      setSubmitted(true);
    }
  };

  return (
    <section id={id} style={{
      background: `linear-gradient(180deg, ${COLORS.warmWhite} 0%, #f0ebe0 100%)`,
      padding: "120px 40px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: COLORS.leaf, letterSpacing: 3, textTransform: "uppercase" as const }}>Partnership Marketplace</span>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(36px, 5vw, 52px)", color: COLORS.soil, margin: "12px 0 16px", fontWeight: 400, lineHeight: 1.15 }}>
            Invest in regeneration.<br />Own the story.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#666", maxWidth: 600, lineHeight: 1.7, marginBottom: 64 }}>
            We partner selectively with companies whose sustainability goals align with our farming communities. Every partnership funds direct extension services and verified impact. Every dollar is tracked, everything is public.
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 80 }}>
          {TIERS.map((tier, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{
                background: "white", borderRadius: 16, padding: 40, position: "relative",
                border: tier.popular ? `2px solid ${COLORS.gold}` : "1px solid rgba(26,26,14,0.08)",
                boxShadow: tier.popular ? "0 12px 48px rgba(201,162,39,0.12)" : "0 2px 16px rgba(26,26,14,0.04)",
                display: "flex", flexDirection: "column", height: "100%",
                transition: "all 0.4s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {tier.popular && (
                  <div style={{
                    position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                    fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
                    color: COLORS.soil, background: COLORS.goldLight,
                    padding: "6px 20px", borderRadius: 20, letterSpacing: 1.5, textTransform: "uppercase" as const,
                  }}>Most Popular</div>
                )}

                <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: COLORS.soil, fontWeight: 400, margin: "0 0 8px" }}>{tier.name}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#888", margin: "0 0 20px", lineHeight: 1.5 }}>{tier.description}</p>

                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#999" }}>$</span>
                  <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 44, color: COLORS.soil }}>{tier.price}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#999" }}>{tier.period}</span>
                </div>

                <div style={{ flex: 1, marginBottom: 28 }}>
                  {tier.features.map((f, fi) => (
                    <div key={fi} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                      <span style={{ color: tier.accent, fontSize: 16, marginTop: 1, flexShrink: 0 }}>✓</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#555", lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => { setSelectedTier(tier.name); setSubmitted(false); }}
                  style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
                    color: tier.popular ? COLORS.soil : COLORS.cream,
                    background: tier.popular ? COLORS.goldLight : COLORS.canopy,
                    border: "none", borderRadius: 8, padding: "14px 0",
                    cursor: "pointer", letterSpacing: 0.5, width: "100%",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.opacity = "0.9"; (e.target as HTMLElement).style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.opacity = "1"; (e.target as HTMLElement).style.transform = "translateY(0)"; }}
                >
                  {tier.price === "Custom" ? "Apply Now" : "Apply for Partnership"}
                </button>
              </div>
            </FadeIn>
          ))}
        </div>

        {selectedTier && (
          <FadeIn>
            <div style={{
              maxWidth: 600, margin: "0 auto", background: "white", borderRadius: 16,
              padding: 48, border: "1px solid rgba(26,26,14,0.08)",
              boxShadow: "0 8px 40px rgba(26,26,14,0.06)",
            }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🌱</div>
                  <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: COLORS.soil, fontWeight: 400, margin: "0 0 12px" }}>Application received.</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#777", lineHeight: 1.6 }}>
                    Thank you for applying to the {selectedTier} partnership. We review applications within 5 business days and will be in touch to discuss fit and next steps.
                  </p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: COLORS.soil, fontWeight: 400, margin: "0 0 8px" }}>
                    {selectedTier} Partnership Application
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#888", margin: "0 0 32px" }}>
                    We review every application to ensure alignment between your sustainability goals and our farming communities. Tell us about your organization.
                  </p>

                  {[
                    { key: "name", label: "Your Name", type: "text" },
                    { key: "company", label: "Company", type: "text" },
                    { key: "role", label: "Your Role", type: "text" },
                    { key: "email", label: "Work Email", type: "email" },
                  ].map(field => (
                    <div key={field.key} style={{ marginBottom: 20 }}>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#999", letterSpacing: 0.5, textTransform: "uppercase" as const, display: "block", marginBottom: 8 }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={formData[field.key as keyof typeof formData]}
                        onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                        style={{
                          width: "100%", padding: "14px 16px", border: `1px solid ${COLORS.creamDark}`,
                          borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 15,
                          outline: "none", background: COLORS.warmWhite, color: COLORS.soil,
                          boxSizing: "border-box" as const,
                          transition: "border-color 0.3s",
                        }}
                        onFocus={e => (e.target as HTMLElement).style.borderColor = COLORS.leaf}
                        onBlur={e => (e.target as HTMLElement).style.borderColor = COLORS.creamDark}
                      />
                    </div>
                  ))}

                  <div style={{ marginBottom: 28 }}>
                    <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#999", letterSpacing: 0.5, textTransform: "uppercase" as const, display: "block", marginBottom: 8 }}>
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: "100%", padding: "14px 16px", border: `1px solid ${COLORS.creamDark}`,
                        borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 15,
                        outline: "none", background: COLORS.warmWhite, color: COLORS.soil,
                        resize: "vertical" as const, boxSizing: "border-box" as const,
                        transition: "border-color 0.3s",
                      }}
                      onFocus={e => (e.target as HTMLElement).style.borderColor = COLORS.leaf}
                      onBlur={e => (e.target as HTMLElement).style.borderColor = COLORS.creamDark}
                      placeholder="What are your organization's sustainability goals? What draws you to Raíz's model? Any specific crops, regions, or impact areas of interest?"
                    />
                  </div>

                  <button onClick={handleSubmit} style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
                    color: COLORS.soil, background: COLORS.goldLight,
                    border: "none", borderRadius: 8, padding: "16px 0",
                    cursor: "pointer", letterSpacing: 0.5, width: "100%",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.background = COLORS.gold; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.background = COLORS.goldLight; }}
                  >Submit Application</button>
                </>
              )}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

function Impact({ id }: { id: string }) {
  return (
    <section id={id} style={{
      background: COLORS.canopy, padding: "120px 40px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: -200, right: -200, width: 600, height: 600,
        borderRadius: "50%", background: "rgba(46,125,79,0.15)", filter: "blur(100px)",
      }} />
      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: COLORS.leafBright, letterSpacing: 3, textTransform: "uppercase" as const }}>Radical Transparency</span>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(36px, 5vw, 52px)", color: COLORS.cream, margin: "12px 0 16px", fontWeight: 400, lineHeight: 1.15 }}>
            Every dollar tracked.<br />Every claim verified.
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginTop: 64 }}>
          {[
            { title: "Public Data Ledger", desc: "All farm-level data, soil samples, satellite imagery, and credit issuance published openly. Anyone can audit our claims." },
            { title: "University Verification", desc: "Independent ground-truthing by Texas A&M-affiliated researchers. Their reputation depends on rigor, not our revenue." },
            { title: "Published Methodology", desc: "Our carbon quantification methodology is open for peer review. We improve it publicly, not behind closed doors." },
            { title: "Revenue Transparency", desc: "Every partnership's revenue flow is published: what came in, what went to farmers, what funded operations. No black boxes." },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                background: "rgba(245,240,232,0.05)", borderRadius: 12, padding: 32,
                border: "1px solid rgba(245,240,232,0.08)",
                transition: "all 0.3s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(245,240,232,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(245,240,232,0.05)"; }}
              >
                <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 20, color: COLORS.cream, fontWeight: 400, margin: "0 0 12px" }}>{item.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(245,240,232,0.5)", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div style={{
            marginTop: 80, padding: "48px 40px", background: "rgba(201,162,39,0.08)",
            borderRadius: 16, border: "1px solid rgba(201,162,39,0.15)",
            textAlign: "center",
          }}>
            <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: COLORS.cream, fontWeight: 400, margin: "0 0 16px" }}>
              Carbon Credits — Coming Soon
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(245,240,232,0.6)", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 24px" }}>
              Our pilot farms in Guatemala and Laos are establishing baselines now. Forward commitments for verified carbon credits will be available to partnership-tier sponsors first.
            </p>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
              color: COLORS.goldLight, letterSpacing: 1, textTransform: "uppercase" as const,
            }}>Pilot Credits Expected Q4 2026</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: "#0d0d08", padding: "60px 40px 40px",
      borderTop: "1px solid rgba(245,240,232,0.05)",
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 16 }}>
            <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 24, color: COLORS.cream }}>Raíz</span>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: COLORS.leafBright, display: "inline-block" }} />
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(245,240,232,0.35)", lineHeight: 1.6, maxWidth: 300 }}>
            Regenerative agriculture platform. Extension, certification, carbon, and market access — integrated from the ground up.
          </p>
        </div>
        <div style={{ display: "flex", gap: 48 }}>
          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(245,240,232,0.3)", letterSpacing: 1.5, textTransform: "uppercase" as const, marginBottom: 16 }}>Platform</h4>
            {["How It Works", "Partnerships", "Methodology", "Impact Data"].map(l => (
              <div key={l} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(245,240,232,0.5)", marginBottom: 10, cursor: "pointer" }}>{l}</div>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(245,240,232,0.3)", letterSpacing: 1.5, textTransform: "uppercase" as const, marginBottom: 16 }}>Company</h4>
            {["About", "Team", "Contact", "Press"].map(l => (
              <div key={l} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(245,240,232,0.5)", marginBottom: 10, cursor: "pointer" }}>{l}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1000, margin: "40px auto 0", paddingTop: 24, borderTop: "1px solid rgba(245,240,232,0.05)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(245,240,232,0.2)" }}>© 2026 Raíz. All rights reserved.</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(245,240,232,0.2)" }}>Guatemala · Laos · Coming soon: East Africa</span>
      </div>
    </footer>
  );
}

function Team({ id }: { id: string }) {
  return (
    <section id={id} style={{
      background: COLORS.warmWhite, padding: "120px 40px",
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FadeIn>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: COLORS.leaf, letterSpacing: 3, textTransform: "uppercase" as const }}>Who We Are</span>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(36px, 5vw, 52px)", color: COLORS.soil, margin: "12px 0 16px", fontWeight: 400, lineHeight: 1.15 }}>
            Built by people who&apos;ve<br />done the work.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#666", maxWidth: 600, lineHeight: 1.7, marginBottom: 64 }}>
            Raíz isn&apos;t built on theory. It&apos;s built on years of fieldwork, research, and direct relationships with the farming communities we serve.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div style={{
            background: "white", borderRadius: 16, padding: 48,
            border: "1px solid rgba(26,26,14,0.06)",
            boxShadow: "0 2px 20px rgba(26,26,14,0.04)",
          }}>
            <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
              {/* Josh profile photo */}
              <div style={{
                width: 96, height: 96, borderRadius: "50%", flexShrink: 0,
                overflow: "hidden",
              }}>
                <img src="/images/josh-profile.jpg" alt="Joshua Spitaleri" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              </div>

              <div style={{ flex: 1, minWidth: 280 }}>
                <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: COLORS.soil, fontWeight: 400, margin: "0 0 4px" }}>Joshua Spitaleri</h3>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.leaf, letterSpacing: 0.5, textTransform: "uppercase" as const }}>Founder</span>

                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#555", lineHeight: 1.8, margin: "20px 0 0" }}>
                  Josh brings an unusual combination of agricultural development experience and enterprise technology architecture to Raíz. He holds a Master&apos;s in International Agriculture from Oklahoma State University, where his research focused on smallholder coffee production economics in Laos. His fieldwork includes direct agricultural extension with coffee farming communities in both Laos and Guatemala — conducting site analysis, establishing composting and regenerative practice programs, and evaluating value chains for smallholder producers.
                </p>

                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#555", lineHeight: 1.8, margin: "16px 0 0" }}>
                  Josh founded Out There Coffee Co., sourcing directly from smallholder farmers and roasting and selling through a direct-to-consumer model. His Lao-origin coffee became the company&apos;s most popular product — an early proof of concept that smallholder-sourced, origin-story-driven specialty coffee commands real market demand.
                </p>

                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#555", lineHeight: 1.8, margin: "16px 0 0" }}>
                  Before Raíz, Josh spent over a decade in enterprise systems architecture and cybersecurity engineering, designing identity management and cloud infrastructure for organizations including Biogen, Carfax, and Oklahoma State University. This dual background — boots-on-the-ground agricultural development paired with enterprise-grade technology design — is what enables Raíz to operate as a tech platform rather than a traditional NGO.
                </p>

                <div style={{ display: "flex", gap: 16, marginTop: 24, flexWrap: "wrap" }}>
                  {[
                    "M.S. International Agriculture — Oklahoma State",
                    "Humphreys Research Grant — Laos",
                    "ECHO Conference Presenter — Guatemala",
                    "Phi Beta Delta International Scholars",
                  ].map((tag, i) => (
                    <span key={i} style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.canopy,
                      background: COLORS.creamDark, borderRadius: 20, padding: "6px 14px",
                      letterSpacing: 0.3,
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div style={{
            background: "white", borderRadius: 16, padding: 48, marginTop: 32,
            border: "1px solid rgba(26,26,14,0.06)",
            boxShadow: "0 2px 20px rgba(26,26,14,0.04)",
          }}>
            <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{
                width: 96, height: 96, borderRadius: "50%", flexShrink: 0,
                overflow: "hidden",
              }}>
                <img src="/images/adam-profile.jpg" alt="Dr. Adam Cobb" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              </div>

              <div style={{ flex: 1, minWidth: 280 }}>
                <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: COLORS.soil, fontWeight: 400, margin: "0 0 4px" }}>Dr. Adam Cobb</h3>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.leaf, letterSpacing: 0.5, textTransform: "uppercase" as const }}>Chief Science Officer</span>

                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#555", lineHeight: 1.8, margin: "20px 0 0" }}>
                  Dr. Cobb brings deep scientific expertise in soil ecology, mycorrhizal biology, and regenerative land management to Raíz. He holds a PhD in Natural Resource Ecology and Management from Oklahoma State University, where he served as a postdoctoral research fellow and graduate faculty member for over a decade. His research has produced more than 20 peer-reviewed publications and secured approximately $330,000 in competitive grants, including a USDA NIFA-AFRI Postdoctoral Fellowship.
                </p>

                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#555", lineHeight: 1.8, margin: "16px 0 0" }}>
                  Adam&apos;s work extends well beyond the lab. He currently consults with international organizations including the African Cotton Foundation, Aid by Trade Foundation, and Cotton Made in Africa — deploying climate-smart and regenerative practices in smallholder agricultural communities across the Global South. He has presented on soil biology and regenerative agriculture at venues ranging from COP28 to regional farming cooperatives.
                </p>

                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#555", lineHeight: 1.8, margin: "16px 0 0" }}>
                  As founder of Holobiont Hub, Adam has built a global community around open-access soil science education and regenerative practice. His combination of rigorous research credentials, field experience in developing-world agriculture, and commitment to accessible science communication makes him the ideal architect of Raíz&apos;s verification methodology and certification standard.
                </p>

                <div style={{ display: "flex", gap: 16, marginTop: 24, flexWrap: "wrap" }}>
                  {[
                    "Ph.D. Natural Resource Ecology — Oklahoma State",
                    "USDA NIFA-AFRI Fellow",
                    "20+ Peer-Reviewed Publications",
                    "COP28 Presenter",
                    "Cotton Made in Africa Consultant",
                  ].map((tag, i) => (
                    <span key={i} style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.canopy,
                      background: COLORS.creamDark, borderRadius: 20, padding: "6px 14px",
                      letterSpacing: 0.3,
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.45}>
          <div style={{
            marginTop: 40, padding: "32px 40px",
            background: "white", borderRadius: 12,
            border: `1px dashed ${COLORS.creamDark}`,
            textAlign: "center",
          }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#999", lineHeight: 1.6, margin: 0 }}>
              Additional team members and local extension leads in Guatemala and Laos will be announced as pilot operations begin.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function Home() {
  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: COLORS.soil, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <Navbar onNavigate={navigate} />
      <Hero id="hero" />
      <HowItWorks id="how" />
      <Fieldwork id="fieldwork" />
      <Pillars id="pillars" />
      <Marketplace id="marketplace" />
      <Impact id="impact" />
      <Team id="team" />
      <Footer />
    </div>
  );
}
