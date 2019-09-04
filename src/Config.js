let instance = null
// Singleton pattern in ES6 example
class Config {
  constructor () {
    if (!instance) {
      this.bgColor = 0x111111
      this.bgColorBack = 0x121212
      this.wayColor = 0x555555
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
