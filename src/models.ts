import { drawBox } from '../models/box'
import { drawPyramid } from '../models/pyramids'
import { drawDragonCurve } from '../models/dragonCurve'
import { drawHilbertCurve, drawHilbertBox } from '../models/hilbert'
import { drawSierpinskiTriangle } from '../models/sierpinski'

const models = [
  { name: 'Box', method: drawBox },
  { name: 'Tetrahedron', method: drawPyramid },
  { name: 'Dragon curve', method: x => drawDragonCurve(5) },
  { name: 'Hilbert curve', method: x => drawHilbertCurve(5) },
  { name: 'Hilbert box', method: x => drawHilbertBox(4) },
  { name: 'Sierpinski triangle', method: x => drawSierpinskiTriangle(4) },
]

export { models }
