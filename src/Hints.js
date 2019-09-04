import { app } from './context'
import Config from './Config'
import HintGroup from './HintGroup'

export default class Hints extends THREE.Group {
  constructor () {
    super()
    this.app = app
    this.maxHints = 6
    for (let i = 0; i < Config.maxHints; i++) {
      var hintGroup = new HintGroup()
      hintGroup.scale.set(0.25, 0.25, 0.25)
      hintGroup.position.x = -0.62 + i * 0.25
      this.add(hintGroup)
    }
    this.app.on('setHints', this.setHints.bind(this))
    this.app.on('endgame', this.endgame.bind(this))
  }

  setHints (tokensStore, gameStatus, cycle, cyclesPerRound, remembered) {
    for (var i = 0; i < this.children.length; i++) {
      if (i < cyclesPerRound) {
        this.children[i].visible = true
        if (gameStatus === 2) {
          if (tokensStore[i]) {
            this.updateHint(i, tokensStore[i][1][0], tokensStore[i][1][1])
          } else {
            this.updateHint(i, 'hidden')
          }
        }
        if (gameStatus === 3) {
          var modBack = cycle % cyclesPerRound
          var indexStoredTokens = cyclesPerRound - modBack - 1
          if (indexStoredTokens < i) {
            this.updateHint(i, 'hidden')
          } else {
            this.updateHint(i, tokensStore[i][1][0], tokensStore[i][1][1])
          }
        }
        if (gameStatus === 4) {
          if (i < remembered) {
            this.updateHint(i, tokensStore[i][1][0], tokensStore[i][1][1])
          } else {
            this.updateHint(i, 'hidden')
          }
        }
      } else {
        this.children[i].visible = false
      }
    }
    this.position.x = (((this.maxHints / 2) * 0.25) - (cyclesPerRound * 0.25) / 2)
    this.visible = true
  }

  updateHint (index, name, color) {
    for (var i = 0; i < this.children[index].children.length; i++) {
      if (this.children[index].children[i].name === name) {
        this.children[index].children[i].visible = true
        if (this.children[index].children[i].name !== 'hidden') {
          this.children[index].children[i].material.color.set(color)
        }
      } else {
        this.children[index].children[i].visible = false
      }
    }
  }

  endgame () {
    this.visible = false
  }

  update (dt = 0) {
  }
}
