var thief, thiefImage;
var police, policeImage, policeGroup;
var bg, bgImg;
var platform, platformImg, platformGroup, platform1,platform2,invisiblePlatform,invisiblePlatformGroup;
var coin, coinImg, coinGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var life = 3;


function preload(){
  thiefImage = loadAnimation("images/b1.png","images/b2.png","images/b3.png","images/b4.png","images/b5.png","images/b6.png",)
  policeImage = loadAnimation("images/p1.png","images/p2.png","images/p3.png")
  bgImg = loadImage("images/bg.jpg",)
  platform1 = loadImage("images/platform1.png")
  platform2 = loadImage("images/platform2.png")
  coinImg = loadAnimation("images/C1.png","images/C2.png","images/C3.png","images/C4.png","images/C5.png")
}

function setup(){
  createCanvas(800,400);

  bg = createSprite(500,200,1000,400);
  bg.addImage("bg1",bgImg);
  bg.scale = 1.5
  bg.velocityX = -2;

  thief = createSprite(200,310,30,30);
  thief.addAnimation("thief1",thiefImage);
  thief.scale = 0.4;
  thief.debug = true

  ground = createSprite(400,360,800,10);
  ground.visible = false;

  platformGroup = new Group();
  invisiblePlatformGroup = new Group();
  policeGroup = new Group();
  coinGroup = new Group();
}

function draw(){
  background("skyblue");

  
  if(gameState===PLAY){
    if(bg.x<300){
      bg.x = 400;
    }
  
    if(keyDown("space") && thief.y > 280){
      thief.velocityY = -12;
    }

    thief.velocityY = thief.velocityY + 0.3

    if(keyDown(RIGHT_ARROW)){
      thief.x = thief.x + 10
    }

    if(keyDown(LEFT_ARROW)){
      thief.x = thief.x - 10
    }
    

    if(frameCount % 150 === 0){
      var rand =  Math.round(random(1,2));
      if(rand === 1){
        spawnPlatform()
      }
      else{
        spawnPlatform()
      }
  
    }
    
    //spawn the police
   // spawnPolice();

    //spawn platform
    //spawnPlatform();

    if(score > 0 && score%10 ===  0){
      life++;
    }

    if(thief.isTouching(coinGroup)){
      coinGroup.destroyEach()
      score++
    }

    if(thief.overlap(policeGroup,function(t,p){
      p.destroy();

      if(life > 1){
        life = life - 1;
      }
      else{
        gameState = END;
      }

    }))
     
    if(thief.collide(platformGroup,function(t,plat){
      //t.destroy()
      plat.destroyEach()

      if(life > 1){
        life = life - 1;
      }
      else{
        gameState = END;
      }
      
    }))
    
    
    //thief.collide(platformGroup)
    thief.collide(invisiblePlatformGroup);
    drawSprites()
  }
  else if(gameState===END){
    text("GAME OVER",250,250);
  }

  

  thief.collide(ground);


  text("Lives: " + life, 200,30);
  text("Score: " + score, 100,30);
}

function spawnPolice(){
  //if(frameCount%100===0){
    police = createSprite(800,310,30,30);
    police.velocityX = -3;
    police.addAnimation("police_running", policeImage);
    police.scale = 0.3;
    police.lifetime = 250;
    police.debug = true
    policeGroup.add(police);
  //}
}

function spawnPlatform(){
  //if(frameCount%150===0){
    platform = createSprite(800,Math.round(random(200,300)),200,30);
    platform.debug = true;
    platform.setCollider("rectangle",0,0,platform.width + 40, platform.height)

    invisiblePlatform = createSprite(800,platform.y - 30,150,5);
    coin = createSprite(platform.x,platform.y - 50,20,20);
    coin.velocityX = -5
    coin.addAnimation("coin",coinImg)
    coin.scale = 0.3;
    coinGroup.add(coin);

    var rand = Math.round(random(1,2));
    if(rand===1){
      platform.addImage(platform1);
    }
    else if(rand===2){
      platform.addImage(platform2);
    }
    platform.velocityX = -5;
    invisiblePlatform.velocityX = -5;
    //police.addAnimation("police_running", policeImage);
   // platform.scale = 0.3;
    platform.lifetime = 200;
    platformGroup.add(platform);
    invisiblePlatformGroup.add(invisiblePlatform);

    platform.depth = thief.depth;
    thief.depth++
  //}
}