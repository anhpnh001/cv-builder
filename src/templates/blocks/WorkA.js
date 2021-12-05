import React, { useState } from 'react'
import InlineToolbarEditor from '../../components/InlineToolbarEditor'
import { ItemWrapper } from '../../components/ItemWrapper.js'
import SectionWrapper from '../../components/SectionWrapper.js'
import { useDispatch, useSelector } from '../../contexts/ResumeContext.js'

function Work({ path }) {
  const dispatch = useDispatch()
  const stateValue = useSelector(path)
  const visible = useSelector(`metadata.sections.${path}.visible`)
  const [showToolbar, setShowToolbar] = useState(false)

  return (
    <>
      {visible && (
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
      )}
    </>
  )
}

function Details({ path, item, index }) {
  const detailsValue = useSelector(`metadata.sections.${path}.details`)
  const colors = useSelector('metadata.colors')
  const detailsComponent = {
    name: (
      <h5 className="text-lg">
        <InlineToolbarEditor path={`work[${index}].name`} />
      </h5>
    ),
    // position: 'President',
    // url: 'https://company.com',
    // startDate: '2013-01-01',
    // endDate: '2014-01-01',
    summary: (
      <p className="text-sm mb-4">
        <InlineToolbarEditor path={`work[${index}].summary`} />
      </p>
    ),
    // highlights: ['Started the company'],
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center z-10">
        <span
          style={{ borderColor: colors.primary }}
          className="bg-transparent w-5 h-5 rounded-full border-4 inline-block"
        ></span>
        <span
          style={{ backgroundColor: colors.primary }}
          className="flex-grow w-1 inline-block"
        ></span>
      </div>
      <div className="flex-1 min-w-0">
        <div
          style={{ color: colors.primary }}
          className="w-full flex flex-wrap text-sm"
        >
          {detailsValue.startDate.visible && (
            <InlineToolbarEditor path={`work[${index}].startDate`} />
          )}
          {detailsValue.endDate.visible && (
            <>
              <span> - </span>
              <InlineToolbarEditor path={`work[${index}].endDate`} />
            </>
          )}
        </div>

        {Object.keys(detailsComponent).map((key) => {
          return detailsValue[key].visible && detailsComponent[key]
        })}
      </div>
    </div>
  )
}

export default Work
