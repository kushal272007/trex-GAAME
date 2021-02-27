var trex, trex_running           
var ground;
var groundImage
var invisibleGround
var cloudImage,cloud
var obstacle1
var obstacle2
var obstacle3
var obstacle4
var obstacle5
var obstacle6
var obstacle
var obstacleGroup
var cloudGroup
var gameState="play"
var gameoverimage
var restartimage
var gameovers
var restarts
var score=0
var trexcollide
var checkpoint
var die
var jump
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
groundImage=loadImage("ground2.png")         
cloudImage=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
   obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  gameoverimage=loadImage("gameOver.png")
  restartimage=loadImage("restart.png")
  trexcollide=loadAnimation("trex_collided.png")
  checkpoint=loadSound("checkPoint.mp3")
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
  }

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,150,10,10)
  trex.addAnimation("running",trex_running)
  trex.addAnimation("collided",trexcollide)
  trex.scale = 0.5
  ground=createSprite(300,180,600,10)
  ground.addImage("kushAL",groundImage)
  invisibleGround=createSprite(300,190,600,10)
  invisibleGround.visible=false
  obstacleGroup=createGroup()
  cloudGroup=createGroup()
  gameovers=createSprite(300,80,30,30)
  gameovers.addImage("kushal",gameoverimage)
  restarts=createSprite(300,130,30,30)
  restarts.addImage("kushal",restartimage)
  restarts.scale=0.5
  gameovers.scale=0.5
}
  function draw() {
    background("white");
    text("score="+score,500,30)
    if(gameState=="play")
      
      {
        trex.changeAnimation("running",trex_running)
        score=score+1
        if(score%500==0){
          checkpoint.play()
        }
        gameovers.visible=false
        restarts.visible=false
        ground.velocityX= -5
        if(ground.x<0)
      {
        ground.x=300
      }
        populateClouds()
    populateObstacle()
        if(keyDown("space")&&trex.y>=120)
  {
    jump.play()
    trex.velocityY= -10
  }
    if(trex.isTouching(obstacleGroup))
       {
         die.play()
       gameState="end"
       }
  
        trex.velocityY=trex.velocityY+1
        
      }
    if(gameState=="end")
      {
        trex.changeAnimation("collided",trexcollide)
        gameovers.visible=true
        restarts.visible=true
      ground.velocityX=0 
                obstacleGroup.setVelocityXEach(0);
        cloudGroup.setVelocityXEach(0);
        if(mousePressedOver(restarts)){
        restart()  
        }
      }
   
    
   

    
      
    trex.collide(invisibleGround)
   
    drawSprites();
}
function restart(){
  gameState="play"
  obstacleGroup.destroyEach()
  cloudGroup.destroyEach()
  score=0
}
function populateClouds()
{
  if(frameCount%100==0)
    {
      

cloud=createSprite(550,20,20,20) 
  cloud.addImage("kushal",cloudImage)
  cloud.velocityX=-8
   cloud.y=Math.round(random(10,100))
      cloudGroup.add(cloud)
    }
}
function populateObstacle()
{
  if(frameCount%60==0)
    
    {
      
     
 obstacle=createSprite(550,150,20,20)
  obstacle.velocityX=-4
  var a= Math.round(random(1,6))
  switch(a)
{
  case 1:obstacle.addImage('kushal',obstacle1)
    break
    case 2:obstacle.addImage('kushal',obstacle2)
    break
    case 3:obstacle.addImage('kushal',obstacle3)
    break
    case 4:obstacle.addImage('kushal',obstacle4)
    break
    case 5:obstacle.addImage('kushal',obstacle5)
    break
    case 6:obstacle.addImage('kushal',obstacle6)
    break
                            
}
    obstacleGroup.add(obstacle)
  obstacle.scale=0.5 
}
}

  