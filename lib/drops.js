function Drops(x, y, type, val) {
  this.r = 10;
  this.x = x - this.r / 2;
  this.y = y - this.r / 2;
  this.type = type;
  this.val = val;

  // Set random type
  if(!type){
    var needs = {
      extrass : sq((7 - (ship.extrass - 3))/7),
      pMult :  sq((1.5 - (ship.pMult - 0.5))/1.5),
      cooldown : sq((-13 - (ship.cooldown - 15))/(-13)),
      pirce : sq(( -(ship.pirce - 6))/6),
      hp : sq(sq((500 -ship.hp)/500))
    };

    // sorting from https://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
    var keysSorted = Object.keys(needs).sort(function(a,b){return needs[a]-needs[b]})
    this.type = 'cooldown';
    console.log(needs);
    console.log(keysSorted);
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
