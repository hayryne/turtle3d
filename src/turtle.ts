import { Engine, Scene, SceneLoader, Vector3, Color3, Color4,
  FreeCamera, Mesh, StandardMaterial, HemisphericLight, GlowLayer,
  ParticleSystem, Texture } from 'babylonjs'

// side-effects only imports
import '@babylonjs/core/Meshes/meshBuilder'
import 'babylonjs-loaders'

enum Direction { Horizontal, Vertical }

const createScene = () : Scene => {
  const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement
  const engine = new Engine(canvas)
  const scene = new Scene(engine)

  scene.clearColor = new Color4(0, 0, 0)

  camera = new FreeCamera('camera', cameraPosition.clone(), scene)

  camera.setTarget(Vector3.Zero())
  camera.attachControl(canvas, true)

  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)

  light.intensity = 0.8
  light.diffuse = new Color3(1, 0, 0)

  const glow = new GlowLayer('glow', scene)

  engine.runRenderLoop(() => scene.render())

  return scene
}

const createTurtle = () : Mesh => {
  const turtle = Mesh.CreateSphere('turtle', 10, 2, scene)
  turtle.scaling.z = 2

  turtle.material = material

  createParticleSystem(turtle)

  return turtle
}

const createGlowMaterial = () => {
  const material = new StandardMaterial('glowMaterial', scene);
  material.emissiveColor = lineColor

  return material
}

const createParticleSystem = (target : Mesh) => {
  const particleSystem = new ParticleSystem('particles', 1000, scene)
  particleSystem.particleTexture = new Texture('../assets/spark.png', scene)

  particleSystem.emitter = target
  particleSystem.blendMode = ParticleSystem.BLENDMODE_STANDARD
  particleSystem.emitRate = 1000
  particleSystem.maxLifeTime = 0.5
  particleSystem.maxSize = 0.1
  particleSystem.maxEmitPower = 25

  particleSystem.start()
}

let lineColor : Color3

const cameraPosition = new Vector3(100, 75, 100)

const scene = createScene()
const material = createGlowMaterial()
const turtle = createTurtle()

const actions = []

const currentAngles = { zenith: 0, azimuth: 0 }

const positions = {
  start: Vector3.Zero(),
  current: Vector3.Zero(),
  destination: Vector3.Zero()
}

const points = {
  previous: [positions.start],
  current: [positions.start],
}

let camera : FreeCamera
let mainMesh : Mesh
let currentMesh : Mesh
let currentAction : number

const createLine = (positions : Vector3[]) => {
  const line = Mesh.CreateTube('line', positions, 0.5, 4, null, null, scene)

  line.material = material

  return line
}

const walkTowardsCurrentDestination = () : void => {
  const towardsNew = positions.destination
    .subtract(positions.current).normalize()

  const dis = Vector3.Distance(positions.current, positions.destination)

  if (dis < 1) {
    towardsNew.multiplyInPlace(new Vector3(dis, dis, dis))
  }

  const nextPosition = positions.current.add(towardsNew)

  points.current.push(nextPosition)

  const line = currentMesh = createLine(points.current)

  positions.current = nextPosition

  const destinationReached = positions.current
    .equalsWithEpsilon(positions.destination, 0.01)

  if (!destinationReached) {
    currentAction = queueAction(() => {
      walkTowardsCurrentDestination()
      line.dispose()

      turtle.position = positions.current
    })
  } else {
    points.previous.push(positions.current)
    points.current = [positions.current]

    line.dispose()

    mainMesh && mainMesh.dispose()
    mainMesh = createLine(points.previous)

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

const reset = () => {
  currentAngles.zenith = 0
  currentAngles.azimuth = 0

  positions.start = Vector3.Zero()
  positions.current = Vector3.Zero()
  positions.destination = Vector3.Zero()

  points.previous = [positions.start]
  points.current = [positions.start]

  turtle.position = positions.start
  turtle.rotation = Vector3.Zero()

  camera.position = cameraPosition.clone()
  camera.setTarget(Vector3.Zero())

  actions.length = 0

  currentAction && clearTimeout(currentAction)

  currentMesh && currentMesh.dispose()
  mainMesh && mainMesh.dispose()
}

const setLineColor = color => {
  material.emissiveColor = new Color3(color.r / 255, color.g  / 255, color.b / 255)
}

const turnHorizontal = (angle : number) => turn(angle, Direction.Horizontal)
const turnVertical = (angle : number) => turn(angle, Direction.Vertical)

const executeNextAction = () => actions.length && actions.shift()()

export { walk, turnHorizontal, turnVertical, executeNextAction as start, reset, setLineColor }
