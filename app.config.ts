export default defineAppConfig({
  url: 'https://dogusky.netlify.app',
  language: 'pt-br',
  avatar: '/images/me.jpeg',
  description: "I'm Doug, Software Engineer, passionate about technology, programming, and uncovering how things truly work",
  name: 'Doug',
  table_of_contents: true,
  toc: {
    showChildren: true,
  },
  socials: {
    github: 'https://github.com/doguskysilva',
    linkedin: '',
    sharing_networks: ['facebook', 'twitter', 'linkedin'],
  },
  authors: [
    {
      name: 'Douglas Silva',
      username: 'doguskysilva',
      description: '',
      avatar: '/images/me.jpeg',
      default: true,
      socials: {
        github: 'https://github.com/doguskysilva',
        linkedin: '',
      },
    },
  ],
  pagination: {
    per_page: 6,
  },
  menu: [
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
  ],
})
