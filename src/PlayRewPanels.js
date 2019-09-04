import { app } from './context'
import Config from './Config'

export default class PlayRewPanels extends THREE.Group {
  constructor () {
    super()
    this.app = app
    this.canvas = document.createElement('canvas')
    this.canvas.width = 512
    this.canvas.height = 128
    this.canvas.style.display = 'none'
    document.body.appendChild(this.canvas)

    this.context = this.canvas.getContext('2d')
    this.context.font = 'bold 72px sans-serif'
    this.context.textAlign = 'center'
    this.hexStr = '#' + Config.scoreColor.toString(16)
    this.context.fillStyle = this.hexStr
    this.material = new THREE.MeshBasicMaterial({
      transparent: true
    })
    this.material.map = new THREE.CanvasTexture(this.canvas)
    this.plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 0.5), this.material)
    this.add(this.plane)
    this.app.on('replay', this.stop.bind(this))
    this.app.on('endgame', this.stop.bind(this))
    this.app.on('play', this.play.bind(this))
    this.app.on('rew', this.rew.bind(this))
    // this.play()
  }

  play () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.fillText('PLAY >', this.canvas.width / 2, this.canvas.height / 2 + 32)
    this.material.map.needsUpdate = true
    this.visible = true
  }

  rew () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.fillText('REW <<', this.canvas.width / 2, this.canvas.height / 2 + 32)
    this.material.map.needsUpdate = true
    this.visible = true
  }

  stop () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.material.map.needsUpdate = true
    this.visible = false
  }

  update (dt = 0) {
  }
}
