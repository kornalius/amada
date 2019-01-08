import { System } from '../ecs'
import Position from '../components/position'
import Velocity from '../components/velocity'

class PhysicSystem extends System {

  update (elapsed) {
    console.log(elapsed)
    // scheduler.setDuration(1000)
    let entities = this.entitiesOf(Position, Velocity)
    entities.forEach((entity) => {
      let position = entity.getComponent('position')
      let velocity = entity.getComponent('velocity')
      position.x += velocity.x * elapsed
      position.y += velocity.y * elapsed
    })
  }

}

export default PhysicSystem
