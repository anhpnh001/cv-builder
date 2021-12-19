import Cartoon1 from '../templates/Cartoon1'
import Cartoon2 from '../templates/Cartoon2'
import Basic from '../templates/Basic'
// import Simple from '../templates/Simple'

export default [
  {
    name: 'Cartoon1',
    thumbnail: '/assets/images/templates/cartoon1.jpg',
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
    thumbnail: '/assets/images/templates/cartoon2.jpg',
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
    thumbnail: '/assets/images/templates/basic.jpg',
    component: Basic,
    colors: {
      primary: '#3da9fc',
      secondary: '#d8eefe',
      heading: '#094067',
      text: '#5f6c7b',
      background: '#fffffe',
    },
    layout: [
      ['profiles', 'skills', 'languages', 'interests'],
      ['basics', 'work', 'education', 'projects', 'awards'],
    ],
  },
  // {
  //   name: 'Simple',
  //   thumbnail: '/assets/images/templates/basic.jpg',
  //   component: Simple,
  //   colors: {
  //     primary: '#3da9fc',
  //     secondary: '#d8eefe',
  //     heading: '#094067',
  //     text: '#5f6c7b',
  //     background: '#fffffe',
  //   },
  // },
]
