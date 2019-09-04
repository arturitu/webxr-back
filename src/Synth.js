
// Based on https://sonoport.github.io/synthesising-sounds-webaudio.html
import { app } from './context'

module.exports = class Synth {
  constructor () {
    this.app = app

    window.AudioContext = window.AudioContext || window.webkitAudioContext

    this.audioContext = new AudioContext()
    this.mixGain = this.audioContext.createGain()
    this.filterGain = this.audioContext.createGain()

    this.mixGain.connect(this.audioContext.destination)
    this.mixGain.gain.value = 0
    this.filterGain.gain.value = 0

    this.tempo = 0.5
    this.counter = 0

    this.songPosition = 0
    this.song = [
      [0],
      [0],
      [0],
      [0]
    ]
    this.gameStarted = false
    this.wayHasChanged = false
    this.solved = false
    this.onError = false

    this.app.on('wayChanged', this.wayChanged.bind(this))
    this.app.on('startgame', this.startgame.bind(this))
    this.app.on('endgame', this.endgame.bind(this))
    this.app.on('solveOK', this.solveOK.bind(this))
    this.app.on('solveRememberingOK', this.solveOK.bind(this))
    this.app.on('solveERROR', this.solveERROR.bind(this))
    this.app.on('solveRememberingERROR', this.solveERROR.bind(this))
    this.app.on('play', this.playEvent.bind(this))
    this.app.on('rew', this.rew.bind(this))
  }

  wayChanged (newWay) {
    this.wayHasChanged = true
  }

  startgame () {
    this.gameStarted = true
    this.kick()
  }

  endgame () {
    this.gameStarted = false
  }

  solveOK () {
    this.solved = true
  }

  solveERROR () {
    this.onError = true
  }

  playEvent () {
    console.log('play')
    this.tempo = 0.5
  }

  rew () {
    console.log('rew')
    this.tempo = 0.1
  }

  // SOUNDS
  hihat () {
    var gainOsc4 = this.audioContext.createGain()
    var fundamental = 40
    var ratios = [2, 3, 4.16, 5.43, 6.79, 8.21]

    var bandpass = this.audioContext.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.value = 10000

    var highpass = this.audioContext.createBiquadFilter()
    highpass.type = 'highpass'
    highpass.frequency.value = 7000

    ratios.forEach((ratio) => {
      var osc4 = this.audioContext.createOscillator()
      osc4.type = 'square'
      osc4.frequency.value = fundamental * ratio
      osc4.connect(bandpass)

      osc4.start(this.audioContext.currentTime)
      osc4.stop(this.audioContext.currentTime + 0.05)
    })

    gainOsc4.gain.setValueAtTime(1, this.audioContext.currentTime)
    gainOsc4.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05)

    bandpass.connect(highpass)
    highpass.connect(gainOsc4)
    gainOsc4.connect(this.mixGain)

    this.mixGain.gain.value = 1
  };

  kick () {
    var osc = this.audioContext.createOscillator()
    var osc2 = this.audioContext.createOscillator()
    var gainOsc = this.audioContext.createGain()
    var gainOsc2 = this.audioContext.createGain()

    osc.type = 'triangle'
    osc2.type = 'sine'

    gainOsc.gain.setValueAtTime(1, this.audioContext.currentTime)
    gainOsc.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5)

    gainOsc2.gain.setValueAtTime(1, this.audioContext.currentTime)
    gainOsc2.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5)

    osc.frequency.setValueAtTime(120, this.audioContext.currentTime)
    osc.frequency.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5)

    osc2.frequency.setValueAtTime(50, this.audioContext.currentTime)
    osc2.frequency.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5)

    osc.connect(gainOsc)
    osc2.connect(gainOsc2)
    gainOsc2.connect(this.mixGain)
    gainOsc.connect(this.mixGain)
    gainOsc.connect(this.audioContext.destination)
    gainOsc2.connect(this.audioContext.destination)

    this.mixGain.gain.value = 1

    osc.start(this.audioContext.currentTime)
    osc2.start(this.audioContext.currentTime)

    osc.stop(this.audioContext.currentTime + 0.5)
    osc2.stop(this.audioContext.currentTime + 0.5)
  };

  error () {
    var osc = this.audioContext.createOscillator()
    var osc2 = this.audioContext.createOscillator()
    var gainOsc = this.audioContext.createGain()
    var gainOsc2 = this.audioContext.createGain()

    osc.type = 'triangle'
    osc2.type = 'sine'

    gainOsc.gain.setValueAtTime(1, this.audioContext.currentTime)
    gainOsc.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1.5)

    gainOsc2.gain.setValueAtTime(1, this.audioContext.currentTime)
    gainOsc2.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1.5)

    osc.frequency.setValueAtTime(30, this.audioContext.currentTime)
    osc.frequency.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1.5)

    osc2.frequency.setValueAtTime(150, this.audioContext.currentTime)
    osc2.frequency.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1.5)

    osc.connect(gainOsc)
    osc2.connect(gainOsc2)
    gainOsc2.connect(this.mixGain)
    gainOsc.connect(this.mixGain)
    gainOsc.connect(this.audioContext.destination)
    gainOsc2.connect(this.audioContext.destination)

    this.mixGain.gain.value = 1

    osc.start(this.audioContext.currentTime)
    osc2.start(this.audioContext.currentTime)

    osc.stop(this.audioContext.currentTime + 1.5)
    osc2.stop(this.audioContext.currentTime + 1.5)
  };

  ok () {
    var osc = this.audioContext.createOscillator()
    var osc2 = this.audioContext.createOscillator()
    var gainOsc = this.audioContext.createGain()
    var gainOsc2 = this.audioContext.createGain()

    osc.type = 'sine'
    osc2.type = 'sine'

    gainOsc.gain.setValueAtTime(1, this.audioContext.currentTime)
    gainOsc.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1.5)

    gainOsc2.gain.setValueAtTime(1, this.audioContext.currentTime)
    gainOsc2.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1.5)

    osc.frequency.setValueAtTime(30, this.audioContext.currentTime)
    osc.frequency.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1.5)

    osc2.frequency.setValueAtTime(100, this.audioContext.currentTime)
    osc2.frequency.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1.5)

    osc.connect(gainOsc)
    osc2.connect(gainOsc2)
    gainOsc2.connect(this.mixGain)
    gainOsc.connect(this.mixGain)
    gainOsc.connect(this.audioContext.destination)
    gainOsc2.connect(this.audioContext.destination)

    this.mixGain.gain.value = 1

    osc.start(this.audioContext.currentTime)
    osc2.start(this.audioContext.currentTime)

    osc.stop(this.audioContext.currentTime + 1.5)
    osc2.stop(this.audioContext.currentTime + 1.5)
  };

  snare () {
    var osc3 = this.audioContext.createOscillator()
    var gainOsc3 = this.audioContext.createGain()

    this.filterGain.gain.setValueAtTime(1, this.audioContext.currentTime)
    this.filterGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2)

    osc3.type = 'triangle'
    osc3.frequency.value = 100
    gainOsc3.gain.value = 0

    gainOsc3.gain.setValueAtTime(0, this.audioContext.currentTime)
    gainOsc3.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1)

    osc3.connect(gainOsc3)
    gainOsc3.connect(this.mixGain)

    this.mixGain.gain.value = 1

    osc3.start(this.audioContext.currentTime)
    osc3.stop(this.audioContext.currentTime + 0.2)

    var node = this.audioContext.createBufferSource()
    var buffer = this.audioContext.createBuffer(1, 4096, this.audioContext.sampleRate)
    var data = buffer.getChannelData(0)

    var filter = this.audioContext.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.setValueAtTime(100, this.audioContext.currentTime)
    filter.frequency.linearRampToValueAtTime(1000, this.audioContext.currentTime + 0.2)

    for (var i = 0; i < 4096; i++) {
      data[i] = Math.random()
    }
    node.buffer = buffer
    node.loop = true
    node.connect(filter)
    filter.connect(this.filterGain)
    this.filterGain.connect(this.mixGain)
    node.start(this.audioContext.currentTime)
    node.stop(this.audioContext.currentTime + 0.2)
  };

  play () {
    if (!this.gameStarted) {
      return
    }
    if (this.onError) {
      this.error()
      this.onError = false
      this.gameStarted = false
    }
    for (let i = 0; i < this.song[this.songPosition].length; i++) {
      switch (this.song[this.songPosition][i]) {
        case 0:
          this.hihat()
          break
        case 1:
          this.kick()
          break
        case 2:
          this.snare()
          break
        case 3:
          this.ok()
          break
      }
    }
    if (this.songPosition === this.song.length - 1) {
      this.songPosition = 0
    } else {
      this.songPosition += 1
    }

    if (this.wayHasChanged) {
      this.kick()
      this.wayHasChanged = false
    }

    if (this.solved) {
      this.snare()
      this.solved = false
    }
  }

  update (dt) {
    this.counter += dt
    if (this.counter > this.tempo) {
      this.play()
      this.counter = 0
    }
  }
}
