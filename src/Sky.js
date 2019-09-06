import vertexShader from './shaders/sky.vert'
import fragmentShader from './shaders/sky.frag'

import { app } from './context'
import Config from './Config'

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
    this.app.on('resetAtNewCycle', this.resetAtNewCycle.bind(this))
  }

  resetAtNewCycle () {

  }

  update (dt = 0) {
  }
}
