import vertexShader from './shaders/instancing.vert'
import fragmentShader from './shaders/instancing.frag'

import { app } from './context'
import Config from './Config'

export default class InstancedObjs extends THREE.Group {
  constructor () {
    super()

    this.app = app
    if (this.app.renderer.extensions.get('ANGLE_instanced_arrays') === null) {
      console.log('Instancing not supported')
      return
    }
    const geometry = this.getGeometry()
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: { value: 1.0 },
        sineTime: { value: 1.0 }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide,
      transparent: true
    })
    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.position.z = -2
    this.add(this.mesh)
    this.app.on('resetAtNewCycle', this.resetAtNewCycle.bind(this))
  }

  getGeometry () {
    const vector = new THREE.Vector4()
    const instances = 5000
    const positions = []
    const offsets = []
    const colors = []
    const orientationsStart = []
    const orientationsEnd = []
    positions.push(0.025, -0.025, 0)
    positions.push(-0.025, 0.025, 0)
    positions.push(0, 0, 0.025)
    // instanced attributes
    for (let i = 0; i < instances; i++) {
      // offsets
      offsets.push(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
      // colors
      colors.push(Math.random(), Math.random(), Math.random(), Math.random())
      // orientation start
      vector.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1)
      vector.normalize()
      orientationsStart.push(vector.x, vector.y, vector.z, vector.w)
      // orientation end
      vector.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1)
      vector.normalize()
      orientationsEnd.push(vector.x, vector.y, vector.z, vector.w)
    }
    const geometry = new THREE.InstancedBufferGeometry()
    geometry.maxInstancedCount = instances // set so its initalized for dat.GUI, will be set in first draw otherwise
    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.addAttribute('offset', new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3))
    geometry.addAttribute('color', new THREE.InstancedBufferAttribute(new Float32Array(colors), 4))
    geometry.addAttribute('orientationStart', new THREE.InstancedBufferAttribute(new Float32Array(orientationsStart), 4))
    geometry.addAttribute('orientationEnd', new THREE.InstancedBufferAttribute(new Float32Array(orientationsEnd), 4))

    return geometry
  }

  resetAtNewCycle () {

  }

  update (dt = 0, time = 0) {
    this.mesh.rotation.y = time * 0.1
    this.mesh.material.uniforms.time.value = time
    this.mesh.material.uniforms.sineTime.value = Math.sin(this.mesh.material.uniforms.time.value)
  }
}
