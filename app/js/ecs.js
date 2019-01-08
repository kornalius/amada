import { mix, Mixin } from 'mixwith'

class Component {

  constructor () {
    this.name = this.constructor.name.toLowerCase()
  }

  attached (parent, name) {
    parent[name] = this
    this._entity = parent
  }

  detached (parent, name) {
    parent[name] = undefined
    this._entity = null
  }

  update (elapsed) {
    return this
  }

}


class Entity {

  constructor (components = {}) {
    this.id = Entity._id++
    this._components = {}
    for (let key in components) {
      this.addComponent(key, components[key])
    }
  }

  get components () {
    return this._components
  }

  hasComponent (name) {
    return this.getComponent(name) !== undefined
  }

  getComponent (name) {
    return this._components['$' + name]
  }

  addComponent (name, component) {
    this._components['$' + name] = component
    component.attached(this, name)
    return this
  }

  removeComponent (name) {
    let removed = this.getComponent(name)
    this._components['$' + name] = undefined
    removed.detached(this, name)
    return this
  }

  attached (parent) {
  }

  detached (parent) {
  }

  preUpdate () {
  }

  postUpdate () {
  }

  update (elapsed) {
    this.preUpdate()
    let components = this._components
    for (let key in components) {
      components[key].update(elapsed)
    }
    this.postUpdate()
    return this
  }

}

Entity._id = 0


let Entities = Mixin((superclass) => class extends superclass {

  constructor () {
    super(...arguments)
    this._entities = []
  }

  get entities () {
    return this._entities
  }

  entitiesOf (/* component classes */) {
    let l = []
    for (let entity of this._entities) {
      for (let t of arguments) {
        if (entity instanceof t) {
          l.push(entity)
          break
        }
      }
    }
    return l
  }

  addEntity (entity) {
    this._entities.push(entity)
    entity.attached(this)
    return this
  }

  removeEntity (entity) {
    let i = this._entities.indexOf(entity)
    if (i !== -1) {
      let removed = entity
      this._entities.splice(i, 1, 0)
      removed.detached(this)
    }
    return this
  }

  preEntitiesUpdate () {
  }

  postEntitiesUpdate () {
  }

  updateEntities (elapsed) {
    this.preEntitiesUpdate()
    for (let entity of this._entities) {
      entity.update(elapsed)
    }
    this.postEntitiesUpdate()
    return this
  }

})


let Systems = Mixin((superclass) => class extends superclass {

  constructor () {
    super(...arguments)
    this._systems = []
  }

  get systems () {
    return this._systems
  }

  getSystem (/* system classes */) {
    let l = []
    for (let system of this._systems) {
      for (let t of arguments) {
        if (system instanceof t) {
          l.push(system)
          break
        }
      }
    }
    if (l.length === 1) {
      l = l[0]
    }
    return l
  }

  addSystem (system) {
    this._systems.push(system)
    system.attached(this)
    return this
  }

  removeSystem (system) {
    let i = this._systems.indexOf(system)
    if (i !== -1) {
      let removed = system
      this._systems.splice(i, 1, 0)
      this.systemRemoved(removed)
      removed.detached(this)
    }
    return this
  }

  preSystemsUpdate () {
  }

  postSystemsUpdate () {

  }

  updateSystems (elapsed) {
    this.preSystemsUpdate()
    for (let system of this._systems) {
      system.update(elapsed)
    }
    this.postSystemsUpdate()
    return this
  }

})


class BaseClass {}


class System extends mix(BaseClass).with(Entities) {

  constructor (frequency = 1) {
    super()
    this.world = null
    this.frequency = frequency
  }

  attached (parent) {
    this.world = parent
  }

  detached (parent) {
    this.world = null
  }

}


class World extends mix(BaseClass).with(Entities, Systems) {

  constructor () {
    super(...arguments)
    this.updateCounter = 0
    this.lastUpdate = performance.now()
  }

  preUpdate () {
  }

  postUpdate () {
  }

  update () {
    this.preUpdate()
    let now = performance.now()
    let elapsed = now - this.lastUpdate
    this.updateSystems(elapsed)
    this.updateEntities(elapsed)
    this.updateCounter++
    this.lastUpdate = now
    this.postUpdate()
    return this
  }

}

export {
  Component,
  Entity,
  System,
  World
}
