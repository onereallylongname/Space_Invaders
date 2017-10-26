function Stars(size) {
this.stars = Array(size);

  this.show = function(spectrum) {
    for (var i = 0; i < this.stars.length; i++) {
      gBC.fill(200)
      gBC.ellipse(this.stars[i][0], this.stars[i][1], this.stars[i][2]*(-spectrum[0]*0.5 + spectrum[1]*3 + spectrum[3]*1.2));
    }
  }

  this.update = function(spectrum){
    this.show(spectrum);
  }

  this.popStars = function() {
    for (var i = 0; i < this.stars.length; i++) {
      this.stars[i] = [random(width), random(height), random(0.1, 1.2)];
    }
  }
}
