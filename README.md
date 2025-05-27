# Dodgy Stitch Game

A web-based arcade game where Stitch must dodge bullets from alien spaceships while collecting coins to recover health.

## Game Features

- Control Stitch using left and right arrow keys
- Dodge bullets from alien spaceship
- Collect coins by dodging bullets
- 5 hearts system for health
- 10 coins = 1 heart recovery
- Responsive design
- Simple yet challenging gameplay
- Increasing difficulty level
- Score tracking system
- Game over condition
- Visual feedback for health and coins

## Controls

- Left Arrow Key: Move Stitch left
- Right Arrow Key: Move Stitch right
- Space Bar: Pause/Resume game

## Game Mechanics

- Stitch starts with 5 hearts (health points)
- Each time Stitch is hit by a bullet, he loses 1 heart
- Game ends when all hearts are lost
- Collect coins by dodging 5 bullets
- 10 coins can be used to recover 1 heart
- Alien spaceship moves side to side and shoots bullets
- Bullets move downward from the spaceship
- Score increases with each dodged bullet

## Project Implementation

### Technical Details
- HTML5 Canvas for rendering graphics
- JavaScript for game logic and physics
- CSS for styling and layout
- Pure JavaScript implementation without external game libraries

### Code Structure
- `index.html`: Main game container and UI elements
- `styles.css`: Game styling and layout
- `game.js`: Core game logic, physics, and mechanics

### Key Features Implementation
- **Collision Detection**: Uses bounding box collision detection for bullets and Stitch
- **Scoring System**: Points awarded for dodging bullets
- **Health System**: 5 heart system with coin-based recovery
- **Movement System**: Smooth character movement using arrow keys
- **UI Elements**: Dynamic display of hearts, coins, and score

## Development Tools

- Visual Studio Code
- GitHub for version control
- GitHub Pages for hosting

## License

This project is for educational purposes only. All rights reserved.
