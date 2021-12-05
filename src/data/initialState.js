export default {
  basics: {
    name: 'John Doe',
    label: 'Programmer',
    image: '',
    email: 'john@gmail.com',
    phone: '(912) 555-4321',
    url: 'https://johndoe.com',
    summary: 'A summary of John Doe…',
    location: {
      address: '2712 Broadway St',
      postalCode: 'CA 94115',
      city: 'San Francisco',
      countryCode: 'US',
      region: 'California',
    },
    profiles: [
      {
        id: '1',
        network: 'Twitter',
        username: 'john',
        // url: 'https://twitter.com/john',
      },
    ],
  },
  work: [
    {
      id: '1',
      name: 'Company',
      position: 'President',
      url: 'https://company.com',
      startDate: '2013-01-01',
      endDate: '2014-01-01',
      summary: 'Description…',
      highlights: ['Started the company'],
    },
  ],
  // volunteer: [
  //   {
  //     organization: 'Organization',
  //     position: 'Volunteer',
  //     url: 'https://organization.com/',
  //     startDate: '2012-01-01',
  //     endDate: '2013-01-01',
  //     summary: 'Description…',
  //     highlights: ["Awarded 'Volunteer of the Month'"],
  //   },
  // ],
  education: [
    {
      id: '1',
      institution: 'University',
      // url: 'https://institution.com/',
      area: 'Software Development',
      // studyType: 'Bachelor',
      startDate: '2011-01-01',
      endDate: '2013-01-01',
      // score: '4.0',
      // courses: ['DB1101 - Basic SQL'],
    },
  ],
  awards: [
    {
      id: '1',
      title: 'Award',
      date: '2014-11-01',
      // awarder: 'Company',
      summary: 'There is no spoon.',
    },
  ],
  // publications: [
  //   {
  //     name: 'Publication',
  //     publisher: 'Company',
  //     releaseDate: '2014-10-01',
  //     url: 'https://publication.com',
  //     summary: 'Description…',
  //   },
  // ],
  skills: [
    {
      id: '1',
      name: 'Web Development',
      level: 'Advanced',
      keywords: ['HTML', 'CSS', 'JavaScript'],
    },
  ],
  languages: [
    {
      id: '1',
      language: 'English',
      fluency: 'Native speaker',
    },
  ],
  interests: [
    {
      id: '1',
      name: 'Wildlife',
      keywords: ['Ferrets', 'Unicorns'],
    },
  ],
  // references: [
  //   {
  //     name: 'Jane Doe',
  //     reference: 'Reference…',
  //   },
  // ],
  projects: [
    {
      id: '1',
      name: 'Project',
      description: 'Description…',
      // highlights: ['Won award at AIHacks 2016'],
      // keywords: ['HTML'],
      startDate: '2019-01-01',
      endDate: '2021-01-01',
      // url: 'https://project.com/',
      // roles: ['Team Lead'],
      // entity: 'Entity',
      // type: 'application',
    },
  ],
  metadata: {
    name: 'United',
    font: 'Montserrat',
    colors: {
      primary: '#3da9fc',
      secondary: '#d8eefe',
      heading: '#094067',
      text: '#5f6c7b',
      background: '#fffffe',
    },
    language: '',
    template: 'Cartoon1',
    sections: {
      // basics: {
      //   heading: 'Basics',
      //   visible: true,
      //   details: {
      //     name: {
      //       visible: true,
      //     },
      //     label: {
      //       visible: true,
      //     },
      //     image: {
      //       visible: true,
      //     },
      //     email: {
      //       visible: true,
      //     },
      //     phone: {
      //       visible: true,
      //     },
      //     url: {
      //       visible: true,
      //     },
      //     summary: {
      //       visible: true,
      //     },
      //     location: {
      //       visible: true,
      //     },
      //     profiles: {
      //       visible: true,
      //     },
      //   },
      // },
      profiles: {
        heading: 'Profiles',
        visible: true,
        details: {
          network: {
            visible: true,
          },
          username: {
            visible: true,
          },
          // url: {
          //   visible: true,
          // },
        },
      },
      work: {
        heading: 'Work',
        visible: true,
        details: {
          name: {
            visible: true,
          },
          // position: {
          //   visible: true,
          // },
          // url: {
          //   visible: true,
          // },
          startDate: {
            visible: true,
          },
          endDate: {
            visible: true,
          },
          summary: {
            visible: true,
          },
          // highlights: {
          //   visible: true,
          // },
        },
      },
      // volunteer: {
      //   heading: 'Volunteer',
      //   visible: true,
      //   details: {
      //     organization: {
      //       visible: true,
      //     },
      //     position: {
      //       visible: true,
      //     },
      //     url: {
      //       visible: true,
      //     },
      //     startDate: {
      //       visible: true,
      //     },
      //     endDate: {
      //       visible: true,
      //     },
      //     summary: {
      //       visible: true,
      //     },
      //     highlights: {
      //       visible: true,
      //     },
      //   },
      // },
      education: {
        heading: 'Education',
        visible: true,
        details: {
          institution: {
            visible: true,
          },
          // url: {
          //   visible: true,
          // },
          area: {
            visible: true,
          },
          // studyType: {
          //   visible: true,
          // },
          startDate: {
            visible: true,
          },
          endDate: {
            visible: true,
          },
          // score: {
          //   visible: true,
          // },
          // courses: {
          //   visible: true,
          // },
        },
      },
      awards: {
        heading: 'Awards',
        visible: false,
        details: {
          title: {
            visible: true,
          },
          date: {
            visible: true,
          },
          // awarder: {
          //   visible: true,
          // },
          summary: {
            visible: true,
          },
        },
      },
      // publications: {
      //   heading: 'Publications',
      //   visible: true,
      //   details: {
      //     name: {
      //       visible: true,
      //     },
      //     publisher: {
      //       visible: true,
      //     },
      //     releaseDate: {
      //       visible: true,
      //     },
      //     url: {
      //       visible: true,
      //     },
      //     summary: {
      //       visible: true,
      //     },
      //   },
      // },
      skills: {
        heading: 'Skills',
        visible: true,
        details: {
          name: {
            visible: true,
          },
          level: {
            visible: true,
          },
          keywords: {
            visible: true,
          },
        },
      },
      languages: {
        heading: 'Languages',
        visible: true,
        details: {
          language: {
            visible: true,
          },
          fluency: {
            visible: true,
          },
        },
      },
      interests: {
        heading: 'Interests',
        visible: true,
        details: {
          name: {
            visible: true,
          },
          keywords: {
            visible: true,
          },
        },
      },
      // references: {
      //   heading: 'References',
      //   visible: true,
      //   details: {
      //     name: {
      //       visible: true,
      //     },
      //     reference: {
      //       visible: true,
      //     },
      //   },
      // },
      projects: {
        heading: 'Projects',
        visible: true,
        details: {
          name: {
            visible: true,
          },
          description: {
            visible: true,
          },
          // highlights: {
          //   visible: true,
          // },
          // keywords: {
          //   visible: true,
          // },
          startDate: {
            visible: true,
          },
          endDate: {
            visible: true,
          },
          // url: {
          //   visible: true,
          // },
          // roles: {
          //   visible: true,
          // },
          // entity: {
          //   visible: true,
          // },
          // type: {
          //   visible: true,
          // },
        },
      },
    },
  },
}
