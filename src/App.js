import { EventEmitter } from 'events'
import Config from './Config'

export default class App extends EventEmitter {
  constructor (opt = {}) {
    super()

    this.isVRActive = false
    this.time = 0
    this.prevTime = window.performance.now()
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.vr.enabled = true

    document.body.appendChild(this.renderer.domElement)

    // WebXR
    document.body.appendChild(THREE.WEBVR.createButton(this.renderer, { referenceSpaceType: 'local' }))

    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.Fog(Config.bgColor, 0, 45)

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.layers.enable(1)

    window.addEventListener('resize', () => this.resize())

    this.animate()
  }

  resize () {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  animate () {
    this.renderer.setAnimationLoop(this.render.bind(this))
  }

  render () {
    const timeNow = window.performance.now()
    const delta = (timeNow - this.prevTime) / 1000
    this.prevTime = timeNow
    this.time += delta
    this.update(delta, this.time)

    if (this.isVRActive !== this.renderer.vr.isPresenting()) {
      this.emit('toggleVR', this.renderer.vr.isPresenting())
      this.isVRActive = this.renderer.vr.isPresenting()
      if (this.isVRActive) {
        Config.lerpSpeed = 0.75
      } else {
        Config.lerpSpeed = 0.9
      }
    }
    if (this.renderer.vr.isPresenting()) {
      this.inputManager.updateVR()
    }

    this.gameManager.update(delta)
    this.synth.update(delta)

    this.renderer.render(this.scene, this.camera)
  }

  update (dt = 0, time = 0) {
    // recursively tell all child objects to update
    this.scene.traverse(obj => {
      if (typeof obj.update === 'function') {
        obj.update(dt, time)
      }
    })

    return this
  }
}
