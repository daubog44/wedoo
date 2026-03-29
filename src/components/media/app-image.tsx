import type { ImgHTMLAttributes } from 'react'

type AppImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  priority?: boolean
}

export function AppImage({
  decoding,
  fetchPriority,
  loading,
  priority = false,
  ...props
}: AppImageProps) {
  return (
    <img
      decoding={decoding ?? 'async'}
      fetchPriority={fetchPriority ?? (priority ? 'high' : 'auto')}
      loading={loading ?? (priority ? 'eager' : 'lazy')}
      {...props}
    />
  )
}
