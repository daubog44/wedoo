import { sdgs } from '../../data/core'
import { assetPath } from '../../lib/site-utils'
import { AppImage } from '../media/app-image'

export function SdgStrip({ ids }: { ids: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {ids.map((id) => {
        const item = sdgs[id]
        if (!item) {
          return null
        }

        return (
          <div
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-500"
            key={id}
          >
            <AppImage
              alt={item.label}
              className="h-5 w-5 rounded-full object-cover"
              src={assetPath(item.icon)}
            />
            <span>{item.label}</span>
          </div>
        )
      })}
    </div>
  )
}
