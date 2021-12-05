import { savePDF } from '@progress/kendo-react-pdf'
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai'
import { MdOutlineFilterCenterFocus } from 'react-icons/md'
import html2canvas from 'html2canvas'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { ResumeContext, useSelector } from '../../contexts/ResumeContext'
import html2pdf from 'html2pdf.js'
import templateOptions from '../../data/templateOptions'
import { jsPDF } from 'jspdf'
import ReactToPrint from 'react-to-print'

function Resume({}, ref) {
  const resumeRef = useRef()
  const template = useSelector('metadata.template')
  const [previewMode, setPreviewMode] = useState(false)

  useImperativeHandle(ref, () => ({
    turnPreviewMode: () => {
      setPreviewMode(!previewMode)
    },
    savePDF() {
      resumeRef.current.print()
      // html2canvas(resumeRef.current).then((canvas) => {
      //   const imgData = canvas.toDataURL('image/png')
      //   const pdf = new jsPDF()
      //   pdf.addImage(imgData, 'JPEG', 0, 0)
      //   // pdf.output('dataurlnewwindow');
      //   pdf.save('download.pdf')
      // })
      // savePDF(resumeRef.current)
      // html2pdf()
      //   .set({
      //     pagebreak: {
      //       mode: ['avoid-all', 'css', 'legacy'],
      //       after: ['*'],
      //       before: ['*'],
      //     },
      //   })
      //   .from(resumeRef.current)
      //   .save()
      // savePDF(resumeRef.current, {
      //   paperSize: 'A4',
      //   keepTogether: 'section',
      // })
    },
    // saveJSON() {
    //   const element = document.createElement('a')
    //   const textFile = new Blob([JSON.stringify(resumeData, null, 4)]) //pass data from localStorage API to blob
    //   element.href = URL.createObjectURL(textFile)
    //   element.download = 'userFile.json'
    //   document.body.appendChild(element)
    //   element.click()
    // },
    // importJSON(event) {
    //   event.preventDefault()
    //   const reader = new FileReader()
    //   reader.onload = (event) => {
    //     const newResumeData = JSON.parse(event.target.result)
    //     console.log(newResumeData)
    //     setResumeData(newResumeData)
    //   }
    //   reader.readAsText(event.target.files[0])
    // },
  }))
  return (
    <>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => resumeRef.current}
      />
      {(previewMode && (
        <TransformWrapper>
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
              <div className="bg-white bg-opacity-75 absolute flex items-center bottom-8 z-10 rounded-full shadow-lg px-8 py-2">
                <button
                  onClick={() => zoomIn()}
                  className="hover:bg-gray-200 rounded-lg w-8 h-8 flex justify-center items-center"
                >
                  <AiOutlineZoomIn size="18" />
                </button>
                <button
                  onClick={() => resetTransform()}
                  className="hover:bg-gray-200 rounded-lg w-8 h-8 flex justify-center items-center"
                >
                  <MdOutlineFilterCenterFocus size="18" />
                </button>
                <button
                  onClick={() => zoomOut()}
                  className="hover:bg-gray-200 rounded-lg w-8 h-8 flex justify-center items-center"
                >
                  <AiOutlineZoomOut size="18" />
                </button>
              </div>
              <TransformComponent>
                <section ref={resumeRef}>
                  {
                    templateOptions.find((option) => option.name === template)
                      .component
                  }
                </section>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      )) || (
        <section ref={resumeRef}>
          {templateOptions.find((option) => option.name === template).component}
        </section>
      )}
    </>
  )
}

export default forwardRef(Resume)
