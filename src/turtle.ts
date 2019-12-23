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

  const camera = new FreeCamera('camera', new Vector3(100, 75, 100), scene)

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
  material.emissiveColor = new Color3(0, 1, 0)

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

let mainMesh : Mesh

const createLine = (positions : Vector3[]) => {
  const line = Mesh.CreateTube('line', positions, 0.5, 4, null, null, scene)

  line.material = material

  return line
}

const walkTowardsCurrentDestination = () : void => {
  const towardsNew = positions.destination
    .subtract(positions.current).normalize()
  const nextPosition = positions.current.add(towardsNew)

  points.current.push(nextPosition)

  const line = createLine(points.current)

  positions.current = nextPosition

  const destinationReached = positions.current
    .equalsWithEpsilon(positions.destination, 0.01)

  if (!destinationReached) {
    queueAction(() => {
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

    turtle.rotation = new Vector3(-currentAngles.zenith, -currentAngles.azimuth, 0)

    executeNextAction()
  }

  actions.push(turnAction)
}

const turnHorizontal = (angle : number) => turn(angle, Direction.Horizontal)
const turnVertical = (angle : number) => turn(angle, Direction.Vertical)

const executeNextAction = () => actions.length && actions.shift()()

export { walk, turnHorizontal, turnVertical, executeNextAction as start }
