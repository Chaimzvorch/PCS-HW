(async function () {
    'use strict';

    const CELL_SIZE = 64;

    const theCanvas = document.querySelector('#theCanvas');
    const context = theCanvas.getContext('2d');

    function resizeCanvas() {
        theCanvas.width = window.innerWidth - (window.innerWidth % CELL_SIZE);
        theCanvas.height = window.innerHeight - (window.innerHeight % CELL_SIZE);
    }

    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();

    let direction = 'ArrowRight';
    let gameOver = false;
    let score = 0;
    let speed = 500;
    let crashSound = document.querySelector('#crash');
    let crunchSound = document.querySelector('#crunch');

    class Snake {
        segments = [{
            x: -CELL_SIZE,
            y: 0
        }];

        get head() {
            return this.segments[0];
        }

        move() {
            let tempX = this.head.x;
            let tempY = this.head.y;

            switch (direction) {
                case 'ArrowRight':
                    tempX += CELL_SIZE;
                    break;
                case 'ArrowLeft':
                    tempX -= CELL_SIZE;
                    break;
                case 'ArrowUp':
                    tempY -= CELL_SIZE;
                    break;
                case 'ArrowDown':
                    tempY += CELL_SIZE;
                    break;
            }

            for (let i = 3; i < this.segments.length - 1; i++) {
                if (tempX === this.segments[i].x && tempY === this.segments[i].y) {
                    gameOver = true;
                }
            }

            if (!gameOver && (tempX < 0 || tempX > theCanvas.width - CELL_SIZE ||
                tempY < 0 || tempY > theCanvas.height - CELL_SIZE)) {
                gameOver = true;
            }

            if (!gameOver) {
                const oldTail = this.segments.pop();
                oldTail.x = tempX;
                oldTail.y = tempY;
                this.segments.unshift(oldTail);
            }
            this.draw();
        }

        grow() {
            this.segments.push({
                x: this.segments[this.segments.length - 1].x,
                y: this.segments[this.segments.length - 1].y
            });
        }

        draw() {
            context.drawImage(snakeHead, this.head.x, this.head.y);
            context.fillStyle = 'green';
            context.beginPath();
            for (let i = 1; i < this.segments.length; i++) {
                context.fillRect(this.segments[i].x, this.segments[i].y, CELL_SIZE, CELL_SIZE);
            }
        }
    }

    class Apple {
        constructor() {
            this.move();
        }

        move() {
            let valid = false;
            while (!valid) {
                this.x = this.pickRandomNumber(theCanvas.width - CELL_SIZE);
                this.y = this.pickRandomNumber(theCanvas.height - CELL_SIZE);

                if (!snake.segments.some(s => s.x === this.x && s.y === this.y)) {
                    valid = true;
                }
                console.log('apple', this.x, this.y);
            }
        }

        draw() {
            context.drawImage(appleImg, this.x, this.y);
        }

        pickRandomNumber(max) {
            let n = Math.floor(Math.random() * max + 1);
            n -= n % CELL_SIZE;
            return n;
        }
    }

    const snake = new Snake();
    const apple = new Apple();

    function gameLoop() {
        context.clearRect(0, 0, theCanvas.width, theCanvas.height);

        snake.move();
        if (snake.head.x === apple.x && snake.head.y === apple.y) {
            score++;
            speed *= .95;
            crunchSound.currentTime = 0;
            crunchSound.play();
            apple.move();
            snake.grow();
        }

        apple.draw();

        if (!gameOver) {
            setTimeout(gameLoop, speed);
        } else {
            crashSound.play();
        }

        context.font = '30px Arial';
        const text = `Score: ${score}`;
        const tm = context.measureText(text);
        //console.log(tm);

        context.fillStyle = 'red';
        context.fillText(text, theCanvas.width - (tm.width + 16), (tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent + 16));
    }

    
    const snakeHeadP = loadImage('snakeHead.png');
    const appleImgP = loadImage('apple.png');

    const [snakeHead, appleImg] = await Promise.all([snakeHeadP, appleImgP]);
    setTimeout(gameLoop, speed);

    document.addEventListener('keydown', e => {
        //console.log(e);
        const isOnePiece = snake.segments.length === 1;
        switch (e.key) {
            case 'ArrowRight':
                if (isOnePiece || direction !== 'ArrowLeft') {
                    direction = e.key;
                }
                break;
            case 'ArrowLeft':
                if (isOnePiece || direction !== 'ArrowRight') {
                    direction = e.key;
                }
                break;
            case 'ArrowUp':
                if (isOnePiece || direction !== 'ArrowDown') {
                    direction = e.key;
                }
                break;
            case 'ArrowDown':
                if (isOnePiece || direction !== 'ArrowUp') {
                    direction = e.key;
                }
                break;
            default:
                console.log(e.key, 'is not a supported key');
        }
    });

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = document.createElement('img');
            img.src = src;
            img.onload = resolve(img);
            img.onerror = reject();
        });
    }
}());