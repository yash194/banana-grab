//Global Variables
var score,monkeyanimation,player,groundimg,ground,gameOver,restart,gameoverimg,resetimg,stone,bananaimg, invisibleground,lifeline, bananagroup,obstaclesgroup,Stone,jungleimg,jungle ;

var play=1;
  var end=0;
  var gamestate=play;
  
function preload(){
  //loading the  animation
monkeyanimation=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png")  ;
  
gameoverimg=loadImage("gameOver.png");  
  
  
  
 groundimg=loadImage("ground.jpg");                           
bananaimg=loadImage("Banana.png");
Stone=loadImage("stone.png");
  jungleimg=loadImage("jungle.jpg");
}


function setup() {
  createCanvas(400,400);

jungle=createSprite(400,400,0,0);
jungle.addImage("j",jungleimg);
jungle.scale=1;  
  
 ground=createSprite(400,400,400,10);
 ground.addImage("g",groundimg); 
ground.scale=0.4;

 ground.velocityX=-2; 
  
  invisibleground=createSprite(200,340,400,10);
  invisibleground.visible=false;
  
  
  player=createSprite(50,300,10,10);
 player.addAnimation("run",monkeyanimation); 
  player.scale=0.1;
score=0;
  lifeline=4;
  bananagroup=new Group();
obstaclesgroup=new Group();
 
}


function draw(){
 background(255); 

if(gamestate===play){  
  
 banana();  
  obstacles();
 
  
if(keyDown("space") && player.y>280 )  {
   player.velocityY=-21.5;
   }


 player.velocityY=player.velocityY+0.8; 

  if (ground.x < 0){
    ground.x = ground.width/6;
  }

  
if(bananagroup.isTouching(player)){
score=score+2;
 bananagroup.destroyEach(); 

}

if(obstaclesgroup.isTouching(player)){
 player.scale=player.scale-0.01;   
  obstaclesgroup.destroyEach();
  lifeline=lifeline-1;
      
     
    }  
  
if(lifeline===0){
gamestate=end;

  
}






}
  
  
  
  
if(gamestate===end){
gameover=createSprite(200,200,10,10);
  gameover.addImage(gameoverimg);
  
  ground.velocityX=0;
  obstaclesgroup.setVelocityXEach(0);
  bananagroup.setVelocityXEach(0);
  player.visible=false;  
}
  

 
  
 player.collide(invisibleground); 
   
   
drawSprites();
  
  //setting text
fill("red");
  text("score-"+score,20,30);
  fill("red")
  text("lifeline"+lifeline,180,30);
}

//setting various functions

function banana() {
if(frameCount%80===0){
var b=createSprite(250,200,10,10);
b.addImage(bananaimg);
b.y=random(89,200);
b.scale=0.07;
b.velocityX=-4;  
bananagroup.add(b);  
}  
  
}

function obstacles() {
  if(frameCount%100===0){
    var o=createSprite(200,310,10,10);
    o.addImage(Stone);
    o.x=random(170,342);
    o.velocityX=-4;
    o.scale=0.3;
   
    player.depth=o.depth;
   o.setCollider("circle",10,10,150); 
    
    //setting he case statements for the score
    switch(score){
      
      case 5 : player.scale=0.11;
        break;
        
      case 10 : player.scale=0.12  ;
        break;
        
        
        case 20 :player.scale=0.13;
        break;
        
        case 30 : player.scale=0.14;
        break;
        
        case 40 : player.scale=0.15;
        break;
        default:break;
    }
        
    
    
    
    
    
    
    
    
    
    
    obstaclesgroup.add(o);
  }
  
}

  