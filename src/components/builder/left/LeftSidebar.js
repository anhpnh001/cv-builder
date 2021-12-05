import i18next from 'i18next'
import { useEffect, useState } from 'react'
import { SketchPicker } from 'react-color'
import { useTranslation } from 'react-i18next'
import { HiDownload, HiOutlineChevronLeft } from 'react-icons/hi'
import { IoWarning } from 'react-icons/io5'
import { Element } from 'react-scroll'
import Select from 'react-select'
import { useDispatch, useSelector } from '../../../contexts/ResumeContext'
import fontOptions from '../../../data/fontOptions'
import templateOptions from '../../../data/templateOptions'
import { languages } from '../../../i18n'

function Heading({ path }) {
  const { t } = useTranslation()
  return (
    <div className="flex items-center space-x-2 mb-4">
      <h4 className="font-semibold text-xl">{t(`builder.sections.${path}`)}</h4>
      <div className="flex-grow h-0.5 border-t border-gray-100"></div>
    </div>
  )
}

function Layout() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const layout = useSelector('metadata.sections')

  return (
    <div>
      <Heading path="layout" />
      <div className="space-y-2">
        {Object.keys(layout).map((key) => {
          return (
            <div className="space-x-2 flex items-center">
              <input
                id={key}
                type="checkbox"
                name={key}
                checked={layout[key].visible}
                onChange={(e) => {
                  dispatch({
                    type: 'on_input',
                    payload: {
                      path: `metadata.sections.${key}.visible`,
                      value: !layout[key].visible,
                    },
                  })
                }}
              />
              <label
                htmlFor={key}
                className="flex-grow capitalize text-s cursor-pointer"
              >
                {t(`builder.sections.${key}`)}
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Templates() {
  const dispatch = useDispatch()

  const handleChange = (name, thumbnail) => {
    dispatch({
      type: 'on_input',
      payload: {
        path: 'metadata.template',
        value: name,
      },
    })
    dispatch({
      type: 'on_input',
      payload: {
        path: 'metadata.thumbnail',
        value: thumbnail,
      },
    })
  }
  return (
    <div data-tut="second-step">
      <Heading path="templates" />
      <div className="grid grid-cols-2 gap-4">
        {templateOptions.map(({ name, thumbnail }) => (
          <div>
            <div
              key={name}
              onClick={() => handleChange(name, thumbnail)}
              className="rounded-lg overflow-hidden cursor-pointer mb-2 border"
            >
              <img
                src={process.env.PUBLIC_URL + thumbnail}
                alt={name}
                className="object-cover"
              />
            </div>
            <p className="text-center text-sm font-medium">{name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Fonts() {
  const dispatch = useDispatch()
  const font = useSelector('metadata.font')

  const options = fontOptions.map((font) => ({ label: font, value: font }))

  const handleChange = (option) => {
    dispatch({
      type: 'on_input',
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
      type: 'on_input',
      payload: {
        path: `metadata.colors.${path}`,
        value: color.hex,
      },
    })
  }

  return (
    <div>
      <h4 className="mb-1">{t(`builder.colors.${path}`)}</h4>
      <div className="relative cursor-pointer">
        <div
          onMouseDown={() => setShowColorPicker(!showColorPicker)}
          className="border flex items-center h-10 rounded-lg"
        >
          <div className=" h-full flex items-center px-4">
            <div
              style={{ backgroundColor: color }}
              className="w-5 h-5 border rounded-full"
            ></div>
          </div>
          <div className="">{color}</div>
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
          onClick={handleReset}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium py-3 px-4 rounded-lg flex space-x-2 items-center justify-center"
        >
          <IoWarning size="18" />
          <span>{t(`builder.actions.resetEverything.button`)}</span>
        </button>
      </div>
    </div>
  )
}

function LeftSidebar({ onExportPDF }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const name = useSelector('metadata.name')

  const handleChangeName = (value) => {
    dispatch({
      type: 'on_input',
      payload: {
        path: 'metadata.name',
        value,
      },
    })
  }
  return (
    <section className="flex flex-col rounded-3xl border-l w-80 h-full px-4">
      <div className="flex-none h-20 space-x-4 border-b flex items-center">
        <button className="flex-none bg-gray-200 w-9 h-9 rounded-xl flex justify-center items-center">
          <HiOutlineChevronLeft size="18" className="text-gray-500" />
        </button>
        <span className="flex-grow text-xl font-medium" data-tut="first-step">
          <input
            type="text"
            value={name}
            onChange={(e) => handleChangeName(e.target.value)}
            className="bg-transparent w-full outline-none"
          />
        </span>
      </div>
      <div
        className="flex-grow h-full px-2 py-4 space-y-4 overflow-y-auto scrollbar-none"
        id="containerElement"
      >
        <button
          data-tut="fourth-step"
          onClick={onExportPDF}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium py-3 px-4 rounded-lg flex space-x-2 items-center justify-center"
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
