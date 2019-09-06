import vertexShader from './shaders/instancing.vert'
import fragmentShader from './shaders/instancing.frag'

import { app } from './context'
import Config from './Config'
import Utils from './Utils'

export default class InstancedObjs extends THREE.Group {
  constructor () {
    super()

    this.app = app
    if (this.app.renderer.extensions.get('ANGLE_instanced_arrays') === null) {
      console.log('Instancing not supported')
      return
    }

    this.currentVector = new THREE.Vector3()
    this.audioDistortion = 0
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

    this.changingColor = false
    this.count = 0
    this.prevFogColor = 0
    this.fogColor = 0

    this.app.on('resetAtNewCycle', this.resetAtNewCycle.bind(this))
    this.app.on('speedChanged', this.speedChanged.bind(this))
    this.app.on('changedToBackSpeed', this.changedToBackSpeed.bind(this))
    this.app.on('synth', this.synth.bind(this))
    this.app.on('colorChanged', this.colorChanged.bind(this))
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

  synth (val) {
    this.audioDistortion = val
  }

  colorChanged (val, isDefault) {
    this.changingColor = true
    this.endColor = val
    this.prevFogColor = this.mesh.material.uniforms.fogColor.value.getHex()
    if (isDefault) {
      this.fogColor = Config.defaultColorArr[2]
    } else {
      for (let i = 0; i < Config.colorArr.length; i++) {
        if (Config.colorArr[i][0] === val) {
          this.fogColor = Config.colorArr[i][2]
        }
      }
    }
  }

  updateColors () {
    this.transitionFogColor = new THREE.Color(Utils.blendColors(this.prevFogColor, this.fogColor, this.count))
    this.mesh.material.uniforms.fogColor.value = this.transitionFogColor
    this.app.scene.fog.color = this.transitionFogColor
  }

  colorTransitionEnds () {
    this.changingColor = false
    this.count = 0
  }

  update (dt = 0, time = 0) {
    for (var i = 0, il = this.scaleAttribute.count; i < il; i++) {
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

    if (this.changingColor) {
      this.count += dt / 10 * Config.transitionSpeed
      this.updateColors()
      if (this.count >= 1) {
        this.colorTransitionEnds()
      }
    }
  }
}
