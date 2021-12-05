import { useRef, useEffect, useState } from 'react'
import Select from 'react-select'
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsGlobe,
} from 'react-icons/bs'
import Avatar from '../components/Avatar'
import WorkA from './blocks/WorkA'
import SkillsA from './blocks/SkillsA'
import ProfilesA from './blocks/ProfilesA'
import InlineToolbarEditor from './../components/InlineToolbarEditor'
import LanguagesA from './blocks/LanguagesA'
import Basics from './blocks/Basics'
import { useSelector } from '../contexts/ResumeContext'

function Simple() {
  const resumeRef = useRef()
  const colors = useSelector('metadata.colors')
  const font = useSelector('metadata.font')

  function checkOverflow(el) {
    const curOverflow = el.style.overflow

    if (!curOverflow || curOverflow === 'visible') el.style.overflow = 'hidden'

    const isOverflowing =
      el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight

    el.style.overflow = curOverflow

    return isOverflowing
  }

  useEffect(() => {
    if (resumeRef.current) {
      console.log(checkOverflow(resumeRef.current))
    }
  })

  return (
    <section
      ref={resumeRef}
      className="shadow-2xl p-16 border-2 grid grid-cols-2 relative gap-4"
      style={{
        width: '210mm',
        minHeight: '297mm',
        fontFamily: font,
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      <svg
        width="620"
        height="390"
        viewBox="0 0 620 390"
        fill={colors.secondary}
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 w-full"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M321.572 640.562C252.212 631.565 191.121 597.459 135.234 554.619C73.5633 507.345 -12.0585 461.606 -15.092 382.491C-18.1758 302.067 71.2714 254.428 121.335 192.126C156.425 148.458 184.016 97.863 233.565 73.05C281.227 49.1817 335.475 66.545 387.873 58.6492C466.756 46.7625 551.923 -30.9634 617.381 15.2138C680.159 59.5002 633.831 165.299 648.076 242.207C662.097 317.909 724.548 388.214 700.002 461.276C675.142 535.269 595.379 572.486 526.083 605.316C461.671 635.832 391.754 649.666 321.572 640.562Z"
          fill="current"
        />
      </svg>

      <section className="col-span-1 space-y-8">
        <section className="space-y-6">
          <h1 data-tut="third-step" className="text-4xl font-semibold">
            <InlineToolbarEditor path="basics.name" />
          </h1>
          <h2 className="text-2xl">
            <InlineToolbarEditor path="basics.label" />
          </h2>
          <span
            style={{ backgroundColor: colors.primary }}
            className="w-16 h-2 inline-block rounded-full"
          ></span>
          {/* <ProfilesA path="basics.profiles" /> */}
          <WorkA path="work" />
          {/* <LanguagesA path="languages" /> */}
        </section>
      </section>
      <section className="col-span-1 space-y-8">
        <section className="flex justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <Avatar path="basics.image" />
          </div>
        </section>
        {/* <Basics path="basics" /> */}
        <SkillsA path="skills" />
      </section>
    </section>
  )
}

export default Simple
