import { micromark } from "$micromark"
import { gfm, gfmHtml } from "$micromark-extension-gfm"

export function render(markdown: string) {
  return micromark(markdown, {
    allowDangerousHtml: true,
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  })
}
