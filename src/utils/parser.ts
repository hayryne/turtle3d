import { walk, turnVertical, turnHorizontal, start } from '../turtle'

const parseAndEval = value => {
  const commands = value.split(/\r?\n/)

  const getCommand = str => str.split('(')[0]
  const getValue = str => +str.split('(')[1].split(')')[0]

  commands.forEach(c => {
    const cmd = getCommand(c)
    const val = getValue(c)

    if (cmd === 'walk') walk(val)
    if (cmd === 'turnHorizontal') turnHorizontal(val)
    if (cmd === 'turnVertical') turnVertical(val)
  })

  start()
}

export { parseAndEval }
