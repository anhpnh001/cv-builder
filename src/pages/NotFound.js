import { useContext } from 'react'
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { ResumeListContext } from '../contexts/ResumeListContext'

function NotFound() {
  const { createResume } = useContext(ResumeListContext)
  return (
    <div className="h-screen flex justify-evenly items-center flex-grow container mx-auto">
      <div>
        <Link to="/" className="mb-4 flex items-center space-x-2">
          <HiOutlineDocumentDuplicate className="text-5xl text-blue-600" />
          <span className="text-3xl font-serif text-black dark:text-gray-100 font-bold">
            BetterCV
          </span>
        </Link>
        <div className="grid w-72 h-96 grid-cols-3 rounded-xl overflow-hidden shadow-lg">
          <div className="col-span-1 bg-blue-300 px-4 py-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          </div>
          <div className="col-span-2 bg-gray-100 px-4 py-8 space-y-4">
            <div className="rounded-full w-full h-3 bg-gray-200"></div>
            <div className="rounded-full w-3/4 h-3 bg-gray-200"></div>
            <div className="rounded-full w-1/2 h-3 bg-gray-200"></div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <button className="bg-gray-400 rounded-full text-lg font-medium text-white px-4 py-2">
          Page not found
        </button>
        <h1 className="text-7xl font-bold">Error 404!</h1>
        <p className="text-gray-400 text-xl font-medium">
          Create new resume or come back to the homepage
        </p>
        <div className="flex font-bold">
          <button
            onClick={createResume}
            className="hover:shadow-xl transition bg-blue-500 text-lg font-medium rounded-xl text-white px-6 py-3"
          >
            Create Resume
          </button>
          <Link
            to="/cv-builder"
            className="text-blue-500 text-lg font-medium rounded-xl px-6 py-3"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
