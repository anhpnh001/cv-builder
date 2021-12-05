import { HiOutlineX } from 'react-icons/hi'

function Notification({ message, type, duration, onClick }) {
  return (
    <div className="z-50 bg-white w-96 fixed right-8 bottom-8 flex items-center gap-4 shadow-xl p-4 border border-gray-100 rounded-xl">
      {/* <HiOutlineTrash size="24" className="text-gray-400" /> */}
      <div className="flex justify-between items-center flex-grow">
        <p className="text-gray-800 font-semibold">{message}</p>
        <button className="text-blue-500 font-semibold">Undo</button>
      </div>
      <HiOutlineX size="24" className="text-gray-400" />
    </div>
  )
}

export default Notification
