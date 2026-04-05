import { describe, it, expect } from 'vitest'
import { extractText, readingTime } from '../composables/useReadingTime'

describe('extractText', () => {
  it('returns empty string for falsy input', () => {
    expect(extractText(null)).toBe('')
    expect(extractText(undefined)).toBe('')
    expect(extractText('')).toBe('')
  })

  it('returns the string itself when given a plain string', () => {
    expect(extractText('hello world')).toBe('hello world')
  })

  it('extracts value from a text node', () => {
    expect(extractText({ type: 'text', value: 'hello' })).toBe('hello')
  })

  it('recurses into children array', () => {
    const node = {
      type: 'paragraph',
      children: [
        { type: 'text', value: 'hello' },
        { type: 'text', value: 'world' },
      ],
    }
    expect(extractText(node)).toBe('hello world')
  })

  it('handles deeply nested children', () => {
    const node = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', value: 'deep' }],
        },
      ],
    }
    expect(extractText(node)).toBe('deep')
  })

  it('joins items in a plain array', () => {
    expect(extractText(['foo', 'bar'])).toBe('foo bar')
  })

  it('ignores nodes without type or children', () => {
    expect(extractText({ random: 'key' })).toBe('')
  })
})

describe('readingTime', () => {
  it('returns at least 1 min read for very short content', () => {
    expect(readingTime({ type: 'text', value: 'Hi' })).toBe('1 min read')
  })

  it('calculates correctly for ~200 words', () => {
    const value = Array(200).fill('word').join(' ')
    expect(readingTime({ type: 'text', value })).toBe('1 min read')
  })

  it('calculates correctly for ~400 words', () => {
    const value = Array(400).fill('word').join(' ')
    expect(readingTime({ type: 'text', value })).toBe('2 min read')
  })

  it('rounds up fractional minutes', () => {
    const value = Array(201).fill('word').join(' ')
    expect(readingTime({ type: 'text', value })).toBe('2 min read')
  })

  it('returns 1 min read for empty body', () => {
    expect(readingTime(null)).toBe('1 min read')
    expect(readingTime({})).toBe('1 min read')
  })
})
