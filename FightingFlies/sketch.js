var swatter =[];
var bombs = [];
var flies = [];

var imgSwatter;
var imgBomb;
var imgFly;
var imgBoom;


var sx = 150;
var sy = 100;
var sw = 150;
var sh = 150;


var bx = 500;
var by = 500;
var bw = 50;
var bh = 50;




var fx = 200;
var fy = 200;
var fw = 50;
var fh = 50;


var status = "playing";
var youWin;

var timer = 0;
var seconds = 10;


function setup(){

	createCanvas(600,600);

	frameRate(30);




	for( var i = 0; i < 5; i++){
		bombs[i] = new bomb();

	}


	for( var i = 0; i < 10; i++){
		flies[i] = new fly();

	}



}

function preload(){

	imgSwatter = loadImage('images/swatter.png')
	imgFly = loadImage('images/fly.png');
	imgBomb = loadImage('images/bomb.png');
	imgBoom = loadImage('images/boom.png');

}




function draw(){

	sx = mouseX - sw/2;
	sy = mouseY - sh/2;

	var rightEdgeS = sx + sw;
	var bottomEdgeS = sy + sh;

	var rightEdgeB = bx + bw;
	var bottomEdgeB = by + bh;

	var rightEdgeF = fx + fw;
	var bottomEdgeF = fy + fh;



	background("pink");


	if (mouseIsPressed) {
		sw =100;
		sh =100;
	}

	else{
		sw = 150;
		sh = 150;
	}


	if(status == "playing")
	{
		fill("blue");
		image(imgSwatter,sx,sy,sw,sh);




	
	for (var i = 0; i < bombs.length; i++) {
		bombs[i].move();
		bombs[i].display();

	

		}


	

	for (var i = 0; i < flies.length; i++) {
		flies[i].move();
		flies[i].display();
		if ( doRectanglesOverlapFlies(sx, sy, sw, sh,
	                         	 	  fx, fy, fw, fh) )
		{
			flies.splice(i,1);
					}

		}

	}
	else if (status == "stopped") {

		textSize(50);
		stroke(1);
		fill("yellow");
		
	}


		if ( doRectanglesOverlapBombs(sx, sy, sw, sh,
	                             bx, by, bw, bh) )
		{
	
			status = "stopped";
			image(imgBoom,100,50,400,400)
			text("GAME OVER", 150,500);
			
		}

		else if (flies.length ===0) {
			status = "stopped";
			text("YOU WIN!!",180,260);
		}


		var theTime;

		  //this version does not loop:
		  theTime = millis();

		 

		  // 0-8 seconds
		  if (theTime > 8000)
		  {
		    status = "stopped";
		    text("GAME OVER!", 150,310);
		  }





		  textSize(20);
		  text("Time: " + seconds,505,570);


		  timer = timer + 1;

			if (timer > 30 && seconds > 0)
			{
				seconds = seconds - 1;

		    // reset timer
				timer = 0;
			}



		  text("Score: " + seconds +"/10",20,570);
				  








}








function bomb(){




	let bx = random(0,width-100);
	let by = random(0,height-100);

	this.display = function(){

		fill("yellow");

		image(imgBomb,bx,by,bw,bh);

	}


	this.move =function(){
		
		bx = bx + random(-0.5,0.5);
		by = by + random(-0.5,0.5);
	}


}




function fly(){



	let fx = random(0,width-100);
	let fy = random(0,height-100);




	this.display = function(){

		

		image(imgFly,fx,fy,fw,fh);

	}


	this.move =function(){
	
		fx = fx + random(-10,10);
		fy = fy + random(-10,10);
	}




}




function isPointInRectangle(px, py, rx, ry, rw, rh)
{

	if (px > rx && px < rx+rw && 
      py > ry && py < ry+rh)
	{
		return true;
	}
	else
	{
		return false;
	}

}



function doRectanglesOverlapBombs(sx, sy, sw, sh,
                             bx, by, bw, bh)
{
  //we will be looking at each corner of
  //the first rectangle as its own point

	var px;
	var py;

	//top-left corner
	px = sx;
	py = sy;

	if (isPointInRectangle(px, py, bx, by, bw, bh) )
	{
		return true;
	}


	//top-right corner
	px = sx + sw;
	py = sy;
	if (isPointInRectangle(px, py, bx, by, bw, bh) )
	{
		return true;
	}


	//bottom-left corner
	px = sx;
	py = sy + sh;
	if (isPointInRectangle(px, py, bx, by, bw, bh) )
	{
		return true;
	}



	//bottom-right corner
	px = sx + sw;
	py = sy + sh;
	if (isPointInRectangle(px, py, bx, by, bw, bh) )
	{
		return true;
	}



	return false;
}




function doRectanglesOverlapFlies(sx, sy, sw, sh,
                  
                             fx, fy, fw, fh)
{
  //we will be looking at each corner of
  //the first rectangle as its own point

	var px;
	var py;

	//top-left corner
	px = sx;
	py = sy;


	if (isPointInRectangle(px, py, fx, fy, fw, fh) && mouseIsPressed)
	{
		return true;
	}

	//top-right corner
	px = sx + sw;
	py = sy;


	if (isPointInRectangle(px, py, fx, fy, fw, fh) && mouseIsPressed)
	{
		return true;
	}


	//bottom-left corner
	px = sx;
	py = sy + sh;
	

	if (isPointInRectangle(px, py, fx, fy, fw, fh) && mouseIsPressed)
	{
		return true;
	}


	//bottom-right corner
	px = sx + sw;
	py = sy + sh;

	if (isPointInRectangle(px, py, fx, fy, fw, fh) && mouseIsPressed)
	{
		return true;
	}



	return false;
}

















