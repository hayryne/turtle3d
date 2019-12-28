import * as React from 'react'
import { useState } from 'react'
import Select from 'react-select'

import { models } from '../models'
import { reset } from '../turtle'

export const PresetsSelect = () => {
  const [selectedOption, setValue] = useState()

  const options = models.map(({ name, method }) => ({ label: name, value: method}))

  const drawModel = model => {
    reset()
    model.value()
  }

  return <Select
    className='presetsSelect'
    placeholder='Select a preset...'
    value={ selectedOption}
    onChange={ drawModel }
    options={options}
  />
}
