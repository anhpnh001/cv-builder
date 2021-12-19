import Cartoon1 from '../templates/Cartoon1'
import Cartoon2 from '../templates/Cartoon2'
import Basic from '../templates/Basic'
import Simple from '../templates/Simple'

export default [
  {
    name: 'Cartoon1',
    thumbnail: '/assets/images/templates/Cartoon1.jpg',
    component: Cartoon1,
    colors: {
      primary: '#3da9fc',
      secondary: '#d8eefe',
      heading: '#094067',
      text: '#5f6c7b',
      background: '#fffffe',
    },
    layout: [
      ['basics', 'work', 'education', 'projects', 'awards'],
      ['profiles', 'skills', 'languages', 'interests'],
    ],
  },
  {
    name: 'Cartoon2',
    thumbnail: '/assets/images/templates/Cartoon2.jpg',
    component: Cartoon2,
    colors: {
      primary: '#4fc4cf',
      secondary: '#bae8e8',
      heading: '#00214d',
      text: '#2b2c34',
      background: '#fffffe',
    },
    layout: [
      ['basics', 'work', 'education', 'projects', 'awards'],
      ['profiles', 'skills', 'languages', 'interests'],
    ],
  },
  {
    name: 'Basic',
    thumbnail: '/assets/images/templates/Basic.jpg',
    component: Basic,
    colors: {
      primary: '#16161a',
      secondary: '#94a1b2',
      heading: '#010101',
      text: '#16161a',
      background: '#fffffe',
    },
    layout: [
      ['profiles', 'skills', 'languages', 'interests'],
      ['basics', 'work', 'education', 'projects', 'awards'],
    ],
  },
  {
    name: 'Simple',
    thumbnail: '/assets/images/templates/Simple.jpg',
    component: Simple,
    colors: {
      primary: '#232323',
      secondary: '#d8eefe',
      heading: '#232323',
      text: '#222525',
      background: '#fffffe',
    },
    layout: [
      ['profiles', 'skills', 'languages', 'interests'],
      ['basics', 'work', 'education', 'projects', 'awards'],
    ],
  },
]
