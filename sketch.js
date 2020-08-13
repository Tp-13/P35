//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogIMG, happyDogIMG;
database = firebase.database;
var feed;
var fedTime;
var lastFed;
var foodObj;

function preload()
{
  dogIMG = loadAnimation("images/Dog.png");
  happyDog = loadAnimation("images/happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,300,40,40)
  dog.addAnimation("dog",dogIMG);
  dog.addAnimation("dogHappy",happyDog);
  dog.scale = 0.25;

  foodObj = new Food();

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);
}


function draw() {  
  background(46,139,87)

  textSize(12);
  fill("white");
  stroke(2);

  foodObj.display();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  text("Note: Press UP_ARROW Key To Feed Drago Milk!",120,480);

  fedTime = database.ref('FeedTime')
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  fill(255,255.254);
  textSize(15);
  if (lastFed >= 12){
    text("Last Fed" + lastFed%12 + "PM", 350, 30);
  }
  else if (lastFed==0){
    text("Last Fed : 12 AM", 350, 30);
  }
  else {
    text("Last Fed" + lastFed + "AM", 350, 30);
  }

  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
  console.log(foodS)
}

function writeStock(x){
  console.log("x"+ x)
  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }
  database.ref("/").update({
    Food:x
  })
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}



// database.ref('/').update({ Food:foodObj.getFoodStock(), FeedTime:hour() }) }
