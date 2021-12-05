import React from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import ReactTooltip from 'react-tooltip'
import sections from '../../../data/leftSections'

function LeftNavbar() {
  return (
    <section className="w-20 h-full flex flex-col items-center justify-center space-y-4">
      <Link
        to="/cv-builder"
        className="border-b w-12 h-20 flex justify-center items-center"
      >
        <HiOutlineDocumentDuplicate size="36" className="text-blue-600" />
      </Link>
      <section className="flex-grow flex flex-col items-center space-y-4">
        {sections.map((section) => (
          <SidebarIcon key={section.heading} section={section} place="right" />
        ))}
      </section>
    </section>
  )
}

function SidebarIcon({ section, place }) {
  const { t } = useTranslation()
  const { heading, icon: Icon } = section
  return (
    <ScrollLink
      to={heading}
      containerId="containerElement"
      smooth
      duration={500}
    >
      <div className="flex items-center">
        <div
          data-tip={t(`builder.sections.${heading}`)}
          className="hover:rounded-lg hover:text-blue-600 hover:bg-blue-50 cursor-pointer text-gray-500 transition duration-500 rounded-full flex justify-center items-center w-12 h-12"
        >
          <Icon size="18" />
        </div>
        <ReactTooltip
          type="info"
          place={place}
          effect="solid"
          className="rounded-md"
        />
      </div>
    </ScrollLink>
  )
}

export default LeftNavbar
