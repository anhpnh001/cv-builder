import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import resources from './locales'

const languages = [
  {
    code: 'vi',
    name: 'Vietnamese (VI)',
  },
  {
    code: 'en',
    name: 'English (US)',
  },
]

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
})

export { languages }

export default i18n
