import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Content from './components/Content'
import Home from './components/Home'
import NewResume from './components/NewResume'
import ResumeList from './components/ResumeList'
import ResumeListDeleted from './components/ResumeListDeleted'
import useDarkMode from './hooks/useDarkMode'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode] = useDarkMode()
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/editor">
          <Route path=":resumeId" element={<Content />} />
          <Route path="create" element={<NewResume />} />
          <Route path="trash" element={<ResumeListDeleted />} />
          <Route index element={<ResumeList />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        toastClassName="rounded-lg"
        hideProgressBar={true}
        theme={darkMode ? 'dark' : 'light'}
      />
    </>
  )
}

export default App
