function sea(s,l)
{
  switch(s)
  {
    case 1:
      this.colour = "blue";
      break;
    case 2:
      this.colour = "navy";
      break;
    case 3:
      this.colour = "black";
      break;
   }
  this.pixelArray = new Array();
  this.size = l
  for (var i = 0;i < l;i++)
  {
    this.pixelArray[i] = (Math.random()*s*10)+1;
  }
  this.count=0;
  this.high = false;
  
  this.getSea=getSea;
  this.getColour=getColour;
  this.move=move;
  
  function getSea()
  {
    return this.pixelArray;
  }
  function getColour()
  {
    return this.colour;
  }
  function move()
  {
    if (this.high)
    {
      this.count--;
      if (this.count == 0)this.high=false;
      this.pixelArray[this.size] = this.pixelArray[0]-10;
    } 
    else
    {
      this.count++;
      if (this.count==1000)this.high=true;
      this.pixelArray[this.size] = this.pixelArray[0]+10;
    }

    this.pixelArray.shift();
  }

}
