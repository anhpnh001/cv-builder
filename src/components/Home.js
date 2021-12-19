import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  HiOutlineDocumentAdd,
  HiOutlineDownload,
  HiOutlinePencil,
  HiOutlineTemplate,
} from 'react-icons/hi'
import { MdOutlineRefresh } from 'react-icons/md'
import { ResumeListContext } from '../contexts/ResumeListContext'
import Footer from './Footer'
import Navbar from './Navbar'

const stepsIcon = [
  HiOutlineDocumentAdd,
  HiOutlineTemplate,
  HiOutlinePencil,
  HiOutlineDownload,
]

const pics = ['8460510_1.png', '7396186_3.png', '6109613_2.png']

function Home() {
  const { t } = useTranslation()
  const { createResume } = useContext(ResumeListContext)
  const [pic, setPic] = useState(pics[0])

  useEffect(() => {
    const interval = setInterval(() => {
      const index = pics.indexOf(pic)
      if (index === pics.length - 1) {
        setPic(pics[0])
      } else {
        setPic(pics[index + 1])
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [pic])

  return (
    <>
      <main className="min-h-screen transition overscroll-contain w-full flex-grow flex flex-col">
        <section className="min-h-screen flex flex-col">
          <Navbar />
          <section className="relative flex flex-grow items-center container px-8 mx-auto">
            <section className="lg:flex-row w-full flex flex-col gap-12 justify-between items-center">
              <section className="space-y-10 flex-none">
                <h1 className="text-slate-900 font-bold text-5xl capitalize dark:text-gray-100 tracking-tight leading-snug whitespace-pre-line">
                  {t('landing.greeting')}
                </h1>
                <p className="text-slate-500 text-xl dark:text-gray-300 max-w-md leading-normal">
                  {t('landing.slogan')}
                </p>
                <button
                  onClick={createResume}
                  className="shadow-lg shadow-blue-600/50 transition bg-blue-600 text-sm font-medium rounded-xl text-white px-10 py-4"
                >
                  {t('landing.buttons.createCV')}
                </button>
              </section>
              <section className="flex-grow max-w-screen-md">
                <img
                  src={process.env.PUBLIC_URL + '/assets/images/' + pic}
                  className="w-full h-auto"
                />
              </section>
              {/* <div
                // style={{ width: '520px' }}
                className="lg:w-1/3 aspect-3/2 bg-slate-100 flex flex-col border border-slate-200 rounded-lg overflow-hidden"
              >
                <div className="bg-white relative w-full h-9 border-b border-slate-200 flex justify-center items-center">
                  <div className="absolute left-3 space-x-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                  </div>
                  <div className="text-gray-500 rounded-md flex relative justify-center items-center bg-slate-100 w-48 h-6">
                    <p className="text-xs select-none">localhost:3000</p>
                    <MdOutlineRefresh size="14" className="absolute right-1" />
                  </div>
                </div>
                <div className="flex-grow flex flex-col py-3 pl-28 pr-3">
                  <div className="rounded-lg bg-slate-50 border border-slate-200 w-full h-full pt-4 flex-grow flex flex-col overflow-hidden">
                    <div className="rounded-t-md border-t border-x mx-auto grid w-3/5 h-full grid-cols-3 flex-grow overflow-hidden">
                      <div className="col-span-1 bg-blue-400 py-4">
                        <div className="w-3/4 mx-auto aspect-square bg-white rounded-full overflow-hidden">
                          <img
                            src={`https://avatars.dicebear.com/api/micah/${Math.random()}.svg`}
                          />
                        </div>
                      </div>
                      <div className="col-span-2 bg-white px-2 py-4 space-y-3">
                        <div className="rounded-full w-full h-2 bg-slate-100"></div>
                        <div className="rounded-full w-3/4 h-2 bg-slate-100"></div>
                        <div className="rounded-full w-1/2 h-2 bg-slate-100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </section>
          </section>
        </section>
        {/* <section className="min-h-screen justify-center items-center container flex gap-12">
          <div className="w-1/2 flex justify-end">
            <div
              style={{ width: '480px', height: '320px' }}
              className="flex flex-col shadow-2xl rounded-lg"
            >
              <div className="relative w-full h-9 border-b flex justify-center items-center">
                <div className="absolute left-3 space-x-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                </div>
                <div className="rounded-md flex relative justify-center items-center bg-gray-100 w-48 h-7">
                  <p className="text-sm">localhost:3000</p>
                  <MdOutlineRefresh size="16" className="absolute right-1" />
                </div>
              </div>
              <div className="flex-grow flex">
                <div className="w-6 h-full"></div>
                <div className="w-16 rounded-lg px-2 py-4 space-y-3"></div>
                <div className="flex-grow py-3">
                  <div className="rounded-lg bg-gray-50 shadow-inner w-full h-full pt-4 overflow-hidden">
                    <div className="mx-auto grid w-56 h-full grid-cols-3 overflow-hidden">
                      <div className="col-span-1 bg-blue-300 flex justify-center py-4">
                        <div className="w-12 h-12 bg-white rounded-full"></div>
                      </div>
                      <div className="col-span-2 bg-white px-2 py-4 space-y-3">
                        <div className="rounded-full w-full h-2 bg-gray-100"></div>
                        <div className="rounded-full w-3/4 h-2 bg-gray-100"></div>
                        <div className="rounded-full w-1/2 h-2 bg-gray-100"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-16 rounded-lg"></div>
                <div className="w-6 h-full"></div>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col space-y-12">
            {t('landing.features', { returnObjects: true }).map(
              (feature, index) => (
                <div className="w-3/4">
                  <h4 className="text-2xl font-bold mb-2 font-serif tracking-tight">
                    {feature.heading}
                  </h4>
                  <p className=" text-gray-600">{feature.text}</p>
                </div>
              )
            )}
          </div>
        </section> */}
        {/* <section className="min-h-screen flex flex-col justify-center items-center gap-12">
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold font-serif tracking-tight mb-2">
              Resume Templates for Every Career Path.
            </h3>
            <span className="inline-block bg-blue-600 w-24 h-2 rounded-full"></span>
          </div>
          <section className="flex justify-center items-center gap-6">
            <div className="hover:shadow-2xl border transition rounded-xl overflow-hidden w-48 h-64">
              <img
                src={
                  process.env.PUBLIC_URL + '/assets/images/templates/cartoon1.jpg'
                }
                className="object-cover w-full h-full"
              />
            </div>
            <div className="hover:shadow-2xl border transition rounded-xl overflow-hidden w-52 h-72">
              <img
                src={
                  process.env.PUBLIC_URL + '/assets/images/templates/cartoon2.jpg'
                }
                className="object-cover w-full h-full"
              />
            </div>
            <div className="hover:shadow-2xl border transition rounded-xl overflow-hidden w-60 h-80">
              <img
                src={
                  process.env.PUBLIC_URL + '/assets/images/templates/cartoon1.jpg'
                }
                className="object-cover w-full h-full"
              />
            </div>
            <div className="hover:shadow-2xl border transition rounded-xl overflow-hidden w-52 h-72">
              <img
                src={
                  process.env.PUBLIC_URL + '/assets/images/templates/cartoon2.jpg'
                }
                className="object-cover w-full h-full"
              />
            </div>
            <div className="hover:shadow-2xl border transition rounded-xl overflow-hidden w-48 h-64">
              <img
                src={
                  process.env.PUBLIC_URL + '/assets/images/templates/cartoon1.jpg'
                }
                className="object-cover w-full h-full"
              />
            </div>
          </section>
          <button className="hover:shadow-xl transition bg-blue-600 text-lg font-medium rounded-xl text-white px-6 py-3">
            {t('landing.buttons.createCV')}
          </button>
        </section>
        <section className="min-h-screen container w-4/5 mx-auto flex flex-col justify-center items-center">
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold font-serif tracking-tight mb-2">
              Build Your Resume Fast and Easy.
            </h3>
            <span className="inline-block bg-blue-600 w-24 h-2 rounded-full"></span>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {t('landing.steps', { returnObjects: true }).map((step, index) => (
              <div className="flex flex-col items-center space-y-4">
                <span className="w-12 h-12 rounded-xl bg-blue-600 text-white text-xl flex justify-center items-center">
                  <StepIcon icon={stepsIcon[index]} />
                </span>
                <h4 className="text-3xl font-bold">{step.heading}</h4>
                <p className="text-gray-600 text-center text-lg">{step.text}</p>
              </div>
            ))}
          </div>
        </section> */}
      </main>
      {/* <Footer /> */}
    </>
  )
}

function StepIcon({ icon: Icon }) {
  return <Icon size="24" />
}

export default Home
