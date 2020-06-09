
class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    //car1 is the label it can be also written as "car" to relate the image as done in the trex game;
    car1 = createSprite(100,100);
    car1.addImage("car1",car_1);
    car1.scale = 0.2;
    car2 = createSprite(100,300);
    car2.addImage("car2",car_2);
    car2.scale = 0.2;
    car3 = createSprite(100,500);
    car3.addImage("car3",car_3);
    car3.scale = 0.2;
    car4 = createSprite(100,700);
    car4.addImage("car4",car_4);
    car4.scale = 0.2;
    cars = [car1, car2, car3, car4];
    
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){

      background(rgb(150,20,180));
      
      image(track,-displayWidth*5,displayWidth/2,-displayWidth*4,displayHeight);
    
      var index = 0;
      var x 
      var y  = 200

      for(var plr in allPlayers){
        
        index = index + 1 ;

        
        y = y + 200;

        
        x=   displayWidth  - allPlayers[plr].distance 

        if (index === player.index){
          stroke(10);
          fill("yellow")
         rect(x-50,y+33,75,75);
          cars[index-1].position.x = x;
          cars[index-1].position.y = y;
          cars[index - 1].shapeColor = "red";
          camera.position.y = displayHeight/2;
          camera.position.x = cars[index-1].position.x;

      
        }
       
        
      }
    
    

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    }
    
  
  if(player.distance > 3990){
  
gameState = 2

  }
    drawSprites();
  }
}
