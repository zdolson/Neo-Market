export const Stylesheet = (props) => (
  <style dangerouslySetInnerHTML={{__html: props.sheet}} />
)

export const Svg = (props) => (
  <div dangerouslySetInnerHTML={{__html: props.svg}} />
)
