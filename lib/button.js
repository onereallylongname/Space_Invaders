function Buttons(size) {
  this.buttons = Array(size);
  this.on = true;

  this.update = function(){
    this.show();
  }
  this.show = function () {
    if (this.on) {
      for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i] //TODO: rect and text
      }
    }
  }

  this.create = function (x, y, func, letter, w = 50, h = 50) {
    this.buttons.push([x, y, w, h, letter, func]);
  }
}
