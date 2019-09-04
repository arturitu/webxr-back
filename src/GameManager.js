import { app } from './context'
import Config from './Config'
import Utils from './Utils'

module.exports = class GameManager {
  constructor (opt = {}) {
    this.app = app
    this.world = opt.world
    this.rewards = opt.rewards
    this.scoreboard = opt.scoreboard

    this.correctName = 0
    // 0 - before start
    // 1 - started
    // 2 - catching
    // 3 - back
    // 4 - remembering
    // 5 - lose
    // 6 - max score 999
    this.gameStatus = 0

    this.highscore = window.localStorage.getItem('unboring.js13k.back')
    if (this.highscore !== null) {
      this.app.emit('scoreboardchanged', this.highscore, true)
    } else {
      this.app.emit('scoreboardchanged', this.highscore, true)
    }

    this.actualWay = 2
    this.newWay = 2
    this.correctWay = 2
    this.targetXpos = 0
    this.resetGameSettings()
    this.app.on('startgame', this.startgame.bind(this))
    this.app.on('wayChanged', this.wayChanged.bind(this))
    this.app.on('wayLeft', this.wayLeft.bind(this))
    this.app.on('wayRight', this.wayRight.bind(this))
    this.app.on('correctWayChanged', this.correctWayChanged.bind(this))
    this.app.on('tokensShuffled', this.tokensShuffled.bind(this))
    this.app.on('setCorrectName', this.setCorrectName.bind(this))
    this.app.on('solveOK', this.solveOK.bind(this))
    this.app.on('solveERROR', this.solveERROR.bind(this))
    this.app.on('solveRememberingOK', this.solveRememberingOK.bind(this))
    this.app.on('solveRememberingERROR', this.solveRememberingERROR.bind(this))
  }

  startgame () {
    this.resetGameSettings()
    this.gameStatus = 1
    this.app.emit('scoreboardchanged', this.score, false)
    this.newCycle()
  }

  wayChanged (way) {
    this.newWay = way
  }

  wayLeft () {
    if (this.newWay > 0) {
      this.newWay -= 1
    }
  }

  wayRight () {
    if (this.newWay < 4) {
      this.newWay += 1
    }
  }

  resetGameSettings () {
    this.solved = false
    this.errorOnSolved = false
    this.gameSpeed = 10
    this.backSpeed = 50
    this.cycle = 0
    this.cyclesPerRound = 1
    this.caught = 0
    this.remembered = 0
    this.tokensStore = []
    this.score = 0
  }

  getTargetX (way) {
    // Only works for 5 ways
    return (4 - way) * 2 - 4
  }

  newRound () {
    this.app.scene.background = new THREE.Color(Config.bgColor)
    this.app.scene.fog = new THREE.Fog(Config.bgColor, 0, 45)
    if (this.cyclesPerRound === 5) {
      this.gameSpeed += 5
      this.cyclesPerRound = 1
    } else {
      this.cyclesPerRound += 1
    }
    this.cycle = 0
    this.caught = 0
    this.remembered = 0
    this.tokensStore = []
    this.newCycle()
  }

  newCycle () {
    if (this.errorOnSolved) {
      // Error time
      this.gameStatus = 5
      this.endgame()
      return
    }
    if (this.cycle < this.cyclesPerRound && this.caught < this.cyclesPerRound) {
      // Catching time
      this.app.emit('replay')
      this.gameStatus = 2
      this.app.emit('setHints', this.tokensStore, this.gameStatus, this.cycle, this.cyclesPerRound, this.remembered)
      this.setCorrectWay()

      Utils.shuffle(Config.colorArr)
      this.app.emit('shuffleTokens')

      this.app.emit('setBigTokens', this.correctWay)
    } else if (this.cycle < this.cyclesPerRound * 2 && this.caught === this.cyclesPerRound) {
      // Back time
      this.app.emit('rew')
      this.app.scene.background = new THREE.Color(Config.bgColorBack)
      this.app.scene.fog = new THREE.Fog(Config.bgColorBack, 0, 45)
      this.gameStatus = 3
      var modBack = this.cycle % this.cyclesPerRound
      var indexStoredTokens = this.cyclesPerRound - modBack - 1
      this.app.emit('setStoredTokens')
      this.placeStoredTokens(indexStoredTokens)
      this.app.emit('setHints', this.tokensStore, this.gameStatus, this.cycle, this.cyclesPerRound, this.remembered)
    } else if (this.cycle >= this.cyclesPerRound * 2 && this.remembered < this.caught) {
      // Remembering time
      this.app.emit('play')
      this.app.scene.background = new THREE.Color(Config.bgColor)
      this.app.scene.fog = new THREE.Fog(Config.bgColor, 0, 45)
      this.gameStatus = 4

      this.app.emit('shuffleStoredTokens')
      Utils.shuffle(this.tokensStore[this.remembered][0])
      this.placeStoredTokens(this.remembered)

      this.app.emit('setCorrectRememberedWay', this.tokensStore, this.remembered)
      this.setDefaultTheme()
      this.app.emit('setHints', this.tokensStore, this.gameStatus, this.cycle, this.cyclesPerRound, this.remembered)
    } else if (this.score >= 999) {
      this.gameStatus = 6
    } else {
      // Next round
      this.newRound()
      return
    }

    this.app.emit('resetAtNewCycle')
    this.solved = false
    this.world.position.z = 0

    this.cycle++
  }

  // Ticks

  catchingTick (delta) {
    this.world.position.z += this.gameSpeed * delta
    if (Math.abs(this.world.position.z) >= Config.wayLength / 4 - 2 && !this.solved) {
      this.app.emit('solve', this.actualWay, this.correctName)
      this.solved = true
    }
    if (Math.abs(this.world.position.z) >= Config.wayLength / 4 + 2 && !this.world.tokens.visible) {
      this.postSolved()
    }
    if (Math.abs(this.world.position.z) >= Config.wayLength / 4 + 10) {
      this.newCycle()
    }
  }

  backTick (delta) {
    this.world.position.z -= this.backSpeed * delta
    if (this.world.position.z < -Config.wayLength / 3) {
      this.newCycle()
    }
  }

  rememberingTick (delta) {
    this.world.position.z += this.gameSpeed * delta
    if (Math.abs(this.world.position.z) >= Config.wayLength / 4 - 2 && !this.solved) {
      this.app.emit('solveRemembering', this.actualWay, this.correctWay)
      this.solved = true
    }
    if (Math.abs(this.world.position.z) >= Config.wayLength / 4 + 2 && !this.world.tokens.visible) {
      this.postSolved()
    }
    if (Math.abs(this.world.position.z) >= Config.wayLength / 4 + 10) {
      this.newCycle()
    }
  }

  gameTick (delta) {
    switch (this.gameStatus) {
      case 2:
        this.catchingTick(delta)
        break
      case 3:
        this.backTick(delta)
        break
      case 4:
        this.rememberingTick(delta)
        break
    }

    if (this.rewards.visible) {
      var newScale = THREE.Math.lerp(2.5, this.rewards.scale.x, Config.lerpSpeed)
      this.rewards.scale.set(newScale, newScale, newScale)
      this.rewards.position.z += 0.01
    }
  }

  setDefaultTheme () {
    document.querySelector('meta[name="theme-color"]').setAttribute('content', Config.bgColorBack)
  }

  setCorrectWay () {
    this.correctWay = Math.floor(Math.random() * 5)
    this.app.emit('showCorrectReward', this.correctWay)
  }

  correctWayChanged (way) {
    this.correctWay = way
  }

  tokensShuffled (tokensChildren) {
    this.tokensStore[this.caught] = [[], []]
    for (var i = 0; i < tokensChildren.length; i++) {
      tokensChildren[i].position.x = i * 2 - 4
      var tmpColor = Config.colorArr[i]
      tokensChildren[i].material.color.set(tmpColor)
      this.tokensStore[this.caught][0][i] = [tokensChildren[i].name, tmpColor]
      if (tokensChildren[i].name === this.correctWay) {
        this.tokensStore[this.caught][1] = [tokensChildren[i].name, tmpColor]
      }
    }
  }

  placeStoredTokens (index) {
    for (var i = 0; i < this.tokensStore[index][0].length; i++) {
      this.app.emit('reorderTokens', this.tokensStore, i, index)
    }
  }

  setCorrectName (name) {
    this.correctName = name
  }

  postSolved () {
    this.app.emit('postSolved')
    this.app.emit('setHints', this.tokensStore, this.gameStatus, this.cycle, this.cyclesPerRound, this.remembered)
  }

  solveOK () {
    this.caught += 1
  }

  solveERROR () {
    this.errorOnSolved = true
  }

  solveRememberingOK () {
    this.remembered += 1
    this.score += 1
    this.app.emit('scoreboardchanged', this.score, false)
  }

  solveRememberingERROR () {
    this.errorOnSolved = true
  }

  endgame () {
    this.app.emit('endgame')
    this.app.scene.background = new THREE.Color(Config.bgColor)
    this.app.scene.fog = new THREE.Fog(Config.bgColor, 0, 45)
    if (this.score > Number(this.highscore)) {
      this.highscore = this.score
      window.localStorage.setItem('unboring.js13k.back', this.score)
    }
    this.app.emit('scoreboardchanged', this.highscore, true)
    this.setDefaultTheme()
  }

  update (dt) {
    if (this.gameStatus > 0 && this.gameStatus < 5) {
      this.gameTick(dt)
    }

    if (this.newWay !== this.actualWay) {
      this.actualWay = this.newWay
      this.targetXpos = this.getTargetX(this.newWay)
    }

    if (this.targetXpos !== this.world.position.x) {
      this.world.position.x = THREE.Math.lerp(this.targetXpos, this.world.position.x, Config.lerpSpeed)
    }
  }
}
