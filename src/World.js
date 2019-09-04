import Tokens from './Tokens'
import Ways from './Ways'

export default class World extends THREE.Group {
  constructor () {
    super()
    this.position.y = -1.7
    this.tokens = new Tokens()
    this.ways = new Ways()
    this.add(this.tokens)
    this.add(this.ways)
  }

  update (dt = 0) {
  }
}
