const { createContext } = require("react");

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
   toggleGrid();


    // TODO 2 - Create Platforms
    createPlatform(x=270, y=615, width=200, height=15, color="black");
    createPlatform(x=600, y=500, width=80, height=15, color="black");
    createPlatform(x=1000, y=605, width=20, height=100000, color="black");
    createPlatform(x=1000, y=605, width=200, height=15, color="black");
    createPlatform(x=100, y=360, width=200, height=15, color="black")
    // TODO 3 - Create Collectables

    

    // TODO 4 - Create Cannons
    createCannon("bottom", position=500, delay=600);
    createCannon("right", position=650, delay=1500);


    
    
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
