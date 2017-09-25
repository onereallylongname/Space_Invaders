function Sounds() {
  this.sounds = {};

  this.addSound = function(env, osc, soundName, freq, attackLevel, attackTime, susPercent, decayTime, releaseTime) {
    var releaseLevel = 0;
    this.sounds[soundName] = {
      'env': env,
      'osc': osc,
      'freq': freq,
      'other': [attackTime, decayTime, susPercent, releaseTime, attackLevel, releaseLevel]
    };
  }

  this.play = function(soundName) {
    if (soundOn) {
      var ts = this.sounds[soundName];
      ts.env.setADSR(ts.other[0], ts.other[1], ts.other[2], ts.other[3]);
      ts.env.setRange(ts.other[4], ts.other[5]);
      ts['osc'].amp(this.sounds[soundName]['env']);
      ts['osc'].start();
      ts['osc'].freq(this.sounds[soundName]['freq']);
      ts['osc'].pan(map(ship.x, 0, width,-0.85, 0.85));
      ts['env'].play();
    }
  }
}
