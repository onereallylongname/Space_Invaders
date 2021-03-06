function Drops(x, y, type, val) {
  this.r = 20;
  this.x = x - this.r / 2;
  this.y = y - this.r / 2;
  this.type = type;
  this.val = val;
  this.letters = '';
  this.tColor = '#00ad1c'

  // Set random type
  if(!type){
    var needs = {
      extrass : [sq(sq((4 - (ship.extrass - 3))/4)), 'Xs', [-0.05, 0.1, 0.3]],
      pMult :  [sq((1.5 - (ship.pMult - 0.5))/1.5), 'Mt', [-0.1, 0.05, 0.1]],
      cooldown : [sq(sq(( -13 - (ship.cooldown - 15))/(-13))), 'Cd', [ -0.5, -0.5, -1]],
      pirce : [sq(sq(( -(ship.pirce - 6))/6)), 'Pr', [-1, 0, 1]],
      hp : [sq(sq((500 - ship.hp)/500)), 'HP', [-50, 25, 75]],
      sSize : [sq(sq((9 - (ship.sSize - 1))/9)), 'Ss', [-0.5, 0.5, 1]]
    };

    // sorting from https://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
    var keysSorted = Object.keys(needs).sort(function(a,b){return needs[b][0] - needs[a][0]})
    //console.log(needs);
    var tColors = ['#ad0000', '#e6e600', '#00ad1c'];
    var randType = floor(random(0,3));
    var randVal = clamp(round(gaussianRand()*(3.6-0.75)*(needs[keysSorted[randType]][0])), 0, 2);
    //console.log(randVal);
    this.type = keysSorted[randType];
    this.letters = needs[keysSorted[randType]][1]
    this.val = needs[keysSorted[randType]][2][randVal];
    this.tColor = tColors[randVal];
  }

  this.show = function() {
    gBC.strokeWeight(2);
    gBC.stroke(100, 100, 100);
    gBC.fill(150, 150, 150);
    gBC.rect(this.x, this.y, this.r, this.r, this.r/4);
    gBC.textSize(12);
    gBC.noStroke();
    gBC.fill(this.tColor);
    gBC.text(this.letters, this.x + this.r/5, this.y + this.r*0.8);
  }

  this.move = function() {
    this.x += random(-1, 1);
    this.y += 1;
  }

  this.colide = function(id) {
    if (this.y > windY) {
      this.remove(id, false);
      //console.log('end of scren');
    } else {
      if (dist(ship.x, ship.y, this.x, this.y) <= ship.r + this.r) {
        this.remove(id, true);
        ship.addPUP(this.type, this.val);
        //console.log('on ship');
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
