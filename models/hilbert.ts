import { walk, turnVertical, start } from '../src/turtle'

const drawHilbertCurve = (recursionDepth : number) => {
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
    if (c == '+') turnVertical(270)
    if (c == '-') turnVertical(90)
  })

  start()
}

export { drawHilbertCurve }
