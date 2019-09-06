import vertexShader from './shaders/sky.vert'
import fragmentShader from './shaders/sky.frag'

import { app } from './context'
import Config from './Config'
import Utils from './Utils'

export default class Sky extends THREE.Group {
  constructor () {
    super()
    const geometry = new THREE.SphereBufferGeometry(100, 64, 64)
    const material = new THREE.ShaderMaterial(
      {
        uniforms: {
          colorTop: { type: 'c', value: new THREE.Color(Config.bgColorTop) },
          colorBottom: { type: 'c', value: new THREE.Color(Config.bgColor) }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.BackSide
      }
    )
    this.shpere = new THREE.Mesh(geometry, material)
    this.add(this.shpere)
    this.app = app

    this.changingColor = false
    this.count = 0
    this.prevTopColor = 0
    this.prevBottomColor = 0
    this.topColor = 0
    this.bottomColor = 0

    this.app.on('resetAtNewCycle', this.resetAtNewCycle.bind(this))
    this.app.on('colorChanged', this.colorChanged.bind(this))
  }

  resetAtNewCycle () {

  }

  colorChanged (val, isDefault) {
    this.changingColor = true
    this.endColor = val
    this.prevTopColor = this.shpere.material.uniforms.colorTop.value.getHex()
    this.prevBottomColor = this.shpere.material.uniforms.colorBottom.value.getHex()
    if (isDefault) {
      Config.transitionSpeed = 8
      this.topColor = Config.defaultColorArr[1]
      this.bottomColor = Config.defaultColorArr[2]
    } else {
      Config.transitionSpeed = 2
      for (let i = 0; i < Config.colorArr.length; i++) {
        if (Config.colorArr[i][0] === val) {
          this.topColor = Config.colorArr[i][1]
          this.bottomColor = Config.colorArr[i][2]
        }
      }
    }
  }

  updateColors () {
    this.shpere.material.uniforms.colorTop.value = new THREE.Color(Utils.blendColors(this.prevTopColor, this.topColor, this.count))
    this.shpere.material.uniforms.colorBottom.value = new THREE.Color(Utils.blendColors(this.prevBottomColor, this.bottomColor, this.count))
  }

  colorTransitionEnds () {
    this.changingColor = false
    var hexStr = '#' + this.topColor.toString(16)
    document.querySelector('meta[name="theme-color"]').setAttribute('content', hexStr)
    this.count = 0
  }

  update (dt = 0) {
    if (this.changingColor) {
      this.count += dt / 10 * Config.transitionSpeed
      this.updateColors()
      if (this.count >= 1) {
        this.colorTransitionEnds()
      }
    }
  }
}
