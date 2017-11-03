function Buttons() {
  this.buttons = [];
  this.sizes = [];
  this.on = true;

// TODO: clicked !!!!!!!!!!!!

  this.update = function(){
    this.show();
  }
  this.show = function () {
    if (this.on) {
      for (var i = 0; i < this.buttons.length; i++) {
        b =  this.buttons[i] //TODO: rect and text

        gBC.fill(250, 30);
        gBC.strokeWeight(5);
        gBC.stroke(255, 100);
        gBC.rect(b[0], b[1], b[2], b[3], 50, 20, 20, 50);
        gBC.noStroke();
      }
    }
  }

  this.create = function (x, y, func, letter, w = 50, h = 50) {
    var changed = false;

    this.buttons.push([x, y, w, h, letter, func]);
  }
}
