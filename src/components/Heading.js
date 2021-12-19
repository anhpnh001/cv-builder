import classNames from 'classnames'
import 'rc-slider/assets/index.css'
import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from '../contexts/ResumeContext.js'
import InlineToolbarEditor from './InlineToolbarEditor.js'

function Heading({ path, style, className }) {
  const colors = useSelector(`metadata.colors`)
  console.log(className)
  return (
    <InlineToolbarEditor
      path={`metadata.sections.${path}.heading`}
      style={{ ...style, color: colors.heading }}
      className={classNames(
        'text-2xl font-semibold mb-2 inline-block',
        className
      )}
    />
  )
}

export default memo(Heading)
