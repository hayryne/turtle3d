import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { LinesMesh } from "@babylonjs/core/Meshes/linesMesh";

// side-effects only imports allowing Mesh to create default shapes
import "@babylonjs/core/Meshes/meshBuilder"

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas);
var scene = new Scene(engine);

var camera = new FreeCamera("camera", new Vector3(100, 75, 100), scene);

camera.setTarget(Vector3.Zero())
camera.attachControl(canvas, true)

engine.runRenderLoop(() => scene.render())

enum Direction { Horizontal, Vertical }

let currentZenithAngle = 0;
let currentAzimuthAngle = 0;
let currentPosition = new Vector3(0, 0, 0)
let targetPosition = new Vector3(0, 0, 0)

const createLine = (pos1 : Vector3, pos2 : Vector3) : LinesMesh => Mesh.CreateLines('line', [pos1, pos2], scene)

function walkTowardsCurrentDestination() : void {
    var towardsNew = targetPosition.subtract(currentPosition).normalize()

    createLine(currentPosition, currentPosition.add(towardsNew));
    currentPosition = currentPosition.add(towardsNew);

    if (!currentPosition.equalsWithEpsilon(targetPosition, 0.01)) {
        queueAction(() => walkTowardsCurrentDestination())
    } else {
        executeNextAction()
    }
}

const walk = (distance : number) => {
    getNextTargetPosition(distance)
    walkTowardsCurrentDestination()
}

function getNextTargetPosition(distance : number) {
    let position = new Vector3(
        distance * Math.sin(currentAzimuthAngle) * Math.cos(currentZenithAngle),
        distance * Math.sin(currentZenithAngle),
        distance * Math.cos(currentAzimuthAngle) * Math.cos(currentZenithAngle)
    )

    targetPosition = currentPosition.add(position)
}

const queueAction = (action : Function) => setTimeout(action, 25)

const turn = (turnAngle : number, direction : Direction) => queueAction(() => {
    if (direction === Direction.Horizontal) {
        currentAzimuthAngle += turnAngle * Math.PI / 180
    }

    if (direction === Direction.Vertical) {
        currentZenithAngle += turnAngle * Math.PI / 180
    }
    
    executeNextAction()
})


let actions = [
    () => walk(50),
    () => turn(90, Direction.Horizontal),
    () => walk(50),
    () => turn(90, Direction.Horizontal),
    () => walk(50),
    () => turn(90, Direction.Horizontal),
    () => walk(50),
    () => turn(90, Direction.Vertical),
    () => walk(50),
    () => turn(-90, Direction.Vertical),
    () => turn(90, Direction.Horizontal),
    () => walk(50),
    () => turn(90, Direction.Horizontal),
    () => walk(50),
    () => turn(90, Direction.Horizontal),
    () => walk(50),
    () => turn(90, Direction.Horizontal),
    () => walk(50)
]

function executeNextAction() {
    if (!actions.length) return

    actions.shift()();
}

executeNextAction()






