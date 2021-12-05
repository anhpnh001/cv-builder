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
      <div
        style={{
          width: '210mm',
          minHeight: '297mm',
        }}
        className="absolute top-0 left-0"
      >
        <svg
          width="620"
          height="390"
          viewBox="0 0 620 390"
          fill={colors.secondary}
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full"
        >
          <path
            fill-rule="evenodd"
            clipRule="evenodd"
            d="M321.572 640.562C252.212 631.565 191.121 597.459 135.234 554.619C73.5633 507.345 -12.0585 461.606 -15.092 382.491C-18.1758 302.067 71.2714 254.428 121.335 192.126C156.425 148.458 184.016 97.863 233.565 73.05C281.227 49.1817 335.475 66.545 387.873 58.6492C466.756 46.7625 551.923 -30.9634 617.381 15.2138C680.159 59.5002 633.831 165.299 648.076 242.207C662.097 317.909 724.548 388.214 700.002 461.276C675.142 535.269 595.379 572.486 526.083 605.316C461.671 635.832 391.754 649.666 321.572 640.562Z"
            fill="current"
          />
        </svg>
      </div>
      <section
        style={{
          width: '210mm',
          minHeight: '297mm',
          fontFamily: font,
          backgroundColor: colors.background,
          color: colors.text,
        }}
        className="p-16 grid grid-cols-5 gap-12"
      >
        <section className="z-10 col-span-3 space-y-12">
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

            <span
              style={{ backgroundColor: colors.primary }}
              className="w-24 h-2 inline-block rounded-full"
            ></span>
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
          <Work
            path="work"
            style={{ boxShadow: `1rem 1rem ${colors.primary}` }}
            className="rounded-xl bg-white border-2 border-black mr-4"
          />
          <Education
            path="education"
            style={{ boxShadow: `1rem 1rem ${colors.primary}` }}
            className="rounded-xl bg-white border-2 border-black mr-4"
          />
          <Projects
            path="projects"
            style={{ boxShadow: `1rem 1rem ${colors.primary}` }}
            className="rounded-xl bg-white border-2 border-black mr-4"
          />
          <Awards
            path="awards"
            style={{ boxShadow: `1rem 1rem ${colors.primary}` }}
            className="rounded-xl bg-white border-2 border-black mr-4"
          />
        </section>
        <section className="z-10 col-span-2 space-y-12">
          <div>
            <Avatar
              path="basics.image"
              style={{ boxShadow: `1rem 1rem ${colors.primary}` }}
              className="overflow-hidden rounded-xl bg-white border-2 border-black mr-4"
            />
          </div>
          <Profiles
            path="profiles"
            className="rounded-xl bg-white border-2 border-black"
          />
          <Skills
            path="skills"
            className="rounded-xl bg-white border-2 border-black"
          />
          <Languages
            path="languages"
            className="rounded-xl bg-white border-2 border-black"
          />
          <Interests
            path="interests"
            className="rounded-xl bg-white border-2 border-black"
          />
        </section>
      </section>
    </section>
  )
}

export default forwardRef(Basic)
