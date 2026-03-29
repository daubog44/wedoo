import { Link, NavLink } from 'react-router-dom'
import { routeMap } from '../../data/core'
import { assetPath, cn } from '../../lib/site-utils'
import { AppImage } from '../media/app-image'
import { ButtonLink } from '../ui/index'

function navClass({ isActive }: { isActive: boolean }) {
  return cn(
    'rounded-full px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-brand-ink',
    isActive && 'bg-slate-100 text-brand-ink',
  )
}

export function PublicHeader() {
  return (
    <header className="section-shell sticky top-3 z-30 pt-4 sm:pt-6">
      <div className="glass-panel relative overflow-hidden px-5 py-4">
        <div className="spot-orb -right-10 top-0 h-28 w-28 bg-brand-mint/25" />
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <Link className="inline-flex items-center gap-3" to="/">
            <AppImage
              alt="Wedoo"
              className="h-10 w-auto"
              priority
              src={assetPath('scritta-wedoo.png')}
            />
            <span className="rounded-full bg-brand-violet/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-violet">
              React edition
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-2">
            <NavLink className={navClass} end to="/">
              Home
            </NavLink>
            <NavLink className={navClass} to="/info">
              Info
            </NavLink>
            <NavLink className={navClass} to="/articoli">
              Articoli
            </NavLink>
            <NavLink className={navClass} to="/podcast">
              Podcast
            </NavLink>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink to="/accedi" tone="ghost">
              Accedi
            </ButtonLink>
            <ButtonLink to="/registrati" tone="violet">
              Registrati
            </ButtonLink>
            <ButtonLink className="sm:inline-flex" to={routeMap.company.showcase} tone="mint">
              Sei un azienda?
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  )
}
