import { HiPlus, HiX } from 'react-icons/hi'
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
  MdSettings,
} from 'react-icons/md'
import { FaLightbulb } from 'react-icons/fa'
import React, { useContext, useEffect, useState, memo } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useDispatch, useSelector } from '../../contexts/ResumeContext.js'
import { ResumeContext } from '../../contexts/ResumeContext'
import InlineToolbarEditor from '../../components/InlineToolbarEditor'
import ItemWrapper from '../../components/ItemWrapper.js'
import { useTranslation } from 'react-i18next'
import Heading from '../../components/Heading.js'

const levels = ['Beginner', 'Intermediate', 'Advanced', 'Master']

function LanguagesA({ path }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const stateValue = useSelector(path)
  const detailsValue = useSelector(`metadata.sections.${path}.details`)
  const [show, setShow] = useState(true)
  const [showDetails, setShowDetails] = useState(false)

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result
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
    <>
      {show && (
        <section>
          <Heading path={path} />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={path}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-4"
                >
                  {stateValue.length == 0 && (
                    <div className="flex flex-col items-center">
                      <HiPlus className="text-4xl" />
                      <div>
                        <span>Add or </span>
                        <span onClick={() => setShow(false)}>Hide section</span>
                      </div>
                    </div>
                  )}

                  {stateValue.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="hover:bg-gray-100 hover:shadow-sm group relative top-auto left-auto"
                        >
                          <ItemWrapper path={path} index={index} />
                          <div className="flex space-x-2">
                            {detailsValue.language.visible && (
                              <span className="font-semibold">
                                <InlineToolbarEditor
                                  path={`${path}.${index}.language`}
                                />
                              </span>
                            )}

                            {detailsValue.fluency.visible && (
                              <>
                                <span>-</span>
                                <span>
                                  <InlineToolbarEditor
                                    path={`${path}.${index}.fluency`}
                                  />
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </section>
      )}
    </>
  )
}

export default memo(LanguagesA)
