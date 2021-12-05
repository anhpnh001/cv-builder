import { useContext } from 'react'
import {
  HiOutlineFolderOpen,
  HiOutlineRefresh,
  HiOutlineTrash,
} from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { ResumeListContext } from '../contexts/ResumeListContext'
import Footer from './Footer'
import Navbar from './Navbar'

function ResumeListDeleted() {
  const {
    getAllResumesDeleted,
    getNumberOfResumes,
    deleteResume,
    restoreResume,
  } = useContext(ResumeListContext)

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
          to="/editor"
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
                <div>
                  <div
                    key={resume.id}
                    className="hover:shadow-xl border transition overflow-hidden group relative bg-gray-100 aspect-w-3 aspect-h-4 rounded-xl"
                  >
                    <div className=" flex flex-col flex-grow h-full">
                      <div
                        onClick={() => restoreResume(resume.id)}
                        className="relative w-full h-full cursor-pointer"
                      >
                        <img
                          src={
                            process.env.PUBLIC_URL + resume.metadata.thumbnail
                          }
                          alt={resume.id}
                          className="object-cover w-full h-full"
                        />
                        <div className="group-hover:opacity-100 opacity-0 absolute bg-black bg-opacity-20 transition top-0 left-0 w-full h-full flex justify-center items-center">
                          <HiOutlineRefresh className="text-5xl text-gray-200" />
                        </div>
                      </div>
                      <div className="group-hover:opacity-100 hover:bg-red-500 hover:text-white bg-gray-50 rounded-lg  transition opacity-0 absolute bottom-2 right-2 w-8 h-8 flex justify-center items-center">
                        <button
                          onClick={() => deleteResume(resume.id)}
                          className="flex items-center justify-center w-10 h-10 transition"
                        >
                          <HiOutlineTrash className="text-xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/cv-builder/editor/${resume.id}`}
                    className="text-center block font-medium mt-2"
                  >
                    {resume.metadata.name}
                  </Link>
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
