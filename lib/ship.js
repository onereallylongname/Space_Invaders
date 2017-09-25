function Ship() {
  this.x = width/2;
  this.vel = 0;
  this.acc = 0.15;
  this.friction = 0.05;
  this.y = height - 15;
  this.cooldown = 10;
  this.cooldownCount = 0;
  this.hp = 100;
  this.lazer = false;
  this.pirce = 0;
  this.pMult = 1.05;
  this.pSkill = 1;
  this.extrass = 3;
  this.luck = 0;
  this.r = 8;

  this.show = function () {
    var rrr = random(1);
    if(this.lazer){
      push();
      stroke(190, 45, 20, 160);
      line(this.x , this.y , this.x + (rrr*5 - 2.5) +  this.vel / (2*this.friction) , 0);
      pop();
    }
    fill(50, 50, 240);
    rect(this.x - 3, this.y - rrr - 4 , 6, 14);
    rect(this.x - 9, this.y  - rrr , 18, 10);
  }

  this.move = function () {
    this.x = mod(this.x + this.vel, width);
  }

  this.update = function () {
    var ld = keyIsDown(LEFT_ARROW);
    var rd = keyIsDown(RIGHT_ARROW);
    var plusVel = 0;
    //if(!rd && !ld){

  //  }
    if (rd) {
      plusVel = this.acc;//clamp(this.vel + this.acc, 0, 3);
    }
    if(ld) {
      plusVel = -1 * this.acc;// clamp(this.vel - this.acc, -3, 0);
    }
    this.vel += clamp(-1 * this.vel * this.friction + plusVel, -2, 2);
    if(keyIsDown(32)) {
      if(this.cooldownCount >= this.cooldown){
        shots.push(new Shot(this.x, this.y, this.vel, this.pirce, this.extrass, this.pSkill, this.pMult));
        sound.play('Shot0');
        sound.play('Shot');
        this.cooldownCount = 0;
      }
    }
    if(this.cooldownCount < this.cooldown){
     this.cooldownCount++;
    }
    shotAcuracy = shotOnTarget/(shotOnTarget+shotOffTarget);
    this.calcLuck();
    this.calcPSkill();
    this.move();
    this.show();
  }

  this.addPUP = function (type, val) {
    console.log(type,val);
  }

  this.calcLuck = function(){
    this.luck = 4 * shotAcuracy * shotAcuracy - 4 * shotAcuracy + 1;
  }
  this.calcPSkill = function(){
    this.pSkill = shotAcuracy * shotAcuracy * 2.5 + 1;
  }

  this.cahngeFriction = function(val){
    this.friction = clamp(this.friction + val,0.01, 0.1);
  }
  this.cahngeCooldown = function(val){
    this.cooldown = clamp(this.cooldown + val, 2, 15);
  }
  this.cahngeHP = function(val){
    this.hp = clamp(this.hp + val, -1, 500);
  }
  this.cahngePirce = function(val){
    this.pirce = clamp(this.pirce + val, 0, 6);
  }
  this.cahngePMult = function(val){
    this.pMult = clamp(this.pMult + val, 0.5, 2);
  }
  this.cahngeExtrass = function(val){
    this.extrass = clamp(this.extrass + val, 3, 10);
  }
}