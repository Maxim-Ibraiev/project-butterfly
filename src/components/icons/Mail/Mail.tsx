import React from 'react'
import BaseIcon from '../BaseIcon'
import IBaseProps from '../IBaseProps'

export default function Mail(props: IBaseProps) {
  return (
    <BaseIcon
      title="mail"
      viewBox="0 0 479.916 479.916"
      pathD="M12.5,408.458h454.916c6.903,0,12.5-5.596,12.5-12.5V144.772v-7.855V83.958c0-6.904-5.597-12.5-12.5-12.5H12.5   c-6.903,0-12.5,5.596-12.5,12.5v52.959v7.855v251.186C0,402.862,5.597,408.458,12.5,408.458z M454.916,383.458H25V157.062   l209.408,103.773c3.496,1.732,7.604,1.732,11.1,0l209.408-103.773V383.458z M454.916,96.458v32.703L239.958,235.684L25,129.161   V96.458H454.916z"
      {...props}
    />
  )
}
