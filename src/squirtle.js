var makeSquirtle = function(top, left, timeBetweenSteps) {

  makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node.removeClass('dancer');
  this.$node.addClass('squirtle');

  this.$node.append('<img src="https://media.giphy.com/media/eEPTnQjYCk8Vi/giphy.gif" alt="squirtle" style="width:100px; height:100px" />');
};

makeSquirtle.prototype = Object.create(makeDancer.prototype);
makeSquirtle.prototype.constructor = makeSquirtle;

makeSquirtle.prototype.step = function () {
  makeDancer.prototype.step.call(this);
};