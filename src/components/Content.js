import { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'
import { useReactToPrint } from 'react-to-print'
import Tour from 'reactour'
import { useDispatch, useSelector } from '../contexts/ResumeContext'
import { ResumeListContext } from '../contexts/ResumeListContext'
import templateOptions from '../data/templateOptions'
import useLocalStorage from '../hooks/useLocalStorage'
import LeftNavbar from './builder/left/LeftNavbar'
import LeftSidebar from './builder/left/LeftSidebar'
function Content() {
  const { t } = useTranslation()
  const { resumeId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const name = useSelector('metadata.name')
  const template = useSelector('metadata.template')
  const [isTourOpen, setIsTourOpen] = useLocalStorage('isTourOpen', true)
  const { getResume } = useContext(ResumeListContext)
  const resumeRef = useRef()
  const Template = templateOptions.find(
    (option) => option.name === template
  ).component

  const selectors = [
    '[data-tut="first-step"]',
    '[data-tut="second-step"]',
    '[data-tut="third-step"]',
    '[data-tut="fourth-step"]',
  ]

  const content = t('builder.tour', { returnObjects: true })

  const steps = selectors.map((selector, index) => ({
    selector,
    content: content[index],
  }))

  useEffect(() => {
    const resume = getResume(+resumeId)

    if (!resume) {
      navigate('/404')
      return
    }
    dispatch({ type: 'set_data', payload: resume })
  }, [resumeId])

  const handleExportPDF = useReactToPrint({
    documentTitle: name,
    content: () => resumeRef.current,
  })

  const closeTour = () => {
    setIsTourOpen(false)
  }
  return (
    <section className="flex h-screen">
      <section className="inline-flex">
        <LeftNavbar />
        <LeftSidebar onExportPDF={handleExportPDF} />
      </section>
      <section className="py-4 pr-4 flex-grow">
        <section className="shadow-inner border bg-gray-100 overflow-auto rounded-xl p-6 h-full flex flex-col items-center scrollbar-none">
          <section className="shadow-xl" data-tut="third-step">
            <Template ref={resumeRef} />
          </section>
        </section>
      </section>
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={closeTour}
        rounded={10}
        showNavigationNumber={false}
      />
    </section>
  )
}

export default Content
