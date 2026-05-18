import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Download, Search } from "lucide-react";
import JSZip from "jszip";
import { PageLayout } from "@/components/PageLayout";
import { filledIcons } from "@/assets/icons";

export const Route = createFileRoute("/design-system")({
  head: () => ({
    meta: [
      { title: "Design System — Gårdsförsäljning" },
      { name: "description", content: "Designtokens: typografi, färger, skuggor och borders." },
    ],
  }),
  component: DesignSystemPage,
});

// ---------- helpers ----------
function hexToHsl(hex: string): string {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map(c => c + c).join("");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let H = 0, S = 0;
  const L = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    S = L > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: H = (g - b) / d + (g < b ? 6 : 0); break;
      case g: H = (b - r) / d + 2; break;
      case b: H = (r - g) / d + 4; break;
    }
    H /= 6;
  }
  return `hsl(${Math.round(H * 360)}, ${Math.round(S * 100)}%, ${Math.round(L * 100)}%)`;
}

// ---------- data ----------
const typography = [
  { name: "Display", family: "Playfair Display", size: "3.5rem", weight: "600", lh: "1.1", sample: "Sveriges gårdar" },
  { name: "H1", family: "Playfair Display", size: "3rem", weight: "600", lh: "1.15", sample: "Rubrik nivå ett" },
  { name: "H2", family: "Playfair Display", size: "2.25rem", weight: "600", lh: "1.2", sample: "Rubrik nivå två" },
  { name: "H3", family: "Playfair Display", size: "1.5rem", weight: "600", lh: "1.3", sample: "Rubrik nivå tre" },
  { name: "Body Large", family: "DM Sans", size: "1.125rem", weight: "400", lh: "1.6", sample: "Större brödtext för intros." },
  { name: "Body", family: "DM Sans", size: "1rem", weight: "400", lh: "1.6", sample: "Standard brödtext." },
  { name: "Caption", family: "DM Sans", size: "0.875rem", weight: "500", lh: "1.5", sample: "Bildtext / metadata" },
];

const colorGroups: { group: string; tokens: { name: string; hex: string }[] }[] = [
  {
    group: "Brand",
    tokens: [
      { name: "--primary", hex: "#336645" },
      { name: "--primary-hover", hex: "#2A5A3F" },
      { name: "--accent", hex: "#C46E31" },
    ],
  },
  {
    group: "Neutrals",
    tokens: [
      { name: "--background", hex: "#FAF8F5" },
      { name: "--section", hex: "#F6F4EE" },
      { name: "--card", hex: "#FFFFFF" },
      { name: "--foreground", hex: "#2A2622" },
      { name: "--body", hex: "#687D6F" },
      { name: "--muted-foreground", hex: "#7D726A" },
      { name: "--border", hex: "#E5DFD4" },
      { name: "--footer", hex: "#2B2623" },
    ],
  },
  {
    group: "Semantic",
    tokens: [
      { name: "success", hex: "#2F7D4F" },
      { name: "warning", hex: "#C49A2C" },
      { name: "error / destructive", hex: "#B23A2A" },
      { name: "info", hex: "#2F6FA3" },
    ],
  },
];

const shadows = [
  { name: "shadow-sm", css: "0 1px 2px rgba(0,0,0,0.05)" },
  { name: "shadow", css: "0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)" },
  { name: "shadow-md", css: "0 4px 6px -1px rgba(0,0,0,0.10), 0 2px 4px -2px rgba(0,0,0,0.06)" },
  { name: "shadow-lg", css: "0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.06)" },
  { name: "shadow-xl", css: "0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.06)" },
  { name: "shadow-card-hover", css: "0 4px 8px rgba(42,38,34,0.06), 0 14px 30px -12px rgba(42,38,34,0.18)" },
];

const borders = [
  { name: "border-default", css: "border: 1px solid #E5DFD4" },
  { name: "border-thick", css: "border: 2px solid #2A2622" },
  { name: "border-dashed", css: "border: 1px dashed #687D6F" },
  { name: "radius-sm", css: "border-radius: 0.5rem" },
  { name: "radius-md", css: "border-radius: 0.8125rem" },
  { name: "radius-full", css: "border-radius: 9999px" },
];

const sections = [
  { id: "typography", label: "Typography" },
  { id: "colors", label: "Colors" },
  { id: "shadows", label: "Shadows" },
  { id: "borders", label: "Borders" },
  { id: "design-md", label: "design.md" },
];

// ---------- design.md ----------
function buildDesignMd() {
  const typeRows = typography.map(t => `| ${t.name} | ${t.family} | ${t.size} | ${t.weight} | ${t.lh} |`).join("\n");
  const colorRows = colorGroups.flatMap(g =>
    g.tokens.map(t => `| ${g.group} | ${t.name} | ${t.hex} | ${hexToHsl(t.hex)} |`)
  ).join("\n");
  const shadowRows = shadows.map(s => `| ${s.name} | \`${s.css}\` |`).join("\n");
  const borderRows = borders.map(b => `| ${b.name} | \`${b.css}\` |`).join("\n");
  return `# Design System

## Typography

| Name | Font Family | Size | Weight | Line Height |
| --- | --- | --- | --- | --- |
${typeRows}

## Colors

| Group | Token | HEX | HSL |
| --- | --- | --- | --- |
${colorRows}

## Shadows

| Name | CSS |
| --- | --- |
${shadowRows}

## Borders

| Name | CSS |
| --- | --- |
${borderRows}
`;
}

// ---------- component ----------
function DesignSystemPage() {
  const [active, setActive] = useState("typography");
  const [copied, setCopied] = useState(false);
  const designMd = buildDesignMd();

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const copy = async () => {
    await navigator.clipboard.writeText(designMd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageLayout>
      <div className="container-x py-12 lg:py-16">
        <header className="mb-10 max-w-3xl">
          <span className="kicker mb-4">Documentation</span>
          <h1 className="text-4xl md:text-5xl mt-3">Design System</h1>
          <p className="mt-4 text-lg text-body leading-relaxed">
            Tokens, scales och regler som driver designen. Kopiera direkt till din IDE eller Figma.
          </p>
        </header>

        {/* Mobile nav */}
        <nav className="lg:hidden sticky top-[72px] z-30 -mx-5 px-5 py-3 bg-background/90 backdrop-blur border-b border-border mb-8 overflow-x-auto">
          <div className="flex gap-2 whitespace-nowrap">
            {sections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`text-sm px-3 py-1.5 rounded-full border ${
                  active === s.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-body"
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="grid lg:grid-cols-[200px_1fr] gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24 flex flex-col gap-1 border-l border-border">
              {sections.map(s => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`pl-4 py-2 text-sm border-l-2 -ml-px transition-colors ${
                    active === s.id
                      ? "border-primary text-primary font-medium"
                      : "border-transparent text-body hover:text-heading"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 space-y-20">
            {/* Typography */}
            <section id="typography" className="scroll-mt-32">
              <SectionHeading title="Typography" desc="Type scale med live preview." />
              <div className="overflow-x-auto rounded-lg border border-border bg-card">
                <table className="w-full text-sm">
                  <thead className="bg-section text-heading">
                    <tr>
                      {["Name", "Font", "Size", "Weight", "Line height", "Preview"].map(h => (
                        <th key={h} className="text-left font-medium px-4 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {typography.map(t => (
                      <tr key={t.name} className="border-t border-border">
                        <td className="px-4 py-4 font-medium text-heading">{t.name}</td>
                        <td className="px-4 py-4 font-mono text-xs text-body">{t.family}</td>
                        <td className="px-4 py-4 font-mono text-xs text-body">{t.size}</td>
                        <td className="px-4 py-4 font-mono text-xs text-body">{t.weight}</td>
                        <td className="px-4 py-4 font-mono text-xs text-body">{t.lh}</td>
                        <td className="px-4 py-4">
                          <span
                            style={{
                              fontFamily: t.family.includes("Playfair") ? "var(--font-display)" : "var(--font-sans)",
                              fontSize: t.size,
                              fontWeight: Number(t.weight),
                              lineHeight: t.lh,
                              color: "var(--heading)",
                            }}
                          >
                            {t.sample}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Colors */}
            <section id="colors" className="scroll-mt-32">
              <SectionHeading title="Colors" desc="Brand, neutrals och semantiska färger." />
              <div className="space-y-10">
                {colorGroups.map(g => (
                  <div key={g.group}>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">{g.group}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {g.tokens.map(t => (
                        <div key={t.name} className="rounded-lg border border-border bg-card overflow-hidden">
                          <div className="h-28" style={{ background: t.hex }} />
                          <div className="p-3 space-y-1">
                            <div className="font-medium text-heading text-sm truncate">{t.name}</div>
                            <div className="font-mono text-xs text-body">{t.hex.toUpperCase()}</div>
                            <div className="font-mono text-xs text-muted-foreground">{hexToHsl(t.hex)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Shadows */}
            <section id="shadows" className="scroll-mt-32">
              <SectionHeading title="Shadows" desc="Elevations från subtila lyft till hero-cards." />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {shadows.map(s => (
                  <div key={s.name} className="rounded-lg border border-border bg-section p-6">
                    <div
                      className="h-20 rounded-md bg-card mb-5"
                      style={{ boxShadow: s.css }}
                    />
                    <div className="font-medium text-heading text-sm mb-2">{s.name}</div>
                    <code className="block font-mono text-[11px] leading-relaxed text-body bg-background border border-border rounded p-2 break-all">
                      box-shadow: {s.css};
                    </code>
                  </div>
                ))}
              </div>
            </section>

            {/* Borders */}
            <section id="borders" className="scroll-mt-32">
              <SectionHeading title="Borders" desc="Tjocklek, stil och radius." />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {borders.map(b => {
                  const isRadius = b.name.startsWith("radius");
                  const previewStyle: React.CSSProperties = isRadius
                    ? { border: "1px solid var(--border)", borderRadius: b.css.split(":")[1].trim() }
                    : (() => {
                        const parts = b.css.replace("border:", "").trim().split(" ");
                        return { border: `${parts[0]} ${parts[1]} ${parts[2]}` };
                      })();
                  return (
                    <div key={b.name} className="rounded-lg border border-border bg-section p-6">
                      <div className="h-20 bg-card mb-5" style={previewStyle} />
                      <div className="font-medium text-heading text-sm mb-2">{b.name}</div>
                      <code className="block font-mono text-[11px] leading-relaxed text-body bg-background border border-border rounded p-2 break-all">
                        {b.css};
                      </code>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* design.md */}
            <section id="design-md" className="scroll-mt-32">
              <SectionHeading title="design.md" desc="Komplett markdown-export av alla tokens." />
              <div className="relative rounded-lg overflow-hidden border border-border">
                <button
                  onClick={copy}
                  className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-background/90 backdrop-blur border border-border text-heading hover:bg-background"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
                <pre className="bg-foreground text-background p-5 overflow-x-auto text-xs leading-relaxed max-h-[600px]">
                  <code className="font-mono whitespace-pre">{designMd}</code>
                </pre>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

function SectionHeading({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-6 pb-4 border-b border-border">
      <h2 className="text-2xl md:text-3xl">{title}</h2>
      <p className="mt-2 text-body">{desc}</p>
    </div>
  );
}
