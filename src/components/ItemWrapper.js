import { memo, useState } from 'react'
import { HiPlus, HiX } from 'react-icons/hi'
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md'
import { useDispatch } from '../contexts/ResumeContext'
import { Draggable } from 'react-beautiful-dnd'

function ItemBehavior({ path, index, single }) {
  const dispatch = useDispatch()
  const duplicateItem = (index) => {
    dispatch({ type: 'on_duplicate_item', payload: { path, index } })
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
  return (
    <div className="text-gray-500 p-2 space-x-1 bg-white rounded-t-xl overflow-hidden z-10 flex absolute bottom-full right-0 text-sm">
      <button
        onClick={(event) => {
          event.preventDefault()
          duplicateItem(index)
        }}
        className="bg-green-600 hover:shadow-md text-white w-6 h-6 rounded-lg flex justify-center items-center transition"
      >
        <HiPlus size="14" />
      </button>
      <button
        onClick={(event) => {
          event.preventDefault()
          removeItem(index)
        }}
        disabled={single}
        className="hover:bg-red-600 hover:shadow-md hover:text-white w-6 h-6 rounded-lg flex justify-center items-center transition"
      >
        <HiX size="14" />
      </button>
      <button
        onClick={(event) => {
          event.preventDefault()
          moveItemUp(index)
        }}
        className="hover:bg-blue-600 hover:shadow-md hover:text-white w-6 h-6 rounded-lg flex justify-center items-center transition"
      >
        <MdOutlineKeyboardArrowUp size="14" />
      </button>
      <button
        onClick={(event) => {
          event.preventDefault()
          moveItemDown(index)
        }}
        className="hover:bg-blue-600 hover:shadow-md hover:text-white w-6 h-6 rounded-lg flex justify-center items-center transition"
      >
        <MdOutlineKeyboardArrowDown size="14" />
      </button>
    </div>
  )
}

function ItemWrapper({ path, item, index, single, children }) {
  const [showToolbar, setShowToolbar] = useState(false)
  return (
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="relative top-auto left-auto hover:bg-white"
          onMouseEnter={() => setShowToolbar(true)}
          onMouseLeave={() => setShowToolbar(false)}
        >
          {showToolbar && (
            // <div className="absolute -inset-1 bg-white rounded-l-xl rounded-b-xl">
            <ItemBehavior path={path} index={index} single={single} />
            // </div>
          )}
          {children}
        </div>
      )}
    </Draggable>
  )
}

export default memo(ItemBehavior)
export { ItemWrapper }
