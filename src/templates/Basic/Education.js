import InlineToolbarEditor from '../../components/InlineToolbarEditor'
import { ItemWrapper } from '../../components/ItemWrapper.js'
import SectionWrapper from '../../components/SectionWrapper.js'
import { useDispatch, useSelector } from '../../contexts/ResumeContext.js'

function Education({ path, style, className }) {
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

function Details({ path, index }) {
  const detailsValue = useSelector(`metadata.sections.${path}.details`)
  const colors = useSelector('metadata.colors')

  return (
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
      {detailsValue.institution.visible && (
        <InlineToolbarEditor
          path={`${path}[${index}].institution`}
          className="text-lg"
        />
      )}
      {detailsValue.area.visible && (
        <InlineToolbarEditor
          path={`${path}[${index}].area`}
          className="text-sm mb-4"
        />
      )}
    </div>
  )
}

export default Education
