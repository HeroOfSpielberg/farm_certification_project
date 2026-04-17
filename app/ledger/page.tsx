"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = {
  soil: "#1a1a0e",
  canopy: "#1b3a2d",
  leaf: "#2e7d4f",
  leafBright: "#3da863",
  gold: "#c9a227",
  goldLight: "#e8c84a",
  cream: "#f5f0e8",
  creamDark: "#e8dfd0",
  warmWhite: "#faf8f4",
  clay: "#c4713b",
  bark: "#6b4e3d",
};

const FARMS = [
  { id: "GT-YEP-001", name: "Finca Los Volcanes", location: "Yepocapa, Guatemala", crop: "Coffee (Centroamericano)", hectares: 2.1, enrolled: "2026-03", tier: "Transitioning", elevation: "1,650m",
    soil: [{ month: "Mar", soc: 2.1, ph: 5.8 }, { month: "Jun", soc: 2.3, ph: 5.9 }, { month: "Sep", soc: 2.4, ph: 5.9 }, { month: "Dec", soc: 2.6, ph: 6.0 }],
    canopy: [{ month: "Mar", pct: 35 }, { month: "Jun", pct: 42 }, { month: "Sep", pct: 48 }, { month: "Dec", pct: 52 }],
    practices: ["Shade tree diversification", "Composting program active", "Cover crop establishment", "Erosion barriers installed"],
    pillarScores: { soil: 62, carbon: 45, biodiversity: 58, water: 70, community: 75 },
  },
  { id: "GT-YEP-002", name: "Parcela Hernández", location: "Yepocapa, Guatemala", crop: "Coffee (Bourbon/Caturra)", hectares: 1.4, enrolled: "2026-03", tier: "Enrolled", elevation: "1,520m",
    soil: [{ month: "Mar", soc: 1.8, ph: 5.5 }, { month: "Jun", soc: 1.9, ph: 5.6 }, { month: "Sep", soc: 2.0, ph: 5.6 }, { month: "Dec", soc: 2.1, ph: 5.7 }],
    canopy: [{ month: "Mar", pct: 22 }, { month: "Jun", pct: 28 }, { month: "Sep", pct: 33 }, { month: "Dec", pct: 38 }],
    practices: ["Baseline soil sampling complete", "Farm plan developed", "Shade tree seedlings distributed"],
    pillarScores: { soil: 40, carbon: 30, biodiversity: 35, water: 55, community: 65 },
  },
  { id: "LA-XKH-001", name: "Ban Houay Houn Cooperative", location: "Phonsavan, Xiangkhouang, Laos", crop: "Coffee (Typica/Catimor)", hectares: 3.8, enrolled: "2026-04", tier: "Transitioning", elevation: "1,150m",
    soil: [{ month: "Apr", soc: 2.8, ph: 5.2 }, { month: "Jul", soc: 2.9, ph: 5.3 }, { month: "Oct", soc: 3.1, ph: 5.4 }, { month: "Jan", soc: 3.3, ph: 5.5 }],
    canopy: [{ month: "Apr", pct: 55 }, { month: "Jul", pct: 58 }, { month: "Oct", pct: 61 }, { month: "Jan", pct: 64 }],
    practices: ["Composting system established", "Shade canopy optimization", "Soil sampling — annual cycle", "Market access pilot — specialty export"],
    pillarScores: { soil: 68, carbon: 55, biodiversity: 72, water: 60, community: 70 },
  },
  { id: "LA-XKH-002", name: "Farm Khamla", location: "Phonsavan, Xiangkhouang, Laos", crop: "Coffee & Cacao (agroforestry)", hectares: 2.5, enrolled: "2026-04", tier: "Enrolled", elevation: "1,100m",
    soil: [{ month: "Apr", soc: 2.2, ph: 5.0 }, { month: "Jul", soc: 2.3, ph: 5.1 }, { month: "Oct", soc: 2.4, ph: 5.2 }, { month: "Jan", soc: 2.5, ph: 5.3 }],
    canopy: [{ month: "Apr", pct: 40 }, { month: "Jul", pct: 44 }, { month: "Oct", pct: 47 }, { month: "Jan", pct: 50 }],
    practices: ["Baseline assessment complete", "Agroforestry design plan", "Fruit tree integration started"],
    pillarScores: { soil: 48, carbon: 38, biodiversity: 55, water: 50, community: 60 },
  },
  { id: "GT-YEP-003", name: "Cooperativa San Pedro", location: "Yepocapa, Guatemala", crop: "Coffee (mixed varieties)", hectares: 12.6, enrolled: "2026-05", tier: "Enrolled", elevation: "1,580m",
    soil: [{ month: "May", soc: 2.0, ph: 5.6 }, { month: "Aug", soc: 2.1, ph: 5.7 }, { month: "Nov", soc: 2.2, ph: 5.7 }, { month: "Feb", soc: 2.3, ph: 5.8 }],
    canopy: [{ month: "May", pct: 30 }, { month: "Aug", pct: 34 }, { month: "Nov", pct: 37 }, { month: "Feb", pct: 40 }],
    practices: ["Cooperative onboarding complete", "Baseline soil sampling in progress", "Extension agent assigned"],
    pillarScores: { soil: 38, carbon: 28, biodiversity: 42, water: 48, community: 80 },
  },
];

const PILLAR_LABELS: Record<string, string> = { soil: "Soil Health", carbon: "Carbon", biodiversity: "Biodiversity", water: "Water", community: "Community" };
const PILLAR_COLORS: Record<string, string> = { soil: "#8B6914", carbon: "#2e7d4f", biodiversity: "#3da863", water: "#4a90b8", community: "#c4713b" };

function PillarBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 13, color: "#888" }}>{label}</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#666" }}>{score}/100</span>
      </div>
      <div style={{ height: 6, background: "#eee", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${score}%`, background: color, borderRadius: 3, transition: "width 1s ease" }} />
      </div>
    </div>
  );
}

function FarmCard({ farm, onSelect }: { farm: typeof FARMS[0]; onSelect: () => void }) {
  const tierColor = farm.tier === "Transitioning" ? COLORS.leaf : COLORS.clay;
  const tierBg = farm.tier === "Transitioning" ? "rgba(46,125,79,0.08)" : "rgba(196,113,59,0.08)";

  return (
    <div onClick={onSelect} style={{
      background: "white", borderRadius: 12, padding: "24px 28px",
      border: "1px solid rgba(26,26,14,0.06)", cursor: "pointer",
      transition: "all 0.3s ease", boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.08)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 8px rgba(0,0,0,0.04)"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#bbb", letterSpacing: 0.5, marginBottom: 4 }}>{farm.id}</div>
          <div style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 20, color: COLORS.soil }}>{farm.name}</div>
        </div>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, color: tierColor, background: tierBg, padding: "4px 10px", borderRadius: 12 }}>{farm.tier}</span>
      </div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#999", marginBottom: 16 }}>
        {farm.location} · {farm.hectares} ha · {farm.crop}
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {Object.entries(farm.pillarScores).map(([key, val]) => (
          <div key={key} style={{ flex: 1, height: 4, borderRadius: 2, background: "#eee", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${val}%`, background: PILLAR_COLORS[key], borderRadius: 2 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function FarmDetail({ farm, onBack }: { farm: typeof FARMS[0]; onBack: () => void }) {
  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <button onClick={onBack} style={{
        fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#999",
        background: "none", border: "none", cursor: "pointer", marginBottom: 24, padding: 0,
      }}>← All farms</button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#bbb", letterSpacing: 0.5, marginBottom: 4 }}>{farm.id}</div>
          <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 32, color: COLORS.soil, fontWeight: 400, margin: "0 0 4px" }}>{farm.name}</h2>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#999" }}>{farm.location} · {farm.elevation} · {farm.hectares} ha</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#bbb", marginBottom: 4 }}>Enrolled</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, color: COLORS.soil }}>{farm.enrolled}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 32 }}>
        <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid rgba(26,26,14,0.06)" }}>
          <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 16, color: COLORS.soil, fontWeight: 400, margin: "0 0 4px" }}>Soil Organic Carbon</h3>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#bbb", marginBottom: 16 }}>% SOC (0–30cm depth)</div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={farm.soil}>
              <defs>
                <linearGradient id="socGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.leaf} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={COLORS.leaf} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#bbb", fontFamily: "'DM Mono', monospace" }} axisLine={false} tickLine={false} />
              <YAxis domain={["dataMin - 0.3", "dataMax + 0.3"]} tick={{ fontSize: 11, fill: "#bbb", fontFamily: "'DM Mono', monospace" }} axisLine={false} tickLine={false} width={35} />
              <Tooltip contentStyle={{ fontFamily: "'DM Mono', monospace", fontSize: 12, borderRadius: 8, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
              <Area type="monotone" dataKey="soc" stroke={COLORS.leaf} fill="url(#socGrad)" strokeWidth={2} dot={{ r: 3, fill: COLORS.leaf }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid rgba(26,26,14,0.06)" }}>
          <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 16, color: COLORS.soil, fontWeight: 400, margin: "0 0 4px" }}>Shade Canopy Cover</h3>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#bbb", marginBottom: 16 }}>% coverage via satellite + field verification</div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={farm.canopy}>
              <defs>
                <linearGradient id="canopyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.canopy} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={COLORS.canopy} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#bbb", fontFamily: "'DM Mono', monospace" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#bbb", fontFamily: "'DM Mono', monospace" }} axisLine={false} tickLine={false} width={35} />
              <Tooltip contentStyle={{ fontFamily: "'DM Mono', monospace", fontSize: 12, borderRadius: 8, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
              <Area type="monotone" dataKey="pct" stroke={COLORS.canopy} fill="url(#canopyGrad)" strokeWidth={2} dot={{ r: 3, fill: COLORS.canopy }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid rgba(26,26,14,0.06)", marginBottom: 24 }}>
        <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 16, color: COLORS.soil, fontWeight: 400, margin: "0 0 20px" }}>Five Pillar Assessment</h3>
        {Object.entries(farm.pillarScores).map(([key, val]) => (
          <PillarBar key={key} label={PILLAR_LABELS[key]} score={val} color={PILLAR_COLORS[key]} />
        ))}
      </div>

      <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid rgba(26,26,14,0.06)" }}>
        <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 16, color: COLORS.soil, fontWeight: 400, margin: "0 0 16px" }}>Practices Adopted</h3>
        {farm.practices.map((p, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
            <span style={{ color: COLORS.leaf, fontSize: 14, marginTop: 1 }}>✓</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#666", lineHeight: 1.5 }}>{p}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, padding: "16px 20px", background: "rgba(46,125,79,0.04)", borderRadius: 8, border: "1px solid rgba(46,125,79,0.1)" }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#888", margin: 0, lineHeight: 1.6 }}>
          All data independently verified by university-affiliated researchers. Soil samples analyzed at accredited laboratories. Satellite imagery sourced from Sentinel-2. Last updated: {farm.soil[farm.soil.length - 1].month} 2026.
        </p>
      </div>
    </div>
  );
}

export default function LedgerPage() {
  const [selectedFarm, setSelectedFarm] = useState<typeof FARMS[0] | null>(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? FARMS : FARMS.filter(f => f.location.includes(filter));
  const totalHa = FARMS.reduce((s, f) => s + f.hectares, 0);
  const avgSOC = (FARMS.reduce((s, f) => s + f.soil[f.soil.length - 1].soc, 0) / FARMS.length).toFixed(1);

  return (
    <div style={{ background: COLORS.warmWhite, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;1,400&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      {/* Sample Data Banner */}
      <div style={{
        background: COLORS.gold, padding: "10px 40px", textAlign: "center",
        fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 500,
        color: COLORS.soil, letterSpacing: 1,
      }}>
        SAMPLE DATA — This dashboard shows representative data for demonstration. Live farm data will populate as pilot operations begin.
      </div>

      {/* Nav */}
      <nav style={{
        padding: "20px 40px", borderBottom: "1px solid rgba(26,26,14,0.06)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "white",
      }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 600, color: COLORS.soil }}>Raíz</span>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: COLORS.leafBright, display: "inline-block" }} />
        </a>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#999" }}>
          <a href="/" style={{ color: "#999", textDecoration: "none", marginRight: 24 }}>← Back to site</a>
        </div>
      </nav>

      {/* Header */}
      <header style={{
        padding: "40px 40px 32px", borderBottom: "1px solid rgba(26,26,14,0.06)",
        background: "white",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
          <div>
            <h1 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 32, color: COLORS.soil, fontWeight: 400, margin: "0 0 6px" }}>
              Public Data Ledger
            </h1>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#bbb", margin: 0 }}>
              All farm data published openly. Anyone can verify.
            </p>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            {[
              { label: "Farms", value: FARMS.length.toString() },
              { label: "Hectares", value: totalHa.toFixed(1) },
              { label: "Avg SOC %", value: avgSOC },
              { label: "Countries", value: "2" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 24, color: COLORS.soil }}>{s.value}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#bbb", letterSpacing: 0.5, textTransform: "uppercase" as const }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 40px 80px" }}>
        {selectedFarm ? (
          <FarmDetail farm={selectedFarm} onBack={() => setSelectedFarm(null)} />
        ) : (
          <>
            <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
              {[["all", "All Farms"], ["Guatemala", "Guatemala"], ["Laos", "Laos"]].map(([val, label]) => (
                <button key={val} onClick={() => setFilter(val)} style={{
                  fontFamily: "'DM Mono', monospace", fontSize: 12, padding: "8px 16px",
                  border: filter === val ? `1px solid ${COLORS.leaf}` : "1px solid rgba(26,26,14,0.1)",
                  borderRadius: 20, cursor: "pointer",
                  background: filter === val ? "rgba(46,125,79,0.06)" : "white",
                  color: filter === val ? COLORS.leaf : "#999",
                  transition: "all 0.2s",
                }}>{label}</button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
              {filtered.map(farm => (
                <FarmCard key={farm.id} farm={farm} onSelect={() => setSelectedFarm(farm)} />
              ))}
            </div>

            <div style={{ marginTop: 48, padding: "24px 28px", background: "white", borderRadius: 12, border: "1px solid rgba(26,26,14,0.06)" }}>
              <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 16, color: COLORS.soil, fontWeight: 400, margin: "0 0 12px" }}>About this data</h3>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#888", lineHeight: 1.7, margin: 0 }}>
                All soil data collected by Raíz extension agents and verified by independent university-affiliated laboratories. Canopy cover measured via Sentinel-2 satellite imagery cross-referenced with field photography. Pillar scores assessed quarterly using the Raíz Five-Pillar Framework. Carbon quantification follows our published methodology (available for peer review). Revenue flows and credit issuance will be published here as partnerships activate. This ledger is updated quarterly.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer style={{ background: COLORS.soil, padding: "40px", borderTop: "1px solid rgba(26,26,14,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(245,240,232,0.4)" }}>
            © 2026 Raíz. All data shown is sample/representative data for demonstration purposes.
          </div>
          <a href="/" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.leafBright, textDecoration: "none" }}>
            raizimpact.com
          </a>
        </div>
      </footer>
    </div>
  );
}
