import { useContext } from 'react'
import {
  HiOutlinePencilAlt,
  HiOutlinePlus,
  HiOutlineTrash,
} from 'react-icons/hi'
import { MdOutlineDownloadDone } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { ResumeListContext } from '../contexts/ResumeListContext'
import { ResumeListDeletedContext } from '../contexts/ResumeListDeletedContext'
import Footer from './Footer'
import Navbar from './Navbar'

function ResumeList() {
  const {
    getAllResumes,
    getNumberOfResumesDeleted,
    moveResumeToTrash,
    createResume,
  } = useContext(ResumeListContext)
  const [resumeListDeleted, setResumeListDeleted] = useContext(
    ResumeListDeletedContext
  )
  // const removeResume = (id) => {
  //   const resumeIndex = resumeList.findIndex((resume) => resume.id === id)
  //   setResumeListDeleted([...resumeListDeleted, resumeList[resumeIndex]])
  //   const newResumeList = [...resumeList]
  //   newResumeList.splice(resumeIndex, 1)
  //   setResumeList(newResumeList)
  // }
  return (
    <>
      <Navbar />
      <main className="container mx-auto flex-grow flex flex-col">
        <section className="text-center py-12">
          <h1 className="text-gray-900 font-serif font-bold text-4xl mb-2 dark:text-gray-100">
            Let's build your CV!
          </h1>
          <p className="text-lg dark:text-gray-300">
            - All you need to do is just edit -
          </p>
        </section>
        <Link
          to="/cv-builder/editor/trash"
          className="group relative flex items-center justify-center w-16 h-16 mb-8 bg-gray-200 rounded-lg shadow-inner"
        >
          <span className="bg-red-600 rounded-full text-xs h-8 w-8 flex items-center justify-center text-white border absolute bottom-full left-full transform -translate-x-1/2 translate-y-1/2">
            {getNumberOfResumesDeleted() > 9
              ? '9+'
              : getNumberOfResumesDeleted()}
          </span>
          <HiOutlineTrash className="group-hover:text-red-600 transition text-3xl" />
        </Link>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
          <div className="border-2 border-dashed transition duration-500 overflow-hidden group relative aspect-w-3 aspect-h-4 rounded-xl">
            <button
              onClick={createResume}
              className="flex justify-center items-center"
            >
              <HiOutlinePlus className="group-hover:text-blue-600 text-5xl text-gray-800" />
            </button>
          </div>
          {getAllResumes()
            .sort((a, b) => new Date(b.dateModified) - new Date(a.dateModified))
            .map((resume) => {
              return (
                <div
                  key={resume.id}
                  className="hover:shadow-xl transition duration-500 overflow-hidden group relative bg-gray-100 aspect-w-3 aspect-h-4 rounded-xl"
                >
                  <div className=" flex flex-col flex-grow h-full">
                    <div className="w-full absolute top-0 left-0 bg-gradient-to-b from-black text-white p-4 z-10">
                      {resume.id}
                    </div>
                    <Link
                      to={`/cv-builder/editor/${resume.id}`}
                      className="relative w-full h-full"
                    >
                      <img
                        src="https://source.unsplash.com/random"
                        alt={resume.id}
                        className="object-cover w-full h-full"
                      />
                      <div className="group-hover:opacity-100 opacity-0 absolute bg-black bg-opacity-25 top-0 left-0 w-full h-full flex justify-center items-center">
                        <HiOutlinePencilAlt className="text-5xl text-gray-200" />
                      </div>
                    </Link>
                    <div className="bg-gray-200 group-hover:opacity-100 group-hover:translate-y-0 transition duration-200 transform translate-y-full opacity-0 absolute bottom-0 left-0 w-full h-10 flex justify-center items-center">
                      <button
                        onClick={() => moveResumeToTrash(resume.id)}
                        className="hover:bg-red-500 hover:text-white flex items-center justify-center w-10 h-10 transition"
                      >
                        <HiOutlineTrash className="text-xl" />
                      </button>
                      <button
                        onClick={() => moveResumeToTrash(resume.id)}
                        className="hover:bg-blue-500 hover:text-white flex flex-grow items-center justify-center h-10 px-4 transition"
                      >
                        <span className="font-medium">Download</span>
                        <MdOutlineDownloadDone className="text-xl ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ResumeList
