import { walk, turnVertical, start } from '../src/turtle'

const drawDragonCurve = (recursionDepth : number) => {
  let s = 'FX';

  for (let i = 0; i < recursionDepth; i++) {
    let arr = []

    s.split('').forEach(c => {
      if (c == 'X') arr.push('X+YF');
      else if (c == 'Y') arr.push('FX-Y');
      else arr.push(c);
    })

    s = arr.reduce((s, acc) => s + acc)
  }

  s.split('').forEach(c => {
    if (c == 'F') walk(8);
    if (c == '+') turnVertical(270)
    if (c == '-') turnVertical(90)
  })

  start()
}

export { drawDragonCurve }
