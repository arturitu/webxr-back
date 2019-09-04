import { app } from './context'
import World from './World'
import Rewards from './Rewards'
import Scoreboard from './Scoreboard'

import InputManager from './InputManager'
import GameManager from './GameManager'

module.exports = function () {
  app.inputManager = new InputManager()
  const scoreboard = new Scoreboard()
  app.scene.add(scoreboard)
  const world = new World()
  app.scene.add(world)
  const rewards = new Rewards()
  app.scene.add(rewards)
  app.gameManager = new GameManager({
    world: world,
    rewards: rewards,
    scoreboard: scoreboard
  })
}
