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
}

export default new Utils()
