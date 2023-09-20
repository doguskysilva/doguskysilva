export default defineAppConfig({
  alpine: {
    title: 'Douglas Silva',
    description: 'My minimalist space to share my thoughts and notes',
    image: {
      src: '/social-card-preview.png',
      alt: 'My minimalist space to share mu thoughts and notes.',
      width: 400,
      height: 300
    },
    header: {
      position: 'right', // possible value are : | 'left' | 'center' | 'right'
      logo: {
        path: '/logo.svg', // path of the logo
        pathDark: '/logo-dark.svg', // path of the logo in dark mode, leave this empty if you want to use the same logo
        alt: 'Me' // alt of the logo
      }
    },
    footer: {
      credits: {
        enabled: false, // possible value are : true | false
        repository: 'https://www.github.com/doguskysilva' // our github repository
      },
      navigation: true, // possible value are : true | false
      alignment: 'center', // possible value are : 'none' | 'left' | 'center' | 'right'
      message: 'Follow me on' // string that will be displayed in the footer (leave empty or delete to disable)
    },
    socials: {
      twitter: 'doguskysilva',
      instagram: 'dogusky',
      linkedin: {
        icon: 'uil:linkedin',
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/douglas-silva-michalski'
      },
      github: 'doguskysilva'
    },
    form: {
      successMessage: 'Message sent. Thank you!'
    }
  }
})
