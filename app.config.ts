export default defineAppConfig({
  theme: 'minimalist',
  language: 'pt-br',
  name: 'Doug',
  description: "I'm Doug, Software Engineer, passionate about technology, programming, and uncovering how things truly work",

  socials: {
    github: 'https://github.com/doguskysilva',
      sharing_networks: ['facebook', 'twitter', 'linkedin']
  },

  authors: [
    {name: "Douglas Silva", username: "doguskysilva"}
  ],

  table_of_contents: true,

  menu: [
    { name: 'About', path: '/about'},
    { name: 'Archives', path: '/archives'},
  ],
})
