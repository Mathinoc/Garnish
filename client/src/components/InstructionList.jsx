import React from 'react';
import Instruction from './Instruction';

export default function InstructionList({instructions}) {
  return (
    <div className='instructions-container'>
      {instructions.map(instruction => {
        return (
          <Instruction instruction={instruction} key={instruction.number}/>
        )
      })}
    </div>
  )
}
