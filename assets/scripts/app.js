'use strict'
import * as PIXI from 'pixi.js'
// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application()

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view)

// load the texture we need
PIXI.loader.add('sword', '../../public/sword.png').load((loader, resources) => {
  // This creates a texture from a 'bunny.png' image
  const sword = new PIXI.Sprite(resources.sword.texture)

  // Setup the position of the sword
  sword.x = app.renderer.width / 2
  sword.y = app.renderer.height / 2

  // Rotate around the center
  sword.anchor.x = 0.5
  sword.anchor.y = 0.5

  // Add the sword to the scene we are building
  app.stage.addChild(sword)

  // Listen for frame updates
  app.ticker.add(() => {
    // each frame we spin the sword around a bit
    sword.rotation += 0.01
  })
})
