import { DOMParser } from 'linkedom'

export type ParsedElement = {
  textContent: string
  getAttribute(name: string): string | null
}

export type ParsedDocument = {
  documentElement: ParsedElement | null
  querySelector(selector: string): ParsedElement | null
  querySelectorAll(selector: string): Iterable<ParsedElement>
}

export function parseHTML(html: string): ParsedDocument {
  return new DOMParser().parseFromString(html, 'text/html')
}
