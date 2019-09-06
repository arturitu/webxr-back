import { app } from './context'
import Config from './Config'
import Utils from './Utils'

export default class Tokens extends THREE.Group {
  constructor () {
    super()
    this.app = app
    this.tokensInitialPosZ = 50
    this.position.z = -this.tokensInitialPosZ
    this.addTokens()
    this.app.on('setCorrectRememberedWay', this.setCorrectRememberedWay.bind(this))
    this.app.on('shuffleTokens', this.shuffleTokens.bind(this))
    this.app.on('reorderTokens', this.reorderTokens.bind(this))
    this.app.on('setStoredTokens', this.setStoredTokens.bind(this))
    this.app.on('shuffleStoredTokens', this.shuffleStoredTokens.bind(this))
    this.app.on('solve', this.solve.bind(this))
    this.app.on('solveRemembering', this.solveRemembering.bind(this))
    this.app.on('postSolved', this.postSolved.bind(this))
  }

  addTokens () {
    for (let i = 0; i < 5; i++) {
      let tokenGeometry
      switch (i) {
        case 0:
          tokenGeometry = new THREE.RingBufferGeometry(0.25, 0.35, 3)
          break
        case 1:
          tokenGeometry = new THREE.RingBufferGeometry(0.25, 0.35, 4)
          break
        case 2:
          tokenGeometry = new THREE.RingBufferGeometry(0.25, 0.35, 5)
          break
        case 3:
          tokenGeometry = new THREE.RingBufferGeometry(0.25, 0.35, 6)
          break
        case 4:
          tokenGeometry = new THREE.RingBufferGeometry(0.25, 0.35, 32)
          break
      }
      const tokenMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
      const token = new THREE.Mesh(tokenGeometry, tokenMaterial)
      token.name = i
      token.position.x = i * 2 - 4
      token.position.y = 1.5
      this.app.emit('tokenAdded', tokenGeometry, tokenMaterial, i)
      this.add(token)
    }
    this.app.emit('allTokensAdded')
  }

  setCorrectRememberedWay (tokensStore, index) {
    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i].name === tokensStore[index][1][0]) {
        this.app.emit('correctWayChanged', (this.children[i].position.x + 4) / 2)
        this.app.emit('showCorrectReward', this.children[i].name)
      }
    }
  }

  shuffleTokens () {
    Utils.shuffle(this.children)
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].position.x = i * 2 - 4
      var tmpColor = Config.colorArr[i][0]
      this.children[i].material.color.set(tmpColor)
    }
    this.app.emit('tokensShuffled', this.children)
  }

  setStoredTokens () {
    this.position.z = this.tokensInitialPosZ / 2
  }

  shuffleStoredTokens () {
    this.position.z = -this.tokensInitialPosZ
  }

  reorderTokens (tokensStore, i, index) {
    for (var j = 0; j < this.children.length; j++) {
      if (this.children[j].name === tokensStore[index][0][i][0]) {
        this.children[j].position.x = i * 2 - 4
        this.children[j].material.color.set(tokensStore[index][0][i][1])
      }
    }
  }

  solve (actualWay, correcName) {
    if (this.children[actualWay].name === correcName) {
      this.app.emit('solveOK')
    } else {
      this.app.emit('solveERROR')
    }
    this.visible = false
  }

  solveRemembering (actualWay, correctWay) {
    if (this.children[actualWay].name === this.children[correctWay].name) {
      this.app.emit('solveRememberingOK')
    } else {
      this.app.emit('solveRememberingERROR')
    }
    this.visible = false
  }

  postSolved () {
    this.visible = true
  }

  update (dt = 0) {
  }
}
