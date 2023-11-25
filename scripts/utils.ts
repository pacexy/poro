import { JSDOM } from 'jsdom'

export function createDocument(html: string) {
  const jsdom = new JSDOM(html)
  return jsdom.window.document
}

export function removeRedundantSpace(str?: string | null) {
  if (!str) return ''
  return str.trim().split(' ').filter(Boolean).join(' ')
}

export function text(node?: Node | null) {
  return removeRedundantSpace(node?.textContent)
}

export function $(el: Element | Document, selector: string) {
  return el.querySelector(selector)
}

export function $$(el: Element | Document, selector: string) {
  return Array.from(el.querySelectorAll(selector))
}

export function withComment(content: string, comment?: string) {
  if (!comment) return content
  return [
    `/* ${comment} */`, //
    content,
  ].join('\n')
}
