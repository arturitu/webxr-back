import { app } from './context'
import Config from './Config'

export default class Ways extends THREE.Group {
  constructor () {
    super()
    this.app = app
    this.addWays()
  }

  addWays () {
    const wayGeometry = new THREE.PlaneBufferGeometry(1.9, Config.wayLength, 1, 1)
    wayGeometry.rotateX(-Math.PI / 2)
    for (let i = 0; i < 5; i++) {
      const wayMaterial = new THREE.MeshBasicMaterial({ color: Config.wayColor })
      const way = new THREE.Mesh(wayGeometry, wayMaterial)
      way.name = 'way' + i
      way.position.x = (i * 2) - 4
      way.position.y = 0.1
      way.position.z = 0
      this.app.inputManager.addCollider(way)
      this.add(way)
    }
  }

  update (dt = 0) {
  }
}
