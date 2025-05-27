// Game constants
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const HEARTS = 5;
const INITIAL_AMMO = 5;
const COINS_FOR_AMMO = 10;
const BULLET_SPEED = 5;
const ALIEN_SHIP_SPEED = 2;

// Preload sounds with error handling
const sounds = {
    bullet: new Audio('audio/bullet-shoot.mp3'),
    stitchCry: new Audio('audio/stitch-cry.mp3')
};

// Set sound volume
sounds.bullet.volume = 0.5;
sounds.stitchCry.volume = 0.8;

// Add error handling for sounds
sounds.bullet.onerror = () => {
    console.error('Bullet sound failed to load');
    // Fallback to default sound
    sounds.bullet = new Audio('audio/default-sound.mp3');
};

sounds.stitchCry.onerror = () => {
    console.error('Stitch cry sound failed to load');
    // Fallback to default sound
    sounds.stitchCry = new Audio('audio/default-sound.mp3');
};

// Add success logging
sounds.bullet.oncanplaythrough = () => console.log('Bullet sound loaded successfully');
sounds.stitchCry.oncanplaythrough = () => console.log('Stitch cry sound loaded successfully');

canvas.width = 800;
canvas.height = 600;

// Preload images
const images = {
    background: new Image(),
    stitch: new Image(),
    alien: new Image(),
    heart: new Image(),
    bullet: new Image()
};

// Load images with error handling
images.background.src = 'images/space-background.jpg';
images.stitch.src = 'images/stitch.png';
images.alien.src = 'images/aliens.png';
images.heart.src = 'images/heart.png';
images.bullet.src = 'images/bullet.png';

// Add error handling for image loading
images.stitch.onerror = () => console.error('Stitch image failed to load');
images.alien.onerror = () => console.error('Alien image failed to load');
images.heart.onerror = () => console.error('Heart image failed to load');
images.bullet.onerror = () => console.error('Bullet image failed to load');

// Add success logging
images.stitch.onload = () => console.log('Stitch image loaded successfully');
images.alien.onload = () => console.log('Alien image loaded successfully');
images.heart.onload = () => console.log('Heart image loaded successfully');
images.bullet.onload = () => console.log('Bullet image loaded successfully');

// Game state
let gameRunning = true;
let score = 0;
let coins = 0;
let ammo = INITIAL_AMMO;
let hearts = HEARTS;
let gameReady = false;

// Player (Stitch)
const stitch = {
    x: canvas.width / 2,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    speed: 7
};

// Alien Ship
const alienShip = {
    x: canvas.width / 2,
    y: 50,
    width: 100,
    height: 50
};

// Arrays to store bullets and coins
let bullets = [];
let coinsArray = [];

// Wait for images to load
Promise.all([
    new Promise(resolve => images.stitch.onload = resolve),
    new Promise(resolve => images.alien.onload = resolve),
    new Promise(resolve => images.heart.onload = resolve),
    new Promise(resolve => images.bullet.onload = resolve)
]).then(() => {
    gameReady = true;
    gameLoop();
});

// Game loop
function gameLoop() {
    if (!gameRunning || !gameReady) return;
    
    update();
    draw();
    
    requestAnimationFrame(gameLoop);
}

// Update game state
function update() {
    // Move alien ship
    alienShip.x += Math.random() > 0.5 ? ALIEN_SHIP_SPEED : -ALIEN_SHIP_SPEED;
    alienShip.x = Math.max(0, Math.min(canvas.width - alienShip.width, alienShip.x));
    
    // Update bullets
    bullets.forEach((bullet, index) => {
        bullet.y += BULLET_SPEED;
        
        // Check collision with stitch
        if (checkCollision(bullet, stitch)) {
            hearts--;
            if (hearts <= 0) {
                gameRunning = false;
                sounds.stitchCry.play(); // Play Stitch cry sound
                alert('Game Over! Final Score: ' + score);
            }
            bullets.splice(index, 1);
        }
        
        // Remove bullets that go off screen
        if (bullet.y > canvas.height) {
            score++;
            if (score % 5 === 0) {
                coins++;
                if (coins % COINS_FOR_AMMO === 0 && ammo < HEARTS) {
                    ammo++;
                }
            }
            bullets.splice(index, 1);
        }
    });
    
    // Spawn bullets from alien ship
    if (Math.random() < 0.02) {
        const bullet = {
            x: alienShip.x + alienShip.width / 2,
            y: alienShip.y + alienShip.height,
            width: 10,
            height: 10
        };
        bullets.push(bullet);
        sounds.bullet.play(); // Play bullet sound
    }
    
    // Move stitch
    if (keys.left && stitch.x > 0) stitch.x -= stitch.speed;
    if (keys.right && stitch.x < canvas.width - stitch.width) stitch.x += stitch.speed;
}

// Draw game elements
function draw() {
    // Draw background
    ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);
    
    // Draw alien ship
    ctx.drawImage(images.alien, alienShip.x, alienShip.y, alienShip.width, alienShip.height);
    
    // Draw bullets
    bullets.forEach(bullet => {
        ctx.drawImage(images.bullet, bullet.x, bullet.y, bullet.width, bullet.height);
    });
    
    // Draw stitch
    ctx.drawImage(images.stitch, stitch.x, stitch.y, stitch.width, stitch.height);
    
    // Draw hearts
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.fillText('Hearts:', 10, 30);
    for (let i = 0; i < hearts; i++) {
        ctx.drawImage(images.heart, 70 + (i * 30), 10, 20, 20);
    }
    
    // Draw score and coins
    ctx.fillText('Score: ' + score, 10, 60);
    ctx.fillText('Coins: ' + coins, 10, 90);
}

// Collision detection
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Keyboard controls
const keys = {
    left: false,
    right: false
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
});

// Start the game
window.addEventListener('load', () => {
    gameLoop();
});
