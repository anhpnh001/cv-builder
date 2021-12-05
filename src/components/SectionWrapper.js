import 'rc-slider/assets/index.css'
import { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { FaLightbulb } from 'react-icons/fa'
import { HiEyeOff } from 'react-icons/hi'
import { MdSettings } from 'react-icons/md'
import Heading from '../components/Heading.js'
import { useDispatch, useSelector } from '../contexts/ResumeContext.js'

function SectionToolbar({ path }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const detailsValue = useSelector(`metadata.sections.${path}.details`)
  const [showTab, setShowTab] = useState()

  const handleHideSection = () => {
    dispatch({
      type: 'on_input',
      payload: {
        path: `metadata.sections.${path}.visible`,
        value: false,
      },
    })
  }
  return (
    <>
      <div className="text-gray-500 p-2 space-x-1 bg-gray-100 rounded-t-xl flex z-10 absolute bottom-full right-0">
        <button
          onClick={handleHideSection}
          className="hover:bg-blue-500 hover:shadow-md hover:text-white w-7 h-7 rounded-lg flex justify-center items-center transition"
        >
          <HiEyeOff size="16" />
        </button>
        <button
          onClick={() => setShowTab('hints')}
          className="hover:bg-blue-500 hover:shadow-md hover:text-white w-7 h-7 rounded-lg flex justify-center items-center transition"
        >
          <FaLightbulb size="16" />
        </button>
        <button
          onClick={() => setShowTab('details')}
          className="hover:bg-blue-500 hover:shadow-md hover:text-white w-7 h-7 rounded-lg flex justify-center items-center transition"
        >
          <MdSettings size="16" />
        </button>
      </div>
      {showTab && (
        <div
          onMouseLeave={() => setShowTab(null)}
          className="rounded-xl bg-gray-100 px-6 py-4 z-40 absolute top-0 right-0 max-w-full max-h-full flex flex-col"
        >
          {showTab === 'details' && (
            <div className="overflow-y-auto scrollbar-none">
              {Object.keys(detailsValue).map((key) => {
                return (
                  <div className="space-x-2 flex items-center">
                    <input
                      id={key}
                      type="checkbox"
                      name={key}
                      checked={detailsValue[key].visible}
                      onChange={(e) => {
                        dispatch({
                          type: 'on_input',
                          payload: {
                            path: `metadata.sections.${path}.details.${key}.visible`,
                            value: !detailsValue[key].visible,
                          },
                        })
                      }}
                    />
                    <label htmlFor={key} className="capitalize">
                      {key}
                    </label>
                  </div>
                )
              })}
            </div>
          )}
          {showTab === 'hints' && (
            <ul className="space-y-2 text-blue-600 list-disc list-inside h-full overflow-y-auto scrollbar-none">
              {t(`builder.hints.${path}`, { returnObjects: true }).map(
                (hint) => {
                  return <li className="text-sm">{hint}</li>
                }
              )}
            </ul>
          )}
        </div>
      )}
    </>
  )
}

function SectionWrapper({ path, className, children }) {
  const dispatch = useDispatch()
  const [showToolbar, setShowToolbar] = useState(false)

  const onDragEnd = (result) => {
    const { destination, source } = result
    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
    dispatch({
      type: 'on_move_item',
      payload: {
        path,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      },
    })
  }

  return (
    <section
      onMouseEnter={() => setShowToolbar(true)}
      onMouseLeave={() => setShowToolbar(false)}
      className="relative hover:bg-gray-100 p-4 transition rounded-l-xl rounded-b-xl"
    >
      {showToolbar && (
        // <div className="bg-gray-100 rounded-l-xl rounded-b-xl absolute -inset-3">
        <SectionToolbar path={path} />
        // </div>
      )}
      <Heading path={path} />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={path}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={className}
            >
              {children}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  )
}

export default SectionWrapper
