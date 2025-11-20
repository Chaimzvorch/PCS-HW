// Get the canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Array to hold all the balls
let balls = [];

// Ball class to represent each ball
class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = Math.random() * 4 - 2; // Horizontal speed (random between -2 and 2)
        this.dy = Math.random() * -4 - 2; // Vertical speed (random negative value to start moving upwards)
        this.gravity = 0.1; // Gravity strength
        this.bounceDamping = 0.7; // Damping effect on bounce (ball loses some energy)
    }

    // Draw the ball on the canvas
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    // Move the ball with gravity, and handle wall collisions
    move() {
        // Apply gravity
        this.dy += this.gravity;

        // Update position
        this.x += this.dx;
        this.y += this.dy;

        // Bounce off the walls (left and right)
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx; // Reverse horizontal speed
        }

        // Bounce off the bottom (ground) with gravity effect
        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius; // Place the ball on the ground
            this.dy = -this.dy * this.bounceDamping; // Reverse vertical speed and apply damping
            if (Math.abs(this.dy) < 0.5) {
                this.dy = 0; // Stop moving when it gets too small (no more bounces)
            }
        }

        // Stop ball if it's moving too slow (after a few bounces)
        if (Math.abs(this.dy) < 0.2 && Math.abs(this.dx) < 0.2) {
            this.dy = 0;
            this.dx = 0;
        }
    }
}

// Function to add a new ball based on user input
document.getElementById('addBallButton').addEventListener('click', () => {
    const color = document.getElementById('ballColor').value;
    const size = parseInt(document.getElementById('ballSize').value);

    // Create a new ball and add it to the balls array
    const newBall = new Ball(
        canvas.width / 2, // Start at the center of the canvas
        canvas.height / 2, // Start at the center of the canvas
        size, // Radius from user input
        color // Color from user input
    );

    balls.push(newBall);
});


function update() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw each ball
    balls.forEach(ball => {
        ball.move();
        ball.draw();
    });


    requestAnimationFrame(update);
}


update();