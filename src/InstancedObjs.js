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

    this.currentVector = new THREE.Vector3()
    const geometry = this.getGeometry()
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: { value: 1.0 },
        sineTime: { value: 1.0 },
        fogColor: {
          type: 'c',
          value: new THREE.Color(Config.bgColor)
        },
        fogFar: {
          type: 'f',
          value: 45
        },
        fogNear: {
          type: 'f',
          value: 0
        }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide,
      transparent: true
    })
    this.mesh = new THREE.Mesh(geometry, material)
    this.add(this.mesh)
    this.app.on('resetAtNewCycle', this.resetAtNewCycle.bind(this))
    this.app.on('speedChanged', this.speedChanged.bind(this))
    this.app.on('changedToBackSpeed', this.changedToBackSpeed.bind(this))
  }

  getGeometry () {
    // const bufferGeometry = new THREE.PlaneBufferGeometry(2, 0.25)
    const bufferGeometry = new THREE.CircleBufferGeometry(2, 0)
    const geometry = new THREE.InstancedBufferGeometry()
    geometry.index = bufferGeometry.index
    geometry.attributes.position = bufferGeometry.attributes.position
    geometry.attributes.uv = bufferGeometry.attributes.uv
    var offsets = []
    var orientations = []
    var scales = []

    var vector = new THREE.Vector4()
    var x, y, z

    this.actualSpeed = 0
    this.totalObjs = 300
    for (var i = 0; i < this.totalObjs; i++) {
      // offsets

      let tmpVal = 1
      if (Math.random() > 0.5) {
        tmpVal = -1
      }
      x = 15 * tmpVal
      y = Math.floor(Math.random() * 15) * (Math.random() * 5) - 4
      z = Math.floor(Math.random() * 200 - 100)
      vector.set(x, y, z, 0).normalize()
      offsets.push(x, y, z)

      // orientations
      var quaternion = new THREE.Quaternion()
      quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      orientations.push(quaternion.x, quaternion.y, quaternion.z, quaternion.w)

      // scales
      scales.push(1, 1, 1)
    }

    this.scaleAttribute = new THREE.InstancedBufferAttribute(new Float32Array(scales), 3).setDynamic(true)
    this.offsetAttribute = new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3).setDynamic(true)
    this.orientationAttribute = new THREE.InstancedBufferAttribute(new Float32Array(orientations), 4)

    geometry.addAttribute('offset', this.offsetAttribute)
    geometry.addAttribute('orientation', this.orientationAttribute)
    geometry.addAttribute('scale', this.scaleAttribute)
    return geometry
  }

  resetAtNewCycle () {

  }

  speedChanged (val) {
    console.log(val)
    this.actualSpeed = val
  }

  changedToBackSpeed (val) {
    console.log(val)
    this.actualSpeed = -val
  }

  update (dt = 0, time = 0) {
    // console.log(this.app.renderer.info.render.calls)
    // this.mesh.material.uniforms.time.value = time
    // this.mesh.material.uniforms.sineTime.value = Math.sin(this.mesh.material.uniforms.time.value)
    var scaleSin = (Math.sin(time) + 1) / 2
    for (var i = 0, il = this.scaleAttribute.count; i < il; i++) {
      // this.currentVector.fromArray(this.scaleAttribute.array, (i * 3))
      // this.scaleAttribute.setXYZ(i, scaleSin * (3 + (i / 100)), 0.2, 1)
      this.scaleAttribute.setXYZ(i, (3 + (i / 100)), 0.05, 1)
      if (this.offsetAttribute.getZ(i) > 100) {
        this.offsetAttribute.setZ(i, -100)
      } else if (this.offsetAttribute.getZ(i) < -100) {
        this.offsetAttribute.setZ(i, 100)
      } else {
        this.offsetAttribute.setZ(i, this.offsetAttribute.getZ(i) + (this.actualSpeed * 10 / ((this.totalObjs - i / 5) + (i / 50))))
      }
    }
    this.scaleAttribute.needsUpdate = true
    this.offsetAttribute.needsUpdate = true
  }
}
