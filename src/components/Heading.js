import 'rc-slider/assets/index.css'
import React, { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from '../contexts/ResumeContext.js'

function Heading({ path, style, className }) {
  const dispatch = useDispatch()
  const stateValue = useSelector(`metadata.sections.${path}.heading`)
  const colors = useSelector(`metadata.colors`)
  const [value, setValue] = useState(stateValue)

  const handleChange = (value) => {
    dispatch({
      type: 'on_input',
      payload: {
        path: `metadata.sections.${path}.heading`,
        value,
      },
    })
    setValue(value)
  }

  useEffect(() => {
    setValue(stateValue)
  }, [stateValue])

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      style={{ color: colors.heading }}
      className="bg-transparent outline-none w-full text-2xl font-semibold mb-2"
    />
  )
}

export default memo(Heading)
