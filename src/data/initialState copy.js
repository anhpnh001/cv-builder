export default {
  metadata: {
    template: 'Cartoon1',
    thumbnail: '',
  },
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
        id: 1,
        network: 'Twitter',
        username: 'john',
        url: 'https://twitter.com/john',
      },
    ],
  },
  work: {
    heading: 'Work',
    visible: true,
    items: [
      {
        id: 1,
        name: 'Company',
        position: 'President',
        url: 'https://company.com',
        startDate: '2013-01-01',
        endDate: '2014-01-01',
        summary: 'Description…',
        highlights: ['Started the company'],
      },
      {
        id: 2,
        name: 'Company 2',
        position: 'President',
        url: 'https://company.com',
        startDate: '2013-01-01',
        endDate: '2014-01-01',
        summary: 'Description…',
        highlights: ['Started the company'],
      },
    ],
  },
  volunteer: {
    heading: 'Volunteer',
    visible: true,
    items: [
      {
        organization: 'Organization',
        position: 'Volunteer',
        url: 'https://organization.com/',
        startDate: '2012-01-01',
        endDate: '2013-01-01',
        summary: 'Description…',
        highlights: ["Awarded 'Volunteer of the Month'"],
      },
    ],
  },
  education: {
    heading: 'Education',
    visible: true,
    items: [
      {
        institution: 'University',
        url: 'https://institution.com/',
        area: 'Software Development',
        studyType: 'Bachelor',
        startDate: '2011-01-01',
        endDate: '2013-01-01',
        score: '4.0',
        courses: ['DB1101 - Basic SQL'],
      },
    ],
    awards: [
      {
        title: 'Award',
        date: '2014-11-01',
        awarder: 'Company',
        summary: 'There is no spoon.',
      },
    ],
  },
  publications: {
    heading: 'Publications',
    visible: true,
    items: [
      {
        name: 'Publication',
        publisher: 'Company',
        releaseDate: '2014-10-01',
        url: 'https://publication.com',
        summary: 'Description…',
      },
    ],
  },
  skills: {
    heading: 'Skills',
    visible: true,
    items: [
      {
        id: 1,
        name: 'Web Development',
        level: 'Master',
        keywords: ['HTML', 'CSS', 'JavaScript'],
      },
    ],
  },
  languages: {
    heading: 'Languages',
    visible: true,
    items: [
      {
        language: 'English',
        fluency: 'Native speaker',
      },
    ],
  },
  interests: {
    heading: 'Interests',
    visible: true,
    items: [
      {
        name: 'Wildlife',
        keywords: ['Ferrets', 'Unicorns'],
      },
    ],
  },
  references: {
    heading: 'References',
    visible: true,
    items: [
      {
        name: 'Jane Doe',
        reference: 'Reference…',
      },
    ],
  },
  projects: {
    heading: 'Projects',
    visible: true,
    items: [
      {
        name: 'Project',
        description: 'Description…',
        highlights: ['Won award at AIHacks 2016'],
        keywords: ['HTML'],
        startDate: '2019-01-01',
        endDate: '2021-01-01',
        url: 'https://project.com/',
        roles: ['Team Lead'],
        entity: 'Entity',
        type: 'application',
      },
    ],
  },
}
