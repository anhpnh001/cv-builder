import { useRef, forwardRef } from 'react'
import { useSelector } from '../../contexts/ResumeContext'
import InlineToolbarEditor from '../../components/InlineToolbarEditor'
import Avatar from '../../components/Avatar'
import Work from './Work'
import Skills from './Skills'
import Languages from './Languages'
import Education from './Education'
import Interests from './Interests'
import { HiGlobe, HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'
import Projects from './Projects'
import Profiles from './Profiles'
import Awards from './Awards'

function Basic({}, ref) {
  const colors = useSelector('metadata.colors')
  const font = useSelector('metadata.font')
  return (
    <section ref={ref} className="relative">
      <section
        style={{
          width: '210mm',
          minHeight: '297mm',
          fontFamily: font,
          backgroundColor: colors.background,
          color: colors.text,
        }}
        className="grid grid-cols-5"
      >
        <section
          style={{ backgroundColor: colors.primary }}
          className="px-8 py-16 z-10 col-span-2 space-y-6 flex flex-col"
        >
          <Avatar
            path="basics.image"
            className="w-48 h-48 rounded-full overflow-hidden self-center"
          />
          <Profiles path="profiles" />
          <Skills path="skills" />
          <Languages path="languages" />
          <Interests path="interests" />
        </section>
        <section className="px-8 py-16 z-10 col-span-3 space-y-6">
          <div className="space-y-3 px-4">
            <InlineToolbarEditor
              path="basics.name"
              style={{ color: colors.heading }}
              className="text-4xl font-bold"
            />
            <InlineToolbarEditor
              path="basics.label"
              style={{ color: colors.heading }}
              className="text-2xl font-medium"
            />
            <div className="flex items-center space-x-2">
              <InlineToolbarEditor
                path="basics.summary"
                className="flex-grow min-w-0 text-lg"
              />
            </div>
            <div className="flex items-center space-x-2">
              <HiMail size={18} className="flex-none" />
              <InlineToolbarEditor
                path="basics.email"
                className="flex-grow min-w-0 text-md"
              />
            </div>
            <div className="flex items-center space-x-2">
              <HiPhone size={18} className="flex-none" />
              <InlineToolbarEditor
                path="basics.phone"
                className="flex-grow min-w-0 text-md"
              />
            </div>
            <div className="flex items-center space-x-2">
              <HiGlobe size={18} className="flex-none" />
              <InlineToolbarEditor
                path="basics.url"
                className="flex-grow min-w-0 text-md"
              />
            </div>
            <div className="flex items-center space-x-2">
              <HiLocationMarker size={18} className="flex-none" />
              <InlineToolbarEditor
                path="basics.location.address"
                className="flex-grow min-w-0 text-md"
              />
            </div>
          </div>
          <Work path="work" />
          <Education path="education" />
          <Projects path="projects" />
          <Awards path="awards" />
        </section>
      </section>
    </section>
  )
}

export default forwardRef(Basic)
