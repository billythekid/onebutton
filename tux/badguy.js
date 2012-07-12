function badGuy(badX,badY,badType)
{
  this.x=badX;
  this.y=badY;
  this.type=badType;
  this.image = new Image();
  this.rect = new Object();
  
  this.getX=getX;
  this.getY=getY;
  this.setX=setX;
  this.setY=setY;
  this.getImage=getImage;
  this.getRect=getRect;
  this.getType=getType;
  
  switch(badType)
  {
    case 1:
      this.image.src = 'tux/windapp.png';
      this.width = 30;
      this.height = 30;
      break;
    case 2:
      this.image.src = 'tux/winlogo.png';
      this.width=30;
      this.height=27;
      break;
    case 3:
      this.image.src = 'tux/apple.png';
      this.width=30;
      this.height=37;
      break;
    case "tux":
      this.image.src="tux/Tux.png";
      this.width=30;
      this.height=35;
      break;
    case "cloud":
      this.image.src="tux/cloud.png";
      this.width=46;
      this.height=32;
      break;
    default:
      this.image.src = 'tux/ie.png';
      this.width = 30;
      this.height = 30;
      break;
  }
  
  function getX()
  {
    return this.x
  }
  function getY()
  {
    return this.y
  }
  function setX(newX)
  {
    this.x = newX;
  }
  function setY(newY)
  {
    this.y = newY;
  }
  function getImage()
  {
    return this.image;
  }
  function getRect()
  {
    this.rect.top = this.y-(this.height/2);
    this.rect.bottom = this.y+this.height-(this.height/2);
    this.rect.left=this.x-(this.width/2);
    this.rect.right=this.x+this.width-(this.width/2);
    return this.rect;
  }
  function getType()
  {
  return this.type;
  }
}
