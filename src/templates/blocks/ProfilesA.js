import { HiPlus, HiX } from 'react-icons/hi'
import Select from 'react-select'
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsLinkedin,
  BsGlobe,
} from 'react-icons/bs'
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md'
import React, { useContext, useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from '../../contexts/ResumeContext.js'
import { ResumeContext } from '../../contexts/ResumeContext'
import InlineToolbarEditor from '../../components/InlineToolbarEditor'
import ItemWrapper from '../../components/ItemWrapper.js'

const options = [
  { value: 'Instagram', label: <BsInstagram /> },
  { value: 'Facebook', label: <BsFacebook /> },
  { value: 'Github', label: <BsGithub /> },
  { value: 'Twitter', label: <BsTwitter /> },
  { value: 'Linkedin', label: <BsLinkedin /> },
  { value: 'Website', label: <BsGlobe /> },
]

function ProfileA({ path }) {
  const dispatch = useDispatch()
  const networkValue = useSelector(`${path}.network`)
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
        path: `${path}.network`,
        value: selectedOption.value,
      },
    })
  }

  return (
    <div className="flex items-start">
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
      <div className="flex-1 min-w-0">
        <InlineToolbarEditor path={`${path}.username`} />
      </div>
    </div>
  )
}

function ProfilesA({ path }) {
  const dispatch = useDispatch()
  const stateValue = useSelector(path, '')
  const [show, setShow] = useState(true)

  const duplicateItem = (index) => {
    dispatch({ type: 'on_duplicate_item', payload: { path, index } })
  }

  const removeItem = (index) => {
    dispatch({ type: 'on_delete_item', payload: { path, index } })
  }

  const moveItemUp = (index) => {
    dispatch({ type: 'on_move_item_up', payload: { path, index } })
  }

  const moveItemDown = (index) => {
    dispatch({ type: 'on_move_item_down', payload: { path, index } })
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result
    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
    dispatch({
      type: 'on_move_item',
      payload: {
        path,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      },
    })
  }

  console.log(`metadata.sections.${path}.heading`)

  return (
    <>
      {show && (
        <section className="">
          <h3 className="text-2xl font-semibold mb-4 z-10">
            <InlineToolbarEditor
              toolbar={false}
              path={`metadata.sections.${path}.heading`}
            />
          </h3>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={path}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-4"
                >
                  {stateValue.length == 0 && (
                    <div className="flex flex-col items-center">
                      <HiPlus className="text-4xl" />
                      <div>
                        <span>Add or </span>
                        <span onClick={() => setShow(false)}>Hide section</span>
                      </div>
                    </div>
                  )}

                  {stateValue.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="hover:bg-gray-100 group relative top-auto left-auto"
                        >
                          <ItemWrapper path={path} index={index} />
                          <ProfileA path={`${path}[${index}]`} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </section>
      )}
    </>
  )
}

export default ProfilesA
