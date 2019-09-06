import { app } from './context'
import World from './World'
import Rewards from './Rewards'
import Scoreboard from './Scoreboard'

import InputManager from './InputManager'
import GameManager from './GameManager'
import Synth from './Synth'
import Sky from './Sky'
import InstancedObjs from './InstancedObjs'

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
  const synth = new Synth()
  app.synth = synth
  const sky = new Sky()
  app.scene.add(sky)
  const instancedObjs = new InstancedObjs()
  app.scene.add(instancedObjs)
}
