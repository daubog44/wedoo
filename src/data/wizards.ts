import type { WizardStep } from './types'

export const candidateWizardSteps: WizardStep[] = [
  {
    description:
      'Parti dalle info essenziali e vai online con un onboarding molto piu leggero di un form HR tradizionale.',
    eyebrow: 'Step 1',
    fields: [
      { key: 'fullName', label: 'Nome e cognome', placeholder: 'Inserisci nome e cognome', type: 'text' },
      { key: 'email', label: 'Email', placeholder: 'Inserisci la mail', type: 'email' },
      { key: 'phone', label: 'Numero di telefono', placeholder: 'Inserisci il numero di telefono', type: 'tel' },
      { key: 'password', label: 'Password', placeholder: 'Crea una password', type: 'password' },
      { key: 'confirmPassword', label: 'Conferma password', placeholder: 'Ripeti la password', type: 'password' },
      {
        helper: 'Simulazione statica del flusso originale. Il consenso apre lo step successivo.',
        key: 'privacy',
        label: 'Ho preso visione dell informativa privacy',
        type: 'checkbox',
      },
    ],
    image: 'formcandidati1.png',
    index: 1,
    title: 'Registrati come candidato',
  },
  {
    description:
      'Seleziona gli SDG che ti rappresentano e le mansioni da cui vuoi partire: il matching usera soprattutto questi due segnali.',
    eyebrow: 'Step 2',
    fields: [
      {
        key: 'sdgFocus',
        label: 'In quali SDG rispecchi il tuo impegno?',
        options: ['Parita di genere', 'Consumo responsabile', 'Clima', 'Ridurre le disuguaglianze'],
        type: 'chips',
      },
      {
        key: 'roles',
        label: 'Quali mansioni ti interessano?',
        options: ['Comunicazione', 'Data', 'UX writing', 'Marketing', 'Operations'],
        type: 'chips',
      },
      {
        key: 'message',
        label: 'Racconta in due righe cosa cerchi',
        placeholder: 'Quali contesti, valori o responsabilita vuoi trovare nel tuo primo ruolo?',
        type: 'textarea',
      },
    ],
    image: 'formcandidati2.png',
    index: 2,
    title: 'Dicci qualcosa in piu',
  },
]

export const companyWizardSteps: WizardStep[] = [
  {
    description:
      'L accesso azienda parte dai dati societari e dall account proprietario del primo annuncio.',
    eyebrow: 'Step 1',
    fields: [
      { key: 'vat', label: 'Partita IVA', placeholder: 'Inserisci P. IVA', type: 'text' },
      { key: 'companyName', label: 'Ragione sociale', placeholder: 'Inserisci ragione sociale', type: 'text' },
      { key: 'email', label: 'Email', placeholder: 'Inserisci la mail', type: 'email' },
      { key: 'password', label: 'Password', placeholder: 'Crea una password', type: 'password' },
      { key: 'confirmPassword', label: 'Conferma password', placeholder: 'Ripeti la password', type: 'password' },
      { key: 'privacy', label: 'Ho preso visione dell informativa privacy', type: 'checkbox' },
    ],
    image: 'formaziende1.png',
    index: 1,
    title: 'Apri l account azienda',
  },
  {
    description:
      'Rendi immediatamente chiaro chi segue la candidatura: nome, cognome, email e telefono reali.',
    eyebrow: 'Step 2',
    fields: [
      {
        key: 'showContacts',
        label: 'Pubblica informazioni di contatto',
        type: 'checkbox',
      },
      { key: 'ownerName', label: 'Nome', placeholder: 'Inserisci nome', type: 'text' },
      { key: 'ownerSurname', label: 'Cognome', placeholder: 'Inserisci cognome', type: 'text' },
      { key: 'contactEmail', label: 'E-mail', placeholder: 'Inserisci la mail', type: 'email' },
      { key: 'contactPhone', label: 'Numero di telefono', placeholder: 'Inserisci numero di telefono', type: 'tel' },
      {
        key: 'contactNote',
        label: 'Lascia un messaggio',
        placeholder: 'Per maggiori informazioni contattare...',
        type: 'textarea',
      },
    ],
    image: 'formaziende2.png',
    index: 2,
    title: 'Inserisci i riferimenti del recruiter',
  },
  {
    description:
      'Carica il logo e dichiara il range economico: la trasparenza del pacchetto e un elemento chiave del prodotto.',
    eyebrow: 'Step 3',
    fields: [
      { key: 'message', label: 'Lascia un messaggio', placeholder: 'Breve intro del ruolo o del team', type: 'textarea' },
      { key: 'logo', label: 'Carica il tuo logo', type: 'file' },
      { key: 'salaryPublic', label: 'Pubblica informazioni di retribuzione', type: 'checkbox' },
      { key: 'salaryMin', label: 'Importo minimo', placeholder: 'Inserisci importo minimo', type: 'text' },
      { key: 'salaryMax', label: 'Importo massimo', placeholder: 'Inserisci importo massimo', type: 'text' },
    ],
    image: 'formaziende3.png',
    index: 3,
    title: 'Aggiungi brand e retribuzione',
  },
  {
    description:
      'Definisci contesto di lavoro, trasferte, remoto e descrizione concreta delle responsabilita.',
    eyebrow: 'Step 4',
    fields: [
      {
        key: 'remote',
        label: 'Smart working',
        helper: 'Attiva se il ruolo prevede lavoro ibrido o remoto.',
        type: 'toggle',
      },
      {
        key: 'travel',
        label: 'Trasferte',
        helper: 'Attiva se la posizione richiede spostamenti regolari.',
        type: 'toggle',
      },
      {
        key: 'jobDescription',
        label: 'Job description',
        placeholder: 'Descrivi attivita quotidiane, contesto e aspettative del ruolo.',
        type: 'textarea',
      },
    ],
    image: 'formaziende4.png',
    index: 4,
    title: 'Racconta il lavoro, non lo slogan',
  },
  {
    description:
      'L ultimo step chiede prove: certificazioni, report o documenti che rendano verificabile il posizionamento sostenibile.',
    eyebrow: 'Step 5',
    fields: [
      {
        helper: 'Anche un report ESG o un documento interno di sostenibilita va bene per la simulazione.',
        key: 'certifications',
        label: 'Carica certificazioni sostenibili o report aziendale',
        type: 'file',
      },
    ],
    image: 'formaziende5.png',
    index: 5,
    title: 'Allega le prove di sostenibilita',
  },
]
