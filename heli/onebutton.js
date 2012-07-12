var canvas,w,h,ctx,heli,heliPic,heliAngle,sea,level,currentInterval,score,crash,badGuys,bullets,clouds,sound;
var TO_RADIANS = Math.PI/180;
function init(){
  sound = new Audio();
  if (!!sound.canPlayType && sound.canPlayType('audio/ogg') != "")
  {
    sound.setAttribute("src","heli/heli.ogg")
  }
  else if (!!sound.canPlayType && sound.canPlayType('audio/aac') != "")
  {
    sound.setAttribute("src","heli/heli.aac");
  }
  else sound.setAttribute("src","heli/heli.mp3");
  sound.setAttribute("loop","loop");
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext('2d');
  w = canvas.width;
  h = canvas.height;
  level = 1;
  heli = new heli();
  heliPic = heli.getImage();
  sea = new sea(level,30);
  score=0;
  frame = 0;
  crash = false;
  badGuys = new Array();
  bullets = new Array();
  clouds = new Array(Math.floor((Math.random()*20)+1));
  for (var i = 0;i<clouds.length;i++)
  {
    clouds[i] = new badGuy(600/i,Math.floor((Math.random()*500)+1),"cloud");
  }
  currentInterval = setInterval(draw,10);
}

function update()
{
  if (!hit())
  {
    frame++;
    score++;
    if (heli.getDirection() == "up")
    {
      heli.up(2);
      heliAngle = 15;  
      sound.play();
    }
    else 
    {
      heli.down(4);
      heliAngle = 0;
      sound.pause();
    }
    if(frame % 4 == 0)
    {
      sea.move();
    }
    if(frame % 50 == 0 && frame % 1000 != 0)
    {
      badGuys.push(new badGuy(600,heli.getY(),Math.floor((Math.random()*4)+1)));
    }
    if (frame % 1000 == 0)
    {
      badGuys.push(new badGuy(600,heli.getY(),"tux"));
    }
    for(var i = 0;i<clouds.length;i++)
    {
      clouds[i].setX(clouds[i].getX()-.5);
      if (clouds[i].getX() == -46) clouds[i].setX(600);
    }
    for(var i = 0;i<badGuys.length;i++)
    {
      badGuys[i].setX(badGuys[i].getX()-1);
      if (badGuys[i].getX() == 0 && badGuys[i].getType() != "tux")
      {
        badGuys.splice(i,1);
        score-=1000;
      }
      if (badGuys[i].getX() == 0 && badGuys[i].getType() == "tux")
      {
        badGuys.splice(i,1);
        score += 10000;
      }
      
    }
    for(var i = 0;i<bullets.length;i++)
    {
      bullets[i].move(5);
      var bullet = bullets[i].getBullet();
      
      for(var j = 0; j< badGuys.length; j++)
      {
        var abadGuy = badGuys[j];
        if (!( bullet[0]+bullet[2] < abadGuy.getX()  //bullet to left of badguy
            || bullet[1]+bullet[3] < abadGuy.getY() - abadGuy.getImage().height/2 //bullet above badguy
            || bullet[0] > abadGuy.getX() + abadGuy.getImage().width // bullet to right of badguy
            || bullet[1] > abadGuy.getY() + abadGuy.getImage().height)) //bullet below badguy
        {
          badGuys.splice(j,1);
          bullets.splice(i,1);
          if (abadGuy.getType() == "tux")
          {
            score -= 10000;
          }
          else
          {
            score += 100;
          }
        }
      }
      if (bullet[0] >= 600) bullets.splice(i,1);
    }
  }
  else {
    document.getElementById("onebutton").innerHTML = "GAME OVER - Score "+score;
    clearInterval(currentInterval);
  }
}

function draw() {
  update();
  ctx.clearRect(0,0,w,h);
  seaLine = sea.getSea();
  var grd = ctx.createLinearGradient(300,0, 300, 600);
  grd.addColorStop(0, "#F0FFFF");
  grd.addColorStop(1, "#E0FFFF");
  ctx.fillStyle = grd;
  ctx.fillRect(0,0,600,600);
  ctx.beginPath();
  ctx.moveTo(610,610);
  ctx.lineTo(-10,610);
  for(var i = 0;i<clouds.length;i++)
  {
    ctx.drawImage(clouds[i].getImage(),clouds[i].getX(),clouds[i].getY());
  }
  for(var i=0;i<seaLine.length;i++)
  {
    ctx.lineTo(i*(600/seaLine.length+1),600-seaLine[i]*level);
  }
  ctx.lineWidth = 1;
  ctx.lineJoin="round";
  var grd = ctx.createLinearGradient(300,600-sea.count/(2+2/3), 300, 600);
  grd.addColorStop(0, sea.getColour());
  grd.addColorStop(1,"#006060");
  ctx.fillStyle = grd;
  ctx.strokeStyle=sea.getColour();
  ctx.fill();
  ctx.stroke();
  for(var i=heli.getX();i<heli.getX()+heli.getImage().width;i++)
  {
    for(var j = heli.getY();j<heli.getY()+heli.getImage().height;j++)
    {
      if (ctx.isPointInPath(i,j)) crash = true;
    }
  }
  for(var i = 0;i<badGuys.length;i++)
  {
    drawRotatedImage(badGuys[i].getImage(),badGuys[i].getX(),badGuys[i].getY(),badGuys[i].getX());
  }
  ctx.fillStyle="black";
  for(var i = 0;i<bullets.length;i++)
  {
    bullet = bullets[i].getBullet();
    ctx.fillRect(bullet[0],bullet[1],bullet[2],bullet[3]);
  }
  drawRotatedImage(heliPic,heli.getX(),heli.getY(),heliAngle);
  ctx.fillText(score,0,10);
  ctx.restore();
}

function drawRotatedImage(image, x, y, angle) { 
  ctx.save(); 
 	ctx.translate(x, y);
	ctx.rotate(angle * TO_RADIANS);
	ctx.drawImage(image, -(image.width/2), -(image.height/2));
 	ctx.restore(); 
}
function shoot()
{
  bullets.push(new Bullet(heli.getX(),heli.getY(),3,2));
  score-=50;
}

function buttonDown()
{
  heli.direction="up";
  shoot();
}
function buttonUp()
{
  heli.direction = "down";
}
function hit()
{
  var hit = (    heli.getY() <= 8 
           || heli.getY() + 8 >= 600
           || crash
         );
  if (hit) sound.pause();
  return hit;
}
