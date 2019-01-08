import { Component } from '../ecs'

class Health extends Component {

  constructor (maxHealth) {
    super()
    this.health = this.maxHealth = maxHealth
  }

  isDead () {
    return this.health <= 0
  }

  receiveDamage (damage) {
    this.health -= damage
  }
}

export default Health
