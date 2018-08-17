var canvas;
var screenFull;
var ballOne = 50;
var ballTwo = 50;
var ballOneSpeed = 10;
var ballTwoSpeed = 4;
var myPaddle = 250;
var otherPaddle = 250;
var myScore = 0;
var otherScore = 0;
const totalPoints = 3;
var showWin = false;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
//Easy 6, Med 10, Hard 12
const difficulty = 12;
const FPS = 30;

function win(){
    if(showWin){
        myScore = 0;
        otherScore = 0;
        showWin = false;
    }
}


function mousePosition(evt)
{
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return{
        x:mouseX,
        y:mouseY
    }
}
    window.onload = function(){
    
        canvas = document.getElementById('gameCanvas');
        screenFull = canvas.getContext('2d');
        
        setInterval(function(){
            gamePlay();
            create();
            }, 1000/FPS);
        
        canvas.addEventListener('mousedown', win);
        canvas.addEventListener('mousemove', function(evt){
            var mousePos = mousePosition(evt);
            myPaddle = mousePos.y - (PADDLE_HEIGHT / 2);
        });
        document.onkeydown = function(evt){
            if(evt.keyCode == '38'){
                myPaddle -= 30;
            }
            if(evt.keyCode == '40'){
                myPaddle += 30;
            }
        }
    }

function gameSetup()
{
    for(var i = 0; i < canvas.height; i += 40){
        makePaddle(canvas.width/2-1,i,2, 20, 'white');
    }
}

function reset()
{
    if(myScore >= totalPoints ||
       otherScore >= totalPoints){
     
        showWin = true;
        }
    ballOneSpeed = -ballOneSpeed;
    ballOne = canvas.width / 2;
    ballTwo = canvas.height / 2;
}

function p2()
{
    var otherPaddleCenter = otherPaddle + (PADDLE_HEIGHT/2);
    if(otherPaddleCenter < ballTwo - 35){
       otherPaddle += difficulty;
        
    }else if (otherPaddleCenter > ballTwo + 35){
        otherPaddle -= difficulty;
    }
}

function gamePlay()
{
    if(showWin){
        return;
    }
    p2();
    ballOne += ballOneSpeed;
    ballTwo += ballTwoSpeed;
    if(ballOne < 0) {
        if(ballTwo > myPaddle &&
            ballTwo < myPaddle+PADDLE_HEIGHT) {
            ballOneSpeed = -ballOneSpeed;
            var deltaY = ballTwo - (myPaddle + PADDLE_HEIGHT / 2);
            ballTwoSpeed = deltaY * 0.35;
        } else {
            otherScore++;
            reset();
       	
        }
    }
    if(ballOne > canvas.width) {
        if(ballTwo > otherPaddle &&
            ballTwo < otherPaddle+PADDLE_HEIGHT) {
            ballOneSpeed = -ballOneSpeed;
            var deltaY = ballTwo - (otherPaddle + PADDLE_HEIGHT / 2);
            ballTwoSpeed = deltaY * 0.35;
        } else {
            myScore++;
            reset();	
           
        }
    }
    if(ballTwo < 0) {
        ballTwoSpeed = -ballTwoSpeed;
    }
    if(ballTwo > canvas.height) {
        ballTwoSpeed = -ballTwoSpeed;
    }
}


function create()
{
        makePaddle(0,0,canvas.width, canvas.height, 'black');
        if(showWin)
        {
            screenFull.fillStyle = 'white';
            if(myScore >= totalPoints)
            {
                screenFull.fillText("Left Player Won!", 350, 200);
            }else if(otherScore >= totalPoints){
                screenFull.fillText("Right Player Won!", 350, 200);
            }
            
            screenFull.fillText("Click to continue", 350, 500);
            return;
        }
        gameSetup();
        
        makePaddle(0, myPaddle, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
        
        makePaddle(canvas.width - PADDLE_THICKNESS, otherPaddle, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
        makeBall(ballOne, ballTwo, 10, 'white');
        
        screenFull.fillText(myScore, 100, 100);
        screenFull.fillText(otherScore, canvas.width - 100, 100);
       
}

function makePaddle(leftX, topY, width, height, drawColor)
{
    screenFull.fillStyle = drawColor;
    screenFull.fillRect(leftX, topY, width, height);
}

function makeBall(centerX, centerY, radius, drawColor)
{
        screenFull.fillStyle = drawColor;
        screenFull.beginPath();
        screenFull.arc(centerX, centerY , radius, 0 , Math.PI*2, true);
        screenFull.fill();
}