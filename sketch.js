var PLAY = 1;
var END = 0;

var gameState = 1;

var score;

var sword,swordImage;

var fruitGroup ;
var enemyGroup;

var fruit1,fruit2,fruit3,fruit4;

var monster , monsterImg;

var gameover;

var swoosh , over , gameover, swashSound;

  function preload(){
  
    swordImage = loadImage("sword.png");
    
    fruit1 = loadImage("fruit1.png");
    fruit2 = loadImage("fruit2.png");
    fruit3 = loadImage("fruit3.png");
    fruit4 = loadImage("fruit4.png");
    
    monsterImg = loadAnimation("alien1.png","alien2.png");
     
    gameover = loadImage("gameover.png");
    
    swoosh = loadSound("knifeSwooshSound.mp3");
    over = loadSound("gameover.mp3"); 
    
}

  function setup(){
  
     createCanvas(400,400);
    
    sword = createSprite(40,200,20,20);
    sword.addImage(swordImage);
    sword.scale = 0.7;

    score = 0;
    
    fruitGroup = createGroup();
    enemyGroup = createGroup();
    
    sword.setCollider("rectangle",0,0,40,40);
    
}

  function draw(){

     background("skyblue");
    
    if(gameState === PLAY){
      
      Enemy();
      
      fruits();
      
      sword.y = World.mouseY;
      sword.x = World.mouseX; 
      
      if(fruitGroup.isTouching(sword)){
        
        fruitGroup.destroyEach();
        score = score+2;
        swoosh.play();
        
      }
      
      if(enemyGroup.isTouching(sword)){

       gameState = END;
       enemyGroup.destroyEach();
       sword.addImage(gameover)
       sword.x = 200;
       sword.y = 200; 
       over.play();
        
      }
      
   
    }
   
    if(gameState === END){
      
       if(mousePressedOver(sword)){
        
        reset();
        
      }
      
      fill("black");
      text("click on gameover to restart",130,300);
      
    }
    
    drawSprites();
   
    textSize(30);
    fill("black");
    text("score :"+score,260,30);
    
    
}


function reset(){
  
  gameState = PLAY;
  fruitGroup.destroyEach();
  enemyGroup.destroyEach();
  score = 0;
  sword.addImage(swordImage);
  
}




function fruits(){
  
  if(World.frameCount % 80 === 0){
    
  fruit = createSprite(400,200,20,20);
  fruit.scale = 0.2;
  r = Math.round(random(1,4));
  if(r===1){
    
    fruit.addImage(fruit1);
    
  } else if(r===2){
    
    fruit.addImage(fruit2);
  }else if(r===3){
     
     fruit.addImage(fruit3);
     
   } else if(r===4){
      
      fruit.addImage(fruit4)
    }
    
    fruit.y = Math.round(random(50,340));
    
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
    
    
  }
  
  
  
  
  
}


function Enemy(){

  if(World.frameCount % 200 === 0){
    
    monster = createSprite((400,200,20,20));
    monster.addAnimation("moving",monsterImg);
    monster.y = Math.round(random(100,300));
    monster.velocityX = 8;
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
    
  }

}

