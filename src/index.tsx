import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Input } from './components/input'

import { walk, turnHorizontal, turnVertical, start } from './turtle'
import { drawBox } from '../models/box'
import { drawDragonCurve } from '../models/dragonCurve'

ReactDOM.render(<Input/>, document.getElementById('inputArea'))

drawBox()
// drawDragonCurve(15)
