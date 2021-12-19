import { useRef, forwardRef } from 'react'
import { useSelector } from './../contexts/ResumeContext'
import InlineToolbarEditor from './../components/InlineToolbarEditor'
import Avatar from './../components/Avatar'
import Work from './blocks/Work'
import Skills from './blocks/Skills'
import Languages from './blocks/Languages'
import Education from './blocks/Education'
import Interests from './blocks/Interests'
import { HiGlobe, HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'
import Projects from './blocks/Projects'
import Profiles from './blocks/Profiles'
import Awards from './blocks/Awards'
import { Droppable } from 'react-beautiful-dnd'
import { Draggable } from 'react-beautiful-dnd'
import BlockWrapper from '../components/BlockWrapper'

function Cartoon2({}, ref) {
  const colors = useSelector('metadata.colors')
  const font = useSelector('metadata.font')
  const layout = useSelector('metadata.layout')
  const basicsDetails = useSelector(`metadata.sections.basics.details`)
  const basicsVisible = useSelector(`metadata.sections.basics.visible`)

  const components = {
    basics: (
      <>
        {basicsVisible && (
          <BlockWrapper path="basics" headingClassName="hidden">
            <div className="space-y-3">
              {basicsDetails.name.visible && (
                <InlineToolbarEditor
                  path="basics.name"
                  style={{ color: colors.heading }}
                  className="text-4xl font-bold"
                />
              )}
              {basicsDetails.label.visible && (
                <InlineToolbarEditor
                  path="basics.label"
                  style={{ color: colors.heading }}
                  className="text-2xl font-medium"
                />
              )}
              <span
                style={{ backgroundColor: colors.primary }}
                className="w-24 h-2 inline-block rounded-full"
              ></span>
              {basicsDetails.summary.visible && (
                <div className="flex items-center space-x-2">
                  <InlineToolbarEditor
                    path="basics.summary"
                    className="flex-grow min-w-0 text-lg"
                  />
                </div>
              )}
              {basicsDetails.email.visible && (
                <div className="flex items-center space-x-2">
                  <HiMail size={18} className="flex-none" />
                  <InlineToolbarEditor
                    path="basics.email"
                    className="flex-grow min-w-0 text-md"
                  />
                </div>
              )}
              {basicsDetails.phone.visible && (
                <div className="flex items-center space-x-2">
                  <HiPhone size={18} className="flex-none" />
                  <InlineToolbarEditor
                    path="basics.phone"
                    className="flex-grow min-w-0 text-md"
                  />
                </div>
              )}
              {basicsDetails.url.visible && (
                <div className="flex items-center space-x-2">
                  <HiGlobe size={18} className="flex-none" />
                  <InlineToolbarEditor
                    path="basics.url"
                    className="flex-grow min-w-0 text-md"
                  />
                </div>
              )}
              {basicsDetails.location.visible && (
                <div className="flex items-center space-x-2">
                  <HiLocationMarker size={18} className="flex-none" />
                  <InlineToolbarEditor
                    path="basics.location.address"
                    className="flex-grow min-w-0 text-md"
                  />
                </div>
              )}
            </div>
          </BlockWrapper>
        )}
      </>
    ),
    work: (
      <Work
        path="work"
        style={{ boxShadow: `.5rem .5rem ${colors.primary}` }}
        className="bg-white border-2 border-black mr-4"
      />
    ),
    education: (
      <Education
        path="education"
        style={{ boxShadow: `.5rem .5rem ${colors.primary}` }}
        className="bg-white border-2 border-black mr-4"
      />
    ),
    projects: (
      <Projects
        path="projects"
        style={{ boxShadow: `.5rem .5rem ${colors.primary}` }}
        className="bg-white border-2 border-black mr-4"
      />
    ),
    awards: (
      <Awards
        path="awards"
        style={{ boxShadow: `.5rem .5rem ${colors.primary}` }}
        className="bg-white border-2 border-black mr-4"
      />
    ),
    profiles: (
      <Profiles
        path="profiles"
        style={{ boxShadow: `.5rem .5rem ${colors.primary}` }}
        className="space-y-2 bg-white border-2 border-black mr-4"
      />
    ),
    skills: (
      <Skills
        path="skills"
        style={{ boxShadow: `.5rem .5rem ${colors.primary}` }}
        className="bg-white border-2 border-black mr-4"
      />
    ),
    languages: (
      <Languages
        path="languages"
        style={{ boxShadow: `.5rem .5rem ${colors.primary}` }}
        className="bg-white border-2 border-black mr-4"
      />
    ),
    interests: (
      <Interests
        path="interests"
        style={{ boxShadow: `.5rem .5rem ${colors.primary}` }}
        className="bg-white border-2 border-black mr-4"
      />
    ),
  }

  return (
    <>
      <div
        style={{
          backgroundColor: colors.secondary,
          WebkitMask: `url(${
            process.env.PUBLIC_URL + '/assets/images/blob.svg'
          }) top/contain`,
          mask: `url(${
            process.env.PUBLIC_URL + '/assets/images/blob.svg'
          }) center/contain`,
        }}
        className="absolute inset-0"
      ></div>
      <section ref={ref} className="px-16 pt-16 grid grid-cols-5 gap-8">
        <section className="z-10 col-span-3 space-y-8">
          <Droppable droppableId="0">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-8"
              >
                {layout[0].map((row, rowIndex) => (
                  <Draggable key={row} draggableId={row} index={rowIndex}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="relative top-auto left-auto"
                      >
                        {components[row]}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </section>
        <section className="z-10 col-span-2 space-y-8">
          <Avatar
            path="basics.image"
            style={{ boxShadow: `.5rem .5rem ${colors.primary}` }}
            className="overflow-hidden bg-white border-2 border-black mr-4"
          />
          <Droppable droppableId="1">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-8"
              >
                {layout[1].map((row, rowIndex) => (
                  <Draggable key={row} draggableId={row} index={rowIndex}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="relative top-auto left-aut"
                      >
                        {components[row]}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </section>
      </section>
    </>
  )
}

export default forwardRef(Cartoon2)
