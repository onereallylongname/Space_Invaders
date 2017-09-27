function Shot(x, y, momento, pirce, s = 3, pSkill = 1, pMult = 1, sSize = 1) {
  this. momento = momento;
  this.moveSpeed = s;
  this.pirce = pirce;
  this.pirced = -1;
  this.damage = ((this.moveSpeed/20 + abs(this.momento)/10) + pSkill + pirce/10) * pMult ;
  this.r = ((this.damage*0.001 - 1)*(this.damage*0.001 - 1)) * sSize + 3 ;
  this.x = x - this.r/2;
  this.y = y - this.r/2;

  this.show = function () {
    fill(150, 50, 50);
    rect(this.x, this.y , this.r, 1.5*this.r, this.r/2, this.r/2, 0, 0);
  }

  this.move = function () {
    this.x += 0.5*this.momento;
    this.y -= this.moveSpeed;
    this.moveSpeed *= 0.9999;
  }

  this.colide = function(id) {
    if(this.y < 0){
      this.removeShot(id, false);
    }else {
      for (var i = invaders.length-1; i >= 0; i--) {
        for (var j = invaders[i].r.length-1; j >= 0; j--) {
          if (dist(invaders[i].cx[j] + invaders[i].x, invaders[i].cy[j] + invaders[i].y, this.x, this.y) <= invaders[i].r[j] + this.r){
            shotOnTarget +=1;
            invaders[i].doDamage(this.damage, i, j);
            if(this.pirced != i*j){
              this.pirce -= 1;
              this.damage -= this.pirce;
              this.pirced = i*j;
            }
            if(this.pirce < 1 ){
              this.removeShot(id, true);
            }
          }
        }
      }
    }
  }

  this.update = function (id) {
    this.move();
    this.show();
    this.colide(id);
  }

  this.removeShot = function(id, onTarget){
    shots.splice(id,1);
    if(onTarget){
      shotOnTarget +=1;
      myPoints += 10;
    }else{
      myPoints -= 5;
      shotOffTarget += 1;
    }
  }

}
