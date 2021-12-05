import { useEffect, useState, createContext } from 'react'

const ResumeUniqueIdContext = createContext()
function ResumeUniqueIdProvider({ children }) {
  const [resumeUniqueId, setResumeUniqueId] = useState(
    // If localStorage has resumeUniqueId, use it. Otherwise, use empty array.
    localStorage.getItem('resumeUniqueId')
      ? +localStorage.getItem('resumeUniqueId')
      : 0
  )

  useEffect(() => {
    // Update localStorage every time resumeUniqueId changes
    localStorage.setItem('resumeUniqueId', resumeUniqueId)
  }, [resumeUniqueId])

  return (
    <ResumeUniqueIdContext.Provider value={[resumeUniqueId, setResumeUniqueId]}>
      {children}
    </ResumeUniqueIdContext.Provider>
  )
}

export { ResumeUniqueIdContext, ResumeUniqueIdProvider }
