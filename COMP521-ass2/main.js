window.onload = function() {
  //Create canvas
	var canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight;
  //Create cannon
  cannon = new cannon(width-40, height, 100, 180);

  //This is to keep track of the amount of points on the screen, so that ghosts are created with the proper connections
  var pointcounter = 0;
  //Variable used in making sure the player cannon stays in bounds
  var turnCount = 0;

  //Hold our points
  var points = [],
  //Hold our "sticks"
  sticks = [],
  //stonehedge
  stones = [],
  //Control how much bounce occurs
  bounce = 0.9,
  //control the amount of gravity
  gravity = 0.8,
  //Control our friction
  friction = 0.99,
  cannon; 

  //This will be our cloud
  var img = new Image();   // Create new img element
  img.src = 'cloud.png'; // Set source path
  var cloud = {
    x: width/2,
    y: 10,
    scalex: 150,
    scaley: 100
    };
  
  //Heres the bounding boxes for stones
  var left = {
    x: width/2 - 75,
    y: height-200,
    w: 25,
    h: 225
    };
    var right = {
      x: width/2 + 75,
      y: height-200,
      w: 25,
      h: 225
    };
    var top = {
      x: width/2 - 60,
      y: height-225,
      w: 150,
      h: 25
    };

  //Cannon constructor
  function cannon(x, y, length, angle) 
  {
    this.rotate = 0;
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = angle;
    this.update = function () {
      this.xtemp = this.x + this.length * Math.cos(this.angle);
      this.ytemp = this.y + this.length * Math.sin(this.angle);
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineWidth = 5;
      context.lineTo(this.xtemp, this.ytemp);
      context.stroke();
      context.lineWidth = 1;
      context.closePath();
    };
    this.newAngle = function () {
      this.angle += this.rotate;
    };
  }

  //Ghost constructor
  function makeGhost(startx, starty) 
  {
    //We add points to the points array in certian relative positions to startx and starty to create the ghost shape everytime
    points.push({
      x: startx,
      y: starty,
      r: 5,
      oldx: startx,
      oldy: starty,
      ghost: true, 
      name: 1
    });
    points.push({
      x: startx +10,
      y: starty-30,
      r: 5,
      oldx: startx+10,
      oldy: starty-30,
      ghost: true,
      name: 2
    });
    points.push({
      x: startx+10,
      y: starty-60,
      r: 5,
      oldx: startx+10,
      oldy: starty-60,
      ghost: true,
      name: 3
    });
    points.push({
      x: startx-5,
      y: starty-80,
      r: 5,
      oldx: startx-5,
      oldy: starty-80,
      ghost: true,
      name: 4
    });
    points.push({
      x: startx-25,
      y: starty-80,
      r: 5,
      oldx: startx-25,
      oldy: starty-80,
      ghost: true,
      name: 5
    });
    //6
    points.push({
      x: startx-40,
      y: starty-60,
      r: 5,
      oldx: startx-40,
      oldy: starty-60,
      ghost: true,
      name: 6
    });
    points.push({
      x: startx-40,
      y: starty-30,
      r: 5,
      oldx: startx-40,
      oldy: starty-30,
      ghost: true,
      name: 7
    });
    //8
    points.push({
      x: startx-29,
      y: starty+10,
      r: 5,
      oldx: startx-29,
      oldy: starty+10,
      ghost: true,
      name: 8
    });
    points.push({
      x: startx-20,
      y: starty-30,
      r: 5,
      oldx: startx-20,
      oldy: starty-30,
      ghost: true,
      name: 9
    });
    //10
    points.push({
      x: startx-15,
      y: starty+20,
      r: 5,
      oldx: startx-15,
      oldy: starty+20,
      ghost: true,
      name: 10
    });
    points.push({
      x: startx-10,
      y: starty-30,
      r: 5,
      oldx: startx-10,
      oldy: starty-30,
      ghost: true,
      name: 11
    });

    //eyes 
    //12
    points.push({
      x: startx-5,
      y: starty-50,
      r: 7,
      oldx: startx-5,
      oldy: starty-50,
      ghost: true,
      name: 12
    });
    points.push({
      x: startx-20,
      y: starty-55,
      r: 7,
      oldx: startx-20,
      oldy: starty-55,
      ghost: true,
      name: 13
    });

    //These will be the sticks that hold the ghost points together
    sticks.push({
      p0: points[pointcounter + 0],
      p1: points[pointcounter + 1],
      length: distance(points[pointcounter + 0], points[pointcounter + 1])
    });
    sticks.push({
      p0: points[pointcounter +1],
      p1: points[pointcounter +2],
      length: distance(points[pointcounter +1], points[pointcounter +2])
    });
    sticks.push({
      p0: points[pointcounter +2],
      p1: points[pointcounter +3],
      length: distance(points[pointcounter +2], points[pointcounter +3])
    });
    sticks.push({
      p0: points[pointcounter +4],
      p1: points[pointcounter +3],
      length: distance(points[pointcounter +4], points[pointcounter +3])
    });
    sticks.push({
      p0: points[pointcounter +4],
      p1: points[pointcounter +5],
      length: distance(points[pointcounter +4], points[pointcounter +5])
    });
    sticks.push({
      p0: points[pointcounter +5],
      p1: points[pointcounter +6],
      length: distance(points[pointcounter +5], points[pointcounter +6])
    });
    sticks.push({
      p0: points[pointcounter +6],
      p1: points[pointcounter +7],
      length: distance(points[pointcounter +6], points[pointcounter +7])
    });
    sticks.push({
      p0: points[pointcounter +7],
      p1: points[pointcounter +8],
      length: distance(points[pointcounter +7], points[pointcounter +8])
    });
    sticks.push({
      p0: points[pointcounter +8],
      p1: points[pointcounter +9],
      length: distance(points[pointcounter +8], points[pointcounter +9])
    });
    sticks.push({
      p0: points[pointcounter +9],
      p1: points[pointcounter +10],
      length: distance(points[pointcounter +9], points[pointcounter +10])
    });
    sticks.push({
      p0: points[pointcounter +10],
      p1: points[pointcounter +0],
      length: distance(points[pointcounter +0], points[pointcounter +10])
    });
    sticks.push({
      p0: points[pointcounter +2],
      p1: points[pointcounter +11],
      length: distance(points[pointcounter +2], points[pointcounter +3]),
      hidden: true
    });
    sticks.push({
      p0: points[pointcounter +11],
      p1: points[pointcounter +12],
      length: distance(points[pointcounter +11], points[pointcounter +12]),
      hidden: true
    });
    sticks.push({
      p0: points[pointcounter +12],
      p1: points[pointcounter +5],
      length: distance(points[pointcounter +12], points[pointcounter +5]),
      hidden: true
    });

    //support sticks are invisible but put in to maintain the shape of the ghost
    sticks.push({
      p0: points[pointcounter +7],
      p1: points[pointcounter +5],
      length: distance(points[pointcounter +7], points[pointcounter +5]),
      hidden: true
    });
    sticks.push({
      p0: points[pointcounter +7],
      p1: points[pointcounter +4],
      length: distance(points[pointcounter +7], points[pointcounter +4]),
      hidden: true
    });
    sticks.push({
      p0: points[pointcounter +0],
      p1: points[pointcounter +2],
      length: distance(points[pointcounter +0], points[pointcounter +2]),
      hidden: true
    });
    sticks.push({
      p0: points[pointcounter +0],
      p1: points[pointcounter +3],
      length: distance(points[pointcounter +0], points[pointcounter +3]),
      hidden: true
    });
    sticks.push({
      p0: points[pointcounter +2],
      p1: points[pointcounter +5],
      length: distance(points[pointcounter +2], points[pointcounter +5]),
      hidden: true
    });
    sticks.push({
      p0: points[pointcounter +1],
      p1: points[pointcounter +6],
      length: distance(points[pointcounter +1], points[pointcounter +6]),
      hidden: true
    });
    sticks.push({
      p0: points[pointcounter +3],
      p1: points[pointcounter +6],
      length: distance(points[pointcounter +6], points[pointcounter +3]),
      hidden: true
    });
    sticks.push({
      p0: points[pointcounter +1],
      p1: points[pointcounter +4],
      length: distance(points[pointcounter +1], points[pointcounter +4]),
      hidden: true
    });

    //We added 13 points to create our ghost
    pointcounter += 13;
  }

//PERLIN NOISE GENERATOR///////////////////////////////////////////

  //linear congruential generator parameters
  var M = 4294967296,
      A = 1664525,
      C = 1;

  //psuedo-random number generator (linear congruential)
  //This variable chooses a random number between 0 and 500;
  var rando = Math.random()* 500;
  function PSNG(){
    this.Z = Math.floor(rando);
    this.next = function(){
      this.Z = (A * this.Z + C) % M;
      return this.Z / M - 0.5;
    }
  }

  //cosine interpolation
  function Interpolate(pa, pb, px){
    var ft = px * Math.PI,
      f = (1 - Math.cos(ft)) * 0.5;
    return pa * (1 - f) + pb * f;
  }

  //1D perlin line generator
  function Perlin(amp, wl, width){
    this.x = 0;
    this.amp = amp;
    this.wl = wl;
    this.fq = 1 / wl;
    this.psng = new PSNG();
    this.a = this.psng.next();
    this.b = this.psng.next();
    this.pos = [];
    while(this.x < width){
      if(this.x % this.wl === 0){
        this.a = this.b;
        this.b = this.psng.next();
        this.pos.push(this.a * this.amp);
      }else{
        this.pos.push(Interpolate(this.a, this.b, (this.x % this.wl) / this.wl) * this.amp);
      }
      this.x++;
    }
  }

  //octave generator
  function GenerateNoise(amp, wl, octaves, divisor, width){
    var result = [];
    for(var i = 0; i < octaves; i++){
      result.push(new Perlin(amp, wl, width));
      amp /= divisor;
      wl /= divisor;
    }
    return result;
  }

  //combines octaves together
  function CombineNoise(pl){
    var result = {pos: []};
    for(var i = 0, total = 0, j = 0; i < pl[0].pos.length; i++){
      total = 0;
      for(j = 0; j < pl.length; j++){
        total += pl[j].pos[i];
      }
      result.pos.push(total);
    }
    return result;
  }

  //////////////////////END PERLIN NOISE GENERATION///////////////////////////////////////

  //perlin line plotting x direction
  function DrawLine(x, y, length, L){
    context.beginPath();
    context.moveTo(x, y);
    for(var i = x; i <= length + x; i++)
    {
      context.lineTo(i, y + L.pos[i]);
    }
    context.stroke();
    
    //Top stone pillars vertical lines
    //Adding perlin noise in this small space didn't seem needed 
    context.moveTo(width/2 - 60, height - 225);
    context.lineTo(width/2 - 60, height - 200);
    context.moveTo(width/2 + 90, height - 227);
    context.lineTo(width/2 + 90, height - 200);
    context.stroke();
  }

  //perlin line plotting y direction
  function DrawLineY(x, y, length, L){
    context.beginPath();
    context.moveTo(x, y);
    for(var i = y; i <= length + y; i++)
    {
      context.lineTo(x + L.pos[i], i);
    }
    context.stroke();
  }

    //Each point holds information about it's current position
    //and its last position, in order to be used in calculating its next position
    //Normal distance function to create a link between 2 points
    function distance(p0, p1) {
      var dx = p1.x - p0.x,
        dy = p1.y - p0.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

  //Call this to show the stones on stage
  function drawBricks() {

    //Right stone
    DrawLine(width/2 + 75, height - 200, 25, CombineNoise(GenerateNoise(5, 5, 1, 2, width)));
    DrawLine(width/2 + 75, height, 25, CombineNoise(GenerateNoise(5, 5, 1, 2, width)));

    //Left stone
    DrawLine(width/2 - 75, height - 200, 25, CombineNoise(GenerateNoise(5, 5, 1, 2, width)));
    DrawLine(width/2 - 75, height, 25, CombineNoise(GenerateNoise(5, 5, 1, 2, width)));

    //Center
    DrawLine(width/2 - 60, height - 225, 150, CombineNoise(GenerateNoise(5, 5, 1, 2, width)));
    DrawLine(width/2 - 60, height - 200, 150, CombineNoise(GenerateNoise(5, 5, 1, 2, width)));

    //Right stone sides
    DrawLineY(width/2 + 75, height - 200, 200, CombineNoise(GenerateNoise(5, 5, 1, 2, width)));
    DrawLineY(width/2 + 100, height - 200, 200, CombineNoise(GenerateNoise(5, 5, 1, 2, width)));

    //Left stone sides
    DrawLineY(width/2 - 75, height - 200, 200, CombineNoise(GenerateNoise(5, 5, 1, 2, width)));
    DrawLineY(width/2 - 50, height - 200, 200, CombineNoise(GenerateNoise(5, 5, 1, 2, width)));
  }

//These variables are here because they go with the wind function
  //Coin randomly decides which way to blow the wind, windTimer delays the function from being called every frame
  var coin = Math.random();
  var windTimer = 0;
  function wind() {

    if(cloud.x >= width)
    {
      cloud.x = 10;
    }
    else if (cloud.x < 0)
    {
      cloud.x = width - 200;
    }

    while(coin > 0.5)
    {
      cloud.x += 1;
      windTimer++;
      if(windTimer >= 100)
      {
         coin = Math.random();
         windTimer = 0;
      }
      return 1.5; 
    }

    while(coin < 0.5)
    {
      cloud.x += -1;
      windTimer++;
      if(windTimer >= 100)
      {
        coin = Math.random();
        windTimer = 0;
      }
      return -1.5;
    }
  }

  //Main game loop
	function update() {
    updatePoints();
    //To adjust rigidness. (0 = low, 5 = high)
    for(var i = 0; i < 3; i++)
    {
      updateSticks();
      constrainPoints();
    }
		renderPoints();
    renderSticks();

    cannon.newAngle();
    cannon.update();
    cannon.rotate = 0;

    //Create Stonehedge
    drawBricks();

    //Make the wind effect happen
    wind();

    context.drawImage(img, cloud.x, cloud.y, cloud.scalex, cloud.scaley);

    //Update every frame
		requestAnimationFrame(update);
  }

  //Checks for key inputs to move cannon and fire cannon
  document.onkeydown = function (e)
  {
    e = e || window.event;
    if(turnCount > 9)
    {
      alert("Out of bounds");
      cannon.rotate = -0.1;
      turnCount--;
      return;
    }
    else if(turnCount < -8)
    {
      alert("Out of bounds");
      cannon.rotate = 0.1;
      turnCount++;
      return;
    }
    if (e.keyCode == '38') {
        // up arrow
        cannon.rotate = 0.1;
        turnCount++;
    }
    else if (e.keyCode == '40') {
        // down arrow
        cannon.rotate = -0.1;
        turnCount--;
    }
    else if (e.keyCode == '37') {
       // left arrow
       cannon.rotate = -0.1;
       turnCount--;
    }
    else if (e.keyCode == '39') {
       // right arrow
       cannon.rotate = 0.1;
       turnCount++;
    }
    if(e.keyCode == 32){
      points.push({
        x: cannon.x + cannon.length * Math.cos(cannon.angle),
        y: cannon.y + cannon.length * Math.sin(cannon.angle),
        r: 5,
        oldx: cannon.x + 60 * Math.cos(cannon.angle),
        oldy: cannon.y + 60 * Math.sin(cannon.angle),
        ghost: false, 
        hidden: false
      });
      pointcounter++;
    }
  }

  //Update all points positon
	function updatePoints() {
    //Loop through points array
		for(var i = 0; i < points.length; i++) {
      //Calculate velocity in both x and y directions
      var p = points[i],
      vx = (p.x - p.oldx) * friction;
      vy = (p.y - p.oldy) * friction;
      //update positions
			p.oldx = p.x;
			p.oldy = p.y;
			p.x += vx;
      p.y += vy;
      //Don't forget about gravity
      if(p.ghost == false)
        p.y += gravity;
        else if(p.ghost == true)
        {
            //p.y -= gravity * .2;
            if(p.y < height/2)
            {
              p.y += gravity * .1;
            }
            if(p.y > height/2)
            {
              p.y -= gravity * .1;
            }

            p.x += 0.05;
        }

      //On top of stonehedge apply wind if cannonball
      if(p.x > (width/2 - 75) && p.x < (width/2 + 100) && p.ghost == false)
      {
        p.x += wind();
      }
      //If ghost goes out of bounds to the right
      if(p.x > width && p.x < width + 5 && p.ghost == true && p.name ==1)
      {
        makeGhost(Math.random() * 500 + 20, height - Math.random() * 200);
      }
		}
  }

  //Prevent points from going anywhere they shouldn't
	function constrainPoints() {
		for(var i = 0; i < points.length; i++) {
			var p = points[i],
				vx = (p.x - p.oldx) * friction;
				vy = (p.y - p.oldy) * friction;

      //Check to see if the point is at the right hand boundry of the game screen
			if(p.x > width - 5) {
        if(!p.ghost)
        {
          p.x = width;
          p.oldx = p.x + vx * bounce;
        }
      }
      //If ghost gets to the left border
      else if(p.x < 5) 
      {
        if(p.ghost == true)
          vx += -1;
      }
      //Check to see if the point is at the top boundry of the game screen
			if(p.y > height - 5) {
				p.y = height - 5;
				p.oldy = p.y + vy * bounce;
      }
      //Check to see if the point is at the bottom boundry of the game screen
			else if(p.y < 5) {
				p.y = 5;
        p.oldy = p.y + vy * bounce;
      }
      //COLLISIONDETECTION WITH STONEHEDGE
      if(RCColliding(p, left))
      {
        p.x = -left.x;
        p.x = p.oldx + -vx * bounce;
      }
      if(RCColliding(p, right))
      {
        p.x = right.x + right.w;
        p.x = p.oldx + -vx * bounce;
      }
      if(RCColliding(p, top))
      {
        p.y = top.y + top.h;
        p.y = p.oldy + -vy * bounce;
      }

      //Cannonball collision with ghosts
      if(p.ghost == true)
      {
        for(var j = 0; j < points.length; j++)
        {
          var po = points[j];
          if(po.ghost == false)
          {
            if(distance(p, po) < 5)
            {
              p.x -= po.oldx * 0.4;
              p.y += po.oldy * 0.4;
              po.hidden = true;
            }
        }
        }
      }
    }

  }

  //Function to decide if a point is colliding with stones
  function RCColliding(circle, rect) {
    var distX = Math.abs(circle.x - rect.x - rect.w / 2);
    var distY = Math.abs(circle.y - rect.y - rect.h / 2);

    if (distX > (rect.w / 2 + circle.r)) {
        return false;
    }
    if (distY > (rect.h / 2 + circle.r)) {
        return false;
    }

    if (distX <= (rect.w / 2)) {
        return true;
    }
    if (distY <= (rect.h / 2)) {
        return true;
    }

    var dx = distX - rect.w / 2;
    var dy = distY - rect.h / 2;
    return (dx * dx + dy * dy <= (circle.r * circle.r));
}

  //Update all sicks
	function updateSticks() {
		for(var i = 0; i < sticks.length; i++) {
			var s = sticks[i],
      dx = s.p1.x - s.p0.x,
      dy = s.p1.y - s.p0.y,
      //These steps are to make sure the line between the points is generated at the proper length
      distance = Math.sqrt(dx * dx + dy * dy),
      difference = s.length - distance,
      percent = difference / distance / 2,
      offsetX = dx * percent,
      offsetY = dy * percent;

    s.p0.x -= offsetX;
    s.p0.y -= offsetY;
    s.p1.x += offsetX;
    s.p1.y += offsetY;
		}
  }
  
  //Display all points to the player
	function renderPoints() {
		context.clearRect(0, 0, width, height);
		for(var i = 0; i < points.length; i++) {
      var p = points[i];
      if(!p.hidden)
      {
			  context.beginPath();
        context.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        context.fill();
      }
    }
  }
  
  //Display all points to the player
	function renderSticks() {
		context.beginPath();
		for(var i = 0; i < sticks.length; i++) {
      var s = sticks[i];
      if(!s.hidden)
      {
        context.moveTo(s.p0.x, s.p0.y);
        context.lineTo(s.p1.x, s.p1.y);
      }
		}
    context.stroke();
  }

  //Start game
  update();
  var ghost1 = makeGhost(Math.random() * 500 + 20, height - Math.random() * 200);
  var ghost2 = makeGhost(Math.random() * 500 + 20, height - Math.random() * 200);
  var ghost3 = makeGhost(Math.random() * 500 + 20, height - Math.random() * 200);
  var ghost4 = makeGhost(Math.random() * 500 + 20, height - Math.random() * 200);
}