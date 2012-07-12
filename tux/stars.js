function star(x,y,c,s)
{
  //instance variables
  this.x=x;
  this.y=y;
  this.colour=c;
  this.size=s;
  
  //accessor methods
  this.getX=getX;
  this.getY=getY;
  this.getColour=getColour;
  this.getSize=getSize;
  this.setX=setX;
  this.setY=setY;
  this.setColour=setColour;
  this.setSize=setSize;
  
  //methods
  
  //getters
  function getX()
  {
    return this.x
  }
  function getY()
  {
    return this.y
  }
  function getColour()
  {
    return this.colour;
  }
  function getSize()
  {
    return this.size;
  }
  //setters
  function setX(n)
  {
    this.x=n;
  }
  function setY(n)
  {
    this.y=n;
  }
  function setColour(c)
  {
    this.colour=c;
  }
  function setSize(s)
  {
    this.size=s;
  }


}
