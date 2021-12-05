import classNames from 'classnames'
import {
  ContentState,
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  Modifier,
  RichUtils,
} from 'draft-js'
import 'draft-js/dist/Draft.css'
import { memo, useEffect, useRef, useState } from 'react'
import { renderToString } from 'react-dom/server'
import { BsLink45Deg } from 'react-icons/bs'
import { RiBold, RiItalic, RiStrikethrough2, RiUnderline } from 'react-icons/ri'
import ColorControls, { colorStyleMap } from '../components/ColorControls'
import { useDispatch, useSelector } from '../contexts/ResumeContext'
import { createLinkDecorator, _onAddLink } from './Link'

function InlineToolbarEditor({ path, style, className, toolbar = true }) {
  const editorRef = useRef()
  const dispatch = useDispatch()
  const stateValue = useSelector(path)
  const decorator = createLinkDecorator()
  const [showToolbar, setShowToolbar] = useState(false)
  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty()
  })

  const onUpdate = () => {
    dispatch({
      type: 'on_input',
      payload: {
        path,
        value: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      },
    })
  }

  useEffect(() => {}, [editorState])

  useEffect(() => {
    // TODO: Create a JSON string from the editorState without formatting
    // const blocks = convertToRaw(editorState.getCurrentContent()).blocks
    // const value = blocks
    //   .map((block) => (!block.text.trim() && '\n') || block.text)
    //   .join('\n')

    setEditorState(() => {
      try {
        return EditorState.createWithContent(
          convertFromRaw(JSON.parse(stateValue)),
          decorator
        )
      } catch (e) {
        const blocksFromHTML = convertFromHTML(renderToString(stateValue))
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        )
        return EditorState.createWithContent(state)
      }
    })
  }, [stateValue])

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (newState) {
      onChange(newState)
      return 'handled'
    }

    return 'not-handled'
  }

  const onChange = (editorState) => {
    setEditorState(editorState)
  }

  const _toggleColor = (toggledColor) => {
    const selection = editorState.getSelection()

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap).reduce(
      (contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      },
      editorState.getCurrentContent()
    )

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    )

    const currentStyle = editorState.getCurrentInlineStyle()

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color)
      }, nextEditorState)
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      )
    }

    onChange(nextEditorState)
  }

  const _onBoldClick = (e) => {
    e.preventDefault()
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  }

  const _onItalicClick = (e) => {
    e.preventDefault()
    onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
  }

  const _onUnderlineClick = (e) => {
    e.preventDefault()
    onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
  }

  const _onStrikethroughClick = (e) => {
    e.preventDefault()
    onChange(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'))
  }

  const focus = () => {
    setShowToolbar(true)
  }

  const onBlur = () => {
    setShowToolbar(false)
    onUpdate()
  }
  return (
    <div
      style={style}
      className={classNames(className, 'min-w-0 cursor-text relative')}
    >
      {showToolbar && toolbar && (
        <div className="z-20 p-3 space-y-2 rounded-xl shadow-md bg-white border absolute transform -translate-y-2 bottom-full left-0 flex flex-col text-sm">
          <div className="flex py-1 space-x-1 bg-gray-100 rounded-lg justify-center text-gray-500">
            <button
              onMouseDown={_onBoldClick}
              className="hover:bg-white hover:text-blue-600 hover:shadow-md w-6 h-6 rounded-lg flex justify-center items-center"
            >
              <RiBold size="14" />
            </button>
            <button
              onMouseDown={_onItalicClick}
              className="hover:bg-white hover:text-blue-600 hover:shadow-md w-6 h-6 rounded-lg flex justify-center items-center"
            >
              <RiItalic size="14" />
            </button>
            <button
              onMouseDown={_onUnderlineClick}
              className="hover:bg-white hover:text-blue-600 hover:shadow-md w-6 h-6 rounded-lg flex justify-center items-center"
            >
              <RiUnderline size="14" />
            </button>
            <button
              onMouseDown={_onStrikethroughClick}
              className="hover:bg-white hover:text-blue-600 hover:shadow-md w-6 h-6 rounded-lg flex justify-center items-center"
            >
              <RiStrikethrough2 size="14" />
            </button>
            <button
              onMouseDown={(e) => {
                e.preventDefault()
                _onAddLink(editorState, setEditorState)
              }}
              className="hover:bg-white hover:text-blue-600 hover:shadow-md w-6 h-6 rounded-lg flex justify-center items-center"
            >
              <BsLink45Deg size="14" />
            </button>
          </div>
          <ColorControls editorState={editorState} onToggle={_toggleColor} />
        </div>
      )}
      <Editor
        customStyleMap={colorStyleMap}
        ref={editorRef}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={setEditorState}
        onBlur={onBlur}
        onFocus={focus}
      />
    </div>
  )
}

export default memo(InlineToolbarEditor)
