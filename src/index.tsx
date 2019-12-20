import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Input } from './components/input'

import { walk, turnHorizontal, turnVertical, start } from './turtle'
import { drawBox } from '../models/box'
import { drawDragonCurve } from '../models/dragonCurve'
import { drawHilbertCurve, drawHilbertBox } from '../models/hilbert'
import { drawSierpinskiTriangle } from '../models/sierpinski'
import { drawSierpinskiPyramid } from '../models/sierpinskiPyramid'

ReactDOM.render(<Input/>, document.getElementById('inputArea'))

drawHilbertBox(4)
