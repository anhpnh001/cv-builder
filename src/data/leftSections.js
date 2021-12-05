import { HiOutlineInformationCircle, HiOutlineTemplate } from 'react-icons/hi'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineColorLens } from 'react-icons/md'
import { RiFontSize } from 'react-icons/ri'

const leftSections = [
  {
    heading: 'templates',
    icon: HiOutlineTemplate,
  },
  // {
  //   heading: 'layout',
  //   icon: MdDashboard,
  // },
  {
    heading: 'colors',
    icon: MdOutlineColorLens,
  },
  {
    heading: 'fonts',
    icon: RiFontSize,
  },
  // {
  //   heading: 'font-size',
  //   icon: MdFormatSize,
  // },
  //   {
  //     heading: 'actions',
  //     icon: MdImportExport,
  //   },
  {
    heading: 'settings',
    icon: IoSettingsOutline,
  },
  {
    heading: 'about',
    icon: HiOutlineInformationCircle,
  },
]

export default leftSections
