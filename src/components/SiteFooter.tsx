import { Link } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.webp";

export function SiteFooter() {
  return (
    <footer className="bg-footer text-footer-foreground mt-20">
      <div className="container-x py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="mb-5">
            <img src={logo} alt="Gårdsförsäljning av Alkohol" className="h-12 w-auto brightness-0 invert" />
          </div>
          <p className="text-sm leading-relaxed text-footer-foreground/80">
            En guide till Sveriges lokala destillerier, bryggerier och vingårdar med
            gårdsförsäljning.
          </p>
        </div>
        <FooterCol title="Utforska" links={[
          ["/gardsforsaljare", "Alla producenter"],
          ["/regioner", "Regioner"],
          ["/kategorier", "Kategorier"],
          ["/karta", "Karta"],
        ]} />
        <FooterCol title="Innehåll" links={[
          ["/blogg-nyheter", "Blogg & Nyheter"],
          ["/om-oss", "Om oss"],
          ["/kontakt", "Kontakta oss"],
          ["/design-system", "Design System"],
        ]} />
        <div>
          <h4 className="text-background font-display text-base mb-4">Kontakt</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-accent" /> <span suppressHydrationWarning>hej@gardsforsaljning.se</span></li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-accent" /> Stockholm, Sverige</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/8">
        <div className="container-x py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-footer-foreground/60">
          <p>© {new Date().getFullYear()} Gårdsförsäljning av Alkohol. Drick måttligt.</p>
          <p>Endast för dig över 20 år.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-background font-display text-base mb-4">{title}</h4>
      <ul className="space-y-2.5 text-sm">
        {links.map(([to, label]) => (
          <li key={to}>
            <Link to={to} className="hover:text-accent transition-colors">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
