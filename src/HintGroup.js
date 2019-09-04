import Config from './Config'

export default class HintGroup extends THREE.Group {
  constructor () {
    super()
    const hintGeometry = new THREE.CircleBufferGeometry(0.35, 32)
    const hintMaterial = new THREE.MeshBasicMaterial()
    var hint = new THREE.Mesh(hintGeometry, hintMaterial)
    hint.name = 'hidden'
    this.add(hint)
    for (let i = 0; i < 5; i++) {
      var hintMaterialTmp = new THREE.MeshBasicMaterial()
      let geometryTmp
      switch (i) {
        case 0:
          geometryTmp = new THREE.RingBufferGeometry(0.25, 0.35, 3)
          break
        case 1:
          geometryTmp = new THREE.RingBufferGeometry(0.25, 0.35, 4)
          break
        case 2:
          geometryTmp = new THREE.RingBufferGeometry(0.25, 0.35, 5)
          break
        case 3:
          geometryTmp = new THREE.RingBufferGeometry(0.25, 0.35, 6)
          break
        case 4:
          geometryTmp = new THREE.RingBufferGeometry(0.25, 0.35, 32)
          break
      }
      const hintTmp = new THREE.Mesh(geometryTmp, hintMaterialTmp)
      hintTmp.name = i
      this.add(hintTmp)
    }
  }

  update (dt = 0) {
  }
}
