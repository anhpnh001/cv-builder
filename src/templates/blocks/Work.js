import { HiPlus, HiX } from 'react-icons/hi'
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md'
import React, { useContext, useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from '../../contexts/ResumeContext.js'
import { ResumeContext } from '../../contexts/ResumeContext'
import InlineToolbarEditor from '../../components/InlineToolbarEditor'

function Work({ path }) {
  const dispatch = useDispatch()
  const stateValue = useSelector(path)
  console.log('Work', stateValue)

  const handleUpdate = (id) => {
    dispatch({
      type: 'on_edit_item',
      payload: {
        path,
        value: +id,
      },
    })
  }
  // duplicate item with random id after index drag
  // const duplicateItem = (index) => {
  //   const newWork = [...work]
  //   const item = newWork[index]
  //   const newItem = { ...item, id: Math.random().toString() }
  //   newWork.splice(index + 1, 0, newItem)
  //   setWork(newWork)
  // }

  // const removeItem = (index) => {
  //   const newWork = [...work]
  //   newWork.splice(index, 1)
  //   setWork(newWork)
  // }
  // const duplicateItem = (item, index) => {
  //   const newWork = [...work]
  //   const item = newWork[index]
  //   const newItem = { ...item, id: Math.random().toString() }
  //   newWork.splice(index + 1, 0, newItem)
  //   setWork(newWork)
  // }

  const duplicateItem = (value, id) => {
    dispatch({ type: 'on_duplicate_item', payload: { path, value, id } })
  }

  const removeItem = (id) => {
    dispatch({ type: 'on_delete_item', payload: { path, id: id } })
  }

  const moveItemUp = (id) => {
    dispatch({ type: 'on_move_item_up', payload: { path, id: id } })
  }

  const moveItemDown = (id) => {
    dispatch({ type: 'on_move_item_down', payload: { path, id: id } })
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

  // const onUpdateName = (name, index) => {
  //   const newWork = [...work]
  //   newWork[index].name = name
  //   console.log(newWork)
  //   setWork(newWork)
  // }

  // const onUpdateStartDate = (startDate, index) => {
  //   const newWork = [...work]
  //   newWork[index].startDate = startDate
  //   setWork(newWork)
  // }

  // const onUpdateEndDate = (endDate, index) => {
  //   const newWork = [...work]
  //   newWork[index].endDate = endDate
  //   setWork(newWork)
  // }

  return (
    <section className="grid grid-cols-3 gap-x-12 space-y-3">
      <div className="col-end-4 col-span-2">
        <h5 className="font-bold text-2xl">Experience</h5>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="work">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="col-start-1 col-end-4 space-y-3"
            >
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
                      className="hover:bg-gray-100 group relative grid grid-cols-3 gap-x-12 top-auto left-0 right-0"
                    >
                      <div className="group-hover:flex hidden rounded-t-md overflow-hidden z-10 absolute bottom-full right-0 text-sm">
                        <button
                          // onClick={() => duplicateItem(index)}
                          onClick={() => duplicateItem(item, item.id)}
                          className="hover:bg-green-600 bg-green-500 h-8 w-8 flex justify-center items-center text-white transition"
                        >
                          <HiPlus className="text-md" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="hover:bg-red-500 bg-gray-100 hover:text-white h-8 w-8 flex justify-center items-center transition"
                        >
                          <HiX className="text-md" />
                        </button>
                        <button
                          onClick={() => moveItemUp(item.id)}
                          className="hover:bg-red-500 bg-gray-100 hover:text-white h-8 w-8 flex justify-center items-center transition"
                        >
                          <MdOutlineKeyboardArrowUp className="text-md" />
                        </button>
                        <button
                          onClick={() => moveItemDown(item.id)}
                          className="hover:bg-red-500 bg-gray-100 hover:text-white h-8 w-8 flex justify-center items-center transition"
                        >
                          <MdOutlineKeyboardArrowDown className="text-md" />
                        </button>
                      </div>
                      <p className="col-span-1 text-right flex flex-wrap justify-end">
                        <InlineToolbarEditor
                          path={`work[${index}].startDate`}
                        />
                        <span className="text-gray-500 mx-1"> - </span>
                        <InlineToolbarEditor path={`work[${index}].endDate`} />
                      </p>
                      <p className="col-span-2">
                        <InlineToolbarEditor path={`work[${index}].name`} />
                      </p>
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
  )
}

export default Work
