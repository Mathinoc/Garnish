import React from 'react'

export default function Instruction({instruction}) {
  return (
    <div className='instruction'>
      <h6>Step {instruction.number}</h6>
      <p>{instruction.step}</p>
    </div>
  )
}
