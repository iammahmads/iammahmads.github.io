import type { MetaFunction } from "react-router";
import { useState } from "react";
import { Button } from "~/components/ui/Button";
import { Chip } from "~/components/ui/Chip";

export const meta: MetaFunction = () => [
  { title: "Design System & Styleguide — Glass Core" },
  { name: "robots", content: "noindex, nofollow" },
];

export default function StyleguideRoute() {
  const [activeFilter, setActiveFilter] = useState("React");

  const colors = [
    { name: "--ink", hex: "#170B2B", label: "Page Background", text: "#F3F1FA" },
    { name: "--surface", hex: "#241346", label: "Raised Panels", text: "#F3F1FA" },
    { name: "--surface-hover", hex: "#2E1A57", label: "Hover Surface", text: "#F3F1FA" },
    { name: "--lilac", hex: "#B9A7FF", label: "Secondary Text Accent", text: "#170B2B" },
    { name: "--aqua", hex: "#3DF2E0", label: "Single UI Interactive Accent", text: "#170B2B" },
    { name: "--pearl", hex: "#F3F1FA", label: "Primary Text", text: "#170B2B" },
    { name: "--amber", hex: "#FFB454", label: "3D Core Inner Light Only", text: "#170B2B" },
    { name: "--ink-muted", hex: "#8E82A9", label: "Subtle Meta Labels", text: "#F3F1FA" },
  ];

  const filterChips = ["React", "TypeScript", "Node.js", "Python", "MongoDB", "SQL"];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
      <header className="space-y-4 border-b border-[#241346] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241346] border border-[#3DF2E0]/40 text-xs text-[#3DF2E0]">
          Phase 2 Design System
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
          Glass Core Design System
        </h1>
        <p className="text-lg text-[#B9A7FF] max-w-2xl leading-relaxed">
          Deep aubergine atmospheric depth, disciplined typography, and aqua as the single interactive accent.
        </p>
      </header>

      {/* 1. Color Palette */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
          1. Color Tokens
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {colors.map((c) => (
            <div
              key={c.name}
              className="p-4 rounded-xl border border-[#241346] flex flex-col justify-between h-32"
              style={{ backgroundColor: c.hex, color: c.text }}
            >
              <span className="font-mono text-xs font-bold">{c.name}</span>
              <div>
                <p className="text-sm font-semibold">{c.hex}</p>
                <p className="text-xs opacity-80">{c.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Typography Hierarchy */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
          2. Typography Scale (Bricolage Grotesque + Instrument Sans)
        </h2>
        <div className="p-8 rounded-2xl bg-[#241346]/40 border border-[#241346] space-y-6">
          <div className="space-y-1">
            <span className="text-xs text-[#8E82A9] font-mono">Display XXL — 72px / Bold</span>
            <p className="text-5xl sm:text-7xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
              Muhammad Ahmad Shahid
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-[#8E82A9] font-mono">Headline 1 — 36px / Bold</span>
            <p className="text-3xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
              Curated Open Source &amp; Research Systems
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-[#8E82A9] font-mono">Subhead — 20px / Medium</span>
            <p className="text-xl text-[#B9A7FF] font-medium">
              Full-stack software engineer crafting robust applications and preparing for advanced research.
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-[#8E82A9] font-mono">Body — 17px / Regular (max 75ch)</span>
            <p className="text-[17px] text-[#F3F1FA]/85 leading-relaxed max-w-[70ch]">
              Software engineering graduate from GCUF with experience developing full-stack web platforms, developer tooling, and intelligent systems. Former Code in Place section leader and open to postgraduate research.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Buttons & Actions */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
          3. Button Variants &amp; Sizes
        </h2>
        <div className="p-8 rounded-2xl bg-[#241346]/40 border border-[#241346] space-y-8">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#8E82A9] uppercase tracking-wider">
              Variants
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">Primary Action</Button>
              <Button variant="secondary">Secondary Action</Button>
              <Button variant="ghost">Ghost Action</Button>
              <Button variant="primary" disabled>
                Disabled Action
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#8E82A9] uppercase tracking-wider">
              Sizes
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" variant="primary">
                Large Button
              </Button>
              <Button size="md" variant="primary">
                Medium Button
              </Button>
              <Button size="sm" variant="primary">
                Small Button
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Filter Chips */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
          4. Interactive Filter Chips
        </h2>
        <div className="p-8 rounded-2xl bg-[#241346]/40 border border-[#241346] space-y-4">
          <p className="text-sm text-[#8E82A9]">
            Active filter: <span className="text-[#3DF2E0] font-semibold">{activeFilter}</span>
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {filterChips.map((chip, idx) => (
              <Chip
                key={chip}
                label={chip}
                count={idx === 0 ? 5 : idx === 1 ? 4 : 2}
                active={activeFilter === chip}
                onClick={() => setActiveFilter(chip)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

