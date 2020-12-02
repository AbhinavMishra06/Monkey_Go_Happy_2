 // adding variables of monkey and ground
var monkey, monkey_running, monkeyCollide;
var ground, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var gameOverSound, jumpSound;


function preload(){ 
   // loading images and animation
  groundImg = loadAnimation("ground.jpg"); 
  
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  monkeyCollide = loadAnimation("monkey_1.png");
 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  gameOverSound = loadSound("game over.mp3");
  jumpSound = loadSound("jump.mp3");
}



function setup(){
  
   // creating canvas
  createCanvas(600,300);
  
   // creatting obstacle and banana group
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
   // creatting  monkey and adding animation
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
  
   // creatting ground and adding animation 
  ground = createSprite(100, 340, 100,10);
  ground.addAnimation("ground", groundImg);
  ground.scale = 1;  
  

}



function draw(){
  
   // adding background colour
  background("cyan");
  
  textSize(20);
  fill("red");
  stroke("yellow");
  strokeWeight("5");
  text ("survival Time :  "+survivalTime, 400, 50);
 
   // adding Score
  textSize(20);
  fill("red");
  stroke("yellow");
  strokeWeight("5");
  text ("Score  :  "+bananaScore, 25, 50);
  
  
  if (gameState === PLAY){
     
       // calling obstacles and bananas
      obstacles();
      bananas();
    
       // Survival Time// adding survival time
      survivalTime =  survivalTime + Math.round(getFrameRate()/60);
    
       // Increasing speed of ground
      ground.velocityX = -(4+survivalTime*1.5/100);
    
       // allowing monkey to jump
      if(keyDown("space")&&monkey.y >= 235) {
          monkey.velocityY = -15 ;
        jumpSound.play();
      }
    
       // adding gravity
      monkey.velocityY = monkey.velocityY + 0.8

       // reseting the ground
      if (ground.x < 0){
          ground.x = ground.width/2;
      }
    
       // when banana is touching monkey score increase by 2
      if (bananaGroup.isTouching(monkey)){
          bananaScore= bananaScore+2  ;  
          bananaGroup.destroyEach();
      }
    
       // when obstacle is touching monkey game went to end
      if (obstacleGroup.isTouching(monkey)){
        gameState = END;
        gameOverSound.play();
      }
  }
  
  if (gameState === END){
      ground.velocityX = 0;

       // adding monkey when it collide
      monkey.y = 235;
      monkey.scale = 0.12;
      monkey.changeAnimation("collide", monkeyCollide);
    

      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);

      obstacleGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);

       // adding game over
      fill("red");
      textSize(30);
      text("Game Over", 220, 200);

       // adding restart text
      fill("red");
      textSize(30);
      text("Press R to restart", 200, 150);

       // monkey is dead
      fill("black");
      textSize(30);
      text("Monkey is dead", 200, 240);

        // adding if condition for restart
      if (keyDown("r")){
        reset();
      }
  }
  
   // making monkey collide to ground
  monkey.collide(ground);
  
  drawSprites(); 
  
  
}

 // declaring bananas function
function bananas(){
  if (frameCount % 80 === 0){
    
      banana = createSprite(620,120, 50, 50 )
      banana.addAnimation("banana", bananaImage);
      banana.scale = 0.1;
      banana.y=Math.round(random(170, 75));
      banana.velocityX =-(4+survivalTime*1.5/100);           
      banana.lifetime = 220;
      bananaGroup.add(banana);
      bananaGroup.add(banana);
      // banana.debug = true ;
      banana.setCollider("circle", 0, 0, 180);
    
  }  
}


 // declaring obstacles function
function obstacles(){
  if (frameCount%200 === 0){
    
      obstacle = createSprite(620,253,50,50);
      obstacle.addAnimation("rock", obstacleImage);
      //obstacle.debug = true;
      obstacle.setCollider("circle", 0, 0, 180);
      obstacle.scale = 0.1  ;
      obstacle.velocityX = -(6+survivalTime*2/100);
      obstacle.lifetime = 220;
      obstacleGroup.add(obstacle);
    
  }
}

// declaring reset function
function reset(){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      bananaScore = 0;
      survivalTime = 0;
      gameState = PLAY;  
}

