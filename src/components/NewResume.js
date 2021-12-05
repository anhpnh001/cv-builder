import { useContext, useEffect } from 'react'
import { ResumeListContext } from '../contexts/ResumeListContext'
import { ResumeUniqueIdContext } from '../contexts/ResumeUniqueIdContext'
import initialState from '../data/initialState'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'

function NewResume() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [resumeUniqueId, setResumeUniqueId] = useContext(ResumeUniqueIdContext)
  const [resumeList, setResumeList] = useContext(ResumeListContext)

  useEffect(() => {
    const newResumeId = resumeUniqueId + 1
    // Create a new resume data
    const newResume = {
      ...initialState,
      id: newResumeId,
      template: searchParams.get('template') || 'Basic',
      dateCreated: new Date(),
      dateModified: new Date(),
    }
    setResumeUniqueId(newResumeId)
    setResumeList([...resumeList, newResume])
    // Redirect to resumeId
    navigate(`/editor/${newResumeId}`)
  }, [])

  return null
}

export default NewResume
