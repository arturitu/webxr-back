import { app } from './context'
import Config from './Config'

export default class StartBtn extends THREE.Object3D {
  constructor () {
    super()
    this.app = app
    this.interactiveObj = new THREE.Mesh(
      new THREE.CircleBufferGeometry(0.7, 0),
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.25,
        color: Config.wayColor
      })
    )
    this.interactiveObj.name = 'start'
    this.add(this.interactiveObj)
    this.app.inputManager.addCollider(this.interactiveObj)

    const radius = 0.85
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
    const lineGeometry = new THREE.Geometry()
    for (var i = 0; i <= 3; i++) {
      var theta = (i / 3) * Math.PI * 2
      lineGeometry.vertices.push(
        new THREE.Vector3(
          Math.cos(theta) * radius,
          Math.sin(theta) * radius,
          0))
    }
    const line = new THREE.Line(lineGeometry, lineMaterial)
    line.rotation.z = Math.PI / 64
    this.interactiveObj.add(line)
  }

  update (dt = 0) {
  }
}
