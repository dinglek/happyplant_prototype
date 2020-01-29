let plant; 
let water1;
let water2; 
let water3; 
let sun1;
let sun2; 
let sun3; 

let countW; 
let countS; 

let needWater; 
let pleaseWater;
let needSun; 
let pleaseSun; 
let healthStats;

let width = window.innerWidth;
let height = window.innerHeight;


function preload() {
//  needWater = loadImage('pics/waterMe.png');
//  pleaseWater = loadImage('pics/pleaseWater.png');
//  needSun = loadImage('pics/needSun.png'); 
//  pleaseSun = loadImage('pics/pleaseSun.png'); 
  healthStats = loadImage('pics/healthStats.png'); 
}

function setup() {
    createCanvas(width, height);
  
    //Plant sprite 
    plant = createSprite(width/2, (height - (height/3)) - 50);
    plant.addAnimation('normal', 'pics/plant_happy1.png'); 
    plant.addAnimation('moveHappy', 'pics/plant_happy2.png', 'pics/plant_happy2.png', 'pics/plant_happy2.png', 'pics/plant_happy2.png', 'pics/plant_happy2.png', 'pics/plant_happy2.png', 'pics/plant_happy1.png', 'pics/plant_happy1.png', 'pics/plant_happy1.png', 'pics/plant_happy1.png', 'pics/plant_happy1.png');
    plant.addAnimation('sad', 'pics/plant_sad1.png', 'pics/plant_sad1.png', 'pics/plant_sad1.png', 'pics/plant_sad1.png', 'pics/plant_sad1.png', 'pics/plant_sad1.png', 'pics/plant_sad2.png',  'pics/plant_sad2.png',  'pics/plant_sad2.png',  'pics/plant_sad2.png',  'pics/plant_sad2.png',  'pics/plant_sad2.png'); 
    plant.mouseActive = true;

    //Water sprite 
    water1 = createSprite((width/2 - 105), 325); 
    water1.addAnimation('normal','pics/water.png'); 
    water1.addAnimation('dry','pics/waterEmpty.png'); 
    water2 = createSprite((width/2), 325); 
    water2.addAnimation('normal','pics/water.png'); 
    water2.addAnimation('dry','pics/waterEmpty.png'); 
    water3 = createSprite((width/2 + 105), 325); 
    water3.addAnimation('normal','pics/water.png'); 
    water3.addAnimation('dry','pics/waterEmpty.png'); 
    
    //Sun sprite 
    sun1 = createSprite((width/2 - 105), 475); 
    sun1.addAnimation('normal','pics/sun.png'); 
    sun1.addAnimation('dry','pics/sunEmpty.png'); 
    sun2 = createSprite((width/2), 475); 
    sun2.addAnimation('normal','pics/sun.png'); 
    sun2.addAnimation('dry','pics/sunEmpty.png'); 
    sun3 = createSprite((width/2 + 105), 475); 
    sun3.addAnimation('normal','pics/sun.png'); 
    sun3.addAnimation('dry','pics/sunEmpty.png'); 
    
    //text sprites 
     needWater = createSprite((width/2),  (height - (height/3)) + 250); 
     needWater.addAnimation('normal','pics/waterMe.png'); 
     needWater.visible = false; 
     pleaseWater = createSprite(200 + (width/2), (height - (height/3)) - 350)
     pleaseWater.addAnimation('normal','pics/pleaseWater.png'); 
     pleaseWater.visible = false; 
     needSun = createSprite((width/2),  (height - (height/3)) + 350); 
     needSun.addAnimation('normal','pics/needSun.png'); 
     needSun.visible = false; 
     pleaseSun = createSprite((width/2) - 200, (height - (height/3)) - 350);
     pleaseSun.addAnimation('normal','pics/pleaseSun.png'); 
     pleaseSun.visible = false; 
  
    
    countW = 0;
    countS = 0; 
}

function draw() {
  background(220);
    
  image(healthStats, (width/2) - 300, 50);
   
  keyPressed(); 
  healthWater(); 
  healthSun();
  sad();
  drawSprites();
}

function healthWater() {
    if(countW >= 1 && countW < 2){ 
        water1.changeAnimation('normal');
        water2.changeAnimation('normal');
        water3.changeAnimation('dry'); 
        if(countS >= 2){
            sad();
        }else{
            plant.changeAnimation('normal');
        } 
        needWater.visible = false;
    }else if(countW >= 2 && countW < 3){ 
        water1.changeAnimation('normal');
        water2.changeAnimation('dry');
        water3.changeAnimation('dry');
        needWater.visible = true; 
    }else if(countW >= 3){
        water1.changeAnimation('dry');
        water2.changeAnimation('dry');
        water3.changeAnimation('dry');
        needWater.visible = true;
    }else if(countW == 0){
        water1.changeAnimation('normal');
        water2.changeAnimation('normal');
        water3.changeAnimation('normal');
        needWater.visible = false;
        happy();
    }
}  

function healthSun() {
    if(countS >= 1 && countS < 2){ 
        sun1.changeAnimation('normal');
        sun2.changeAnimation('normal');
        sun3.changeAnimation('dry');
        plant.changeAnimation('normal');
        healthWater();
        needSun.visible = false;
    }else if(countS >= 2 && countS < 3){ 
        sun1.changeAnimation('normal');
        sun2.changeAnimation('dry');
        sun3.changeAnimation('dry');
        healthWater();
        needSun.visible = true;
    }else if(countS >= 3){
        sun1.changeAnimation('dry');
        sun2.changeAnimation('dry');
        sun3.changeAnimation('dry');
        healthWater();
        needSun.visible = true;
    }else if(countS == 0){
        sun1.changeAnimation('normal');
        sun2.changeAnimation('normal');
        sun3.changeAnimation('normal');
        happy();
        needSun.visible = false;
    }
}  

function sad(){
 if(countW >= 2 || countS >= 2){
     plant.changeAnimation('sad');  
 }

 if(plant.mouseIsOver){
     if(countW >= 2){
        pleaseWater.visible = true;
     }
     
     if(countS >= 2){
         pleaseSun.visible = true;
     } 
 }else{
     pleaseWater.visible = false;
     pleaseSun.visible = false;
 }
}

function happy(){
  plant.onMouseOut = function() { this.changeAnimation('normal');}; 
  plant.onMouseOver = function() { this.changeAnimation('moveHappy'); }; 
  plant.onMouseReleased = function() { this.changeAnimation('normal');};
  plant.onMousePressed = function() {this.changeAnimation('moveHappy'); }; 
} 

function keyPressed() {
    if(keyWentDown('e')){ 
        if(countW == 5){
            countW = 5; 
        }else{
            countW = countW + 1;  
        }
    }else if(keyWentDown('w')){
        if(countW == 0){
            countW = 0; 
        }else{
             countW = countW - 1;  
        }
    }else if(keyWentDown('d')){ 
        if(countS == 3){
            countS = 3; 
        }else{
            countS = countS + 1;  
        } 
    }else if(keyWentDown('s')){
        if(countS == 0){
            countS = 0; 
        }else{
             countS = countS - 1;  
        }
    }
} 


