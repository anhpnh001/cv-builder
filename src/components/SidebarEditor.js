import { useContext } from 'react'
import { ResumeContext } from '../contexts/ResumeContext'
import InlineToolbarEditor from './InlineToolbarEditor'

function SidebarEditor() {
  const [resumeData, setResumeData] = useContext(ResumeContext)

  const onUpdateName = (name) => {
    setResumeData({ ...resumeData, basics: { ...resumeData.basics, name } })
  }

  return (
    <>
      {resumeData ? (
        <InlineToolbarEditor updateInfo={onUpdateName}>
          {resumeData.basics.name}
        </InlineToolbarEditor>
      ) : (
        ''
      )}
    </>
  )
}

export default SidebarEditor
