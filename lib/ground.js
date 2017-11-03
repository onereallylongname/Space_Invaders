function Ground(w, h) {
  this.w = w;
  this.h = h;
  this.vertex = [
    [0, this.h],
    [0, this.h - 100],
    [20, this.h - 100],
    [20, this.h - 30],
    [40, this.h - 30],
    [40, this.h - 30],
    [60, this.h - 40],
    [80, this.h - 40],
    [80, this.h - 60],
    [150, this.h - 60],
    [150, this.h - 80],
    [200, this.h - 80],
    [200, this.h - 40],
    [200, this.h - 40],
    [500, this.h - 40],
    [500, this.h - 80],
    [600, this.h - 80],
    [this.w, this.h - 40],
    [this.w, this.h] //TODO: make ground
  ];

  this.update = function() {
    this.show();
  }
  this.show = function() {
    gBC.beginShape();
    gBC.fill(90);
    for (var i = 0; i < this.vertex.length; i++) {
      gBC.vertex(this.vertex[i][0], this.vertex[i][1]);
      gBC.endShape(CLOSE);
    }
  }
}
