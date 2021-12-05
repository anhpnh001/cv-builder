import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, { useState } from 'react'
import { HiPlus, HiX } from 'react-icons/hi'
import InlineToolbarEditor from '../../components/InlineToolbarEditor'
import { ItemWrapper } from '../../components/ItemWrapper.js'
import SectionWrapper from '../../components/SectionWrapper.js'
import { useDispatch, useSelector } from '../../contexts/ResumeContext.js'

const levels = ['Beginner', 'Intermediate', 'Advanced', 'Master']

function Interests({ path, className, style }) {
  const dispatch = useDispatch()
  const stateValue = useSelector(path)
  const colors = useSelector('metadata.colors')
  const visible = useSelector(`metadata.sections.${path}.visible`)

  return (
    <>
      {visible && (
        <div style={style} className={className}>
          <SectionWrapper path={path}>
            {stateValue.map((item, index) => (
              <ItemWrapper
                key={index}
                path={path}
                item={item}
                index={index}
                single={stateValue.length === 1}
              >
                <Details path={path} item={item} index={index} />
              </ItemWrapper>
            ))}
          </SectionWrapper>
        </div>
      )}
    </>
  )
}

function Details({ path, item, index }) {
  const detailsValue = useSelector(`metadata.sections.${path}.details`)
  const detailsComponent = {
    name: <Name path={`${path}.${index}.name`} />,
    keywords: <Keywords path={`${path}.${index}.keywords`} item={item} />,
  }

  return (
    <div className="z-10 space-y-2">
      {detailsValue.name && <Name path={`${path}.${index}.name`} />}
      {detailsValue.keywords && (
        <Keywords path={`${path}.${index}.keywords`} item={item} />
      )}
    </div>
  )
}

function Name({ path }) {
  const colors = useSelector(`metadata.colors`)
  return (
    <div
      style={{ backgroundColor: colors.primary }}
      className="max-w-full inline-block text-sm text-white rounded-lg px-2 py-1"
    >
      <InlineToolbarEditor path={path} />
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
      className="min-w-0 flex relative"
    >
      <InlineToolbarEditor path={`${path}[${index}]`} />
      {showCloseButton && (
        <div className="pl-1 z-10 absolute left-full">
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
            className="flex bg-red-400 text-white hover:shadow-md w-6 h-6 justify-center items-center rounded-lg"
          >
            <HiX size="14" />
          </button>
        </div>
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
        className="group-hover:flex hidden bg-blue-400 text-white hover:shadow-md w-6 h-6 justify-center items-center rounded-lg"
      >
        <HiPlus size="16" />
      </button>
    </div>
  )
}

export default Interests
