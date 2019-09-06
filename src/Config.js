let instance = null
// Singleton pattern in ES6 example
class Config {
  constructor () {
    if (!instance) {
      this.bgColorTop = 0x212121
      this.bgColor = 0x323232

      this.wayColor = 0xffffff
      this.wayColorOver = 0x666666
      this.wayLength = 200
      this.scoreColor = 0xffffff
      this.scoreColorOff = 0x444444
      this.highscoreColor = 0xffcc00

      // pink 0
      // yellow 1
      // green 2
      // orange 3
      // blue 4
      // purple 5
      // white 6
      // red 7
      // Each color has > [token color, sky top color, sky bottom color]
      this.colorArr = [
        [0xfb39ca, 0x483361, 0x9a6a85],
        [0xfdca2a, 0x2c261a, 0x97816e],
        [0x2bca20, 0x3b2d35, 0x74986d],
        [0xfc9125, 0x2d3e5d, 0x9a8f78],
        [0x0d6afc, 0x43293b, 0x607495],
        [0x6419cb, 0x6c2f59, 0x855db6],
        [0xffffff, 0x65573b, 0x747474],
        [0xfa0018, 0x354631, 0xb55e69]
      ]

      this.defaultColorArr = [0x000000, 0x212121, 0x323232]
      this.transitionSpeed = 2
      this.lerpSpeed = 0.9
      this.maxHints = 6
      instance = this
    }
    return instance
  }
}

export default new Config()
