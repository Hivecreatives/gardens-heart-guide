import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Gårdsförsäljning av Alkohol" },
      { name: "description", content: "Kontakta oss om du vill synas på plattformen eller har en fråga." },
      { property: "og:title", content: "Kontakta Gårdsförsäljning" },
      { property: "og:description", content: "Bli en del av plattformen eller hör av dig till oss." },
    ],
  }),
  component: KontaktPage,
});

function KontaktPage() {
  return (
    <PageLayout>
      <PageHero
        kicker="Kontakt"
        title="Hör av dig"
        lead="Är du producent och vill synas hos oss? Eller har du tips på en gård vi missat? Skriv några rader, vi svarar inom ett par dagar."
      />
      <section className="section-pad">
        <div className="container-x grid lg:grid-cols-[1.2fr_1fr] gap-12">
          <form
            className="bg-card border border-border rounded-2xl p-8 space-y-5"
            onSubmit={(e) => { e.preventDefault(); alert("Tack! Vi hör av oss snart."); }}
          >
            <Field label="Namn"><input required type="text" className="input" /></Field>
            <Field label="E-post"><input required type="email" className="input" /></Field>
            <Field label="Verksamhet (om relevant)"><input type="text" className="input" /></Field>
            <Field label="Meddelande"><textarea required rows={6} className="input" /></Field>
            <button type="submit" className="btn-primary w-full sm:w-auto">Skicka meddelande</button>
            <style>{`.input{width:100%;padding:.7rem .9rem;border:1px solid var(--border);border-radius:.6rem;background:var(--background);color:var(--heading);font-family:inherit;font-size:.95rem;outline:none;transition:border-color .15s}.input:focus{border-color:var(--primary)}`}</style>
          </form>
          <aside className="space-y-7">
            <div className="bg-section border border-border rounded-2xl p-7">
              <h3 className="font-display text-xl mb-5">Hör av dig direkt</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3"><Mail className="h-4 w-4 mt-0.5 text-primary" /> hej@gardsforsaljning.se</li>
                <li className="flex gap-3"><Phone className="h-4 w-4 mt-0.5 text-primary" /> 08-123 45 67</li>
                <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 text-primary" /> Stockholm, Sverige</li>
              </ul>
            </div>
            <div className="bg-primary text-primary-foreground rounded-2xl p-7">
              <h3 className="font-display text-xl text-primary-foreground mb-3">För producenter</h3>
              <p className="text-sm text-primary-foreground/85 leading-relaxed">
                Berätta gärna om din gård – kategori, region, öppettider och en kort presentation. Vi återkopplar inom ett par dagar.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm text-heading font-medium mb-2 block">{label}</span>
      {children}
    </label>
  );
}
