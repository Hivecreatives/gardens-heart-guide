import { useEffect, useState } from "react";

const KEY = "age-verified-v1";

export function AgeGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) !== "yes") setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  const accept = () => {
    try { localStorage.setItem(KEY, "yes"); } catch {}
    setOpen(false);
  };
  const decline = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-background border border-border rounded-2xl max-w-lg w-full p-8 shadow-2xl text-center">
        <h2 className="font-display text-3xl text-heading mb-3">Åldersverifiering</h2>
        <p className="text-body leading-relaxed mb-2">
          Den här sidan innehåller information om alkoholhaltiga drycker. För att gå in
          måste du vara minst 20 år gammal.
        </p>
        <p className="text-sm text-muted-foreground mb-7">
          Genom att klicka på knapparna nedan samtycker jag även till användningen av cookies på denna webbplats.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={accept} className="btn-primary">Ja, jag är 20 år eller äldre</button>
          <button onClick={decline} className="btn-secondary">Nej</button>
        </div>
      </div>
    </div>
  );
}
