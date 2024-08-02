import { DOMParser } from '@b-fuze/deno-dom'

export function parseHTML(html: string) {
  return new DOMParser().parseFromString(html, 'text/html')
}
