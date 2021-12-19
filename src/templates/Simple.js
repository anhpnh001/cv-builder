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

function Basic({}, ref) {
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
    work: <Work path="work" timeline={false} />,
    education: <Education path="education" timeline={false} />,
    projects: <Projects path="projects" timeline={false} />,
    awards: <Awards path="awards" />,
    profiles: <Profiles path="profiles" />,
    skills: <Skills path="skills" />,
    languages: <Languages path="languages" />,
    interests: <Interests path="interests" />,
  }

  return (
    <>
      <section ref={ref} className="pt-16 grid grid-cols-5">
        <section className="col-span-2 space-y-4 px-8">
          <div className="flex justify-center">
            <Avatar
              path="basics.image"
              className="rounded-full overflow-hidden w-48"
            />
          </div>
          <Droppable droppableId="0">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-4"
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
        <section className="col-span-3 space-y-4 px-8">
          <Droppable droppableId="1">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-4"
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

export default forwardRef(Basic)
