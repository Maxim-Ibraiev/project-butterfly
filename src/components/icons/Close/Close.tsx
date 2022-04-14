import BaseIcon from '../BaseIcon'
import IBaseProps from '../IBaseProps'

export default function Close({ height, className }: IBaseProps) {
  return (
    <BaseIcon
      height={height}
      className={className}
      title="Close"
      pathD="M30 24.398l-8.406-8.398 8.406-8.398-5.602-5.602-8.398 8.402-8.402-8.402-5.598 5.602 8.398 8.398-8.398 8.398 5.598 5.602 8.402-8.402 8.398 8.402z"
    />
  )
}
