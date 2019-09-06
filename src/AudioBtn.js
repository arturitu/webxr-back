import { app } from './context'
import Config from './Config'

export default class PlayRewPanels extends THREE.Group {
  constructor () {
    super()
    this.app = app
    this.canvas = document.createElement('canvas')
    this.canvas.width = 256
    this.canvas.height = 64
    this.canvas.style.display = 'none'
    document.body.appendChild(this.canvas)

    this.context = this.canvas.getContext('2d')
    this.context.font = 'bold 36px sans-serif'
    this.context.textAlign = 'center'
    this.context.beginPath()
    this.hexStr = '#' + Config.wayColor.toString(16)
    this.context.fillStyle = this.hexStr
    this.context.strokeStyle = this.hexStr
    this.context.lineWidth = 6
    this.material = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.25
    })
    this.material.map = new THREE.CanvasTexture(this.canvas)
    this.plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 0.25), this.material)
    this.add(this.plane)
    this.plane.name = 'audio'
    this.app.inputManager.addCollider(this.plane)

    if (!window.localStorage.getItem('unboring.js13k.back.audio')) {
      this.audioActive = 'true'
    } else {
      this.audioActive = window.localStorage.getItem('unboring.js13k.back.audio')
    }
    this.setAudio()
    this.app.on('shuffleAudio', this.shuffleAudio.bind(this))
  }

  setAudio () {
    if (this.audioActive === 'true') {
      this.on()
    } else {
      this.off()
    }
  }

  shuffleAudio () {
    if (this.audioActive === 'true') {
      this.audioActive = 'false'
    } else {
      this.audioActive = 'true'
    }
    if (this.audioActive !== window.localStorage.getItem('unboring.js13k.back.audio')) {
      window.localStorage.setItem('unboring.js13k.back.audio', this.audioActive)
    }
    this.setAudio()
  }

  on () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.beginPath()
    this.context.fillText('AUDIO·ON', this.canvas.width / 2, this.canvas.height / 2 + 16)
    this.context.moveTo(36, 60)
    this.context.lineTo(220, 60)
    this.context.stroke()
    this.material.map.needsUpdate = true
    this.visible = true
  }

  off () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.beginPath()
    this.context.fillText('AUDIO-OFF', this.canvas.width / 2, this.canvas.height / 2 + 16)
    this.context.moveTo(30, 60)
    this.context.lineTo(226, 10)
    this.context.stroke()
    this.material.map.needsUpdate = true
    this.visible = true
  }

  update (dt = 0) {
  }
}
