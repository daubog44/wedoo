export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ')
}

export function assetPath(file: string) {
  return `/assets/${encodeURI(file)}`
}

export function documentPath(file: string) {
  return `/assets/documenti/${encodeURI(file)}`
}

export function referencePath(file: string) {
  return `/references/${encodeURI(file)}`
}
