import * as React from 'react'
import { useState } from 'react'

import { PresetsSelect } from './presets'

import { start, reset } from '../turtle'
import { parseAndEval } from '../utils/parser'

export const Input = () => {
  const [value, setValue] = useState('')

  start()

  return <div className='container pt-2'>
    <div className='row mt-1'>
      <div className='col'>
        <PresetsSelect />
      </div>
    </div>
    <div className='row mt-1'>
      <div className='col'>
        <textarea id='inputArea'
          className='rounded'
          onChange={ e => setValue(e.target.value) }
        />
      </div>
    </div>
    <div className='row mt-1'>
      <div className='col pr-1'>
        <button className='btn btn-block btn-success'
          onClick={ e => parseAndEval(value) }
        >
          start
        </button>
      </div>
      <div className='col pl-1'>
        <button className='btn btn-block btn-danger'
          onClick={ reset }
        >
          reset
        </button>
      </div>
    </div>
  </div>
}
