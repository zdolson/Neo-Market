export const Stylesheet = (props) => (
  <style dangerouslySetInnerHTML={{__html: props.sheet}} />
)
