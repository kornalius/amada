import { ROT } from '../amada'
import { Component } from '../ecs'
import { display } from '../ui/display'

class FOV extends Component {

  constructor () {
    super()
    var map = this._entity.map
    this._map = map
    this._fov = new ROT.FOV.RecursiveShadowcasting((x, y) => {
      return map.data[x + ',' + y] === 0
    })
  }

  compute () {
    var data = this._map.data
    this._fov.compute90(6, 17, 20, 2, (x, y, r, visibility) => {
      let key = x + ',' + y
      let ch = r ? (data[key] ? '#' : '.') : '@'
      let color = data[key] ? '#aa0' : '#660'
      display.draw(x, y, ch, '#fff', color)
    })
  }
}

export default FOV
