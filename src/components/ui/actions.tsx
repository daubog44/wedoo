import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AppIcon } from '../../lib/icons'
import type { MajesticonName } from '../../lib/majesticons-map'
import { cn } from '../../lib/site-utils'

export type Tone = 'violet' | 'mint' | 'gold' | 'ghost' | 'ink'
export type FigmaButtonSurface = 'flat' | 'raised'
export type RoleButtonTone = 'candidate' | 'company'
export type DiscoverButtonTone = 'gold' | 'rose' | 'lavender'
export type SupportButtonTone = 'violet' | 'ink'
export type SupportButtonVariant = 'filled' | 'outline'

const toneClasses: Record<Tone, string> = {
  violet:
    'bg-brand-violet text-white shadow-[0_20px_40px_-20px_rgba(91,63,209,0.85)] hover:bg-brand-violet-deep',
  mint: 'bg-brand-mint text-brand-ink shadow-[0_20px_40px_-20px_rgba(105,242,196,0.85)] hover:bg-brand-mint-deep hover:text-white',
  gold: 'bg-brand-gold text-brand-ink shadow-[0_20px_40px_-20px_rgba(245,221,97,0.8)] hover:bg-brand-gold-600',
  ghost: 'bg-white/85 text-brand-ink ring-1 ring-black/8 hover:bg-white',
  ink: 'bg-brand-ink text-white hover:bg-brand-violet',
}

const figmaButtonBaseClassName =
  'inline-flex items-center justify-center rounded-[8px] transition-transform duration-200 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50'

const roleButtonClasses: Record<RoleButtonTone, Record<FigmaButtonSurface, string>> = {
  candidate: {
    flat: 'bg-brand-mint text-brand-ink',
    raised:
      'bg-[var(--wedoo-button-role-candidate-raised)] text-brand-ink shadow-[var(--wedoo-button-elevated-shadow)]',
  },
  company: {
    flat: 'bg-brand-violet text-white',
    raised:
      'bg-[var(--wedoo-button-role-company-raised)] text-white shadow-[var(--wedoo-button-elevated-shadow)]',
  },
}

const discoverButtonClasses: Record<DiscoverButtonTone, Record<FigmaButtonSurface, string>> = {
  gold: {
    flat: 'bg-[var(--wedoo-gold-soft)] text-brand-ink',
    raised:
      'bg-[var(--wedoo-button-discover-gold-raised)] text-brand-ink shadow-[var(--wedoo-button-elevated-shadow)]',
  },
  rose: {
    flat: 'bg-[var(--wedoo-rose-soft)] text-brand-ink',
    raised:
      'bg-[var(--wedoo-button-discover-rose-raised)] text-brand-ink shadow-[var(--wedoo-button-elevated-shadow)]',
  },
  lavender: {
    flat: 'bg-brand-violet-soft text-brand-ink',
    raised:
      'bg-[var(--wedoo-button-discover-lavender-raised)] text-brand-ink shadow-[var(--wedoo-button-elevated-shadow)]',
  },
}

const supportButtonClasses: Record<
  SupportButtonTone,
  Record<SupportButtonVariant, string>
> = {
  violet: {
    filled:
      'border-brand-violet-100 bg-brand-violet text-white shadow-[inset_0_0_0_1px_var(--wedoo-violet-100)]',
    outline:
      'border-brand-violet-100 bg-white text-brand-violet-soft',
  },
  ink: {
    filled: 'border-black bg-black text-white',
    outline: 'border-black bg-white text-brand-ink',
  },
}

type ButtonLinkProps = {
  children: ReactNode
  className?: string
  external?: boolean
  icon?: MajesticonName
  rel?: string
  target?: string
  to: string
  tone?: Tone
}

export function ButtonLink({
  children,
  className,
  external = false,
  icon,
  rel,
  target,
  to,
  tone = 'violet',
}: ButtonLinkProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold tracking-tight transition-transform duration-200 hover:-translate-y-0.5',
    toneClasses[tone],
    className,
  )

  const content = (
    <>
      {icon ? <AppIcon className="text-lg" name={icon} /> : null}
      <span>{children}</span>
    </>
  )

  if (external) {
    return (
      <a className={classes} href={to} rel={rel} target={target}>
        {content}
      </a>
    )
  }

  return (
    <Link className={classes} to={to}>
      {content}
    </Link>
  )
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: MajesticonName
  tone?: Tone
}

export function Button({
  children,
  className,
  icon,
  tone = 'violet',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold tracking-tight transition-transform duration-200 hover:-translate-y-0.5',
        toneClasses[tone],
        className,
      )}
      type={type}
      {...props}
    >
      {icon ? <AppIcon className="text-lg" name={icon} /> : null}
      <span>{children}</span>
    </button>
  )
}

type RoleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  surface?: FigmaButtonSurface
  tone: RoleButtonTone
}

export function RoleButton({
  children,
  className,
  surface = 'flat',
  tone,
  type = 'button',
  ...props
}: RoleButtonProps) {
  return (
    <button
      className={cn(
        figmaButtonBaseClassName,
        'min-h-[60px] min-w-[189px] px-6 py-3 font-wedoo-accent text-[24px] leading-none font-normal',
        roleButtonClasses[tone][surface],
        className,
      )}
      type={type}
      {...props}
    >
      <span>{children}</span>
    </button>
  )
}

type DiscoverButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  icon?: MajesticonName
  surface?: FigmaButtonSurface
  tone: DiscoverButtonTone
}

export function DiscoverButton({
  children,
  className,
  icon = 'chevron-right',
  surface = 'flat',
  tone,
  type = 'button',
  ...props
}: DiscoverButtonProps) {
  return (
    <button
      className={cn(
        figmaButtonBaseClassName,
        'min-h-[57px] min-w-[181px] gap-3 px-6 py-3 font-wedoo-accent text-[24px] leading-none font-normal',
        discoverButtonClasses[tone][surface],
        className,
      )}
      type={type}
      {...props}
    >
      <span>{children}</span>
      <AppIcon className="shrink-0" height={24} name={icon} width={24} />
    </button>
  )
}

type SupportButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  icon?: MajesticonName
  tone: SupportButtonTone
  variant?: SupportButtonVariant
}

export function SupportButton({
  children,
  className,
  icon = 'phone',
  tone,
  type = 'button',
  variant = 'filled',
  ...props
}: SupportButtonProps) {
  return (
    <button
      className={cn(
        figmaButtonBaseClassName,
        'min-h-[54px] min-w-[300px] gap-2.5 border-2 px-5 py-3 font-wedoo-accent text-[24px] leading-none font-bold',
        supportButtonClasses[tone][variant],
        className,
      )}
      type={type}
      {...props}
    >
      <AppIcon className="shrink-0" height={30} name={icon} width={30} />
      <span>{children}</span>
    </button>
  )
}

type PillButtonProps = {
  active?: boolean
  children: ReactNode
  className?: string
  onClick?: () => void
  tone?: 'slate' | 'violet' | 'mint'
}

export function PillButton({
  active = false,
  children,
  className,
  onClick,
  tone = 'slate',
}: PillButtonProps) {
  const palette =
    tone === 'violet'
      ? active
        ? 'bg-brand-violet text-white'
        : 'bg-brand-violet/10 text-brand-violet hover:bg-brand-violet/20'
      : tone === 'mint'
        ? active
          ? 'bg-brand-mint text-brand-ink'
          : 'bg-brand-mint/20 text-brand-mint-deep hover:bg-brand-mint/30'
        : active
          ? 'bg-brand-ink text-white'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'

  return (
    <button
      className={cn(
        'inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium transition',
        palette,
        className,
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}
