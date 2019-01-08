import { Component } from '../ecs'

class Velocity extends Component {

  constructor (x, y) {
    super()
    this.x = x
    this.y = y
  }

}

export default Velocity
