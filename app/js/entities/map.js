import { Entity } from '../ecs'
import Position from '../components/position'
import Size from '../components/size'
import Map from '../components/map'
import FOV from '../components/fov'

let mapEntity = (w, h) => new Entity({
  map: new Map(w, h),
  fov: new FOV(),
  origin: new Position(0, 0),
  size: new Size(w, h),
})

export default mapEntity
