import { useContext } from 'react'
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

function Home() {
  const { t } = useTranslation()
  const { createResume } = useContext(ResumeListContext)
  return (
    <>
      <Navbar />
      <main className="overscroll-contain mx-auto flex-grow flex flex-col space-y-16">
        <section className="min-h-screen flex flex-col justify-center items-center text-center container space-y-6">
          <h1 className="text-gray-900 font-serif font-bold text-8xl capitalize dark:text-gray-100 tracking-tight">
            {t('landing.greeting')}
          </h1>
          <p className="text-xl dark:text-gray-300">
            - {t('landing.slogan')} -
          </p>
          <button
            onClick={createResume}
            className="hover:shadow-xl transition bg-blue-500 text-lg font-medium rounded-xl text-white px-6 py-3"
          >
            {t('dashboard.createResume')}
          </button>
        </section>
        <section className="min-h-screen justify-center items-center container flex gap-12">
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
                  <p className="text-sm">localhost:300</p>
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
        </section>
        <section className="min-h-screen flex flex-col justify-center items-center gap-12">
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
                  process.env.PUBLIC_URL + '/assets/img/templates/cartoon1.jpg'
                }
                className="object-cover w-full h-full"
              />
            </div>
            <div className="hover:shadow-2xl border transition rounded-xl overflow-hidden w-52 h-72">
              <img
                src={
                  process.env.PUBLIC_URL + '/assets/img/templates/cartoon2.jpg'
                }
                className="object-cover w-full h-full"
              />
            </div>
            <div className="hover:shadow-2xl border transition rounded-xl overflow-hidden w-60 h-80">
              <img
                src={
                  process.env.PUBLIC_URL + '/assets/img/templates/cartoon1.jpg'
                }
                className="object-cover w-full h-full"
              />
            </div>
            <div className="hover:shadow-2xl border transition rounded-xl overflow-hidden w-52 h-72">
              <img
                src={
                  process.env.PUBLIC_URL + '/assets/img/templates/cartoon2.jpg'
                }
                className="object-cover w-full h-full"
              />
            </div>
            <div className="hover:shadow-2xl border transition rounded-xl overflow-hidden w-48 h-64">
              <img
                src={
                  process.env.PUBLIC_URL + '/assets/img/templates/cartoon1.jpg'
                }
                className="object-cover w-full h-full"
              />
            </div>
          </section>
          <button className="h-12 w-60 bg-blue-600 text-white shadow-xl rounded-xl">
            {t('landing.buttons.viewMore')}
          </button>
        </section>
        <section className="min-h-screen container w-4/5 mx-auto flex flex-col justify-center items-center">
          {/* <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold font-serif tracking-tight mb-2">
              Build Your Resume Fast and Easy.
            </h3>
            <span className="inline-block bg-blue-600 w-24 h-2 rounded-full"></span>
          </div> */}
          <div className="grid grid-cols-2 gap-8">
            {t('landing.steps', { returnObjects: true }).map((step, index) => (
              <div className="flex flex-col items-center space-y-4">
                <span className="w-12 h-12 rounded-xl bg-blue-500 text-white text-xl flex justify-center items-center">
                  <StepIcon icon={stepsIcon[index]} />
                </span>
                <h4 className="text-3xl font-bold">{step.heading}</h4>
                <p className="text-gray-600 text-center text-lg">{step.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function StepIcon({ icon: Icon }) {
  return <Icon size="24" />
}

export default Home
