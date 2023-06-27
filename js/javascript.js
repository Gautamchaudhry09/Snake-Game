//Game constants
const musicSound = new Audio('People(PaglaSongs).mp3')

let snakeDir = {
    x:0, y:0
};

// let foodSound 
// let gameOverSound = 
// let moveSound
// let musicSound
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    {x:13, y:15}
]
let food = {x:6, y:7}
let score=0;
let playcheck = 0;
const scoree = document.getElementById("scoree");
const highScoreBox = document.getElementById("highScoreBox");
const musicToggleButton = document.getElementById("musicToggleButton")
let highScoreval = 0;
//Game functions

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //if you bump into yourself
    for(let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            
            return true;
        }
    }
    //if you bump into wall
        if((snake[0].x > 18 || snake[0].x < 0) || (snake[0].y > 18 || snake[0].y < 0)){
            snake[0].x-=snakeDir.x;
            snake[0].y-=snakeDir.y;
            return true;
    }
    return false;
}

function pause(){
    if(musicSound.paused){
        musicSound.play();
        musicToggleButton.innerHTML="Pause Music";
    }
    else{
        musicSound.pause();
        musicToggleButton.innerHTML="Resume Music";
    }
}

function gameEngine(){
    //Part 1: Updating the snake array

    if(isCollide(snakeArr)){
        // gameOverSound.play();
        musicSound.play();
        snakeDir = {x:0, y:0};
        alert("Game Over. Press any Key to Play again :)");
        snakeArr =[{x:13, y:15}];
        score=0;
        scoree.innerHTML="Score: " + score;


    }
    if(playcheck==0){
        musicSound.play();
        playcheck+=1;
    }
    //If you have eaten the food, increment the scoree and regenerate the food

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        snakeArr.unshift({x: snakeArr[0].x + snakeDir.x, y: snakeArr[0].y + snakeDir.y})
        const a = 2;
        const b = 16;
        speed+=0.3;
        score+=1;
        if(score>highScoreval){
            highScoreval = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreval));
            highScoreBox.innerHTML="HighScore: " + highScoreval;
        }
        // console.log(scoree);
        scoree.innerHTML="Score: " + score;
        food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
        for(let i = snakeArr.length - 1; i>=0; i--){
            if(food==snakeArr[i]){
                food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};                
                i = snakeArr.length - 1
            }
        }

    }

    //Moving the Snake
    for(let i = snakeArr.length - 2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += snakeDir.x;
    snakeArr[0].y += snakeDir.y;


    //Part 2: Display the snake and Food
    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0 ){
        snakeElement.classList.add('head');
    }
    else{
        snakeElement.classList.add('snake');
    }
        board.appendChild(snakeElement);
    });
    //Display the food
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}






//main logic starts here
let highScore = localStorage.getItem("highScore");
if(highScore === null){
    localStorage.setItem("highScore", JSON.stringify(highScoreval))
}
else{
    highScoreval = JSON.parse(highScore);
    highScoreBox.innerHTML = "HighScore: "+ highScoreval;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
      //Start the game
    // moespund.play()
    switch (e.key){
        case "ArrowUp":
            console.log("ArrowUp",snakeDir.y)
            if(snakeDir.y == 0){
                snakeDir.x = 0;
                snakeDir.y = -1;
            }
                break;

        case "ArrowDown":
            console.log("ArrowDown")
            if(snakeDir.y!==-1){
                snakeDir.x = 0;
                snakeDir.y = 1;
            }
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            if(snakeDir.x!==-1){
                snakeDir.x = 1;
                snakeDir.y = 0;
            }
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")            
            if(snakeDir.x!==1){
                snakeDir.x = -1;
                snakeDir.y = 0;
            }
            break;
        
    }
})
