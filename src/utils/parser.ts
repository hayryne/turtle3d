import { walk, turnHorizontal as turnX, turnVertical as turnY, start } from '../turtle'

const parseAndEval = value => {
  const commands = value.trim().split(/\r?\n/)

  const getCommand = str => str.split('(')[0]
  const getValue = str => +str.split('(')[1].split(')')[0]

  commands.forEach(c => {
    const cmd = getCommand(c)
    const val = getValue(c)

    if (cmd === 'walk') walk(val)
    if (cmd === 'turnX') turnX(val)
    if (cmd === 'turnY') turnY(val)
  })

  start()
}

export { parseAndEval }
