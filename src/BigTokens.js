import { app } from './context'

export default class BigTokens extends THREE.Group {
  constructor () {
    super()
    this.app = app
    // this.addTokens()
    this.app.on('tokenAdded', this.tokenAdded.bind(this))
    this.app.on('setBigTokens', this.setBigTokens.bind(this))
    this.app.on('postSolved', this.postSolved.bind(this))
    this.app.on('endgame', this.endgame.bind(this))
  }

  tokenAdded (geo, mat, i) {
    const token = new THREE.Mesh(geo, mat)
    token.name = i
    this.add(token)
  }

  setBigTokens (correctWay) {
    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i].name === correctWay) {
        this.children[i].visible = true
        var hexStr = '#' + this.children[i].material.color.getHexString()
        document.querySelector('meta[name="theme-color"]').setAttribute('content', hexStr)
        this.app.emit('setCorrectName', this.children[i].name)
      } else {
        this.children[i].visible = false
      }
    }
    this.visible = true
  }

  postSolved () {
    this.visible = false
  }

  endgame () {
    this.visible = false
  }

  update (dt = 0) {
  }
}
