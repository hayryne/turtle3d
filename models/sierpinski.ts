import { walk, turnVertical, start } from '../src/turtle'

const drawSierpinskiTriangle = (recursionDepth : number) => {
  let s = 'A-B-B';

  for (let i = 0; i < recursionDepth; i++) {
    let arr = []

    s.split('').forEach(c => {
      if (c == 'A') arr.push('A-B+A+B-A');
      else if (c == 'B') arr.push('BB');
      else arr.push(c);
    })

    s = arr.reduce((s, acc) => s + acc)
  }

  s.split('').forEach(c => {
    if (c == 'A' || c == 'B') walk(8);
    if (c == '+') turnVertical(240)
    if (c == '-') turnVertical(120)
  })

  start()
}

export { drawSierpinskiTriangle }
