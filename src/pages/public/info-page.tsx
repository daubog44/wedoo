import { faqGroups } from "../../data/core";
import { assetPath } from "../../lib/site-utils";
import { FaqBoard, PageSection, SiteFooter, TopLogoBar } from "../../components/site";

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-brand-page">
      <TopLogoBar />
      <PageSection>
        <h3 className="mt-[5vh] text-center font-oxygen text-[2.5rem] text-brand-gold" id="noixnoi">
          noi x noi
        </h3>
        <div className="mt-6 grid gap-6 md:grid-cols-[3fr_1fr] md:items-center">
          <div
            className="min-h-[40vh] bg-contain bg-left bg-no-repeat"
            style={{ backgroundImage: `url(${assetPath("giallovuoto.png")})` }}
          >
            <p className="mt-[5vh] p-[10vh] text-[1.1rem]">
              Siamo due ragazzi, studenti di digital marketing, partiti da uno stage a Milano, con una cosa ben chiara
              in testa: il lavoro serve, ma non a qualsiasi costo. <b>Sostenibilita, clima, diritti:</b> vogliamo
              contesti che riconoscano i nostri valori, e non offrano solo ruoli da riempire.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              alt="Noi x noi 1"
              className="h-[40vh] w-[40vh] rounded-[50%] object-cover"
              src={assetPath("image_noixnoi1.jpg")}
            />
          </div>
        </div>
        <p className="p-[5vh] text-[1.1rem]">
          Durante il nostro percorso ci siamo scontrati con la realta: trovare uno <b>stage</b> e complicato, spesso
          piu del lavoro stesso. Le aziende cercano giovani con <b>esperienza</b>... ma se nessuno te la da, come fai?
        </p>
        <div className="grid gap-6 md:grid-cols-[1fr_3fr] md:items-center">
          <div className="flex justify-center md:justify-start">
            <img
              alt="Noi x noi 2"
              className="h-[40vh] w-[40vh] rounded-[50%] object-cover"
              src={assetPath("image_noixnoi2.jpg")}
            />
          </div>
          <div
            className="min-h-[40vh] bg-contain bg-right bg-no-repeat"
            style={{ backgroundImage: `url(${assetPath("giallopieno.png")})` }}
          >
            <p className="mt-[5vh] p-[12vh] text-[1.1rem]">
              E cosi che nasce <b>Wedoo</b>: un'app pensata per <b>facilitare il passaggio dalla scuola al lavoro</b>.
              Con il supporto di <b>Universita e ITS</b>, aiutiamo i ragazzi della <b>GenZ</b> a trovare stage,
              tirocini e opportunita in linea con i loro valori, non solo con un titolo di studio.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection>
        <h3 className="mt-[5vh] text-center font-oxygen text-[2.5rem] text-brand-rose" id="obiettivi">
          17 obiettivi per il futuro
        </h3>
        <div className="mt-[5vh] grid gap-6 lg:grid-cols-[7fr_5fr]">
          <div
            className="min-h-[60vh] bg-contain bg-left-top bg-no-repeat"
            style={{ backgroundImage: `url(${assetPath("rosa.png")})` }}
          >
            <p className="pl-[5vh] pr-[5vh] pt-[8vh] text-[1.1rem] lg:pr-[30vh]">
              Quando arriva una nuova offerta, prima di tutto verifichiamo che l'azienda abbia un <b>impegno concreto
              verso la sostenibilita</b>. Se l'azienda e allineata, valutiamo poi la mansione proposta: deve contribuire
              <b> almeno a uno dei 17 Obiettivi di Sviluppo Sostenibile dell'Agenda 2030</b>.
              <br />
              <br />
              Se invece <b>l'azienda e sostenibile ma il ruolo non lo e completamente</b>, l'annuncio <b>resta
              valido</b>, ma segnaliamo chiaramente che quella posizione e meno in linea con i valori che vogliamo
              promuovere.
              <br />
              <br />
              Per garantire che l'<b>impegno</b> sia <b>autentico e verificabile</b>, chiediamo alle aziende di caricare
              <b> certificazioni</b> o, in mancanza, il loro <b>report di sostenibilita</b>.
            </p>
          </div>
          <div className="flex justify-center">
            <img alt="Diagramma obiettivi" className="mt-[5vh] h-[38vh] w-auto" src={assetPath("diagramma.png")} />
          </div>
        </div>
      </PageSection>

      <PageSection className="pb-4">
        <h3 className="mb-8 mt-[5vh] text-center font-oxygen text-[2.5rem] text-brand-violet" id="dubbi">
          dubbi? le FAQ ti aiutano!
        </h3>
        <FaqBoard groups={faqGroups} />
      </PageSection>
      <SiteFooter />
    </div>
  );
}
