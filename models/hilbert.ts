import { walk, turnVertical, start, turnHorizontal } from '../src/turtle'

const hilbertCurve = (recursionDepth : number, horizontal = false) => {
  let s = 'A';

  for (let i = 0; i < recursionDepth; i++) {
    let arr = []

    s.split('').forEach(c => {
      if (c == 'A') arr.push('-BF+AFA+FB-');
      else if (c == 'B') arr.push('+AF-BFB-FA+');
      else arr.push(c);
    })

    s = arr.reduce((s, acc) => s + acc)
  }

  s.split('').forEach(c => {
    if (c == 'F') walk(8);
    if (c == '+') horizontal ? turnHorizontal(270) : turnVertical(270)
    if (c == '-') horizontal ? turnHorizontal(90) : turnVertical(90)
  })
}

const drawHilbertCurve = (recursionDepth : number) => {
  hilbertCurve(recursionDepth)
  start()
}

const drawHilbertBox = (recursionDepth : number) => {
  for (let i = 0; i < 3; i++) {
    hilbertCurve(recursionDepth)
    turnHorizontal(90)
  }

  hilbertCurve(recursionDepth, true)
  turnVertical(90)
  hilbertCurve(recursionDepth)
  turnVertical(90)
  turnHorizontal(270)
  hilbertCurve(recursionDepth, true)

  start()
}

export { drawHilbertCurve, drawHilbertBox }
