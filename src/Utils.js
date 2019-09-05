let instance = null
class Utils {
  constructor () {
    if (!instance) {
      instance = this
    }
    return instance
  }

  shuffle (array) {
    array.sort(() => Math.random() - 0.5)
  }

  // http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
  // Modified to admit 0x (now not admit #)
  // Lighter colors blendColors(color, 0xFFFFFF, 0.5)
  // Darker colors blendColors(color, 0x000000, 0.5)
  blendColors (c0, c1, p) {
    const f = c0; const t = c1; const R1 = f >> 16; const G1 = f >> 8 & 0x00FF; const B1 = f & 0x0000FF; const R2 = t >> 16; const G2 = t >> 8 & 0x00FF; const B2 = t & 0x0000FF
    return '#' + (0x1000000 + (Math.round((R2 - R1) * p) + R1) * 0x10000 + (Math.round((G2 - G1) * p) + G1) * 0x100 + (Math.round((B2 - B1) * p) + B1)).toString(16).slice(1)
  }
}

export default new Utils()
