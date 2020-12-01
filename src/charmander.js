// https://media.giphy.com/media/t6Kf2qs5fgWiAlOig5/giphy.gif

var makeCharmander = function (top, left, timeBetweenSteps) {

  makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node.removeClass('dancer');
  this.$node.addClass('charmander');

  this.$node.append('<img src="https://media.giphy.com/media/t6Kf2qs5fgWiAlOig5/giphy.gif" alt="charmander" style="width:100px; height:100px" />');
};

makeCharmander.prototype = Object.create(makeDancer.prototype);
makeCharmander.prototype.constructor = makeCharmander;

makeCharmander.prototype.step = function () {
  makeDancer.prototype.step.call(this);

};
