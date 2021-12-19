import { useState, useContext, useEffect, useRef } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
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
import LayoutWrapper from './LayoutWrapper'

function Content() {
  const { t } = useTranslation()
  const { resumeId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const name = useSelector('metadata.name')
  const template = useSelector('metadata.template')
  const colors = useSelector('metadata.colors')
  const font = useSelector('metadata.font')
  const [showTour, setShowTour] = useLocalStorage('show-tour', true)
  const [numberOfPages, setNumberOfPages] = useState(1)
  const { getResume } = useContext(ResumeListContext)
  const resumeRef = useRef()
  const resumeContentRef = useRef()
  const Template = templateOptions.find((option) => option.name === template)

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

  useEffect(() => {
    const numberOfPages = Math.ceil(
      resumeContentRef.current.scrollHeight / 1123
    )
    setNumberOfPages(numberOfPages)
  })

  const handleExportPDF = useReactToPrint({
    documentTitle: name,
    content: () => resumeRef.current,
  })

  const closeTour = () => {
    setShowTour(false)
  }

  return (
    <section className="flex h-screen">
      <section className="inline-flex">
        <LeftNavbar />
        <LeftSidebar onExportPDF={handleExportPDF} />
      </section>
      <section className="py-4 pr-4 flex-grow">
        <section className="dark:bg-gray-700 dark:border-gray-600 border border-slate-200 bg-slate-100 overflow-auto rounded-xl p-6 h-full flex flex-col items-center scrollbar-none">
          <section className="shadow-xl" data-tut="third-step">
            <LayoutWrapper>
              <section
                ref={resumeRef}
                style={{
                  width: '210mm',
                  minHeight: '297mm',
                  height: 297 * numberOfPages + 'mm',
                  fontFamily: font,
                  color: colors.text,
                  backgroundColor: colors.background,
                }}
                className="relative text-sm"
              >
                {Template && <Template.component ref={resumeContentRef} />}
              </section>
            </LayoutWrapper>
          </section>
        </section>
      </section>
      <Tour
        steps={steps}
        isOpen={showTour}
        onRequestClose={closeTour}
        rounded={10}
        showNavigationNumber={false}
      />
    </section>
  )
}

export default Content
