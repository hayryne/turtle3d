import * as React from 'react'
import { useState } from 'react'

import { PresetsSelect } from './presets'

import { start, reset } from '../turtle'
import { parseAndEval } from '../utils/parser'

export const Input = () => {
  const [value, setValue] = useState('')

  start()

  return <div>
      <PresetsSelect />
      <textarea id='inputArea' className='rounded' onChange={ e => setValue(e.target.value) }></textarea>
      <div id ='buttons'>
        <button className='btn btn-success' onClick={ e => parseAndEval(value) }>start</button>
        <button className='btn btn-danger' onClick={ reset }>reset</button>
      </div>
    </div>
}
