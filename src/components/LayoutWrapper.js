import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from '../contexts/ResumeContext'

function LayoutWrapper({ children }) {
  const dispatch = useDispatch()
  const layout = useSelector('metadata.layout')

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    destClone.splice(droppableDestination.index, 0, removed)

    const result = {}
    result[droppableSource.droppableId] = sourceClone
    result[droppableDestination.droppableId] = destClone

    return result
  }

  const onDragEnd = (result) => {
    const { source, destination } = result

    // dropped outside the list
    if (!destination) {
      return
    }
    const sInd = +source.droppableId
    const dInd = +destination.droppableId

    const newState = [...layout]
    if (sInd === dInd) {
      const items = reorder(layout[sInd], source.index, destination.index)
      newState[sInd] = items
    } else {
      const result = move(layout[sInd], layout[dInd], source, destination)
      newState[sInd] = result[sInd]
      newState[dInd] = result[dInd]
    }

    dispatch({
      type: 'on_change',
      payload: {
        path: 'metadata.layout',
        value: newState,
      },
    })
  }

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
}

export default LayoutWrapper
