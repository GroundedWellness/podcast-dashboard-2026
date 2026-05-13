import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const colors = {
  green: "#2C4A3E",
  lightGreen: "#4A7C6F",
  tan: "#C4A882",
  lightTan: "#E8D5B7",
  charcoal: "#2D2D2D",
  lightCharcoal: "#4A4A4A",
  cream: "#F5F0E8",
  white: "#FAFAF8",
  accent: "#8B6914",
};

const monthly2026 = [
  { month: "Jan", apple: 49124, spotify: 24709, youtube: 13953, total: 87786 },
  { month: "Feb", apple: 50824, spotify: 32194, youtube: 104807, total: 187825 },
  { month: "Mar", apple: 54513, spotify: 28571, youtube: 156327, total: 239411 },
  { month: "Apr", apple: 68351, spotify: 32789, youtube: 107884, total: 209024 },
];

const yoyData = [
  { month: "Jan", "2025": 70991, "2026": 87786 },
  { month: "Feb", "2025": 62022, "2026": 187825 },
  { month: "Mar", "2025": 67863, "2026": 239411 },
  { month: "Apr", "2025": 61269, "2026": 209024 },
];

const subscriberData = [
  { month: "Jan", spotify: 12881, apple: 14383, youtube: 8000, total: 35264 },
  { month: "Feb", spotify: 13663, apple: 15085, youtube: 10454, total: 39202 },
  { month: "Mar", spotify: 14244, apple: 15675, youtube: 13818, total: 43737 },
  { month: "Apr", spotify: 14855, apple: 16297, youtube: 15803, total: 46955 },
];

const topEpisodes = [
  { rank: 1, title: "Ep. 48 — The Hidden Switch Controlling Your Weight, Skin + Energy", guest: "Candi Frazier", streams: 317841, date: "Feb 2026", pct: 43.9 },
  { rank: 2, title: "Ep. 50 — Circadian Expert: The Missing Piece of Modern Wellness", guest: "Zaid Dahhaj", streams: 134553, date: "Mar 2026", pct: 18.6 },
  { rank: 3, title: "Ep. 54 — Alex Clark Unfiltered: Health, Relationships...", guest: "Alex Clark", streams: 67055, date: "May 2026", pct: 9.3 },
  { rank: 4, title: "Ep. 32 — Health Lies We've Been Sold", guest: "Paul Saladino", streams: 61160, date: "Jul 2025", pct: 8.4 },
];

const platformData = [
  { platform: "Apple Podcasts", streams: 222812, share: 30.8, color: colors.green },
  { platform: "YouTube", streams: 382971, share: 52.9, color: colors.lightGreen },
  { platform: "Spotify", streams: 118263, share: 16.3, color: colors.accent },
];

const avg2026Monthly = 181012;
const avg2025Monthly = 76331;
const ytdPct = "+137%";

const insights = [
  { type: "Breakout Content Pattern", insight: "Ep. 48 with Candi Frazier generated 317,841 streams — 43.9% of all 2026 YTD streams. Topics combining metabolic health, skin and energy have significant crossover appeal. Prioritize similar guest profiles in H2 booking strategy." },
  { type: "YouTube Growth", insight: "YouTube now represents 52.9% of YTD streams and subscribers grew from 8,000 in January to 15,803 in April — a 97.5% increase in 4 months. Expanding YouTube Shorts cadence could make it the primary growth channel by Q3." },
  { type: "Subscriber Momentum", insight: "Total subscribers grew from 35,264 to 46,955 between January and April — 33% in 4 months. YouTube is driving the majority of net new growth. Guest collab posts on Instagram could accelerate Apple and Spotify numbers." },
  { type: "2026 vs 2025 Per Month", insight: "The 2026 monthly average of 181,012 streams is 137% ahead of the 2025 monthly average of 76,331. The YTD comparison overstates the gap — on a per-month basis, 2026 is significantly outperforming 2025 in every single month." },
];

const recommendations = [
  { priority: "High", action: "Book 2+ guests in the metabolic/skin/energy category for Q3 — replicate the Candi Frazier content angle", impact: "+150K projected streams" },
  { priority: "High", action: "Expand YouTube publishing to 3x weekly and optimize episode titles for search", impact: "+97% subscriber growth pace" },
  { priority: "Medium", action: "Secure Instagram collab agreements with all Tier 1 guests to amplify Apple and Spotify growth", impact: "+4x social reach per episode" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: colors.charcoal, border: `1px solid ${colors.tan}`, borderRadius: 8, padding: "12px 16px" }}>
        <p style={{ color: colors.tan, marginBottom: 8, fontSize: 13 }}>{label}</p>
        {payload.map((e, i) => (
          <p key={i} style={{ color: colors.cream, fontSize: 14, margin: "4px 0" }}>
            {e.name}: {typeof e.value === "number" ? e.value.toLocaleString() : e.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Card = ({ children, style = {} }) => (
  <div style={{ background: colors.white, border: `1px solid ${colors.lightTan}`, borderRadius: 8, padding: 32, ...style }}>
    {children}
  </div>
);

const SectionTitle = ({ title, sub }) => (
  <div style={{ marginBottom: 24 }}>
    <h2 style={{ fontSize: 22, fontWeight: 400, color: colors.charcoal, margin: "0 0 4px" }}>{title}</h2>
    {sub && <p style={{ color: colors.lightCharcoal, fontSize: 14, fontStyle: "italic", margin: 0 }}>{sub}</p>}
  </div>
);

const KPI = ({ label, value, sub, subColor, accent: ac }) => (
  <div style={{ background: colors.white, border: `1px solid ${colors.lightTan}`, borderTop: `3px solid ${ac || colors.green}`, borderRadius: 8, padding: 24 }}>
    <p style={{ color: colors.lightCharcoal, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 10px" }}>{label}</p>
    <p style={{ color: colors.charcoal, fontSize: 30, fontWeight: 300, margin: "0 0 6px" }}>{value}</p>
    {sub && <p style={{ color: subColor || colors.lightGreen, fontSize: 13, margin: 0, fontStyle: "italic" }}>{sub}</p>}
  </div>
);

export default function Dashboard() {
  const [tab, setTab] = useState("overview");
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "yoy", label: "Year-over-Year" },
    { id: "episodes", label: "Episodes" },
    { id: "insights", label: "Insights" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: colors.cream, fontFamily: "Georgia, serif", color: colors.charcoal }}>

      {/* Header */}
      <div style={{ background: colors.green, padding: "32px 40px", borderBottom: `3px solid ${colors.tan}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <p style={{ color: colors.tan, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 8px" }}>Primally Pure</p>
            <h1 style={{ color: colors.cream, fontSize: 34, fontWeight: 400, margin: 0 }}>Grounded Wellness Podcast</h1>
            <p style={{ color: colors.lightTan, fontSize: 15, margin: "6px 0 0", fontStyle: "italic" }}>Performance Intelligence Dashboard — 2026 YTD</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ color: colors.tan, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 4px" }}>2026 YTD Streams</p>
            <p style={{ color: colors.cream, fontSize: 44, fontWeight: 300, margin: "4px 0" }}>724,046</p>
            <p style={{ color: colors.lightGreen, fontSize: 14, margin: 0 }}>↑ 137% above 2025 monthly avg</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ background: colors.white, borderBottom: `1px solid ${colors.lightTan}`, padding: "0 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: "none", border: "none",
              borderBottom: tab === t.id ? `2px solid ${colors.green}` : "2px solid transparent",
              padding: "16px 24px", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase",
              color: tab === t.id ? colors.green : colors.lightCharcoal,
              cursor: "pointer", fontFamily: "inherit",
              fontWeight: tab === t.id ? 600 : 400,
            }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 40 }}>

        {/* OVERVIEW */}
        {tab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginBottom: 28 }}>
              <KPI label="2026 YTD Streams" value="724,046" sub="Jan–Apr 2026" />
              <KPI label="Avg Monthly 2026" value="181,012" sub="↑ 137% vs 2025 avg/mo" accent={colors.lightGreen} />
              <KPI label="Top Episode" value="317,841" sub="Ep. 48 — Candi Frazier" accent={colors.accent} />
              <KPI label="Total Subscribers" value="46,955" sub="↑ 33% since Jan" accent={colors.charcoal} />
            </div>

            <div style={{ background: colors.green, borderRadius: 8, padding: "14px 22px", marginBottom: 28, display: "flex", gap: 14, alignItems: "center" }}>
              <span style={{ color: colors.tan, fontSize: 18 }}>✦</span>
              <p style={{ color: colors.cream, fontSize: 14, margin: 0, lineHeight: 1.6 }}>
                <strong>Context:</strong> 2026 monthly average of 181,012 is <strong style={{ color: colors.tan }}>137% stronger</strong> than the 2025 monthly average of 76,331. The YoY comparison compares 4 months to a full year — per-month performance tells the real story.
              </p>
            </div>

            <Card style={{ marginBottom: 28 }}>
              <SectionTitle title="2026 Monthly Streams by Platform" sub="Jan–Apr actuals — Apple, Spotify and YouTube" />
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthly2026}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.lightTan} />
                  <XAxis dataKey="month" tick={{ fill: colors.lightCharcoal, fontSize: 12 }} />
                  <YAxis tick={{ fill: colors.lightCharcoal, fontSize: 12 }} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 13, paddingTop: 16 }} />
                  <Bar dataKey="apple" name="Apple Podcasts" fill={colors.green} radius={[4,4,0,0]} />
                  <Bar dataKey="spotify" name="Spotify" fill={colors.accent} radius={[4,4,0,0]} />
                  <Bar dataKey="youtube" name="YouTube" fill={colors.lightGreen} radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <SectionTitle title="Subscriber Growth 2026" sub="Monthly follower and subscriber counts across all platforms" />
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={subscriberData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.lightTan} />
                  <XAxis dataKey="month" tick={{ fill: colors.lightCharcoal, fontSize: 12 }} />
                  <YAxis tick={{ fill: colors.lightCharcoal, fontSize: 12 }} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 13, paddingTop: 16 }} />
                  <Line type="monotone" dataKey="spotify" name="Spotify" stroke={colors.accent} strokeWidth={2} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="apple" name="Apple" stroke={colors.green} strokeWidth={2} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="youtube" name="YouTube" stroke={colors.lightGreen} strokeWidth={2.5} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="total" name="Total" stroke={colors.tan} strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {/* YEAR OVER YEAR */}
        {tab === "yoy" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginBottom: 28 }}>
              <KPI label="2025 Full Year" value="915,971" sub="12 months complete" accent={colors.tan} />
              <KPI label="2026 YTD (4 mo)" value="724,046" sub="Jan–Apr only" />
              <KPI label="2025 Avg/Month" value="76,331" sub="Across all 12 months" accent={colors.lightCharcoal} subColor={colors.lightCharcoal} />
              <KPI label="2026 Avg/Month" value="181,012" sub="↑ 137% stronger per month" accent={colors.lightGreen} />
            </div>

            <Card style={{ marginBottom: 28 }}>
              <SectionTitle title="2025 vs 2026 — Same Months Compared" sub="Jan–Apr side by side. 2026 outperforms 2025 in every single month." />
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={yoyData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.lightTan} />
                  <XAxis dataKey="month" tick={{ fill: colors.lightCharcoal, fontSize: 12 }} />
                  <YAxis tick={{ fill: colors.lightCharcoal, fontSize: 12 }} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 13, paddingTop: 16 }} />
                  <Bar dataKey="2025" name="2025 Streams" fill={colors.tan} radius={[4,4,0,0]} />
                  <Bar dataKey="2026" name="2026 Streams" fill={colors.green} radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <SectionTitle title="Month-by-Month Detail" />
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Month", "2025", "2026", "Change", "Growth %", "Status"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: colors.lightCharcoal, borderBottom: `1px solid ${colors.lightTan}`, background: colors.cream }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {yoyData.map((row, i) => {
                    const change = row["2026"] - row["2025"];
                    const pct = ((change / row["2025"]) * 100).toFixed(1);
                    return (
                      <tr key={i} style={{ borderBottom: `1px solid ${colors.lightTan}`, background: i % 2 === 0 ? colors.white : colors.cream }}>
                        <td style={{ padding: "14px 16px", fontWeight: 600 }}>{row.month}</td>
                        <td style={{ padding: "14px 16px", color: colors.lightCharcoal }}>{row["2025"].toLocaleString()}</td>
                        <td style={{ padding: "14px 16px", color: colors.green, fontWeight: 600 }}>{row["2026"].toLocaleString()}</td>
                        <td style={{ padding: "14px 16px", color: colors.lightGreen, fontWeight: 600 }}>+{change.toLocaleString()}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{ background: colors.lightGreen, color: colors.white, padding: "3px 10px", borderRadius: 20, fontSize: 12 }}>+{pct}%</span>
                        </td>
                        <td style={{ padding: "14px 16px", color: colors.lightGreen, fontWeight: 700 }}>✓ Ahead</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={{ marginTop: 18, padding: "14px 16px", background: colors.cream, borderRadius: 8, borderLeft: `4px solid ${colors.green}` }}>
                <p style={{ margin: 0, fontSize: 14, color: colors.charcoal, lineHeight: 1.6 }}>
                  <strong>Note:</strong> Feb and Mar 2026 are dramatically elevated due to Ep. 48 (Candi Frazier, 317,841 streams) going viral. This single episode accounts for 43.9% of all 2026 YTD streams.
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* EPISODES */}
        {tab === "episodes" && (
          <div>
            <div style={{ background: colors.green, borderRadius: 8, padding: "28px 32px", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ color: colors.tan, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 8px" }}>🔥 Breakout Episode</p>
                <h2 style={{ color: colors.cream, fontSize: 20, fontWeight: 400, margin: "0 0 6px" }}>Ep. 48 — The Hidden Switch Controlling Your Weight, Skin + Energy</h2>
                <p style={{ color: colors.lightTan, fontSize: 14, fontStyle: "italic", margin: 0 }}>Candi Frazier · Feb 2026</p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 24 }}>
                <p style={{ color: colors.tan, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 4px" }}>Total Streams</p>
                <p style={{ color: colors.cream, fontSize: 44, fontWeight: 300, margin: 0 }}>317,841</p>
                <p style={{ color: colors.lightGreen, fontSize: 13, margin: 0 }}>43.9% of all 2026 YTD streams</p>
              </div>
            </div>

            <Card style={{ marginBottom: 28 }}>
              <SectionTitle title="Top Episodes — Cumulative Streams" sub="All-time stream counts since publish date" />
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {topEpisodes.map((ep, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <div style={{ flex: 1, marginRight: 16 }}>
                        <span style={{ color: colors.tan, fontSize: 16, fontWeight: 300, marginRight: 10 }}>#{ep.rank}</span>
                        <span style={{ color: colors.charcoal, fontSize: 15, fontWeight: 500 }}>{ep.title}</span>
                        <span style={{ color: colors.lightCharcoal, fontSize: 12, marginLeft: 8, fontStyle: "italic" }}>· {ep.guest} · {ep.date}</span>
                      </div>
                      <span style={{ color: colors.green, fontSize: 18, fontWeight: 600, flexShrink: 0 }}>{ep.streams.toLocaleString()}</span>
                    </div>
                    <div style={{ height: 8, background: colors.lightTan, borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${ep.pct}%`, background: [colors.green, colors.lightGreen, colors.tan, colors.accent][i], borderRadius: 4 }} />
                    </div>
                    <p style={{ color: colors.lightCharcoal, fontSize: 12, margin: "4px 0 0", fontStyle: "italic" }}>{ep.pct}% of 2026 YTD total</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <SectionTitle title="2026 YTD Platform Breakdown" sub="Total streams by platform — Jan through Apr" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
                {platformData.map((p, i) => (
                  <div key={i} style={{ border: `1px solid ${colors.lightTan}`, borderTop: `3px solid ${p.color}`, borderRadius: 8, padding: 24 }}>
                    <p style={{ color: colors.lightCharcoal, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 10px" }}>{p.platform}</p>
                    <p style={{ color: colors.charcoal, fontSize: 30, fontWeight: 300, margin: "0 0 4px" }}>{p.streams.toLocaleString()}</p>
                    <p style={{ color: p.color, fontSize: 14, margin: "0 0 14px", fontStyle: "italic" }}>{p.share}% of total</p>
                    <div style={{ height: 6, background: colors.lightTan, borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${p.share}%`, background: p.color, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 18, padding: "14px 16px", background: colors.cream, borderRadius: 8, borderLeft: `4px solid ${colors.lightGreen}` }}>
                <p style={{ margin: 0, fontSize: 14, color: colors.charcoal, lineHeight: 1.6 }}>
                  <strong>YouTube is now the dominant platform</strong> at 52.9% of streams — up from a minimal share in 2025. This reflects the YouTube Shorts strategy and the viral performance of Ep. 48.
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* INSIGHTS */}
        {tab === "insights" && (
          <div>
            <div style={{ background: colors.green, borderRadius: 8, padding: "24px 32px", marginBottom: 28 }}>
              <p style={{ color: colors.tan, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 8px" }}>AI Generated</p>
              <h2 style={{ color: colors.cream, fontSize: 24, fontWeight: 400, margin: "0 0 6px" }}>Strategic Insights</h2>
              <p style={{ color: colors.lightTan, fontSize: 14, fontStyle: "italic", margin: 0 }}>Based on real Jan–Apr 2026 data and full year 2025 performance</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
              {insights.map((ins, i) => (
                <div key={i} style={{ background: colors.white, border: `1px solid ${colors.lightTan}`, borderLeft: `4px solid ${colors.green}`, borderRadius: 8, padding: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span style={{ color: colors.tan, fontSize: 16 }}>✦</span>
                    <p style={{ color: colors.green, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", margin: 0, fontWeight: 600 }}>{ins.type}</p>
                  </div>
                  <p style={{ color: colors.charcoal, fontSize: 15, lineHeight: 1.65, margin: 0 }}>{ins.insight}</p>
                </div>
              ))}
            </div>

            <Card>
              <SectionTitle title="H2 2026 Recommendations" sub="Priority actions based on current performance data" />
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {recommendations.map((rec, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "18px 20px", background: colors.cream, borderRadius: 8, border: `1px solid ${colors.lightTan}` }}>
                    <span style={{ background: rec.priority === "High" ? colors.green : colors.tan, color: colors.cream, padding: "4px 12px", borderRadius: 20, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0, marginTop: 2 }}>
                      {rec.priority}
                    </span>
                    <div>
                      <p style={{ fontSize: 15, color: colors.charcoal, margin: "0 0 6px", lineHeight: 1.5 }}>{rec.action}</p>
                      <p style={{ color: colors.lightGreen, fontSize: 13, margin: 0, fontStyle: "italic" }}>{rec.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      <div style={{ borderTop: `1px solid ${colors.lightTan}`, padding: "20px 40px", background: colors.white, marginTop: 40 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
          <p style={{ color: colors.lightCharcoal, fontSize: 12, letterSpacing: "0.1em", margin: 0 }}>PRIMALLY PURE — GROUNDED WELLNESS PODCAST INTELLIGENCE</p>
          <p style={{ color: colors.tan, fontSize: 12, fontStyle: "italic", margin: 0 }}>Data: Jan–Apr 2026 actuals · Updated May 2026</p>
        </div>
      </div>
    </div>
  );
}
