import { scheduler } from '../amada'
import WorldSystem from '../systems/world'
import MapSystem from '../systems/map'

let world = new WorldSystem()
world.addSystem(new MapSystem())

scheduler.add(world, true)

console.log(world)

export default world
