var score = 0
var frame

var PLAY = 0;
var END = 1;
var SERVE = 2;
var gamestate = SERVE
var giftCount = 10;

function preload() {
  bgImg = loadImage("background.jpg");
  cloudImg = loadImage("cloud.png");
  gift1Img = loadImage("gift1.png");
  gift2Img = loadImage("gift2.png");
  gift3Img = loadImage("gift3.png");
  sleighAndElfImg = loadImage("sleighandelf.png");
  roofImg = loadImage("roof.png");
  treeImg = loadImage("christmas tree.png");
  starImg = loadImage("star.png");
}

function setup() {
  createCanvas(500, 400);
  
  bg = createSprite(250,200);
  bg.addImage(bgImg);
  bg.scale = 0.4;
  
  elf = createSprite(450,135);
  elf.addImage(sleighAndElfImg);
  elf.scale = 0.8;
  elf.setCollider("rectangle",-50,-40,140,100)
  elf.debug = true

  giftGroup = new Group();
  invisibleRoofGroup = new Group();
  starGroup = new Group();
}

function draw() {
  background(150);

  if(gamestate === PLAY){

    bg.velocityX = 3;
    
    if(bg.x > 400){
      bg.x = 250;
    }

    if(keyDown(UP_ARROW)) {
      elf.velocityY = -7;
    }
  
    elf.velocityY = elf.velocityY + 0.5
  
    if(keyDown(LEFT_ARROW)) {
      elf.velocityX = -2;
    }
  
    if(keyDown(RIGHT_ARROW)) {
      elf.velocityX = 2;
    }
  
    if(keyDown("SPACE")&&giftCount>0) {
      spawnGift()
      giftCount = giftCount-1;
      gamestate = PLAY;
    }

    createRoof();
    spawnTree();
    spawnStar();

  if(elf.isTouching(starGroup)) {
    starGroup.destroyEach();
    giftCount = giftCount+20;
   } 
   if(elf.y>300){
     gamestate = END
   }
  }
  
  drawSprites();

  if(gamestate === SERVE){
    textSize(20);
    text("Drop your gift on the red mark by pressing space",5,200);
  }

  textSize(32);
  fill("red");
  stroke("green");
  strokeWeight(6);
  text("Score: " + score,20,30);

  fill("red");
  stroke("green");
  text("Gifts Left: " + giftCount,300,30)

  if(gamestate === PLAY){
    if(giftGroup.isTouching(invisibleRoofGroup)){
      textFont("Mountains of Christmas");
      textSize(25);
      score = score+50;
      frame = frameCount;
  
      number = Math.round(random(1,4));
      switch(number) {
        case 1 : text("Wow!",250,200);
                  break;
        case 2 : text("Excellent!",250,200);
                  break;         
        case 3 : text("Good Job!",250,200);
                  break;
        case 4 : text("Nice!",250,200);
                  break;      
        default : break;
      }
    }  
  }
}

function spawnGift() {
  gift = createSprite(elf.x,elf.y);
  number = Math.round(random(1,3));
  switch(number) {
    case 1: gift.addImage(gift1Img);
            break;
    case 2: gift.addImage(gift2Img);
            break;
    case 3: gift.addImage(gift3Img);
            break;
  }
  gift.velocityY = 3;
  gift.scale = 0.1;
  gift.lifetime = 150;
  giftGroup.add(gift);
}

function createRoof() {
  if(frameCount%80 === 0){

    roof = createSprite(15,385);
    roof.addImage(roofImg);
    roof.scale = 0.9;
    roof.velocityX = 4;
    roof.lifetime = 150

    invisibleRoof = createSprite(roof.x+65,roof.y-45,80,3);
    invisibleRoof.shapeColor = "red"
    invisibleRoof.velocityX = 4;
    invisibleRoofGroup.lifetime = 150;
    invisibleRoofGroup.add(invisibleRoof);
  }
}

function spawnTree() {
  if(frameCount%95 === 0){
    tree = createSprite(10,390);
    tree.addImage(treeImg);
    tree.scale = 0.18;
    tree.velocityX = 4;
  }
}

function spawnStar() {
  if(frameCount%195 === 0) {
    star = createSprite(0,Math.round(random(20,290)));
    star.addImage(starImg);
    star.scale = 0.07;
    star.velocityX = 4;
    star.lifetime = 250;
    star.debug = true
    starGroup.add(star);
  }
}