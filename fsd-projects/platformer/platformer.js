

$(function () {
 // initialize canvas and context when able to
 canvas = document.getElementById("canvas");
 ctx = canvas.getContext("2d");
 window.addEventListener("load", loadJson);


 function setup() {
   if (firstTimeSetup) {
     halleImage = document.getElementById("player");
     projectileImage = document.getElementById("projectile");
     cannonImage = document.getElementById("cannon");
     $(document).on("keydown", handleKeyDown);
     $(document).on("keyup", handleKeyUp);
     firstTimeSetup = false;
     //start game
     setInterval(main, 1000 / frameRate);
   }


   // Create walls - do not delete or modify this code
   createPlatform(-50, -50, canvas.width + 100, 50); // top wall
   createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
   createPlatform(-50, -50, 50, canvas.height + 500); // left wall
   createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall


   //////////////////////////////////
   // ONLY CHANGE BELOW THIS POINT //
   //////////////////////////////////


   // TODO 1 - Enable the Grid
   //  toggleGrid();



   

   // TODO 2 - Create Platforms
   createPlatform(100, 600, 400, 20, "black");       
   createPlatform(600, 500, 200, 20, "black");      
   createPlatform(900, 400, 150, 20, "black");    
   createPlatform(300, 300, 100, 20, "black");        
   createPlatform(700, 200, 100, 20, "black");     


  // TODO 3 - Create Collectables
   createCollectable("diamond", 650, 420, 0, 0.5);   
   createCollectable("steve", 950, 320, 0, 0.7);     
   createCollectable("grace", 310, 200, 0, 0);      
  


  
   // TODO 4 - Create Cannons
   createCannon("left", 400, 2000);     
   createCannon("top", 600, 1500);    
   createCannon("right", 250, 1000);



  
  
   //////////////////////////////////
   // ONLY CHANGE ABOVE THIS POINT //
   //////////////////////////////////
 }


 registerSetup(setup);
});