
// Based on https://sonoport.github.io/synthesising-sounds-webaudio.html
import { app } from './context'

module.exports = class Synth {
  constructor () {
    this.app = app

    window.AudioContext = window.AudioContext || window.webkitAudioContext
    if (!this.audioContext) {
      this.audioContext = new AudioContext()
    }
    this.gameActive = false
    this.actualTempo = 0.3
    this.backTempo = 0.1
    this.tempo = this.actualTempo
    this.counter = 0

    // Made based on with https://xem.github.io/miniMusic/
    this.loopSeq = [0, 0, 14, 14, 0, 0, 12, 12, 0, 0, 11, 11, 0, 0, 12, 12, 0, 14, 12, 11, 12, 0, 0, 9, 8, 7, 0, 7, 0, 7, 0, 7, 0, 0]
    this.reverseSeq = this.loopSeq.slice(0).reverse()
    this.errorSeq = [0, 16, 17, 19, 19, 0]
    this.okSeq = [0, 2, 0]
    this.clickSeq = [0, 13, 0]

    this.activeSeq = []
    this.sequencePoint = 0
    this.actualLoopPoint = 0

    if (!window.localStorage.getItem('unboring.js13k.back.audio')) {
      this.audioActive = 'false'
    } else {
      this.audioActive = window.localStorage.getItem('unboring.js13k.back.audio')
    }

    this.app.on('startgame', this.startgame.bind(this))
    this.app.on('endgame', this.endgame.bind(this))
    this.app.on('solveOK', this.solveOK.bind(this))
    this.app.on('solveRememberingOK', this.solveOK.bind(this))
    this.app.on('solveERROR', this.solveERROR.bind(this))
    this.app.on('solveRememberingERROR', this.solveERROR.bind(this))
    this.app.on('play', this.playEvent.bind(this))
    this.app.on('rew', this.rew.bind(this))
    this.app.on('speedChanged', this.speedChanged.bind(this))
    this.app.on('shuffleAudio', this.shuffleAudio.bind(this))
  }

  shuffleAudio () {
    if (this.audioActive === 'true') {
      this.audioActive = 'false'
    } else {
      this.audioActive = 'true'
    }
  }

  startgame () {
    const osc4 = this.audioContext.createOscillator()
    if (this.audioActive === 'true') {
      osc4.frequency.value = 440 * 1.06 ** (12 - 5)
    } else {
      console.log(this.audioActive)
      osc4.frequency.value = 0
    }
    osc4.connect(this.audioContext.destination)
    osc4.start(this.audioContext.currentTime)
    osc4.stop(this.audioContext.currentTime + this.actualTempo)
    this.gameActive = true
    this.activeSeq = this.loopSeq
    this.sequencePoint = 0
  }

  endgame () {
    this.gameActive = false
    this.activeSeq = []
  }

  speedChanged (newSpeed) {
    this.actualTempo = 0.3 - Math.min(0.2, newSpeed / 200)
    this.tempo = this.actualTempo
  }

  solveOK () {
    this.activeSeq = this.okSeq
    this.actualLoopPoint = this.sequencePoint
    this.sequencePoint = 0
  }

  solveERROR () {
    this.activeSeq = this.errorSeq
    this.sequencePoint = 0
  }

  playEvent () {
    this.tempo = this.actualTempo
  }

  rew () {
    this.tempo = this.backTempo
    this.activeSeq = this.reverseSeq
    if (this.activeSeq !== this.reverseSeq) {
      this.sequencePoint = 0
    }
  }

  playNote (v) {
    const osc4 = this.audioContext.createOscillator()
    osc4.frequency.value = 440 * 1.06 ** (12 - v)
    osc4.connect(this.audioContext.destination)
    osc4.start(this.audioContext.currentTime)
    osc4.stop(this.audioContext.currentTime + this.actualTempo)
  }

  tick () {
    if (this.audioActive === 'false') {
      return
    }
    if (this.sequencePoint < this.activeSeq.length) {
      if (this.activeSeq[this.sequencePoint]) {
        this.playNote(this.activeSeq[this.sequencePoint])
        this.app.emit('synth', this.activeSeq[this.sequencePoint])
      }
      this.sequencePoint += 1
    } else {
      if (this.gameActive) {
        if (this.activeSeq !== this.loopSeq) {
          this.activeSeq = this.loopSeq
          this.sequencePoint = this.actualLoopPoint
        } else {
          this.sequencePoint = 0
        }
      } else {
        this.activeSeq = []
        this.sequencePoint = 0
      }
    }
  }

  update (dt) {
    this.counter += dt
    if (this.counter > this.tempo) {
      this.tick()
      this.counter = 0
    }
  }
}
