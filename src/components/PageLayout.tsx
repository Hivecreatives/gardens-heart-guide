import { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { InfoBanner } from "./InfoBanner";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <InfoBanner />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({ kicker, title, lead }: { kicker?: string; title: string; lead?: string }) {
  return (
    <section className="bg-section border-b border-border">
      <div className="container-x py-20 md:py-28 max-w-3xl">
        {kicker && <span className="kicker mb-5">{kicker}</span>}
        <h1 className="text-4xl md:text-5xl lg:text-6xl mt-3">{title}</h1>
        {lead && <p className="mt-6 text-lg text-body leading-relaxed">{lead}</p>}
      </div>
    </section>
  );
}
