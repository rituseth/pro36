var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed , lastFed;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
feedtheDog = createButton("feed the dog ")
feedtheDog.position(700,95)
feedtheDog.mousePressed(feedDog)
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();


fedtime = database.ref("Feedtime")
fedtime.on("value" , function (data){
  lastFed = data.val()
})


textSize(15)
fill ("black ")
if (lastFed>=12){
  text ("Last Feed : " +lastFed %12 + "pm" , 350,40)
}
else if (lastFed===0){
  text ("last fed: 12pm" , 350,40)
}
else{
  text ("last feed: " +lastFed +"am",350,40)
}
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref ("/").update({
  Food : foodObj.getFoodStock(),
  Feedtime: hour()
}) 
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
