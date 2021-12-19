import { useDispatch, useSelector } from '../../contexts/ResumeContext.js'
import InlineToolbarEditor from '../../components/InlineToolbarEditor'
import { ItemWrapper } from '../../components/ItemWrapper.js'
import BlockWrapper from '../../components/BlockWrapper.js'

function Awards({ path, style, className, headingStyle, headingClassName }) {
  const stateValue = useSelector(path)
  const visible = useSelector(`metadata.sections.${path}.visible`)

  return (
    <>
      {visible && (
        <div style={style} className={className}>
          <BlockWrapper
            path={path}
            headingStyle={headingStyle}
            headingClassName={headingClassName}
          >
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
          </BlockWrapper>
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
          {detailsValue.date.visible && (
            <InlineToolbarEditor path={`${path}[${index}].date`} />
          )}
        </div>
        {detailsValue.title.visible && (
          <InlineToolbarEditor
            path={`${path}[${index}].title`}
            className="text-lg"
          />
        )}
        {detailsValue.summary.visible && (
          <InlineToolbarEditor
            path={`${path}[${index}].summary`}
            className="text-sm mb-4"
          />
        )}
      </div>
    </div>
  )
}

export default Awards
