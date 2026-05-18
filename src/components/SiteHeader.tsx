import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.webp";

const nav = [
  { to: "/gardsforsaljare", label: "Producenter" },
  { to: "/regioner", label: "Regioner" },
  { to: "/kategorier", label: "Kategorier" },
  { to: "/karta", label: "Karta" },
  { to: "/blogg-nyheter", label: "Blogg" },
  { to: "/faq", label: "FAQ" },
  { to: "/om-oss", label: "Om oss" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
      <div className="container-x flex items-center justify-between h-[72px]">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="Gårdsförsäljning av Alkohol" className="h-10 w-auto" />
          <span className="sr-only">Gårdsförsäljning av Alkohol</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7">
          {nav.map(n => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[.93rem] text-body hover:text-primary transition-colors"
              activeProps={{ className: "text-primary font-medium" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Link to="/kontakt" className="btn-primary !py-2.5 !px-5 text-sm">Kontakta oss</Link>
        </div>
        <button className="lg:hidden p-2 -mr-2 text-heading" onClick={() => setOpen(!open)} aria-label="Meny">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-x py-4 flex flex-col gap-1">
            {nav.map(n => (
              <Link key={n.to} to={n.to} className="py-2 text-body" onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ))}
            <Link to="/kontakt" className="btn-primary mt-3 self-start" onClick={() => setOpen(false)}>
              Kontakta oss
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
