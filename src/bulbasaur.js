var makeBulbasaur = function(top, left, timeBetweenSteps) {

  makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node.removeClass('dancer');
  this.$node.addClass('bulbasaur');

  this.$node.append('<img src="https://media.giphy.com/media/xUPGcgIWt3RSVIIydi/giphy.gif" alt="bulbasaur" style="width:100px; height:100px" />');
};

makeBulbasaur.prototype = Object.create(makeDancer.prototype);
makeBulbasaur.prototype.constructor = makeBulbasaur;

makeBulbasaur.prototype.step = function () {
  makeDancer.prototype.step.call(this);
  // let rng = Math.floor(Math.random * 99);
  // this.$node.css('filter', `invert(${rng}%)`);
};



