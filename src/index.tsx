import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './scss/styles.scss'

import { Input } from './components/input'

import { walk, turnHorizontal, turnVertical, start } from './turtle'
import { drawBox } from '../models/box'
import { drawDragonCurve } from '../models/dragonCurve'
import { drawHilbertCurve, drawHilbertBox } from '../models/hilbert'
import { drawSierpinskiTriangle } from '../models/sierpinski'

ReactDOM.render(<Input/>, document.getElementById('inputComponent'))

//drawHilbertBox(4)
