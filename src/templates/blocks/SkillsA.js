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
import { ItemWrapper } from '../../components/ItemWrapper.js'
import { useTranslation } from 'react-i18next'
import Heading from '../../components/Heading.js'
import SectionWrapper from '../../components/SectionWrapper.js'

const levels = ['Beginner', 'Intermediate', 'Advanced', 'Master']

function SkillsA({ path }) {
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
    <SectionWrapper path={path}>
      {stateValue.map((item, index) => (
        <ItemWrapper key={index} path={path} item={item} index={index}>
          <Details path={path} index={index} item={item} />
        </ItemWrapper>
      ))}
    </SectionWrapper>
  )
}

function Details({ path, item, index }) {
  const detailsValue = useSelector(`metadata.sections.${path}.details`)
  const detailsComponent = {
    name: <Name path={`${path}.${index}.name`} />,
    level: <Level path={`${path}[${index}].level`} item={item} index={index} />,
    keywords: <Keywords path={`${path}.${index}.keywords`} item={item} />,
  }

  return (
    <div className="z-10 space-y-2">
      {Object.keys(detailsValue).map((key) => {
        return detailsValue[key].visible && detailsComponent[key]
      })}
    </div>
  )
}

function Name({ path }) {
  const colors = useSelector(`metadata.colors`)
  return (
    <div
      style={{ backgroundColor: colors.primary }}
      className="max-w-full inline-block text-sm text-white rounded-lg px-2 py-1 "
    >
      <InlineToolbarEditor path={path} />
    </div>
  )
}

function Level({ path, item }) {
  const dispatch = useDispatch()
  const colors = useSelector(`metadata.colors`)
  return (
    <div>
      <Slider
        min={0}
        max={levels.length - 1}
        value={levels.findIndex((level) => level === item.level)}
        railStyle={{ height: '12px' }}
        trackStyle={{ height: '12px', backgroundColor: colors.secondary }}
        handleStyle={{ display: 'none' }}
        onChange={(value) => {
          console.log(value)
          dispatch({
            type: 'on_input',
            payload: {
              path: `${path}`,
              value: levels[value],
            },
          })
        }}
      />
    </div>
  )
}

function Keyword({ path, index }) {
  const dispatch = useDispatch()
  const [showCloseButton, setShowCloseButton] = useState(false)
  return (
    <div
      onMouseEnter={() => setShowCloseButton(true)}
      onMouseLeave={() => setShowCloseButton(false)}
      className="flex space-x-1"
    >
      <InlineToolbarEditor path={`${path}[${index}]`} />
      {showCloseButton && (
        <button
          onClick={() =>
            dispatch({
              type: 'on_delete_item',
              payload: {
                path,
                index,
              },
            })
          }
          className="flex hover:bg-red-400 hover:text-white hover:shadow-md w-6 h-6 justify-center items-center rounded-lg"
        >
          <HiX size="14" />
        </button>
      )}
    </div>
  )
}

function Keywords({ path, item }) {
  const dispatch = useDispatch()
  return (
    <div className="group flex flex-wrap gap-1">
      {item.keywords.map((keyword, index) => (
        <Keyword path={path} index={index} />
      ))}
      <button
        onClick={() => {
          dispatch({
            type: 'on_add_item',
            payload: {
              path: `${path}`,
              value: '',
              index: item.length,
            },
          })
        }}
        className="group-hover:opacity-100 opacity-0 bg-blue-400 text-white hover:shadow-md w-6 h-6 flex justify-center items-center rounded-lg"
      >
        <HiPlus size="16" />
      </button>
    </div>
  )
}

export default memo(SkillsA)
