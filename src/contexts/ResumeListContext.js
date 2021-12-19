import { debounce, find } from 'lodash'
import { createContext, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { ResumeUniqueIdContext } from '../contexts/ResumeUniqueIdContext'
import initialState from '../data/initialState'

const ResumeListContext = createContext()
function ResumeListProvider({ children }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [resumeUniqueId, setResumeUniqueId] = useContext(ResumeUniqueIdContext)
  const [resumeList, setResumeList] = useState(
    // If localStorage has resumeList, use it. Otherwise, use empty array.
    localStorage.getItem('resumeList')
      ? JSON.parse(localStorage.getItem('resumeList'))
      : []
  )
  const [resumeListDeleted, setResumeListDeleted] = useState(
    // If localStorage has resumeListDeleted, use it. Otherwise, use empty array.
    localStorage.getItem('resumeListDeleted')
      ? JSON.parse(localStorage.getItem('resumeListDeleted'))
      : []
  )

  const getNumberOfResumes = () => {
    return resumeList.length
  }

  const getNumberOfResumesDeleted = () => {
    return resumeListDeleted.length
  }

  const getAllResumes = () => {
    return resumeList
  }

  const getAllResumesDeleted = () => {
    return resumeListDeleted
  }

  const getResume = (id) => {
    return find(resumeList, { id })
  }

  const createResume = ({ name, template }) => {
    const newResumeId = resumeUniqueId + 1

    const sections = initialState.metadata.sections
    Object.keys(sections).forEach((key) => {
      sections[key].heading = t(`builder.sections.${key}`)
    })

    const newResume = {
      ...initialState,
      id: newResumeId,
      metadata: {
        ...initialState.metadata,
        sections,
      },
      dateCreated: new Date(),
      dateModified: new Date(),
    }
    setResumeUniqueId(newResumeId)
    setResumeList([...resumeList, newResume])
    // Redirect to resumeId
    navigate(`/editor/${newResumeId}`)
    toast.success(
      t('builder.toasts.created', { name: initialState.metadata.name })
    )
  }

  const updateResume = (resume) => {
    // Update resumeData in resumeList with date modified
    const updatedResumeList = resumeList.map((item) => {
      if (item.id === resume.id) {
        return {
          ...resume,
          dateModified: new Date(),
        }
      }
      return item
    })
    setResumeList(updatedResumeList)
  }

  const deleteResume = (id) => {
    const deletedResumeList = resumeListDeleted.filter((item) => item.id !== id)
    setResumeListDeleted(deletedResumeList)
    toast.error(t('dashboard.toasts.deleted', { name: id }))
  }

  function moveResumeToTrash(id) {
    const index = resumeList.findIndex((item) => item.id === id)
    const deletedResume = resumeList[index]
    const updatedResumeList = [
      ...resumeList.slice(0, index),
      ...resumeList.slice(index + 1),
    ]
    const updatedResumeListDeleted = [...resumeListDeleted, deletedResume]
    setResumeList(updatedResumeList)
    setResumeListDeleted(updatedResumeListDeleted)
    toast.error(t('dashboard.toasts.trashed', { name: id }))
  }

  const restoreResume = (id) => {
    const index = resumeListDeleted.findIndex((item) => item.id === id)
    const deletedResume = resumeListDeleted[index]
    const updatedResumeListDeleted = [
      ...resumeListDeleted.slice(0, index),
      ...resumeListDeleted.slice(index + 1),
    ]
    setResumeList([...resumeList, deletedResume])
    setResumeListDeleted(updatedResumeListDeleted)
  }

  const debouncedUpdateResume = debounce(updateResume, 100)

  useEffect(() => {
    // Update localStorage every time resumeList changes
    localStorage.setItem('resumeList', JSON.stringify(resumeList))
  }, [resumeList])

  useEffect(() => {
    // Update localStorage every time resumeListDeleted changes
    localStorage.setItem('resumeListDeleted', JSON.stringify(resumeListDeleted))
  }, [resumeListDeleted])

  return (
    <ResumeListContext.Provider
      value={{
        getNumberOfResumes,
        getNumberOfResumesDeleted,
        getAllResumes,
        getAllResumesDeleted,
        getResume,
        createResume,
        updateResume,
        deleteResume,
        moveResumeToTrash,
        restoreResume,
        debouncedUpdateResume,
      }}
    >
      {children}
    </ResumeListContext.Provider>
  )
}

export { ResumeListContext, ResumeListProvider }
