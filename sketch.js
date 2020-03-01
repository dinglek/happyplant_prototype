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
let needBoth;
let healthStats;

let plantID; 

function preload() { 
  healthStats = loadImage('pics/healthStats.png'); 
}

function setup() {
let canvas = createCanvas(350, 650);
    canvas.parent('sketch');


    //Plant sprite 
    plant = createSprite(175, 440);
    plant.addAnimation('normal', 'pics/plant_happy1.png'); 
    plant.addAnimation('moveHappy', 'pics/plant_happy2.png', 'pics/plant_happy2.png', 'pics/plant_happy2.png', 'pics/plant_happy2.png', 'pics/plant_happy2.png', 'pics/plant_happy2.png', 'pics/plant_happy1.png', 'pics/plant_happy1.png', 'pics/plant_happy1.png', 'pics/plant_happy1.png', 'pics/plant_happy1.png');
    plant.addAnimation('sad', 'pics/plant_sad1.png', 'pics/plant_sad1.png', 'pics/plant_sad1.png', 'pics/plant_sad1.png', 'pics/plant_sad1.png', 'pics/plant_sad1.png', 'pics/plant_sad2.png',  'pics/plant_sad2.png',  'pics/plant_sad2.png',  'pics/plant_sad2.png',  'pics/plant_sad2.png',  'pics/plant_sad2.png'); 
    plant.mouseActive = true;
    
    plantID = createDiv();
    plantID.id("plantID"); 
    plantID.size(500, 500);
    plantID.position(240, 858);
    plantID.parent('sketch');

    //Water sprite 
    water1 = createSprite(125, 140); 
    water1.addAnimation('normal','pics/water.png'); 
    water1.addAnimation('dry','pics/waterEmpty.png'); 
    water2 = createSprite(175, 140); 
    water2.addAnimation('normal','pics/water.png'); 
    water2.addAnimation('dry','pics/waterEmpty.png'); 
    water3 = createSprite(225, 140); 
    water3.addAnimation('normal','pics/water.png'); 
    water3.addAnimation('dry','pics/waterEmpty.png'); 
    
    //Sun sprite 
    sun1 = createSprite(125, 220); 
    sun1.addAnimation('normal','pics/sun.png'); 
    sun1.addAnimation('dry','pics/sunEmpty.png'); 
    sun2 = createSprite(175, 220); 
    sun2.addAnimation('normal','pics/sun.png'); 
    sun2.addAnimation('dry','pics/sunEmpty.png'); 
    sun3 = createSprite(225, 220); 
    sun3.addAnimation('normal','pics/sun.png'); 
    sun3.addAnimation('dry','pics/sunEmpty.png'); 
    
     //Need Messages
     needWater = createSprite(175,  556); 
     needWater.addAnimation('normal','pics/waterMe.png'); 
     needWater.visible = false; 
    
     needSun = createSprite(175,  556); 
     needSun.addAnimation('normal','pics/needSun.png'); 
     needSun.visible = false; 
    
     needBoth = createSprite(175,  580); 
     needBoth.addAnimation('normal','pics/both.png'); 
     needBoth.visible = false; 
    
     //Speach bubbles
     pleaseWater = createSprite(250, 325)
     pleaseWater.addAnimation('normal','pics/pleaseWater.png'); 
     pleaseWater.visible = false; 

     pleaseSun = createSprite(100, 325);
     pleaseSun.addAnimation('normal','pics/pleaseSun.png'); 
     pleaseSun.visible = false; 

  
    
    countW = 0;
    countS = 0; 
}

function draw() {
    background(223, 232, 230);
    image(healthStats, 30, 10);
    drawSprites();    
    keyPressed(); 
    healthWater(); 
    healthSun();
    message();
}


function healthWater() {
    if(countW >= 1 && countW < 2){ 
        water1.changeAnimation('normal');
        water2.changeAnimation('normal');
        water3.changeAnimation('dry'); 
        if(countS >= 2){
            message();
        }else{
            plant.changeAnimation('normal');           
        }
        happy();
        needWater.visible = false;
    }else if(countW >= 2 && countW < 3){ 
        water1.changeAnimation('normal');
        water2.changeAnimation('dry');
        water3.changeAnimation('dry');
        needMess();
    }else if(countW >= 3){
        water1.changeAnimation('dry');
        water2.changeAnimation('dry');
        water3.changeAnimation('dry');
        needMess();
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
        happy();
        healthWater();
        needSun.visible = false;
    }else if(countS >= 2 && countS < 3){ 
        sun1.changeAnimation('normal');
        sun2.changeAnimation('dry');
        sun3.changeAnimation('dry');
        healthWater();
        needMess();
    }else if(countS >= 3){
        sun1.changeAnimation('dry');
        sun2.changeAnimation('dry');
        sun3.changeAnimation('dry');
        healthWater();
        needMess();
    }else if(countS == 0){
        sun1.changeAnimation('normal');
        sun2.changeAnimation('normal');
        sun3.changeAnimation('normal');
        happy();
        needSun.visible = false;
    }
}  

function message(){
   if(countW >= 2 || countS >= 2){
        plant.changeAnimation('sad');  
    }
    
    //Mouse Interaction 
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
    
    //Touch Screen Interaction 
    if(countW >= 2 && countS >= 2){
        showMess(true, true);
        hideMess();
    }else if(countW >=2 && countS < 2){
        showMess(true, false); 
        hideMess();
    }else if(countW < 2 && countS >= 2){
        showMess(false, true); 
        hideMess();
    }
}

function showMess(visW, visS){
    document.getElementById("plantID").ontouchstart = function(){
        pleaseWater.visible = visW; 
        pleaseSun.visible = visS;
    };
}

function hideMess(){
    document.getElementById("plantID").ontouchend = function(){
        pleaseWater.visible = false; 
        pleaseSun.visible = false;
    };
}

function needMess(){
    if(countW >= 2 && countS >= 2){
        needWater.visible = false;
        needSun.visible = false;
        needBoth.visible = true;
    }else if(countW >= 2 && countS < 2){
        needWater.visible = true;
        needSun.visible = false;
        needBoth.visible = false;
    }else if(countW <2 && countS >= 2){
        needWater.visible = false;
        needSun.visible = true;
        needBoth.visible = false;
    }
}

function happy(){
    //Mouse Interaction 
    plant.onMouseOut = function() { plant.changeAnimation('normal');}; 
    plant.onMouseOver = function() { plant.changeAnimation('moveHappy'); }; 
    
    //Touch Screen Interaction 
    document.getElementById("plantID").ontouchstart = function(){plant.changeAnimation('moveHappy');};
    document.getElementById("plantID").ontouchend = function(){plant.changeAnimation('normal');};
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
