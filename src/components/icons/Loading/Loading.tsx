import React from 'react'
import BaseIcon from '../BaseIcon'
import IBaseProps from '../IBaseProps'

export default function Loading({ className }: IBaseProps) {
  return (
    <BaseIcon title="Loading" viewBox="0 0 100 100" className={className}>
      <circle cx="18" cy="50" r="4" fill="#c5523f">
        <animate
          attributeName="cy"
          values="34;66;34"
          dur="1s"
          calcMode="spline"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="27" cy="61.31370849898476" r="4" fill="#f2b736">
        <animate
          attributeName="cy"
          values="34;66;34"
          dur="1s"
          calcMode="spline"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          begin="-0.125s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="36" cy="66" r="4" fill="#499255">
        <animate
          attributeName="cy"
          values="34;66;34"
          dur="1s"
          calcMode="spline"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          begin="-0.25s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="45" cy="61.31370849898476" r="4" fill="#1875e5">
        <animate
          attributeName="cy"
          values="34;66;34"
          dur="1s"
          calcMode="spline"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          begin="-0.375s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="54" cy="50" r="4" fill="#c5523f">
        <animate
          attributeName="cy"
          values="34;66;34"
          dur="1s"
          calcMode="spline"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          begin="-0.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="63" cy="38.68629150101524" r="4" fill="#f2b736">
        <animate
          attributeName="cy"
          values="34;66;34"
          dur="1s"
          calcMode="spline"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          begin="-0.625s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="72" cy="34" r="4" fill="#499255">
        <animate
          attributeName="cy"
          values="34;66;34"
          dur="1s"
          calcMode="spline"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          begin="-0.75s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="81" cy="38.68629150101523" r="4" fill="#1875e5">
        <animate
          attributeName="cy"
          values="34;66;34"
          dur="1s"
          calcMode="spline"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          begin="-0.875s"
          repeatCount="indefinite"
        />
      </circle>
    </BaseIcon>
  )
}
