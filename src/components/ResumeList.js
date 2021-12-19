import { useContext } from 'react'
import {
  HiOutlinePencilAlt,
  HiOutlinePlus,
  HiOutlineTrash,
} from 'react-icons/hi'
import { MdOutlineDownloadDone } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { ResumeListContext } from '../contexts/ResumeListContext'
import Footer from './Footer'
import Navbar from './Navbar'

function ResumeList() {
  const {
    getAllResumes,
    getNumberOfResumesDeleted,
    moveResumeToTrash,
    createResume,
  } = useContext(ResumeListContext)

  return (
    <>
      <Navbar />
      <main className="px-8 py-8 container mx-auto flex-grow flex flex-col">
        <Link
          to="/editor/trash"
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
          {getAllResumes()
            .sort((a, b) => new Date(b.dateModified) - new Date(a.dateModified))
            .map((resume) => {
              return (
                <div>
                  <div
                    key={resume.id}
                    className="hover:shadow-xl border transition overflow-hidden group relative bg-gray-100 aspect-w-3 aspect-h-4 rounded-xl"
                  >
                    <div className=" flex flex-col flex-grow h-full">
                      <Link
                        to={`/editor/${resume.id}`}
                        className="relative w-full h-full"
                      >
                        <img
                          src={
                            process.env.PUBLIC_URL + resume.metadata.thumbnail
                          }
                          alt={resume.id}
                          className="object-cover w-full h-full"
                        />
                        <div className="group-hover:opacity-100 opacity-0 absolute bg-black bg-opacity-20 transition top-0 left-0 w-full h-full flex justify-center items-center">
                          <HiOutlinePencilAlt className="text-5xl text-gray-200" />
                        </div>
                      </Link>
                      <div className="group-hover:opacity-100 hover:bg-red-500 hover:text-white bg-gray-50 rounded-lg  transition opacity-0 absolute bottom-2 right-2 w-8 h-8 flex justify-center items-center">
                        <button
                          onClick={() => moveResumeToTrash(resume.id)}
                          className="flex items-center justify-center w-10 h-10 transition"
                        >
                          <HiOutlineTrash className="text-xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/editor/${resume.id}`}
                    className="dark:text-slate-100 text-gray-800 text-center block font-medium mt-2"
                  >
                    {resume.metadata.name}
                  </Link>
                </div>
              )
            })}
        </div>
      </main>
      {/* <Footer /> */}
    </>
  )
}

export default ResumeList
