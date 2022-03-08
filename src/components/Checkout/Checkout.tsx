import React, { useState } from 'react'
import Input from '../inputs/Input'

export default function Checkout() {
  const [test, setTest] = useState<string>()
  return (
    <div>
      <Input label="test" value={test} onChange={({ target }) => setTest(target.value)} />
    </div>
  )
}
