var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var invisibleGround;
var clouds, cloudsImage;
var obstacles,
  obstacle1Image,
  obstacle2Image,
  obstacle3Image,
  obstacle4Image,
  obstacle5Image,
  obstacle6Image;
var score = 0;
var play = 0;
var end = 1;
var gameState = play;
var obstacleGroup, cloudsGroup;
var gameover, reset, gameoverImage, restartImage;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudsImage = loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  obstacle1Image = loadImage("obstacle1.png");
  obstacle2Image = loadImage("obstacle2.png");
  obstacle3Image = loadImage("obstacle3.png");
  obstacle4Image = loadImage("obstacle4.png");
  obstacle5Image = loadImage("obstacle5.png");
  obstacle6Image = loadImage("obstacle6.png");
  gameoverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);

  //create a trex sprite
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;

  //create a ground sprite
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;

  invisibleGround = createSprite(200, 195, 400, 20);
  invisibleGround.visible = false;
  obstacleGroup = new Group();
  cloudsGroup = new Group();

  gameover = createSprite(250,100)
  gameover.addImage("gameover1", gameoverImage)
  gameover.scale=0.5

  reset = createSprite(250,140)
  reset.addImage("reset1", restartImage)
  reset.scale= 0.5



}

function draw() {
  background("white");

  //jump when the space button is pressed

  trex.collide(invisibleGround);

  drawSprites();

  textStyle("bold");
  textSize(20);
  text("Score: " + score, 350, 50);

  if (gameState === play) {
    gameover.visible=false
    reset.visible=false
    score = score + Math.round(random(frameCount % 10 === 0));
    if (keyDown("space") && trex.y >= 161) {
      trex.velocityY = -6;
    }

    trex.velocityY = trex.velocityY + 0.5;
    ground.velocityX = -4;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    console.log(trex.y);
    createClouds();
    createObstacles();
    if (obstacleGroup.isTouching(trex)) {
      gameState = end;
    }
  } else if (gameState === end) {
    gameover.visible=true
    reset.visible=true
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(5);
    cloudsGroup.setLifetimeEach(5);
  }
}
function createClouds() {
  if (frameCount % 50 === 0) {
    clouds = createSprite(600, 80, 100, 20);
    clouds.addImage("cloudy", cloudsImage);
    clouds.scale = 0.1;
    clouds.y = Math.round(random(80, 150));
    trex.depth = clouds.depth;
    trex.depth += 1;
    clouds.velocityX = -4;
    clouds.lifetime = 200;
    cloudsGroup.add(clouds);
    // console.log("display clouds", frameCount);
  }
}

function createObstacles() {
  if (frameCount % 60 === 0) {
    obstacles = createSprite(600, 175, 10, 80);
    obstacles.velocityX = -4;
    var number = Math.round(random(1, 6));
    obstacles.scale = 0.1;
    obstacles.lifetime = 150;
    obstacleGroup.add(obstacles);
    switch (number) {
      case 1:
        obstacles.addImage("ob1", obstacle1Image);
        break;
      case 2:
        obstacles.addImage("ob2", obstacle2Image);
        break;
      case 3:
        obstacles.addImage("ob3", obstacle3Image);
        break;
      case 4:
        obstacles.addImage("ob4", obstacle4Image);
        break;
      case 5:
        obstacles.addImage("ob5", obstacle5Image);
        break;
      case 6:
        obstacles.addImage("ob6", obstacle6Image);
        break;

      default:
        break;
    }
  }
}
