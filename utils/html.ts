import { DOMParser } from '@b-fuze/deno-dom'

// Based on https://github.com/jimniels/html
export function html(strings: TemplateStringsArray, ...values: unknown[]) {
  return strings.reduce((acc, string, i) => {
    const value = values[i]

    if (Array.isArray(value)) return acc + string + value.join('')
    if (value != null && !!value !== value) return acc + string + value
    return acc + string
  }, '')
}

export function parseHTML(html: string) {
  return new DOMParser().parseFromString(html, 'text/html')
}
