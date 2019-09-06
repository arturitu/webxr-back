import { app } from './context'
import Config from './Config'

export default class Ways extends THREE.Group {
  constructor () {
    super()
    this.app = app
    this.addWays()
    this.app.on('startgame', this.startgame.bind(this))
    this.app.on('endgame', this.endgame.bind(this))
    this.app.on('synth', this.synth.bind(this))

    this.countEffect = 0
  }

  addWays () {
    const wayGeometry = new THREE.PlaneBufferGeometry(1.9, Config.wayLength, 1, 1)
    wayGeometry.rotateX(-Math.PI / 2)
    for (let i = 0; i < 5; i++) {
      const wayMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.25, color: Config.wayColor })
      const way = new THREE.Mesh(wayGeometry, wayMaterial)
      way.name = 'way' + i
      way.position.x = (i * 2) - 4
      way.position.y = 0.1
      way.position.z = 0
      this.add(way)
    }
  }

  startgame () {
    for (let i = 0; i < this.children.length; i++) {
      this.app.inputManager.addCollider(this.children[i])
    }
  }

  endgame () {
    for (let i = 0; i < this.children.length; i++) {
      this.app.inputManager.removeCollider(this.children[i])
    }
    // for (let i = 0; i < this.children.length; i++) {
    //   this.children[i].material.opacity = 1
    // }
  }

  synth (val) {
    // for (let i = 0; i < this.children.length; i++) {
    //   this.children[i].material.opacity = 1
    // }
    // this.children[this.countEffect].material.opacity = 1 - ((val * 4) / 100)
    // if (this.countEffect >= this.children.length - 1) {
    //   this.countEffect = 0
    // } else {
    //   this.countEffect += 1
    // }
  }

  update (dt = 0) {
  }
}
