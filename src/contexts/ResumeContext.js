import { clone, get, setWith } from 'lodash'
import { createContext, useCallback, useContext, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import initialState from '../data/initialState'
import { ResumeListContext } from './ResumeListContext'

const ResumeContext = createContext()
function ResumeProvider({ children }) {
  const { debouncedUpdateResume } = useContext(ResumeListContext)
  const reducer = useCallback(
    (state, { type, payload }) => {
      let newState
      switch (type) {
        case 'on_change':
          console.log(payload)
          newState = setWith(clone(state), payload.path, payload.value, clone)
          debouncedUpdateResume(newState)
          return newState
        case 'on_add_item':
          // add item to the last value
          newState = setWith(clone(state), payload.path, [
            ...get(state, payload.path),
            payload.value,
          ])
          debouncedUpdateResume(newState)
          return newState
        case 'on_duplicate_item':
          // Find the item to duplicate with random id based on the index and add it after index
          const { index, path } = payload
          const itemToDuplicate = get(state, path)[index]
          const newItem = { ...itemToDuplicate, id: uuidv4() }
          newState = setWith(clone(state), path, [
            ...get(state, path).slice(0, index + 1),
            newItem,
            ...get(state, path).slice(index + 1),
          ])
          debouncedUpdateResume(newState)
          return newState
        case 'on_delete_item':
          // delete item based on the index
          newState = setWith(clone(state), payload.path, [
            ...get(state, payload.path).slice(0, payload.index),
            ...get(state, payload.path).slice(payload.index + 1),
          ])
          debouncedUpdateResume(newState)
          return newState
        case 'on_move_item':
          // reorder items based on the destinationIndex and sourceIndex
          const items = get(state, payload.path)
          const [removed] = items.splice(payload.sourceIndex, 1)
          items.splice(payload.destinationIndex, 0, removed)
          newState = setWith(clone(state), payload.path, items)
          debouncedUpdateResume(newState)
          return newState
        case 'on_move_item_up':
          // move item up based on the index
          const itemsUp = get(state, payload.path)
          const [removedUp] = itemsUp.splice(payload.index, 1)
          itemsUp.splice(payload.index - 1, 0, removedUp)
          newState = setWith(clone(state), payload.path, itemsUp)
          debouncedUpdateResume(newState)
          return newState
          return state
        case 'on_move_item_down':
          // move item down based on the index
          const itemsDown = get(state, payload.path)
          const [removedDown] = itemsDown.splice(payload.index, 1)
          itemsDown.splice(payload.index + 1, 0, removedDown)
          newState = setWith(clone(state), payload.path, itemsDown)
          debouncedUpdateResume(newState)
          return newState
        case 'set_data':
          newState = payload
          debouncedUpdateResume(newState)
          return newState
        default:
          return state
        case 'reset_data':
          newState = { ...initialState, metadata: state.metadata }
          debouncedUpdateResume(newState)
          return newState
      }
    },
    [debouncedUpdateResume]
  )
  const [state, dispatch] = useReducer(reducer, initialState)
  // const { resumeId } = useParams()
  // const [resumeIndex, setResumeIndex] = useState(() =>
  //   resumeList.findIndex((resume) => resume.id === +resumeId)
  // )
  // const [resumeData, setResumeData] = useState(() => {
  //   // If in resume path, return the resumeData if it exists in resumeList or return null
  //   return resumeIndex !== -1 ? resumeList[resumeIndex] : null
  // })

  // useEffect(() => {
  //   if (resumeIndex !== -1) {
  //     // Update resumeData in resumeList
  //     setResumeList((resumeList) => {
  //       resumeData.dateModified = new Date()
  //       const newResumeList = [...resumeList]
  //       console.log(resumeData)
  //       newResumeList[resumeIndex] = resumeData
  //       return newResumeList
  //     })
  //   }
  // }, [resumeData])

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  )
}

const useSelector = (path, fallback) => {
  const { state } = useContext(ResumeContext)
  let value = get(state, path)

  if (value === undefined) {
    value = fallback
  }

  return value
}

const useDispatch = () => {
  const { dispatch } = useContext(ResumeContext)
  return dispatch
}

export { ResumeContext, ResumeProvider, useDispatch, useSelector }
