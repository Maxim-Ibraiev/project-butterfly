import React from 'react'

interface IProps {
  title: string
  pathD: string
  fill?: string
  width?: string
  height?: string
  viewBox?: string
}

export default function BaseIcon({
  title,
  pathD,
  width = '32',
  height = '32',
  viewBox = '0 0 32 32',
  fill = 'inherit',
  ...props
}: IProps) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <title>{title}</title>
      <path fill={fill} d={pathD} />
    </svg>
  )
}
