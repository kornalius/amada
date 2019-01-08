import { ROT } from '../amada'
import { Component } from '../ecs'
import { display } from '../ui/display'

class Map extends Component {

  constructor (w = 100, h = 75) {
    super()
    this._data = {}
    this._map = new ROT.Map.Uniform(w, h)
    var data = this._data
    this._map.create((x, y, wall) => {
      data[x + ',' + y] = wall
      if (wall) display.draw(x, y, '#')
    })
    for (let room of this._map.getRooms()) {
      room.getDoors((x, y) => display.draw(x, y, '#', '', 'red'))
    }
  }

  get map () {
    return this._map
  }

  get data () {
    return this._data
  }

}

export default Map
