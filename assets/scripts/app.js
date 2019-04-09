'use strict'
import * as PIXI from 'pixi.js'
import { keyboard } from './gameObjects/gameController'

// Aliases
const Application = PIXI.Application
const Container = PIXI.Container
const loader = PIXI.loader
const resources = PIXI.loader.resources
const id = PIXI.loader.id
const TextureCache = PIXI.utils.TextureCache
const Sprite = PIXI.Sprite
const Rectangle = PIXI.Rectangle

const swordImg = '../../public/sword.png'

// Create a Pixi Application
const app = new Application({
  width: 512,
  height: 512,
  antialias: true,
  transparent: false,
  resolution: 1
})

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
app.renderer.view.style.position = 'absolute'
app.renderer.view.style.display = 'block'
app.renderer.autoResize = true
app.renderer.resize(window.innerWidth, window.innerHeight)

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view)

// load the texture we need
loader.add('../../public/sword.png').load(setup)
// This creates a texture from a 'bunny.png' image
let sword
let state
function setup () {
  // Setup the position of the sword
  sword = new Sprite(resources['../../public/sword.png'].texture)
  sword.x = 300
  sword.y = 500
  sword.anchor.x = 0.5
  sword.anchor.y = 0.5
  sword.vx = 0
  sword.vy = 0
  // Add the sword to the scene we are building
  app.stage.addChild(sword)
  // Capture the keyboard arrow keys
  const up = keyboard('w')
  const left = keyboard('a')
  const down = keyboard('s')
  const right = keyboard('d')

  // Left arrow key `press` method
  left.press = () => {
    // Change the cat's velocity when the key is pressed
    sword.vx = -5
    sword.vy = 0
  }

  // Left arrow key `release` method
  left.release = () => {
    // If the left arrow has been released, and the right arrow isn't down,
    // and the sword isn't moving vertically:
    // Stop the sword
    if (!right.isDown && sword.vy === 0) {
      sword.vx = 0
    }
  }

  // Up
  up.press = () => {
    sword.vy = -5
    sword.vx = 0
  }
  up.release = () => {
    if (!down.isDown && sword.vx === 0) {
      sword.vy = 0
    }
  }

  // Right
  right.press = () => {
    sword.vx = 5
    sword.vy = 0
  }
  right.release = () => {
    if (!left.isDown && sword.vy === 0) {
      sword.vx = 0
    }
  }

  // Down
  down.press = () => {
    sword.vy = 5
    sword.vx = 0
  }
  down.release = () => {
    if (!up.isDown && sword.vx === 0) {
      sword.vy = 0
    }
  }
  state = play

  // Listen for frame updates
  app.ticker.add(delta => gameLoop(delta))
}
// each frame we spin the sword around a bit
function gameLoop (delta) {
  state(delta)
}
function play (delta) {
  // Move the sword 1 pixel to the right each frame
  sword.x += sword.vx
  sword.y += sword.vy
}
