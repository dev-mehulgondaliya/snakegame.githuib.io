const jq = $.noConflict();

jq(document).ready(function(){
    //Games Constant and Variables
    let inputDirection = {x:0,y:0};
    const foodSound = new Audio("../music/food-eating-music.mp3");
    const gameOverSound = new Audio("../music/game-over-music.mp3");
    const moveSound = new Audio("../music/key-press-music.mp3");
    const bgSound = new Audio("../music/bg-music.mp3");
    let snakeArr = [{x:13,y:15}];
    let food = {x:10,y:10};
    let score = 0;

    // Games All Function
    function mainFr(){
        bgSound.play();
        gameEngine();
    }

    // when snake is collide
    function isCollide(snakeposition){
        for(let i = 1; i < snakeArr.length; i++){
            if(snakeposition[i].x === snakeposition[0].x && snakeposition[i].y === snakeposition[0].y){
                return true;
            }
        }

        if ((snakeposition[0].x >= 18 || snakeposition[0].x <= 0) || (snakeposition[0].y >= 19 || snakeposition[0].y <= 2)) {
            return true;
        }

    }

    function gameEngine(){
        // Part:1 Update the snake array and food
        if (isCollide(snakeArr)) {
            gameOverSound.play();
            bgSound.pause();
            inputDirection = { x: 0, y: 0 }; // Stop the snake from moving
            alert("Game Over. Press any key to play again!");
            snakeArr = [{ x: 13, y: 15 }];
            food = { x: 10, y: 10 };
            bgSound.play();
            score = 0;
            jq('#score').text('Score: ' + score);
        }


        // if snake eaten food, increment score and genrate new food
        if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
            foodSound.play();
            snakeArr.unshift({ x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y });
            let a = 2;
            let b = 18;
            food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };

             // Increase the score and update the scoreboard
            score++;
            jq('#score').text('Score: ' + score);
        }


        // moving the snake
        for (let i = snakeArr.length - 2; i >= 0 ; i--){
            snakeArr[i + 1] = {...snakeArr[i]};
        }

        snakeArr[0].x += inputDirection.x;
        snakeArr[0].y += inputDirection.y;

        // Part:2 Display the snake and food
        jq('#game-box').html("");
        // display the snake
        snakeArr.forEach((element, index)=>{

            let snake =  document.createElement('div');
            snake.style.gridRowEnd = element.y;
            snake.style.gridColumnStart = element.x;

            if(index === 0){
                snake.classList.add('snake-head');
            }else{
                snake.classList.add('snake-body');
            }
            jq('#game-box').append(snake);

        });

        // display the food
        let foodElement =  document.createElement('div');
        foodElement.style.gridRowEnd = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        jq('#game-box').append(foodElement);
    }

    // Games All Logics
    setInterval(mainFr, 300);

    jq(document).on('keydown',function(keyEvent){

            inputDirection = {x: 0, y: 1}; // Start the game
            moveSound.play();
            switch (keyEvent.key) {
                case 'ArrowUp':
                    inputDirection.x = 0;
                    inputDirection.y = -1;
                    break;

                case 'ArrowDown':
                    inputDirection.x = 0;
                    inputDirection.y = 1;
                    break;

                case 'ArrowLeft':
                    inputDirection.x = -1;
                    inputDirection.y = 0;
                    break;

                case 'ArrowRight':
                    inputDirection.x = 1;
                    inputDirection.y = 0;
                    break;

                default:
                    break;
            }
        }
    );
});
