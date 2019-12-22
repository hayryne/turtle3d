import { Engine, Scene, SceneLoader, Vector3, Color3, Color4,
  FreeCamera, Mesh, LinesMesh, StandardMaterial, HemisphericLight } from 'babylonjs'

// side-effects only imports
import '@babylonjs/core/Meshes/meshBuilder'
import 'babylonjs-loaders'

enum Direction { Horizontal, Vertical }

const createScene = () : Scene => {
  const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement
  const engine = new Engine(canvas)
  const scene = new Scene(engine)

  scene.clearColor = new Color4(0, 0, 0)

  const camera = new FreeCamera('camera', new Vector3(100, 75, 100), scene)

  camera.setTarget(Vector3.Zero())
  camera.attachControl(canvas, true)

  const light = new HemisphericLight('HemiLight', new Vector3(0, 1, 0), scene)

  light.intensity = 0.8
  light.diffuse = new Color3(1, 0, 0)

  engine.runRenderLoop(() => scene.render())

  return scene
}

const createTurtle = () : Mesh => {
  const turtle = Mesh.CreateSphere('turtle', 10, 2, scene)
  turtle.scaling.z = 2

  var material = new StandardMaterial("turtleSkin", scene);
  material.emissiveColor = new Color3(0, 1, 0)

  turtle.material = material

  return turtle
}

const scene = createScene()
const turtle = createTurtle()

const actions = []

const currentAngles = { zenith: 0, azimuth: 0 }

const positions = {
  start: Vector3.Zero(),
  current: Vector3.Zero(),
  destination: Vector3.Zero()
}

const createLine = (pos1 : Vector3, pos2 : Vector3) => {
  return Mesh.CreateTube('line', [pos1, pos2], 0.5, 4, null, null, scene)
}

const walkTowardsCurrentDestination = () : void => {
  const towardsNew = positions.destination.subtract(positions.current).normalize()
  const nextPosition = positions.current.add(towardsNew)

  const line = createLine(positions.start, nextPosition)
  positions.current = nextPosition

  const destinationReached = positions.current.equalsWithEpsilon(positions.destination, 0.01)

  if (!destinationReached) {
    queueAction(() => {
      walkTowardsCurrentDestination()
      line.dispose()

      turtle.position = positions.current
    })
  } else {
    executeNextAction()
  }
}

const walk = (distance : number) => {
  const walkAction = () => {
    setNextTargetPosition(distance)
    walkTowardsCurrentDestination()
  }

  actions.push(walkAction)
}

const setNextTargetPosition = (distance : number) => {
  positions.start = positions.current

  let position = new Vector3(
    distance * Math.sin(currentAngles.azimuth) * Math.cos(currentAngles.zenith),
    distance * Math.sin(currentAngles.zenith),
    distance * Math.cos(currentAngles.azimuth) * Math.cos(currentAngles.zenith)
  )

  positions.destination = positions.current.add(position)
}

const queueAction = (action : Function) => setTimeout(action, 25)

const turn = (turnAngle : number, direction : Direction) => {
  const turnAction = () => {
    const radians = turnAngle * Math.PI / 180

    if (direction === Direction.Horizontal) {
      currentAngles.azimuth += radians
    }

    if (direction === Direction.Vertical) {
      currentAngles.zenith += radians
    }

    turtle.rotation = new Vector3(-currentAngles.zenith, currentAngles.azimuth, 0)

    executeNextAction()
  }

  actions.push(turnAction)
}

const turnHorizontal = (angle : number) => turn(angle, Direction.Horizontal)
const turnVertical = (angle : number) => turn(angle, Direction.Vertical)

const executeNextAction = () => actions.length && actions.shift()()

export { walk, turnHorizontal, turnVertical, executeNextAction as start }
