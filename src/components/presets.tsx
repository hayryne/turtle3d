import * as React from 'react'
import { useState } from 'react'
import Select from 'react-select'

import { models } from '../models'

export const PresetsSelect = () => {
  const [selectedOption, setValue] = useState()

  const options = models.map(({ name, method }) => ({ label: name, value: method}))

  return <Select
    className='presetsSelect'
    value={ selectedOption}
    onChange={ x => x.value() }
    options={options}
  />
}
