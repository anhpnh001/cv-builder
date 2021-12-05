import classNames from 'classnames'
import i18next from 'i18next'
import { useContext, useEffect, useState } from 'react'
import { HiOutlineDocumentDuplicate, HiOutlineFolderOpen } from 'react-icons/hi'
import { RiMoonFoggyLine, RiSunFoggyLine } from 'react-icons/ri'
import { Link, NavLink } from 'react-router-dom'
import Select from 'react-select'
import { ResumeListContext } from '../../contexts/ResumeListContext'
import useDarkMode from '../../hooks/useDarkMode'
import { languages } from '../../i18n'

function Navbar() {
  const { getNumberOfResumes, createResume } = useContext(ResumeListContext)
  const [darkMode, setDarkMode] = useDarkMode()
  const [language, setLanguage] = useState(() =>
    localStorage.getItem('language') ? localStorage.getItem('language') : 'en'
  )

  useEffect(() => {
    localStorage.setItem('language', language)
    i18next.changeLanguage(language)
  }, [language])

  const handleChangeLanguage = (selectedOption) => {
    setLanguage(selectedOption.value)
  }
  const handleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const options = languages.map((language) => {
    return { value: language.code, label: language.name }
  })
  console.log(options)
  return (
    <nav className="z-50 h-24 flex fixed top-0 inset-x-0 bg-white bg-opacity-75 dark:bg-black transition">
      <div className="container flex justify-between mx-auto">
        <div className="flex items-center">
          <Link
            to="/cv-builder"
            className="pr-8 dark:border-gray-800 mr-8 flex items-center space-x-2"
          >
            <HiOutlineDocumentDuplicate className="text-5xl text-blue-600" />
            <span className="text-3xl font-serif text-black dark:text-gray-100 font-bold tracking-tight">
              BetterCV
            </span>
          </Link>
          <div className="flex space-x-6">
            <button
              onClick={createResume}
              className="hover:text-gray-900 text-sm flex items-center space-x-1 font-semibold"
            >
              Create
            </button>
            <NavLink
              to="/template"
              className={({ isActive }) =>
                classNames(
                  {
                    'text-blue-600': isActive,
                    'text-gray-600': !isActive,
                  },
                  'hover:text-gray-900 text-sm flex items-center space-x-1 font-semibold'
                )
              }
            >
              Template
            </NavLink>
            <a
              href="https://www.linkedin.com/in/teoanhss113/"
              className="text-gray-600 hover:text-gray-900 text-sm flex items-center space-x-1 font-semibold"
            >
              About
            </a>
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          <Link to="/cv-builder/editor">
            <div className="relative mr-4">
              <span className="bg-blue-600 rounded-full text-xs h-8 w-8 flex items-center justify-center text-white px-2 border absolute bottom-full left-full transform -translate-x-1/2 translate-y-1/2">
                {getNumberOfResumes() > 9 ? '9+' : getNumberOfResumes()}
              </span>
              <HiOutlineFolderOpen className="text-3xl text-blue-600" />
            </div>
          </Link>
          <span onClick={handleDarkMode} className="cursor-pointer">
            {darkMode ? (
              <RiSunFoggyLine className="text-3xl text-yellow-300" />
            ) : (
              <RiMoonFoggyLine className="text-3xl text-blue-600" />
            )}
          </span>
          <Select
            onChange={handleChangeLanguage}
            value={options.find((x) => x.value === language)}
            options={options}
          />
          {/* <div className="flex items-center rounded-full border-2 border-gray-100 overflow-hidden">
            <input
              type="text"
              className=" w-48 px-6 outline-none bg-transparent"
              placeholder="Search "
            />
            <span className="w-10 h-10 flex justify-center items-center cursor-pointer bg-blue-600">
              <BiSearchAlt className="text-2xl text-gray-50" />
            </span>
          </div> */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
