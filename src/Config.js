let instance = null
// Singleton pattern in ES6 example
class Config {
  constructor () {
    if (!instance) {
      // green
      // this.bgColorTop = 0x3b2d35
      // this.bgColor = 0x74986d

      // orange
      // this.bgColorTop = 0x2d3e5d
      // this.bgColor = 0x9a8f78

      // pink
      // this.bgColorTop = 0x483361
      // this.bgColor = 0x9a6a85

      // yellow
      // this.bgColorTop = 0x2c261a
      // this.bgColor = 0x97816e

      // blue
      // this.bgColorTop = 0x43293b
      // this.bgColor = 0x607495

      // red
      // this.bgColorTop = 0x354631
      // this.bgColor = 0xb55e69

      // purple
      // this.bgColorTop = 0x6c2f59
      // this.bgColor = 0x855db6

      // white
      // this.bgColorTop = 0x65573b
      // this.bgColor = 0x747474

      this.bgColorTop = 0x212121
      this.bgColor = 0x323232

      this.wayColor = 0xffffff
      this.wayColorOver = 0x666666
      this.wayLength = 200
      this.scoreColor = 0xffffff
      this.scoreColorOff = 0x444444
      this.highscoreColor = 0xffcc00
      this.colorArr = [
        0xfb39ca,
        0xfdca2a,
        0x2bca20,
        0xfc9125,
        0x0d6afc,
        0x6419cb,
        0xffffff,
        0xfa0018
      ]
      this.lerpSpeed = 0.9
      this.maxHints = 6
      instance = this
    }
    return instance
  }
}

export default new Config()
