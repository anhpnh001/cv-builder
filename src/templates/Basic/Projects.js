import { useDispatch, useSelector } from '../../contexts/ResumeContext.js'
import InlineToolbarEditor from '../../components/InlineToolbarEditor'
import { ItemWrapper } from '../../components/ItemWrapper.js'
import SectionWrapper from '../../components/SectionWrapper.js'

function Projects({ path, style, className }) {
  const dispatch = useDispatch()
  const stateValue = useSelector(path)
  const colors = useSelector('metadata.colors')
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
  const detailsValue = useSelector(`metadata.sections.${path}.details`)
  const colors = useSelector('metadata.colors')

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center z-10">
        <span
          style={{ borderColor: colors.primary }}
          className="bg-transparent w-5 h-5 rounded-full border-4 inline-block"
        ></span>
        <span
          style={{ backgroundColor: colors.primary }}
          className="flex-grow w-1 inline-block"
        ></span>
      </div>
      <div className="flex-1 min-w-0">
        <div
          style={{ color: colors.primary }}
          className="w-full flex flex-wrap text-sm"
        >
          {detailsValue.startDate.visible && (
            <InlineToolbarEditor path={`${path}[${index}].startDate`} />
          )}
          {detailsValue.endDate.visible && (
            <>
              <span> - </span>
              <InlineToolbarEditor path={`${path}[${index}].endDate`} />
            </>
          )}
        </div>
        {detailsValue.name.visible && (
          <InlineToolbarEditor
            path={`${path}[${index}].name`}
            className="text-lg"
          />
        )}
        {detailsValue.description.visible && (
          <InlineToolbarEditor
            path={`${path}[${index}].description`}
            className="text-sm mb-4"
          />
        )}
      </div>
    </div>
  )
}

export default Projects
