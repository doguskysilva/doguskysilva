import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PostDate from '../components/PostDate.vue'

describe('PostDate', () => {
  it('renders a <time> element', () => {
    const wrapper = mount(PostDate, { props: { date: '2025-10-12' } })
    expect(wrapper.find('time').exists()).toBe(true)
  })

  it('sets the datetime attribute to the raw date string', () => {
    const wrapper = mount(PostDate, { props: { date: '2025-10-12' } })
    expect(wrapper.find('time').attributes('datetime')).toBe('2025-10-12')
  })

  it('includes the year in the formatted output', () => {
    const wrapper = mount(PostDate, { props: { date: '2025-10-12' } })
    expect(wrapper.text()).toContain('2025')
  })

  it('accepts a custom locale prop', () => {
    const wrapper = mount(PostDate, { props: { date: '2025-10-12', locale: 'en-US' } })
    expect(wrapper.text()).toContain('2025')
  })
})
