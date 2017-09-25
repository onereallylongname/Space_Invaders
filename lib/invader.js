function Invader0(x, y) {
  this.x = x;
  this.y = y;
  this.r = [8, 4, 4];
  this.cx = [0, -10, 10];
  this.cy = [0, 20, 20];
  this.partsHP = [20, 6, 6];
  this.partsDim = [[-8, -6, -3, -6, -3, -2, 3, -2, 3, -6, 8, -6, 8, 8, -8, 8], [-3, -3, 3, -3, 3, 3, -3, 3], [-3, -3, 3, -3, 3, 3, -3, 3]];
  this.counter = 0;
  this.damaged = 0;
  this.damagedV = 0;
  this.dl = 5;
  this.fallV = 0;
  this.env;
  this.dropProb = 0.07;

  this.show = function () {
    push();
        for (var i = 0; i < this.r.length; i++) {
        push();
          beginShape();
          translate(this.x + this.cx[i], this.y + this.cy[i]);
          fill(0,(150*this.partsHP[i]/50)+50, 5500 * this.fallV);
          for(var j = 0; j < this.partsDim[i].length; j += 2){
            vertex(this.partsDim[i][j], this.partsDim[i][j+1]);
          }
          endShape(CLOSE);

        pop();
      }
      if(this.damaged > 0){
        this.damaged--;
        textSize(10);
        fill(250, 50, 50);
        text(String(round(this.damagedV*100)/100), this.x + this.dl, this.y - this.damaged/8);
      }
    pop();
  }

  this.move = function (dirx, diry) {
    var rrr = 0.2 * sin(0.05*this.counter) + this.fallV;
    this.x = clamp(this.x + dirx + random(-50 * this.fallV, this.fallV*50), 0, width);
    this.y += diry + rrr;
    var ii = -1;
    for (var i = 1; i < this.cx.length; i++) {
      this.cx[i] -= rrr*0.7 * pow(ii,i);
    }
    if (this.y > height){
      gameOver = true;
      state = 'showGameOver';
    }
  }

  this.removePart = function (id0, id1) {
    if(this.partsHP[id1] < 0){
      sound.play('Invader');
      myPoints += this.r[id1]*10;
      this.r.splice(id1, 1);
      this.cx.splice(id1, 1);
      this.cy.splice(id1, 1);
      this.partsHP.splice(id1, 1);
      this.partsDim.splice(id1, 1);
      if(this.r.length == 0){
        invaders.splice(id0, 1);
      }
      if(this.r.length == 1){
        this.fallV = 0.01;
      }
      this.drop();
    }
  }

  this.doDamage = function(dd, i, j) {
    this.partsHP[j] -= dd;
    this.removePart(i, j);
    this.damaged = 50;
    this.damagedV = dd;
    this.dl = random(8);
  }

  this.update = function (dirx, diry) {
    this.move(dirx, diry);
    this.show();
    this.counter++;
  }

  this.drop = function () {
    console.log(floor(rnum));

    if(floor(rnum) < (this.dropProb + ship.luck/15)*100){
      drops.push(new Drops(this.x, this.y));
      console.log('Drop');
    }else {
      console.log('No drop');
    }

  }

}
