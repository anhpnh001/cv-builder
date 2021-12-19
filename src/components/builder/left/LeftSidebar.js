import i18next, { t } from 'i18next'
import { useEffect, useState } from 'react'
import { SketchPicker } from 'react-color'
import { useTranslation } from 'react-i18next'
import { HiDownload } from 'react-icons/hi'
import { IoWarning } from 'react-icons/io5'
import { BiLayout } from 'react-icons/bi'
import { Element } from 'react-scroll'
import Select from 'react-select'
import { useDispatch, useSelector } from '../../../contexts/ResumeContext'
import fontOptions from '../../../data/fontOptions'
import templateOptions from '../../../data/templateOptions'
import { languages } from '../../../i18n'
import { DragDropContext } from 'react-beautiful-dnd'
import LayoutWrapper from '../../LayoutWrapper'
import { Draggable } from 'react-beautiful-dnd'
import { Droppable } from 'react-beautiful-dnd'
import Checkbox from 'rc-checkbox'
import Popup from '../../Popup'

function Heading({ path }) {
  const { t } = useTranslation()
  return (
    <div className="flex items-center space-x-2 mb-4">
      <h4 className="dark:text-slate-100 text-gray-800 font-semibold text-xl">
        {t(`builder.sections.${path}`)}
      </h4>
      <div className="dark:border-gray-700 flex-grow h-0.5 border-t border-slate-100"></div>
    </div>
  )
}

function Layout() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const sections = useSelector('metadata.sections')
  const layout = useSelector('metadata.layout')

  return (
    <div>
      <Heading path="layout" />
      <LayoutWrapper>
        <div className="dark:border-gray-700 flex gap-3 border border-slate-100 p-4 rounded-lg">
          {layout.map((column, index) => (
            <Droppable droppableId={`${index}`}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 space-y-3"
                >
                  {column.map((section, sectionIndex) => (
                    <Draggable
                      key={section}
                      draggableId={section}
                      index={sectionIndex}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="relative top-auto left-auto"
                        >
                          <div className="dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-slate-200 bg-slate-100 space-x-2 flex items-start px-2 py-1 rounded-lg overflow-hidden">
                            <Checkbox
                              id={section}
                              checked={sections[section].visible}
                              onChange={(e) => {
                                dispatch({
                                  type: 'on_change',
                                  payload: {
                                    path: `metadata.sections.${section}.visible`,
                                    value: !sections[section].visible,
                                  },
                                })
                              }}
                            />
                            <label
                              htmlFor={section}
                              className="flex-1 capitalize cursor-pointer"
                            >
                              {t(`builder.sections.${section}`)}
                            </label>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </LayoutWrapper>
    </div>
  )
}

function Templates() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [template, setTemplate] = useState()
  const [showPopup, setShowPopup] = useState(false)

  const handleChange = (isChangeColors) => {
    const { name, thumbnail, colors, layout } = template

    dispatch({
      type: 'on_change',
      payload: {
        path: 'metadata.template',
        value: name,
      },
    })
    dispatch({
      type: 'on_change',
      payload: {
        path: 'metadata.thumbnail',
        value: thumbnail,
      },
    })
    dispatch({
      type: 'on_change',
      payload: {
        path: 'metadata.layout',
        value: layout,
      },
    })

    if (isChangeColors) {
      dispatch({
        type: 'on_change',
        payload: {
          path: 'metadata.colors',
          value: colors,
        },
      })
    }
    setShowPopup(false)
  }

  const handleShowPopup = (template) => {
    setTemplate(template)
    setShowPopup(true)
  }

  return (
    <div data-tut="second-step">
      <Heading path="templates" />
      <div className="grid grid-cols-2 gap-4">
        {templateOptions.map((template) => (
          <div>
            <div
              key={template.name}
              onClick={() => handleShowPopup(template)}
              className="dark:border-gray-700 rounded-lg overflow-hidden cursor-pointer mb-2 border border-slate-100"
            >
              <img
                src={process.env.PUBLIC_URL + template.thumbnail}
                alt={template.name}
                className="object-cover"
              />
            </div>
            <p className="dark:text-slate-100 text-gray-800 text-center text-sm font-medium">
              {template.name}
            </p>
          </div>
        ))}
      </div>
      <Popup show={showPopup} onShowPopup={setShowPopup}>
        <div className="space-y-6 w-96">
          <h6 className="text-lg font-bold">
            {t('modals.changeTemplate.heading')}
          </h6>
          <p className="text-sm text-slate-500">
            {t('modals.changeTemplate.text')}
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => handleChange(true)}
              className="bg-slate-100 text-slate-500 text-sm font-semibold flex-1 py-2 rounded-lg"
            >
              {t('modals.changeTemplate.buttons.change')}
            </button>
            <button
              onClick={() => handleChange(false)}
              className="bg-blue-600 text-white text-sm font-semibold flex-1 py-2 rounded-lg"
            >
              {t('modals.changeTemplate.buttons.keep')}
            </button>
          </div>
        </div>
      </Popup>
    </div>
  )
}

function Fonts() {
  const dispatch = useDispatch()
  const font = useSelector('metadata.font')

  const options = fontOptions.map((font) => ({ label: font, value: font }))

  const handleChange = (option) => {
    dispatch({
      type: 'on_change',
      payload: {
        path: 'metadata.font',
        value: option.value,
      },
    })
  }
  return (
    <div>
      <Heading path="fonts" />
      <Select
        menuPlacement="auto"
        value={options.find((option) => option.value === font)}
        options={options}
        onChange={handleChange}
      />
    </div>
  )
}

function Colors() {
  const colors = useSelector('metadata.colors')
  return (
    <div>
      <Heading path="colors" />
      <div className="space-y-3">
        {Object.keys(colors).map((key) => (
          <Color path={key} />
        ))}
      </div>
    </div>
  )
}

function Color({ path }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const color = useSelector(`metadata.colors.${path}`)
  const [showColorPicker, setShowColorPicker] = useState(false)

  const handleChange = (color) => {
    dispatch({
      type: 'on_change',
      payload: {
        path: `metadata.colors.${path}`,
        value: color.hex,
      },
    })
  }

  return (
    <div>
      <h4 className="dark:text-slate-100 text-gray-800 mb-1">
        {t(`builder.colors.${path}`)}
      </h4>
      <div className="relative cursor-pointer">
        <div
          onMouseDown={() => setShowColorPicker(!showColorPicker)}
          className="dark:border-gray-700 border border-slate-200 flex items-center h-10 rounded-lg"
        >
          <div className=" h-full flex items-center px-4">
            <div
              style={{ backgroundColor: color }}
              className="dark:border-gray-700 w-5 h-5 border border-slate-100 rounded-full"
            ></div>
          </div>
          <div className="dark:text-slate-100 text-gray-800">{color}</div>
        </div>
        {showColorPicker && (
          <div
            className="z-10 absolute top-full left-0 pt-2"
            onMouseLeave={() => setShowColorPicker(false)}
          >
            <SketchPicker
              presetColors={[
                '#ff6e6c',
                '#ffd803',
                '#4fc4cf',
                '#00ebc7',
                '#3da9fc',
              ]}
              color={color}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function Settings() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [showPopup, setShowPopup] = useState(false)
  const [language, setLanguage] = useState(() =>
    localStorage.getItem('language') ? localStorage.getItem('language') : 'en'
  )

  useEffect(() => {
    localStorage.setItem('language', language)
    i18next.changeLanguage(language)
  }, [language])

  const handleChangeLanguage = (selectedOption) => {
    setLanguage(selectedOption.value)
  }
  const options = languages.map((language) => {
    return { value: language.code, label: language.name }
  })

  const handleReset = () => {
    dispatch({
      type: 'reset_data',
    })
    setShowPopup(false)
  }

  return (
    <div>
      <Heading path="settings" />
      <div className="space-y-3">
        <Select
          menuPlacement="auto"
          onChange={handleChangeLanguage}
          value={options.find((x) => x.value === language)}
          options={options}
        />
        <button
          data-tut="fourth-step"
          onClick={() => setShowPopup(true)}
          className="dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-gray-800 w-full bg-gray-800 hover:bg-gray-900 text-slate-100 text-sm font-medium py-3 px-4 rounded-lg flex space-x-2 items-center justify-center"
        >
          <IoWarning size="18" />
          <span>{t(`builder.actions.resetEverything.button`)}</span>
        </button>
      </div>
      <Popup show={showPopup} onShowPopup={setShowPopup}>
        <div className="space-y-6 w-96">
          <h6 className="text-lg font-bold">
            {t('modals.resetEverything.heading')}
          </h6>
          <p className="text-sm text-slate-500">
            {t('modals.resetEverything.text')}
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleReset}
              className="bg-rose-600 text-white text-sm font-semibold flex-1 py-2 rounded-lg"
            >
              {t('modals.resetEverything.buttons.reset')}
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-slate-100 text-slate-500 text-sm font-semibold flex-1 py-2 rounded-lg"
            >
              {t('modals.resetEverything.buttons.cancel')}
            </button>
          </div>
        </div>
      </Popup>
    </div>
  )
}

function LeftSidebar({ onExportPDF }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const name = useSelector('metadata.name')

  const handleChangeName = (value) => {
    dispatch({
      type: 'on_change',
      payload: {
        path: 'metadata.name',
        value,
      },
    })
  }
  return (
    <section className="dark:border-gray-600 flex flex-col rounded-3xl border-l border-slate-200 w-96 h-full px-4">
      <div className="dark:border-gray-600 flex-none h-20 space-x-4 border-b border-slate-200 flex items-center">
        <div
          data-tut="first-step"
          className="dark:border-gray-600 flex items-center border border-slate-200 rounded-lg overflow-hidden"
        >
          <div className="dark:bg-gray-600 flex-none bg-slate-200 w-9 h-9 flex justify-center items-center">
            <BiLayout size="18" className="text-gray-500" />
          </div>
          <span className="dark:text-slate-100 text-gray-800 flex-grow text-lg font-medium">
            <input
              type="text"
              value={name}
              placeholder={t('builder.actions.setName')}
              onChange={(e) => handleChangeName(e.target.value)}
              className="px-4 bg-transparent w-full outline-none"
            />
          </span>
        </div>
      </div>
      <div
        className="flex-grow h-full px-2 py-4 space-y-4 overflow-y-auto scrollbar-none"
        id="containerElement"
      >
        <button
          data-tut="fourth-step"
          onClick={onExportPDF}
          className="dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-gray-800 w-full bg-gray-800 hover:bg-gray-900 text-slate-100 text-sm font-medium py-3 px-4 rounded-lg flex space-x-2 items-center justify-center"
        >
          <HiDownload size="18" />
          <span>{t(`builder.actions.export.button`)}</span>
        </button>
        {/* <button onClick={saveJSON}>Export JSON</button>
          <input type="file" onChange={importJSON} /> */}
        <Element name="templates">
          <Templates />
        </Element>
        <Element name="layout">
          <Layout />
        </Element>
        <Element name="colors">
          <Colors />
        </Element>
        <Element name="fonts">
          <Fonts />
        </Element>
        <Element name="settings">
          <Settings />
        </Element>
      </div>
    </section>
  )
}

export default LeftSidebar
