import React from 'react'
import classNames from 'classnames'
import { BsCheck } from 'react-icons/bs'

function StyleButton({ active, color, onToggle, style }) {
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault()
        onToggle(style)
      }}
      className={classNames(
        { 'border-gray-200': active },
        'border border-transparent p-0.5 rounded-full'
      )}
    >
      <span
        style={{ backgroundColor: color }}
        className={classNames(
          { 'opacity-100': active },
          'opacity-50 w-4 h-4 rounded-full flex justify-center items-center border'
        )}
      >
        {active && <BsCheck size="16" className="text-white" />}
      </span>
    </button>
  )
}

const COLORS = [
  { color: 'rgba(239, 69, 101, 1.0)', style: 'red' },
  { color: 'rgba(255, 142, 60, 1.0)', style: 'orange' },
  { color: 'rgba(253, 226, 79, 1.0)', style: 'yellow' },
  { color: 'rgba(0, 235, 199, 1.0)', style: 'green' },
  { color: 'rgba(61, 169, 252, 1.0)', style: 'blue' },
  { color: 'rgba(127, 90, 240, 1.0)', style: 'indigo' },
  { color: 'rgba(255, 168, 186, 1.0)', style: 'violet' },
  { color: 'rgba(43, 44, 52, 1.0)', style: 'black' },
  { color: 'rgba(255, 255, 255, 1.0)', style: 'white' },
]

function ColorControls({ editorState, onToggle }) {
  const currentStyle = editorState.getCurrentInlineStyle()
  return (
    <div className="flex space-x-2 justify-center items-center">
      {COLORS.map((type) => (
        <StyleButton
          key={type.style}
          active={currentStyle.has(type.style)}
          color={type.color}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  )
}

const colorStyleMap = {
  red: {
    color: 'rgba(239, 69, 101, 1.0)',
  },
  orange: {
    color: 'rgba(255, 142, 60, 1.0)',
  },
  yellow: {
    color: 'rgba(253, 226, 79, 1.0)',
  },
  green: {
    color: 'rgba(0, 235, 199, 1.0)',
  },
  blue: {
    color: 'rgba(61, 169, 252, 1.0)',
  },
  indigo: {
    color: 'rgba(127, 90, 240, 1.0)',
  },
  violet: {
    color: 'rgba(255, 168, 186, 1.0)',
  },
  black: {
    color: 'rgba(43, 44, 52, 1.0)',
  },
  white: {
    color: 'rgba(255, 255, 255, 1.0)',
  },
}

export { colorStyleMap }
export default ColorControls
