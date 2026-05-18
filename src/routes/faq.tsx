import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/PageLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Vanliga frågor om gårdsförsäljning av alkohol" },
      {
        name: "description",
        content:
          "Svar på de 48 vanligaste frågorna om gårdsförsäljning av alkohol i Sverige – regler, åldersgränser, mängder, gårdsförsäljare och praktiska tips inför ditt besök.",
      },
      { property: "og:title", content: "FAQ — Gårdsförsäljning av Alkohol" },
      {
        property: "og:description",
        content:
          "48 vanliga frågor och svar om gårdsförsäljning hos svenska bryggerier, vingårdar och destillerier.",
      },
    ],
  }),
  component: FaqPage,
});

type Faq = { q: string; a: string };
type FaqGroup = { title: string; items: Faq[] };

const groups: FaqGroup[] = [
  {
    title: "Grunderna",
    items: [
      {
        q: "Vad är gårdsförsäljning av alkohol?",
        a: "Gårdsförsäljning innebär att en gårdsförsäljare får sälja sina egna alkoholhaltiga drycker direkt till besökare på den plats där de tillverkas, vid sidan av Systembolagets monopol.",
      },
      {
        q: "Är gårdsförsäljning lagligt i Sverige?",
        a: "Frågan har utretts i flera omgångar och en lag om gårdsförsäljning har varit på väg att införas. Reglerna förändras löpande – kontrollera alltid aktuellt rättsläge och vad respektive gårdsförsäljare faktiskt får sälja på plats.",
      },
      {
        q: "Vad är skillnaden mellan gårdsförsäljning och en vanlig provning?",
        a: "Vid en provning får du smaka på dryckerna, ofta mot en avgift, men inte köpa med dig flaskor hem. Vid gårdsförsäljning får du även handla med dig produkter från gården.",
      },
      {
        q: "Varför är det skillnad på olika gårdar?",
        a: "Alla gårdsförsäljare erbjuder inte gårdsförsäljning – vissa har enbart provningar, guidade turer eller butik utan alkohol. Det beror på tillstånd, lokalernas utformning och vad respektive gårdsförsäljare valt att satsa på.",
      },
      {
        q: "Hur vet jag om en gårdsförsäljare faktiskt har gårdsförsäljning?",
        a: "Vi rekommenderar att du alltid dubbelkollar med gårdsförsäljaren innan ditt besök så att de faktiskt erbjuder gårdsförsäljning och inte endast provningar eller guidade turer.",
      },
      {
        q: "Konkurrerar gårdsförsäljning med Systembolaget?",
        a: "Gårdsförsäljning är tänkt som ett komplement till Systembolaget och omfattar oftast endast egenproducerade drycker i begränsad mängd direkt på gårdsförsäljarens plats.",
      },
    ],
  },
  {
    title: "Vem får handla",
    items: [
      {
        q: "Vilken åldersgräns gäller?",
        a: "Du måste vara minst 20 år för att köpa alkohol vid gårdsförsäljning, precis som på Systembolaget. Ta alltid med giltig legitimation.",
      },
      {
        q: "Måste jag legitimera mig?",
        a: "Ja, gårdsförsäljaren är skyldig att kontrollera ålder och kan neka köp om du inte kan visa godkänd ID-handling.",
      },
      {
        q: "Får jag handla åt någon annan?",
        a: "Nej, langning är förbjudet. Du får inte köpa alkohol åt någon som är under 20 år eller som är märkbart påverkad.",
      },
      {
        q: "Får jag handla om jag är märkbart berusad?",
        a: "Nej, gårdsförsäljaren får inte sälja alkohol till någon som är märkbart påverkad och har rätt att neka köp.",
      },
      {
        q: "Behöver jag boka i förväg?",
        a: "Många mindre gårdsförsäljare har begränsade öppettider och tar emot besökare endast efter bokning. Kontrollera alltid på gårdsförsäljarens egen webbplats.",
      },
      {
        q: "Får barn följa med på besöket?",
        a: "Barn är ofta välkomna på själva gården, men får inte delta i provning eller köp. Kolla med gårdsförsäljaren vad som gäller hos just dem.",
      },
    ],
  },
  {
    title: "Vad och hur mycket du får köpa",
    items: [
      {
        q: "Vilka drycker får säljas vid gårdsförsäljning?",
        a: "Endast drycker som gårdsförsäljaren själv tillverkar på platsen, till exempel öl, cider, vin, mjöd eller sprit. Vidareförsäljning av andras produkter ingår inte.",
      },
      {
        q: "Finns det en maxmängd jag får köpa?",
        a: "Förslag och regler innehåller volymbegränsningar per besökare och dag, exempelvis ett begränsat antal liter öl, vin och sprit. Gårdsförsäljaren informerar om aktuella gränser.",
      },
      {
        q: "Får jag köpa hur stora flaskor som helst?",
        a: "Det finns ofta begränsningar på maximal förpackningsstorlek per dryckesslag. Mindre flaskor och provförpackningar är vanligast.",
      },
      {
        q: "Kan jag förbeställa och hämta?",
        a: "Vissa gårdsförsäljare låter dig förbeställa, men själva överlämnandet och köpet måste ske fysiskt på gården – aldrig via post eller bud.",
      },
      {
        q: "Får gårdsförsäljaren skicka hem flaskorna till mig?",
        a: "Nej. Vid gårdsförsäljning ska du själv hämta dryckerna på plats – hemleverans omfattas inte.",
      },
      {
        q: "Säljs alkoholfria varianter också?",
        a: "Många gårdsförsäljare säljer även alkoholfria drycker, glas, böcker och presentartiklar i sin gårdsbutik utan särskilda alkoholregler.",
      },
    ],
  },
  {
    title: "Tider, priser och betalning",
    items: [
      {
        q: "Vilka öppettider gäller?",
        a: "Öppettiderna varierar kraftigt mellan gårdsförsäljare och säsong. Många har endast öppet vissa dagar i veckan eller efter bokning.",
      },
      {
        q: "Är det öppet året runt?",
        a: "Vissa gårdar har öppet året runt, andra främst under sommarsäsongen. Kolla aktuella tider innan du åker.",
      },
      {
        q: "Vad kostar det att besöka en gård?",
        a: "Själva besöket är ofta gratis, medan provningar och guidade turer brukar kosta en avgift per person.",
      },
      {
        q: "Kan jag betala kontant?",
        a: "Många mindre gårdsförsäljare tar endast kort eller Swish. Räkna inte med att kunna betala kontant.",
      },
      {
        q: "Kan jag betala med Swish?",
        a: "Swish är vanligt hos mindre gårdsförsäljare, men vissa kräver kortbetalning. Kontrollera gärna i förväg om du är osäker.",
      },
      {
        q: "Är priserna högre eller lägre än på Systembolaget?",
        a: "Priset varierar – ibland är det högre på grund av småskalighet och hantverk, ibland kan du hitta gårdsexklusiva produkter som inte säljs på Systembolaget.",
      },
    ],
  },
  {
    title: "På plats hos gårdsförsäljaren",
    items: [
      {
        q: "Får jag provsmaka innan jag köper?",
        a: "Många gårdsförsäljare erbjuder provsmakning, ofta mot avgift. Vissa låter dig smaka enstaka droppar gratis i samband med köp.",
      },
      {
        q: "Måste jag boka provning?",
        a: "Ja, provningar är nästan alltid bokningsbara med begränsat antal platser. Boka i god tid, särskilt under helger.",
      },
      {
        q: "Hur lång tid tar ett gårdsbesök?",
        a: "Räkna med 30–60 minuter för enbart butiksbesök och 1–2 timmar för en guidad tur med provning.",
      },
      {
        q: "Får jag fotografera på gården?",
        a: "I de flesta fall är det helt okej att fotografera, men fråga gärna personalen, särskilt i produktionslokaler.",
      },
      {
        q: "Kan jag ta med hund?",
        a: "Många gårdar är hundvänliga utomhus, men inte alltid i butik eller produktion. Kontrollera i förväg.",
      },
      {
        q: "Är gårdarna tillgängliga för rullstol?",
        a: "Tillgängligheten varierar eftersom många gårdsförsäljare ligger i äldre byggnader. Hör av dig till gårdsförsäljaren för att få besked.",
      },
    ],
  },
  {
    title: "Resa, transport och utomlands",
    items: [
      {
        q: "Hur tar jag mig till en gård?",
        a: "De flesta gårdar ligger på landsbygden och nås enklast med bil. Vissa nås även med buss eller cykel – se gårdsförsäljarens vägbeskrivning.",
      },
      {
        q: "Får jag köra bil efter en provning?",
        a: "Nej, om du planerar att provsmaka bör du ha en nykter förare, ta taxi eller övernatta i närheten. Sveriges promillegräns är 0,2.",
      },
      {
        q: "Kan jag övernatta nära gårdarna?",
        a: "Många gårdar samarbetar med lokala B&B, hotell eller har egna rum. Tipsen finns ofta på gårdsförsäljarens webbplats.",
      },
      {
        q: "Får jag ta med mina inköp på flyget?",
        a: "Inom Schengen får du ta med begränsade mängder alkohol i incheckat bagage. Följ flygbolagets regler kring förpackning och mängd.",
      },
      {
        q: "Får jag ta med inköpen utomlands?",
        a: "Inom EU gäller fri rörlighet för personligt bruk inom vissa kvantiteter. Utanför EU gäller tullens införselregler i mottagarlandet.",
      },
      {
        q: "Hur transporterar jag flaskorna säkert hem?",
        a: "Förvara flaskorna stående, använd skyddande emballage och undvik att lägga dem löst i bagageutrymmet. Många gårdar säljer transportkartonger.",
      },
    ],
  },
  {
    title: "Gårdsförsäljare och kategorier",
    items: [
      {
        q: "Vilka typer av gårdsförsäljare erbjuder gårdsförsäljning?",
        a: "Bryggerier, vingårdar, destillerier, mjöderier och cidertillverkare är de vanligaste kategorierna i Sverige.",
      },
      {
        q: "Var hittar jag närmaste gård?",
        a: "Använd vår karta och våra regionssidor för att hitta gårdsförsäljare nära dig.",
      },
      {
        q: "Finns det gårdsförsäljning i hela Sverige?",
        a: "Ja, det finns gårdsförsäljare från Skåne i söder till Norrland i norr, men koncentrationen är högst i södra och mellersta Sverige.",
      },
      {
        q: "Hur hittar jag ekologiska gårdsförsäljare?",
        a: "Använd våra kategorifilter eller titta efter KRAV- och EU-ekologisk märkning på respektive producents webbplats.",
      },
      {
        q: "Säljer alla gårdsförsäljare både öl, vin och sprit?",
        a: "Nej, de flesta är specialiserade på en kategori. En vingård säljer vin, ett destilleri säljer sprit och så vidare.",
      },
      {
        q: "Är jag som gårdsförsäljare välkommen att synas hos er?",
        a: "Ja, vi presenterar gärna fler svenska gårdsförsäljare. Kontakta oss via vår kontaktsida så berättar vi mer.",
      },
    ],
  },
  {
    title: "Övrigt och tips",
    items: [
      {
        q: "Kan gårdsförsäljning kombineras med andra upplevelser?",
        a: "Många gårdar erbjuder mat, café, picknick eller vandringsleder. Fråga gårdsförsäljaren eller kolla deras evenemangskalender.",
      },
      {
        q: "Är det dyrt att åka på gårdsbesök?",
        a: "Många besök är gratis och du betalar bara för det du provar eller köper med dig. Provningar och mat tillkommer som separata kostnader.",
      },
      {
        q: "Kan jag boka gårdsbesök som företagsaktivitet?",
        a: "Ja, många gårdsförsäljare tar emot grupper och företag för skräddarsydda upplevelser. Kontakta gårdsförsäljaren direkt för upplägg och pris.",
      },
      {
        q: "Kan jag använda gårdsförsäljning för bröllop eller fest?",
        a: "Du får handla för eget bruk, men för större evenemang och utskänkning krävs separata serveringstillstånd som gårdsförsäljaren eller arrangören kan informera om.",
      },
      {
        q: "Hur uppdaterar ni informationen på sidan?",
        a: "Vi arbetar löpande med att hålla uppgifter aktuella, men öppettider och utbud förändras snabbt – dubbelkolla alltid med gårdsförsäljaren innan besök.",
      },
      {
        q: "Vad gör jag om informationen om en gårdsförsäljare är felaktig?",
        a: "Hör av dig till oss via kontaktsidan så uppdaterar vi informationen så snart vi kan.",
      },
    ],
  },
];

function FaqPage() {
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: groups.flatMap((g) =>
      g.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    ),
  };

  return (
    <PageLayout>
      <PageHero
        kicker="FAQ"
        title={`${total} vanliga frågor om gårdsförsäljning`}
        lead="Allt du behöver veta inför ditt besök hos svenska bryggerier, vingårdar och destillerier – från regler och åldersgränser till praktiska tips på plats."
      />
      <section className="section-pad">
        <div className="container-x max-w-3xl space-y-14">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="font-display text-2xl md:text-3xl text-heading mb-6">
                {group.title}
              </h2>
              <Accordion type="multiple" className="border-t border-border">
                {group.items.map((item, i) => (
                  <AccordionItem
                    key={item.q}
                    value={`${group.title}-${i}`}
                  >
                    <AccordionTrigger className="text-base md:text-lg text-heading py-5">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-body leading-relaxed pb-5">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </PageLayout>
  );
}
