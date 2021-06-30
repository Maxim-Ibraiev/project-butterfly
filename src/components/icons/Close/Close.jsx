export default function Close({ fill, ...props }) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <title>x</title>
      <path
        fill={fill || '#fff'}
        d="M30 24.398l-8.406-8.398 8.406-8.398-5.602-5.602-8.398 8.402-8.402-8.402-5.598 5.602 8.398 8.398-8.398 8.398 5.598 5.602 8.402-8.402 8.398 8.402z"
      />
    </svg>
  )
}
