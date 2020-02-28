import * as React from 'react'
import { useState } from 'react'
import { TwitterPicker } from 'react-color'

import { PresetsSelect } from './presets'

import { start, reset, setLineColor } from '../turtle'
import { parseAndEval } from '../utils/parser'

export const Input = () => {
  const [value, setValue] = useState('')

  const [colorPickerOpen, setcolorPickerOpen] = useState(false)
  const [color, setColor] = useState({ rgb: {r: 150, g: 150, b: 250 }})

  const rgbToCss = ({ rgb }) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`

  setLineColor(color.rgb)

  return <div className='container pt-2'>
    <div className='row mt-1'>
      <div className='col'>
        <PresetsSelect />
      </div>
    </div>
    <div className='row mt-1'>
      <div className='col'>
      <a className='btn-block rounded'
          style={{ backgroundColor: rgbToCss(color), height: '25px' }}
          onClick={ e => { setcolorPickerOpen(!colorPickerOpen) }}
        >
        </a>
        { colorPickerOpen && <TwitterPicker onChange={ setColor }/> }
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
          onClick={ e => Function(value + '\n start()')() }
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
