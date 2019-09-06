import { app } from './context'
import Config from './Config'

export default class Score extends THREE.Group {
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
    this.actualScore = '000'
    this.context.fillText(this.actualScore, this.canvas.width / 2, this.canvas.height / 2 + 32)

    this.material = new THREE.MeshBasicMaterial({
      transparent: true,
      depthTest: false
    })
    this.material.map = new THREE.CanvasTexture(this.canvas)
    this.plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(4, 1), this.material)
    this.add(this.plane)
    // this.setScore(7, true)
    this.setScore(0, false)
    this.app.on('scoreboardchanged', (val, highscore) => {
      this.setScore(val, highscore)
    })
    this.app.on('replay', this.replay.bind(this))
    this.app.on('play', this.play.bind(this))
  }

  replay () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // this.hexStr = '#' + Config.scoreColorOff.toString(16)
    // this.context.fillStyle = this.hexStr
    this.material.opacity = 0.15
    this.context.font = 'bold 72px sans-serif'
    this.context.fillText(this.actualScore, this.canvas.width / 2, this.canvas.height / 2 + 32)
    this.material.map.needsUpdate = true
  }

  play () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // this.hexStr = '#' + Config.scoreColor.toString(16)
    // this.context.fillStyle = this.hexStr
    this.material.opacity = 1
    this.context.font = 'bold 72px sans-serif'
    this.context.fillText(this.actualScore, this.canvas.width / 2, this.canvas.height / 2 + 32)
    this.material.map.needsUpdate = true
  }

  setScore (val, highscore) {
    let valStr = Number(val).toString()
    if (valStr.length > 3) {
      valStr = '999'
    } else if (valStr.length === 2) {
      valStr = '0' + valStr
    } else if (valStr.length === 1) {
      valStr = '00' + valStr
    }

    this.actualScore = valStr
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    if (highscore) {
      this.material.opacity = 1
      this.hexStr = '#' + Config.highscoreColor.toString(16)
      this.context.fillStyle = this.hexStr
      this.context.font = 'bolder 28px sans-serif'
      this.context.fillText('·YOUR·BEST·', this.canvas.width / 2, this.canvas.height / 2 - 42)
      this.context.font = 'bolder 96px sans-serif'
    } else {
      this.material.opacity = 0.8
      this.hexStr = '#' + Config.scoreColor.toString(16)
      this.context.fillStyle = this.hexStr
      this.context.font = 'bold 72px sans-serif'
    }
    this.context.fillText(valStr, this.canvas.width / 2, this.canvas.height / 2 + 32)
    this.material.map.needsUpdate = true
  }

  update (dt = 0) {
  }
}
