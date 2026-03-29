import type { ReactNode } from 'react'
import type { MajesticonName } from '../../lib/majesticons-map'
import { Surface, StatCard } from '../ui/index'

type BoardHeroProps = {
  action?: ReactNode
  description: string
  eyebrow: string
  stats?: Array<{
    icon: MajesticonName
    label: string
    value: string
  }>
  title: string
}

export function BoardHero({
  action,
  description,
  eyebrow,
  stats = [],
  title,
}: BoardHeroProps) {
  return (
    <Surface className="grid gap-6 xl:grid-cols-[0.72fr_0.28fr] xl:items-end">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-violet">
          {eyebrow}
        </p>
        <h1 className="text-4xl">{title}</h1>
        <p className="max-w-3xl text-base leading-8 text-slate-600">{description}</p>
      </div>

      {action ? (
        <div className="self-stretch xl:place-self-end">{action}</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
          {stats.map((stat) => (
            <StatCard icon={stat.icon} key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
      )}
    </Surface>
  )
}
