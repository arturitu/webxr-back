import { app } from './context'
import StartBtn from './StartBtn'
import Hints from './Hints'
import BigTokens from './BigTokens'
import Score from './Score'
import PlayRewPanels from './PlayRewPanels'
import AudioBtn from './AudioBtn'

export default class Scoreboard extends THREE.Group {
  constructor () {
    super()
    this.app = app
    this.position.set(0, 1.25, -5)

    this.startBtn = new StartBtn()
    this.startBtn.position.set(0, 0.2, 0)
    this.add(this.startBtn)

    this.hints = new Hints()
    this.hints.position.set(0, 1, 0)
    this.hints.visible = false
    this.add(this.hints)

    this.bigTokens = new BigTokens()
    this.bigTokens.position.set(0, 0.5, 0)
    this.bigTokens.visible = false
    this.add(this.bigTokens)

    this.score = new Score()
    this.score.position.set(0, 1.5, 0)
    this.add(this.score)

    this.playRewPanels = new PlayRewPanels()
    this.playRewPanels.position.set(0, 0.5, 0)
    this.playRewPanels.visible = false
    this.add(this.playRewPanels)

    this.audioBtn = new AudioBtn()
    this.audioBtn.position.set(0, 2.25, 0)
    this.add(this.audioBtn)

    this.app.on('startgame', this.startgame.bind(this))
    this.app.on('endgame', this.endgame.bind(this))
  }

  startgame () {
    this.startBtn.interactiveObj.visible = false
  }

  endgame () {
    this.score.visible = true
    this.startBtn.interactiveObj.visible = true
  }

  update (dt = 0) {
  }
}
