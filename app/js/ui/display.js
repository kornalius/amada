import { ROT } from '../amada'

let tileSet = document.createElement('img')
tileSet.src = './assets/tiles.png'

let display = new ROT.Display({
  width: 60,
  height: 50,
  bg: '#111',
  layout: 'tile',
  tileWidth: 16,
  tileHeight: 16,
  tileColorize: true,
  tileSet,
  tileMap: {
    '@': [0, 0],
    '~': [0, 16],
    '.': [16, 0],
    '#': [16, 16]
  }
})

export {
  tileSet,
  display,
}
