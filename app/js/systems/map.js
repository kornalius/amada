import { System } from '../ecs'
import mapEntity from '../entities/map'

class MapSystem extends System {

  createMap (w, h) {
    this.addEntity(mapEntity(100, 100))
  }

  update (elapsed) {
    let entities = this.entitiesOf(Map)
    entities.forEach((entity) => {
      // let map = entity.getComponent('map')
    })
  }

}

export default MapSystem
