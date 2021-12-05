import { useEffect, useState } from 'react'
import {
  BsFacebook,
  BsGithub,
  BsGlobe,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from 'react-icons/bs'
import Select from 'react-select'
import InlineToolbarEditor from '../../components/InlineToolbarEditor'
import { ItemWrapper } from '../../components/ItemWrapper.js'
import SectionWrapper from '../../components/SectionWrapper.js'
import { useDispatch, useSelector } from '../../contexts/ResumeContext.js'

const options = [
  { value: 'Instagram', label: <BsInstagram /> },
  { value: 'Facebook', label: <BsFacebook /> },
  { value: 'Github', label: <BsGithub /> },
  { value: 'Twitter', label: <BsTwitter /> },
  { value: 'Linkedin', label: <BsLinkedin /> },
  { value: 'Website', label: <BsGlobe /> },
]

function Profiles({ path, style, className }) {
  const stateValue = useSelector(path)
  const visible = useSelector(`metadata.sections.${path}.visible`)

  return (
    <>
      {visible && (
        <div style={style} className={className}>
          <SectionWrapper path={path}>
            {stateValue.map((item, index) => (
              <ItemWrapper
                key={index}
                path={path}
                item={item}
                index={index}
                single={stateValue.length === 1}
              >
                <Details path={path} item={item} index={index} />
              </ItemWrapper>
            ))}
          </SectionWrapper>
        </div>
      )}
    </>
  )
}

function Details({ path, item, index }) {
  const dispatch = useDispatch()
  const detailsValue = useSelector(`metadata.sections.${path}.details`)
  const colors = useSelector('metadata.colors')
  const networkValue = useSelector(`${path}[${index}].network`)
  const [selectedOption, setSelectedOption] = useState({
    value: 'Website',
    label: <BsGlobe />,
  })

  useEffect(() => {
    setSelectedOption(() =>
      options.find((option) => option.value === networkValue)
    )
  }, [networkValue])

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption)
    dispatch({
      type: 'on_input',
      payload: {
        path: `${path}[${index}].network`,
        value: selectedOption.value,
      },
    })
  }

  return (
    <div className="flex">
      {detailsValue.network.visible && (
        <Select
          value={selectedOption}
          onChange={handleChange}
          styles={{
            menu: (provided, state) => ({
              ...provided,
              overflow: 'hidden',
              zIndex: 20,
            }),
            menuList: (provided, state) => ({
              ...provided,
              padding: 0,
            }),
            option: (provided, state) => ({
              ...provided,
              display: 'flex',
              justifyContent: 'center',
              padding: '6px 0',
            }),
            control: (base) => ({}),
          }}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          isSearchable={false}
          options={options}
        />
      )}
      {detailsValue.username.visible && (
        <InlineToolbarEditor
          path={`${path}[${index}].username`}
          className="flex-1 min-w-0"
        />
      )}
    </div>
  )
}

export default Profiles
