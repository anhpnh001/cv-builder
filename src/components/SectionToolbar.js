import 'rc-slider/assets/index.css'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaLightbulb } from 'react-icons/fa'
import { MdSettings } from 'react-icons/md'
import { useDispatch, useSelector } from '../contexts/ResumeContext.js'
function SectionToolbar({ path }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const detailsValue = useSelector(`metadata.sections.${path}.details`)
  const [showTab, setShowTab] = useState()
  return (
    <>
      {visible && (
        <>
          <div className="absolute top-0 right-full transform px-2">
            <div className="bg-gray-100 shadow-md text-gray-800 space-y-1 p-2 rounded-xl overflow-hidden z-30">
              <button
                onClick={() => setShowTab('details')}
                className="hover:bg-blue-500 hover:shadow-md hover:text-white w-7 h-7 rounded-lg flex justify-center items-center transition"
              >
                <MdSettings size="16" />
              </button>
              <button
                onClick={() => setShowTab('hints')}
                className="hover:bg-blue-500 hover:shadow-md hover:text-white w-7 h-7 rounded-lg flex justify-center items-center transition"
              >
                <FaLightbulb size="16" />
              </button>
            </div>
          </div>
          {showTab && (
            <div
              onMouseLeave={() => setShowTab(null)}
              className="z-10 absolute top-0 left-0 max-w-full max-h-full flex flex-col bg-blue-50 shadow-md px-6 py-4 rounded-xl"
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
      )}
    </>
  )
}

export default SectionToolbar
