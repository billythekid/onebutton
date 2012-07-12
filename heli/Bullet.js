function Bullet(x,y,w,h)
{
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  
  this.getBullet=getBullet;
  this.move=move;
    
  function getBullet()
  {
    return [this.x , this.y , this.w , this.h];
  }
  
  function move(s)
  {
    if (this.x <= 600) this.x += s;
  }
}
