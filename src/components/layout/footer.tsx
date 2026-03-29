import { assetPath, documentPath } from '../../lib/site-utils'
import { AppImage } from '../media/app-image'

export function Footer() {
  return (
    <footer className="w-full bg-brand-violet-deep p-4 mt-12">
      <div className="container mx-auto text-center">
        <div className="mb-3 flex justify-center">
          <AppImage
            alt="Wedoo Logo"
            className="h-[70px] w-auto ml-[2%] object-contain"
            src={assetPath('scritta-wedoo.png')}
          />
        </div>
        <div className="text-sm text-white space-y-1">
          <p className="m-0">&copy; 2025 Wedoo - Tutti i diritti riservati</p>
          <p className="m-0">Wedoo è un progetto in fase di sviluppo.</p>
          <p className="m-0">Contatti: help@wedoo.com</p>
          <p className="m-0">
            <a
              className="text-white decoration-transparent transition-colors hover:text-brand-lavender-300"
              href={documentPath('Informativa privacy per sito.pdf')}
              rel="noreferrer"
              target="_blank"
            >
              Privacy Policy
            </a>{' '}
            |{' '}
            <a
              className="text-white decoration-transparent transition-colors hover:text-brand-lavender-300"
              href={documentPath('Cookie policy per sito.pdf')}
              rel="noreferrer"
              target="_blank"
            >
              Cookie Policy
            </a>{' '}
            |{' '}
            <a
              className="text-white decoration-transparent transition-colors hover:text-brand-lavender-300"
              href={documentPath('Termini di servizio per sito.pdf')}
              rel="noreferrer"
              target="_blank"
            >
              Termini d'uso
            </a>
          </p>
          <p className="m-0">Alcune funzionalità e contenuti sono a scopo dimostrativo.</p>
          <p className="m-0">Le aziende e le opportunità presenti sono a puro scopo dimostrativo.</p>
        </div>
      </div>
    </footer>
  )
}
