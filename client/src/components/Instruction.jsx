import React from 'react'

export default function Instruction({instruction}) {
  return (
    <div className='instruction'>
      <h3>Step {instruction.number}</h3>
      <p>{instruction.step}</p>
    </div>
  )
}
