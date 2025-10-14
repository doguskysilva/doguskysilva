export default defineAppConfig({
  url: 'https://dogusky.netlify.app',
  language: 'pt-br',
  avatar: "/images/me.jpeg",
  description: "I'm Doug, Software Engineer, passionate about technology, programming, and uncovering how things truly work",
  theme: 'minimalist',
  name: 'Doug',
  table_of_contents: true,
  toc: {
    showChildren: true
  },
  socials: {
    github: 'https://github.com/doguskysilva',
    linkedin: '',
    sharing_networks: ['facebook', 'twitter', 'linkedin']
  },
  authors: [
    {
      name: "Douglas Silva", 
      username: "doguskysilva",
      description: "",
      avatar: "/images/me.jpeg",
      socials: {
        github: 'https://github.com/doguskysilva',
        linkedin: ''
      }
    }
  ],

  menu: [
    //{ name: 'Portfolio', path: '/portfolio'},
    { name: 'About', path: '/about'},
    { name: 'Archives', path: '/archives'},
  ],
})
