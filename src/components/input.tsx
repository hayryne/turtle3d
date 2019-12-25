import * as React from 'react'
import { useState } from 'react'
import { start } from '../turtle'
import { parseAndEval } from '../utils/parser'

export const Input = () => {
  const [value, setValue] = useState('')

  start()

  return <div>
      <textarea id='inputArea' onChange={ e => setValue(e.target.value) }></textarea>
      <div id ='buttons'>
        <button onClick={ e => parseAndEval(value) }>start</button>
        <button>reset</button>
      </div>
    </div>
}
