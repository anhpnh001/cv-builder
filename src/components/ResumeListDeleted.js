import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import {
  HiOutlineTrash,
  HiOutlineRefresh,
  HiOutlineFolderOpen,
} from 'react-icons/hi'
import { ResumeListContext } from '../contexts/ResumeListContext'
import { ResumeListDeletedContext } from '../contexts/ResumeListDeletedContext'

function ResumeListDeleted() {
  const {
    getAllResumesDeleted,
    getNumberOfResumes,
    deleteResume,
    restoreResume,
  } = useContext(ResumeListContext)
  // const removeResume = (id) => {
  //   const resumeIndex = resumeListDeleted.findIndex(
  //     (resume) => resume.id === id
  //   )
  //   const newResumeListDeleted = [...resumeListDeleted]
  //   newResumeListDeleted.splice(resumeIndex, 1)
  //   setResumeListDeleted(newResumeListDeleted)
  // }

  // const restoreResume = (id) => {
  //   const resumeIndex = resumeListDeleted.findIndex(
  //     (resume) => resume.id === id
  //   )
  //   const newResumeListDeleted = [...resumeListDeleted]
  //   newResumeListDeleted.splice(resumeIndex, 1)
  //   resumeListDeleted[resumeIndex].dateModified = new Date()
  //   setResumeList([...resumeList, resumeListDeleted[resumeIndex]])
  //   setResumeListDeleted(newResumeListDeleted)
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
          to="/cv-builder/editor"
          className="group relative flex items-center justify-center w-16 h-16 mb-8 bg-gray-200 rounded-lg shadow-inner"
        >
          <span className="bg-blue-600 rounded-full text-xs h-8 w-8 flex items-center justify-center text-white border absolute bottom-full left-full transform -translate-x-1/2 translate-y-1/2">
            {getNumberOfResumes() > 9 ? '9+' : getNumberOfResumes()}
          </span>
          <HiOutlineFolderOpen className="group-hover:text-blue-600 transition text-3xl" />
        </Link>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
          {getAllResumesDeleted()
            .reverse()
            .map((resume) => {
              return (
                <div
                  key={resume.id}
                  className="hover:shadow-xl transition duration-500 overflow-hidden group relative bg-gray-100 aspect-w-3 aspect-h-4 rounded-xl"
                >
                  <div className=" flex flex-col flex-grow h-full">
                    <div className="w-full absolute top-0 left-0 bg-gradient-to-b from-black text-white p-4">
                      {resume.id}
                    </div>
                    <img
                      src="https://source.unsplash.com/random"
                      alt={resume.id}
                      className="object-cover w-full h-full"
                    />
                    <div className="group-hover:opacity-100 group-hover:translate-y-0 transition duration-200 transform translate-y-full opacity-0 absolute bottom-0 left-0 w-full h-10 flex justify-center items-center">
                      <button
                        onClick={() => deleteResume(resume.id)}
                        className="hover:bg-red-500 bg-gray-200 hover:text-white w-10 h-10 flex items-center justify-center transition"
                      >
                        <HiOutlineTrash className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => restoreResume(resume.id)}
                        className="hover:bg-blue-500 hover:text-white flex flex-grow items-center justify-center bg-gray-200 h-10 px-4 transition"
                      >
                        <span>Restore</span>
                        <HiOutlineRefresh className="w-5 h-5 ml-1" />
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

export default ResumeListDeleted
