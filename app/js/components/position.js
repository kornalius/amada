import { Component } from '../ecs'

class Position extends Component {

  constructor (x, y) {
    super()
    this.x = x
    this.y = y
  }

}

export default Position
