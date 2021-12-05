import { useEffect, useState, createContext } from 'react'

const ResumeListDeletedContext = createContext()
function ResumeListDeletedProvider({ children }) {
  const [resumeListDeleted, setResumeListDeleted] = useState(
    // If localStorage has resumeListDeleted, use it. Otherwise, use empty array.
    localStorage.getItem('resumeListDeleted')
      ? JSON.parse(localStorage.getItem('resumeListDeleted'))
      : []
  )

  useEffect(() => {
    // Update localStorage every time resumeListDeleted changes
    localStorage.setItem('resumeListDeleted', JSON.stringify(resumeListDeleted))
  }, [resumeListDeleted])

  return (
    <ResumeListDeletedContext.Provider
      value={[resumeListDeleted, setResumeListDeleted]}
    >
      {children}
    </ResumeListDeletedContext.Provider>
  )
}

export { ResumeListDeletedContext, ResumeListDeletedProvider }
