import React from 'react'

interface IProps {
  title: string
  pathD?: string
  fill?: string
  width?: string
  height?: string
  viewBox?: string
}

const BaseIcon: React.FC<IProps> = ({
  title,
  pathD,
  children,
  height = '32',
  width = height || '32',
  viewBox = '0 0 32 32',
  fill = 'inherit',
}) => (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox}>
    <title>{title}</title>
    {pathD && <path fill={fill} d={pathD} />}
    {children}
  </svg>
)

export default BaseIcon
