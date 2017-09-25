function Drops(x, y, type, val) {
  this.r = 10;
  this.x = x - this.r / 2;
  this.y = y - this.r / 2;
  this.type = type;
  this.val = val;

  // Set random type
  if(!type){
    var needs = {
      'cooldown' : ((ship.cooldown - 2)/13),

    };
    console.log(needs);
  }
  // Set random val
  if(!val){
    this.val = ship[this.type] * random(0.01, 0.1);
  }
  console.log(this.val);


  this.show = function() {
    fill(150, 150, 150);
    rect(this.x, this.y, this.r, this.r);
  }

  this.move = function() {
    this.x += random(-1, 1);
    this.y += 1;
  }

  this.colide = function(id) {
    if (this.y > windY) {
      this.remove(id, false);
      console.log('end of scren');
    } else {
      if (dist(ship.x, ship.y, this.x, this.y) <= ship.r + this.r) {
        this.remove(id, true);
        console.log('on ship');
      }
    }
  }

  this.update = function(id) {
    this.move();
    this.show();
    this.colide(id);
  }

  this.remove = function(id, onTarget) {
    drops.splice(id, 1);
    if (onTarget) {
      myPoints += 10;
      sound.play('Drop');
    } else {
      myPoints -= 25;
    }
  }


}
