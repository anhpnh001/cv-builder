import { useDispatch, useSelector } from '../../contexts/ResumeContext.js'
import InlineToolbarEditor from '../../components/InlineToolbarEditor'
import { ItemWrapper } from '../../components/ItemWrapper.js'
import BlockWrapper from '../../components/BlockWrapper.js'

function Languages({ path, style, className }) {
  const stateValue = useSelector(path)
  const visible = useSelector(`metadata.sections.${path}.visible`)

  return (
    <>
      {visible && (
        <div style={style} className={className}>
          <BlockWrapper path={path} className="space-y-2">
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
    <div className="flex flex-wrap gap-1">
      {detailsValue.language.visible && (
        <InlineToolbarEditor
          path={`${path}.${index}.language`}
          className="font-semibold"
        />
      )}
      {detailsValue.fluency.visible && (
        <>
          <span>-</span>
          <InlineToolbarEditor path={`${path}.${index}.fluency`} />
        </>
      )}
    </div>
  )
}

export default Languages
