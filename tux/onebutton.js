var tux,flame,w,h,tuxW,tuxH,tuxX,tuxY,direction,gameOver,score,badGuys,speed,starsArray;
function init(){
  tux = new Image();
  tux.src = 'tux/Tux.png';
  flame= new Image();
  flame.src="tux/flame.png";
  w = 600;
  h = 600;
  tuxW = 30;
  tuxH = 35;
  tuxX = 100;
  tuxY = 300;
  direction = 0;
  gameOver=false;
  score=0;
  badGuys=new Array();
  badGuys[0] = new badGuy(600,tuxY,1);
  speed = 2;
  starsArray = new Array(100);
  for(var i=0;i<100;i++)
  {
    starsArray[i] = new star(Math.floor((Math.random()*599)+1),
                             Math.floor((Math.random()*599)+1),
                             "white",
                             Math.floor((Math.random()*3)+1));
  }
  currentInterval = setInterval(draw,100/speed);
}
function draw() {
  update();
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.clearRect(0,0,w,h);
  drawStars();
  if(direction%2!=0)ctx.drawImage(flame,tuxX,tuxY+tuxH-10);
  ctx.drawImage(tux,tuxX,tuxY);
  for (var i = 0;i<badGuys.length;i++)
  {
    var badGuy = badGuys[i];
    //ctx.fillRect(badGuy.getRect().left,badGuy.getRect().top,badGuy.getImage().width,badGuy.getImage().height);
    drawRotatedImage(badGuy.getImage(),badGuy.getX(),badGuy.getY(),badGuy.getX());
  }
  //ctx.fillRect(tuxX,tuxY,tuxW,tuxH);
  ctx.fillStyle = "white";
  ctx.fillText(score,0,10);
  ctx.restore();
}
function buttonDown()
{
  direction++;
}
function buttonUp()
{
  direction--;
}

var TO_RADIANS = Math.PI/180; 
function drawRotatedImage(image, x, y, angle) { 
  var context = document.getElementById('canvas').getContext('2d');
	context.save(); 
 	context.translate(x, y);
	context.rotate(angle * TO_RADIANS);
	context.drawImage(image, -(image.width/2), -(image.height/2));
 	context.restore(); 
}

function drawStars() { 
  var context = document.getElementById('canvas').getContext('2d');
  context.fillStyle = "#464646";
  context.fillRect(0,0,w,h);
	for(var i=0;i<starsArray.length;i++)
	{
	  star = starsArray[i];
	  context.fillStyle = star.getColour();
	  context.fillRect(star.getX(),star.getY(),star.getSize(),star.getSize());
	}
}
function hit(badRect)
{
  var tuxRect = new Object();
  tuxRect=new Object();
  tuxRect.top=tuxY;
  tuxRect.bottom=tuxY+tuxH;
  tuxRect.left = tuxX;
  tuxRect.right = tuxX+tuxW;
  return !(  tuxRect.right-5 < badRect.left+5
          || tuxRect.bottom-5 < badRect.top+5
          || tuxRect.top+5 > badRect.bottom-5
          || tuxRect.left+5 > badRect.right-5 );
}
function update()
{
  if (!gameOver)
  {
    if(direction%2==0)tuxY+=4;
    else tuxY-=6;
    if (tuxY+tuxH >= h || tuxY <= 0) gameOver = true;
    for(var i=0;i<starsArray.length;i++)
	  {
	    star = starsArray[i];
	    starX = star.getX();
	    if(starX<=-star.getSize())star.setX(600);
	    else star.setX(starX-1);
	  }
    for (var i = 0;i<badGuys.length;i++)
    {
      if(hit(badGuys[i].getRect())) gameOver=true;
      if(badGuys[i].getX() >= 1)
      {
        badGuys[i].setX(badGuys[i].getX()-5);
      }
      else 
      {
        badGuys.shift();
        i--;
      }
    }
    score++;
    if(score%20 == 0)
    {
      badGuys.push( new badGuy(600,tuxY,Math.floor((Math.random()*4)+1)));
    }
    if (score%200 == 0)
    {
      speed++;
      clearInterval(currentInterval);
      currentInterval = setInterval(draw,100/speed);
    }
  }
  else
  {
    document.getElementById("onebutton").innerHTML="GAME OVER - Score "+score;
    clearInterval(currentInterval);
  }
}
