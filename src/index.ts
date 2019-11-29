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

var camera = new FreeCamera("camera", new Vector3(0, 0, -200), scene);

camera.setTarget(Vector3.Zero())
camera.attachControl(canvas, true)

engine.runRenderLoop(() => scene.render())

let currentAngle = 0;
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
    targetPosition = new Vector3(
        Math.cos(currentAngle * Math.PI/180) * distance + currentPosition.x,
        Math.sin(currentAngle * Math.PI/180) * distance + currentPosition.y,
        currentPosition.z)
}

const queueAction = (action : Function) => setTimeout(action, 50)

const turn = (turnAngle : number) => queueAction(() => {
    currentAngle += turnAngle
    
    executeNextAction()
})

let actions = [
    () => walk(50),
    () => turn(90),
    () => walk(50),
    () => turn(90),
    () => walk(50),
    () => turn(90),
    () => walk(50)
]

function executeNextAction() {
    if (!actions.length) return

    actions.shift()();
}

executeNextAction()






