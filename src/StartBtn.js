import { app } from './context'
import Config from './Config'

export default class StartBtn extends THREE.Object3D {
  constructor () {
    super()
    this.app = app
    this.interactiveObj = new THREE.Mesh(
      new THREE.CircleBufferGeometry(0.7, 0),
      new THREE.MeshBasicMaterial({
        color: Config.wayColor
      })
    )
    this.interactiveObj.name = 'start'
    this.add(this.interactiveObj)
    this.app.inputManager.addCollider(this.interactiveObj)
  }

  update (dt = 0) {
  }
}
