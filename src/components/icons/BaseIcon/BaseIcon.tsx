import React from 'react'
import IBaseProps from '../IBaseProps'

interface IProps extends IBaseProps {
  title: string
  pathD?: string
  width?: string
  viewBox?: string
}

const BaseIcon: React.FC<IProps> = ({
  title,
  pathD,
  children,
  className,
  height = '32',
  width = height,
  viewBox = '0 0 32 32',
  fill = 'inherit',
}) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={width}
    height={height}
    viewBox={viewBox}
  >
    <title>{title}</title>
    {pathD && <path fill={fill} d={pathD} />}
    {children}
  </svg>
)

export default BaseIcon
