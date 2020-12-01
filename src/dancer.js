// Creates and returns a new dancer object that can step
var makeDancer = function(top, left, timeBetweenSteps) {

  this.timeBetweenSteps = timeBetweenSteps;

  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');

  // call step and setPosition
  this.setPosition(top, left);
  this.step();
};

makeDancer.prototype.step = function() {
  setTimeout(this.step.bind(this), this.timeBetweenSteps);
};

makeDancer.prototype.setPosition = function(top, left) {
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

// create lineUp method
makeDancer.prototype.lineUp = function() {
  this.$node.animate({top: '550px'}, 1337);
};
