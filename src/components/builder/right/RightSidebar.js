import { Link } from 'react-router-dom'
import { useState } from 'react'
import ReactCrop from 'react-image-crop'
import {
  AiOutlineLike,
  AiOutlineSafetyCertificate,
  AiOutlineShareAlt,
  AiOutlineUser,
} from 'react-icons/ai'
import { FiAward } from 'react-icons/fi'
import {
  HiOutlineCode,
  HiOutlineTranslate,
  HiOutlineDocumentDuplicate,
} from 'react-icons/hi'
import { IoPeopleOutline } from 'react-icons/io5'
import { MdOutlineSchool, MdWorkOutline } from 'react-icons/md'
import { RiProjectorLine } from 'react-icons/ri'

function RightSidebar() {
  return (
    <section className="rounded-3xl border-r w-80 h-full flex flex-col px-4 py-6 space-y-4"></section>
  )
}

function SidebarIcon({ icon }) {
  return (
    <div className="hover:rounded-lg hover:bg-gray-200 cursor-pointer text-gray-700 transition duration-400 rounded-full flex justify-center items-center w-8 h-8">
      {icon}
    </div>
  )
}

export default RightSidebar
