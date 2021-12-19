import React from 'react'
import { HiOutlineInformationCircle, HiOutlineTemplate } from 'react-icons/hi'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineColorLens } from 'react-icons/md'
import { RiFontSize } from 'react-icons/ri'

function RightNavbar() {
  return (
    <section className="w-20 h-full flex flex-col items-center py-6 space-y-4">
      <SidebarIcon icon={<HiOutlineTemplate size="20" />} />
      <SidebarIcon icon={<MdOutlineColorLens size="20" />} />
      <SidebarIcon icon={<RiFontSize size="20" />} />
      <SidebarIcon icon={<IoSettingsOutline size="20" />} />
      <SidebarIcon icon={<HiOutlineInformationCircle size="20" />} />
    </section>
  )
}

function SidebarIcon({ icon }) {
  return (
    <div className="hover:rounded-lg hover:text-blue-600 hover:bg-blue-50 cursor-pointer text-gray-700 transition duration-500 rounded-full flex justify-center items-center w-12 h-12">
      {icon}
    </div>
  )
}

export default RightNavbar
