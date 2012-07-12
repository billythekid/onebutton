function heli()
{
  this.x = 100;
  this.y = 300;
  this.image = new Image();
  this.image.src = "heli/heli.png";
  this.direction = "down";
  
  this.getX=getX;
  this.getY=getY;
  this.getImage=getImage;
  this.getDirection=getDirection;
  
  this.up=up;
  this.down=down;
  
  function getX()
  {
    return this.x;
  }
  function getY()
  {
    return this.y;
  }
  function getImage()
  {
    return this.image;
  }
  function getDirection()
  {
    return this.direction;
  }
  
  function up(n)
  {
    this.y-=n;
    this.direction = "up";
  }
  function down(n)
  {
    this.y+=n;
    this.direction = "down";
  }

}
