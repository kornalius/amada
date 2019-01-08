import { ReactDOM, React, scheduler, ROT } from './amada'
import { Entity } from './ecs'
import Position from './components/position'
import Velocity from './components/velocity'
import Health from './components/health'
import world from './entities/world'
import { display, tileSet } from './ui/display'
import { messageConsole } from './ui/message-console'
import Index from './ui/components/index.jsx'

ROT.RNG.setSeed(21654)

ReactDOM.render(
  <Index />,
  document.getElementById('content')
)

let hero = new Entity({
  position: new Position(0, 0),
  speed: new Velocity(0, 0),
  hp: new Health(100),
})
world.addEntity(hero)

tileSet.onload = () => {
  display.draw(1, 1, ['@', '~'], '#f00')
  display.draw(1, 2, '@', '#fff')
  display.draw(2, 2, '~', '#0ff')
}

document.getElementById('content').appendChild(display.getContainer())
document.getElementById('content').appendChild(messageConsole.getContainer())

messageConsole.drawText(0, 0, 'This %c{red}line%c{} of text is very long.', 16)

for (let i = 0; i < 20; i++) {
  let current = scheduler.next()
  current.update()
}

// engine.start()
