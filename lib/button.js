function Buttons() {
  this.buttons = [];
  this.types = {
    'left' : {
      'shp' : [50, 20, 20, 50],
      'w' : 100,
      'h' : 70,
      'f' : function () {
        ship.moveDir(true, false);
      },
      'ltr' : '<'
    },
    'right' : {
      'shp' : [20, 50, 50, 20],
      'w' : 100,
      'h' : 70,
      'f' : function() {
        ship.moveDir(false, true);
      },
      'ltr' : '>'
    },
    'shoot' : {
      'shp' : [20, 20, 20, 20],
      'w' : 120,
      'h' : 70,
      'f' : function() {
        ship.shoot(true);
      },
      'ltr' : '<'
    },
    'pause' : {
      'shp' : [10, 10, 10, 10],
      'w' : 30,
      'h' : 30,
      'f' : ship.moveDir(true, false),
      'ltr' : '<'
    },
    'frate' : {
      'shp' : [10, 10, 10, 10],
      'w' : 30,
      'h' : 30,
      'f' : ship.moveDir(true, false),
      'ltr' : '<'
    },
    'lazer' : {
      'shp' : [10, 10, 10, 10],
      'w' : 30,
      'h' : 30,
      'f' : ship.moveDir(true, false),
      'ltr' : '<'
    },
    'restart' :{
      'shp' : [10, 10, 10, 10],
      'w' : 30,
      'h' : 30,
      'f' : ship.moveDir(true, false),
      'ltr' : '<'
    },
    'sound' :{
      'shp' : [10, 10, 10, 10],
      'w' : 30,
      'h' : 30,
      'f' : pressSound(80),
      'ltr' : '<'
    }
  };
  this.on = false;

  this.clicked = function (x, y) {
    for (var i = 0; i < this.buttons.length; i++) {
      var b = this.buttons[i] //TODO: rect and text
      var t = this.types[b[2]];
      if ((b[0] <= x) && (x <= b[0] + t['w']) && (b[1] <= y) && (y <= b[1] + t['h'])){
        // console.log(i);
        // console.log(b[2]);
        t['f']();
      }
    }  // TODO: clicked !!!!!!!!!!!!
  }

  this.update = function(){
    if (touches.length > 0){
      for (var i = 0; i < touches.length; i++) {
        this.clicked(touches[i].x, touches[i].y);
      }
    }else if (mouseIsPressed) {
      this.clicked(mouseX, mouseY);
    }
    this.show();
  }
  this.show = function () {
    if (this.on) {
      for (var i = 0; i < this.buttons.length; i++) {
        var b = this.buttons[i] //TODO: rect and text
        var t = this.types[b[2]];

        gBC.fill(250, 30);
        gBC.strokeWeight(5);
        gBC.stroke(255, 100);
        gBC.rect(b[0], b[1], t['w'], t['h'], t['shp'][0], t['shp'][1], t['shp'][2], t['shp'][3]);
        gBC.noStroke();
      }
    }
  }

  this.create = function (x, y, type = 'shoot') {
    this.buttons.push([x, y, type]);
  }
}
