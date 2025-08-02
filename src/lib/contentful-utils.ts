import type { Asset } from 'contentful'

export function processAsset(asset?: Asset): string | undefined {
  if (!asset || !asset.fields) return undefined
  return asset.fields.file?.url ? `https:${asset.fields.file.url}` : undefined
}