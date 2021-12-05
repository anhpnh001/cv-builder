//Add Link Component
import { CompositeDecorator, EditorState, Modifier, RichUtils } from 'draft-js'
import React from 'react'

const Link = ({ entityKey, contentState, children }) => {
  const { url } = contentState.getEntity(entityKey).getData()
  return (
    <a
      style={{ color: 'blue', fontStyle: 'italic' }}
      href={url}
      target="_blank"
    >
      {children}
    </a>
  )
}

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    )
  }, callback)
}

export const createLinkDecorator = () =>
  new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ])

// call all together
export const _onAddLink = (editorState, setEditorState) => {
  const selection = editorState.getSelection()
  if (!selection.isCollapsed()) {
    const contentState = editorState.getCurrentContent()
    const startKey = editorState.getSelection().getStartKey()
    const startOffset = editorState.getSelection().getStartOffset()
    const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey)
    const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset)
    let url = ''
    if (linkKey) {
      const linkInstance = contentState.getEntity(linkKey)
      url = linkInstance.getData().url
    }
    url = window.prompt('Add link http:// ', url)
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()

    // Apply entity
    let nextEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    })

    // Apply selection
    nextEditorState = RichUtils.toggleLink(
      nextEditorState,
      nextEditorState.getSelection(),
      entityKey
    )
    setEditorState(nextEditorState)
    return
  }
  let url = window.prompt('Add link http:// ')
  const decorator = createLinkDecorator()
  if (url) {
    let text = window.prompt('Display Text', url)
    if (text) {
      const contentState = editorState.getCurrentContent()
      const contentStateWithEntity = contentState.createEntity(
        'LINK',
        'MUTABLE',
        {
          url,
        }
      )
      let entityKey = contentState.getLastCreatedEntityKey()
      const selection = editorState.getSelection()
      const textWithEntity = Modifier.insertText(
        contentState,
        selection,
        text,
        null,
        entityKey
      )
      let newState = EditorState.createWithContent(textWithEntity, decorator)
      setEditorState(newState)
    }
  }
}
