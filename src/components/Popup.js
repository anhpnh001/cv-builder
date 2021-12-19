import React from 'react'

function Popup({ show, onShowPopup, children }) {
  return (
    <>
      {show && (
        <section className="fixed inset-0 bg-slate-500 bg-opacity-50 z-50">
          <div
            onClick={() => onShowPopup(false)}
            className="w-full h-full cursor-pointer"
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-lg">
            {children}
          </div>
        </section>
      )}
    </>
  )
}

export default Popup
