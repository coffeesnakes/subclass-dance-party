$(document).ready(function () {
  window.dancers = [];

  $('.addDancerButton').on('click', function (event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $('body').height() * Math.random(),
      $('body').width() * Math.random(),
      Math.random() * 1000
    );
    window.dancers.push(dancer);
    $('body').append(dancer.$node);
  });

  $('.lineup').on('click', function (e) {
    for (let i = 0; i < window.dancers.length; ++i) {
      window.dancers[i].lineUp();
    }
    url = './audio/pokemon.mp3';
    volume = 0.005;
    music(url, volume);
  });

  $('.duo').on('click', function (e) {
    var lead = window.dancers[(Math.floor(Math.random() * window.dancers.length))];
    var leadX = lead.left;
    var leadY = lead.top;

    var closest = null;
    var shortestDistance = null;

    for (var i = 0; i < window.dancers.length; i++) {
      if (window.dancers[i] !== lead) {
        var ydif = (window.dancers[i].top - leadY);
        var xdif = (window.dancers[i].left - leadX);
        var hypotenuse = Math.sqrt( (ydif * ydif) + (xdif * xdif) );

        if (closest === null || hypotenuse < shortestDistance) {
          closest = window.dancers[i];
          shortestDistance = hypotenuse;
        }
      }
    }

    lead.$node.addClass('duo');
    closest.$node.addClass('duo');
    setTimeout(function () {
      lead.$node.css({ 'content': 'url("poki/char.gif")' });
    }, 1337);
    setTimeout(function () {
      closest.$node.css({ 'content': 'url("poki/bulbasaur.gif")' });
    }, 1337);
    setTimeout(function () {
      closest.$node.css({ 'content': 'url("poki/ripBulbasaur.gif")' });
    }, 5040);

    // move lead and closest to center of stage
    var centerPos1 = {top: 500, left: 500};
    var centerPos2 = {top: 500, left: 575};
    lead.$node.animate(centerPos1, 1000);
    closest.$node.animate(centerPos2, 1000);

    // play fight song
    url = './audio/pokemon-battle.mp3';
    volume = 0.1;
    music(url, volume);
  });

  // $('.lineup').on('click', function (e) {
  //   for (let i = 0; i < window.dancers.length; ++i) {
  //     window.dancers[i].lineUp();
  //     url = './audio/pokemon.mp3';
  //     volume = 0.005;
  //     music(url, volume);
  //   }
  // });



  let music = function (url, vol) {
    let song = new Audio(src = url.toString());
    song.volume = vol;
    song.play();
  };

});

