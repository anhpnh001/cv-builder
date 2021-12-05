import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { HiPlus, HiX } from 'react-icons/hi'
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md'
import { useDispatch, useSelector } from '../contexts/ResumeContext'

function List({ children, path }) {
  const dispatch = useDispatch()
  const stateValue = useSelector(path)
  const [show, setShow] = useState(true)

  const duplicateItem = (value, index) => {
    dispatch({ type: 'on_duplicate_item', payload: { path, value, index } })
  }

  const removeItem = (index) => {
    dispatch({ type: 'on_delete_item', payload: { path, index } })
  }

  const moveItemUp = (index) => {
    dispatch({ type: 'on_move_item_up', payload: { path, index } })
  }

  const moveItemDown = (index) => {
    dispatch({ type: 'on_move_item_down', payload: { path, index } })
  }

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
        <section className="">
          <h3 className="text-2xl font-semibold mb-4">Profiles</h3>
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
                          className="hover:bg-gray-100 group relative top-auto left-auto"
                        >
                          <div className="group-hover:flex hidden p-2 space-x-1 bg-gray-100 rounded-t-xl overflow-hidden z-10 absolute bottom-full right-0 text-sm">
                            <button
                              // onClick={() => duplicateItem(index)}
                              onClick={(event) => {
                                event.preventDefault()
                                duplicateItem(item, index)
                              }}
                              className="hover:bg-green-600 hover:shadow-md hover:text-white w-6 h-6 rounded-lg flex justify-center items-center transition"
                            >
                              <HiPlus size="16" />
                            </button>
                            <button
                              onClick={(event) => {
                                event.preventDefault()
                                removeItem(index)
                              }}
                              className="hover:bg-red-600 hover:shadow-md hover:text-white w-6 h-6 rounded-lg flex justify-center items-center transition"
                            >
                              <HiX size="16" />
                            </button>
                            <button
                              onClick={(event) => {
                                event.preventDefault()
                                moveItemUp(index)
                              }}
                              className="hover:bg-blue-600 hover:shadow-md hover:text-white w-6 h-6 rounded-lg flex justify-center items-center transition"
                            >
                              <MdOutlineKeyboardArrowUp size="16" />
                            </button>
                            <button
                              onClick={(event) => {
                                event.preventDefault()
                                moveItemDown(index)
                              }}
                              className="hover:bg-blue-600 hover:shadow-md hover:text-white w-6 h-6 rounded-lg flex justify-center items-center transition"
                            >
                              <MdOutlineKeyboardArrowDown size="16" />
                            </button>
                          </div>
                          {children}
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

export default List
