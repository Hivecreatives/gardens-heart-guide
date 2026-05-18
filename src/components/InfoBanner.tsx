import { Info } from "lucide-react";

export function InfoBanner() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container-x py-2.5 flex items-start gap-2.5 text-sm leading-snug">
        <Info className="h-4 w-4 mt-0.5 shrink-0" aria-hidden />
        <p>
          Vi rekommenderar att du alltid dubbelkollar med gårdsförsäljaren innan ditt besök så att de
          faktiskt erbjuder gårdsförsäljning och inte endast provningar eller guidade turer.
        </p>
      </div>
    </div>
  );
}
