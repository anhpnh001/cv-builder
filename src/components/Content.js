import { useContext, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { MdAddLink, MdTextFormat } from 'react-icons/md'
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

      {/* <section className="flex justify-center items-center w-screen h-screen bg-black bg-opacity-80 z-40 fixed top-0 left-0"></section>
      <section className="z-40 w-80 rounded-3xl overflow-hidden border bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col px-6 py-8 space-y-6">
          <p className="font-semibold">Add link</p>
          <div className="space-y-4 text-gray-600">
            <div className="border flex items-center rounded-lg overflow-hidden bg-gray-50">
              <div className="px-2 flex justify-center items-center">
                <MdAddLink size="24" />
              </div>
              <input
                type="text"
                placeholder="Enter URL"
                className="min-w-0 flex-grow py-2 pr-4 outline-none bg-transparent"
              />
            </div>
            <div className="border flex items-center rounded-lg overflow-hidden bg-gray-50">
              <div className="px-2 flex justify-center items-center">
                <MdTextFormat size="24" />
              </div>
              <input
                type="text"
                placeholder="Enter text"
                className="min-w-0 flex-grow py-2 pr-4 outline-none bg-transparent"
              />
            </div>
          </div>
          <div className="space-x-4 flex">
            <button
              // onClick={handleCancelButtonClick}
              className="flex-grow h-10 px-8 rounded-full text-blue-600 font-medium"
            >
              Cancel
            </button>
            <button
              // onClick={handleCropButtonClick}
              className="flex-grow bg-blue-100 h-10 px-10 rounded-xl text-blue-600 font-medium"
            >
              Add
            </button>
          </div>
        </div>
      </section> */}
    </section>
  )
}

export default Content
