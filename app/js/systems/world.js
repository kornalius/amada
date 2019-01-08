import { World } from '../ecs'
import MapSystem from '../systems/map'

class WorldSystem extends World {

  constructor () {
    super()
    this._mapSystem = new MapSystem()
    this.addSystem(this._mapSystem)
  }

  get mapSystem () {
    return this._mapSystem
  }

  get currentMap () {
    return this._mapSystem.currentMap
  }

}

export default WorldSystem
