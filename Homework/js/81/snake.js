(function () {
    'use strict';

    const SNAKE_SIZE = 64;

    const theCanvas = document.querySelector('#theCanvas');
    const context = theCanvas.getContext('2d');

    // --- Restart button ---
    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Restart Game";
    restartBtn.style.position = "absolute";
    restartBtn.style.top = "20px";
    restartBtn.style.left = "20px";
    restartBtn.style.padding = "10px 20px";
    restartBtn.style.fontSize = "20px";
    restartBtn.style.display = "none"; // hidden at start
    document.body.appendChild(restartBtn);

    function resizeCanvas() {
        theCanvas.width = window.innerWidth - (window.innerWidth % SNAKE_SIZE);
        theCanvas.height = window.innerHeight - (window.innerHeight % SNAKE_SIZE);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let x = 0;
    let y = 0;
    let direction = 'ArrowRight';
    let gameLoop = null;

    function startGame() {
        // Reset game values
        x = 0;
        y = 0;
        direction = 'ArrowRight';
        restartBtn.style.display = "none";

        // Start loop
        gameLoop = setInterval(updateGame, 300);
    }

    const snakeHead = new Image();
    snakeHead.src = "snakeHead.png";

    function updateGame() {
        context.clearRect(0, 0, theCanvas.width, theCanvas.height);



        // Move snake
        switch (direction) {
            case 'ArrowRight': x += SNAKE_SIZE; break;
            case 'ArrowLeft': x -= SNAKE_SIZE; break;
            case 'ArrowUp': y -= SNAKE_SIZE; break;
            case 'ArrowDown': y += SNAKE_SIZE; break;
        }

        // --- WALL COLLISION CHECK ---
        if (
            x < 0 ||
            y < 0 ||
            x + SNAKE_SIZE > theCanvas.width ||
            y + SNAKE_SIZE > theCanvas.height
        ) {
            gameOver();
            return;
        }

        // Draw snake
        context.drawImage(snakeHead, x, y);
    }

    function gameOver() {
        clearInterval(gameLoop);

        context.font = "80px Arial";
        context.fillStyle = "red";
        context.fillText("GAME OVER", theCanvas.width / 2 - 200, theCanvas.height / 2);

        restartBtn.style.display = "block";
    }

    // Allow arrow keys to change directions
    document.addEventListener('keydown', e => {
        if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) {
            direction = e.key;
        }
    });

    // --- Restart game when the button is clicked ---
    restartBtn.addEventListener("click", startGame);

    // Start the game initially
    snakeHead.onload = startGame;
}());
