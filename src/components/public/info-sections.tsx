import { assetPath } from "../../lib/site-utils";
import { PreviewFrame, SectionIntro, Surface } from "../ui/index";

export function InfoStorySection() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <Surface className="space-y-6" id="noixnoi">
        <SectionIntro
          description="Il tono resta diretto e concreto: Wedoo nasce da chi ha vissuto in prima persona la fatica di trovare stage coerenti e leggibili."
          eyebrow="Noi x noi"
          title="Un progetto pensato da studenti che volevano piu chiarezza"
        />
        <p className="text-base leading-8 text-slate-600">
          Due studenti di digital marketing, uno stage a Milano e una domanda
          semplice: se il lavoro deve occupare cosi tanto spazio nella vita,
          perche trovare un ambiente coerente con i propri valori deve sembrare
          un colpo di fortuna?
        </p>
        <p className="text-base leading-8 text-slate-600">
          Da qui nasce Wedoo: una piattaforma che aiuta Gen Z, ITS e universita
          a filtrare il rumore, a leggere meglio le opportunita e a spostare la
          conversazione da slogan a evidenze.
        </p>
      </Surface>
      <div className="grid gap-6 sm:grid-cols-2">
        <PreviewFrame
          alt="Noi x noi 1"
          className="aspect-[4/5]"
          src={assetPath("image_noixnoi1.jpg")}
        />
        <PreviewFrame
          alt="Noi x noi 2"
          className="aspect-[4/5] sm:translate-y-10"
          src={assetPath("image_noixnoi2.jpg")}
        />
      </div>
    </section>
  );
}

export function InfoGoalsSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]" id="obiettivi">
      <Surface className="bg-brand-rose/10">
        <SectionIntro
          description="La parte piu delicata del prodotto non e l algoritmo: e il patto di trasparenza con chi legge l annuncio."
          eyebrow="17 obiettivi per il futuro"
          title="Le aziende vengono lette su due livelli: brand e ruolo"
        />
        <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
          <p>
            Prima controlliamo che l azienda abbia un impegno riconoscibile
            verso sostenibilita, clima, diritti o governance. Poi leggiamo il
            ruolo: se contribuisce davvero ad almeno un obiettivo Agenda 2030,
            lo segnaliamo chiaramente.
          </p>
          <p>
            Se il brand e credibile ma la singola mansione e piu neutra, l
            annuncio resta valido ma viene presentato per quello che e, senza
            promesse ambigue.
          </p>
        </div>
      </Surface>
      <PreviewFrame
        alt="Diagramma SDG"
        className="aspect-[16/12]"
        src={assetPath("diagramma.png")}
      />
    </section>
  );
}
