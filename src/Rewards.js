import { app } from './context'
// import Config from './Config'

export default class Rewards extends THREE.Group {
  constructor () {
    super()
    this.app = app
    this.radius = 0.05
    this.position.z = -0.5
    this.position.y = -0.05
    this.addRewards()
    this.addErrorReward()
    this.visible = false
    this.app.on('showCorrectReward', this.showCorrectReward.bind(this))
    this.app.on('resetAtNewCycle', this.resetAtNewCycle.bind(this))
    this.app.on('solve', this.solve.bind(this))
    this.app.on('solveERROR', this.solveERROR.bind(this))
    this.app.on('solveRemembering', this.solve.bind(this))
    this.app.on('solveRememberingERROR', this.solveERROR.bind(this))
    this.app.on('endgame', this.endgame.bind(this))
  }

  addRewards () {
    const rewardMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
    for (let i = 0; i < 5; i++) {
      let rewardGeometry
      switch (i) {
        case 0:
          rewardGeometry = this.getRewardGeometry(3)
          break
        case 1:
          rewardGeometry = this.getRewardGeometry(4)
          break
        case 2:
          rewardGeometry = this.getRewardGeometry(5)
          break
        case 3:
          rewardGeometry = this.getRewardGeometry(6)
          break
        case 4:
          rewardGeometry = this.getRewardGeometry(32)
          break
      }
      const reward = new THREE.Line(rewardGeometry, rewardMaterial)
      reward.name = i
      this.add(reward)
    }
  }

  addErrorReward () {
    const crossShape = new THREE.Shape()
    crossShape.moveTo(0, -7.5)
    crossShape.lineTo(-32.5, -40)
    crossShape.lineTo(-40, -32.5)
    crossShape.lineTo(-7.5, 0)
    crossShape.lineTo(-40, 32.5)
    crossShape.lineTo(-32.5, 40)
    crossShape.lineTo(0, 10)
    crossShape.lineTo(32.5, 40)
    crossShape.lineTo(40, 32.5)
    crossShape.lineTo(10, 0)
    crossShape.lineTo(40, -32.5)
    crossShape.lineTo(32.5, -40)
    crossShape.lineTo(0, -7.5)
    const geometry = new THREE.ShapeGeometry(crossShape)
    const material = new THREE.MeshBasicMaterial()
    const mesh = new THREE.Mesh(geometry, material)
    mesh.scale.set(this.radius * 0.02, this.radius * 0.02, this.radius * 0.02)
    this.add(mesh)
  }

  showCorrectReward (correctName) {
    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i].name === correctName) {
        this.children[i].visible = true
      } else {
        this.children[i].visible = false
      }
    }
  }

  getRewardGeometry (segmentCount) {
    var rewardGeometry = new THREE.Geometry()
    for (var i = 0; i <= segmentCount; i++) {
      var theta = (i / segmentCount) * Math.PI * 2
      rewardGeometry.vertices.push(
        new THREE.Vector3(
          Math.cos(theta) * this.radius,
          Math.sin(theta) * this.radius,
          0))
    }
    return rewardGeometry
  }

  resetAtNewCycle () {
    this.position.z = -0.5
    this.visible = false
  }

  solve () {
    this.scale.set(0.1, 0.1, 0.1)
    this.visible = true
  }

  solveERROR () {
    for (var i = 0; i < this.children.length; i++) {
      if (i === this.children.length - 1) {
        this.children[i].visible = true
      } else {
        this.children[i].visible = false
      }
    }
  }

  endgame () {
    this.visible = false
  }

  update (dt = 0) {
  }
}
