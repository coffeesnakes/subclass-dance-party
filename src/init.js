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
        var hypotenuse = Math.sqrt((ydif * ydif) + (xdif * xdif));

        if (closest === null || hypotenuse < shortestDistance) {
          closest = window.dancers[i];
          shortestDistance = hypotenuse;
        }
      }
    }

    lead.$node.addClass('duo');
    closest.$node.addClass('duo');

    var leadURL = '';
    var closestURL = '';

    console.log(lead.$node[0].className);
    console.log(closest.$node[0].className);
    if (lead.$node[0].className === 'pokeball duo') {
      closestURL = 'url("poki/disappear.gif")';
      leadURL = 'url("poki/pokeball.gif")';
    } else if (closest.$node[0].className === 'pokeball duo') {
      leadURL = 'url("poki/disappear.gif")';
      closestURL = 'url("poki/pokeball.gif")';
    } else {
      if (lead.$node[0].className === 'charmander duo') {
        leadURL = 'url("poki/char.gif")';
      } else if (lead.$node[0].className === 'bulbasaur duo') {
        leadURL = 'url("poki/bulbasaur.gif")';
      } else if (lead.$node[0].className === 'squirtle duo') {
        leadURL = 'url("poki/squirtle.gif")';
      }

      if (closest.$node[0].className === 'charmander duo') {
        closestURL = 'url("poki/char.gif")';
      } else if (closest.$node[0].className === 'bulbasaur duo') {
        closestURL = 'url("poki/bulbasaur.gif")';
      } else if (closest.$node[0].className === 'squirtle duo') {
        closestURL = 'url("poki/squirtle.gif")';
      }
    }


    setTimeout(function () {
      lead.$node.css({ 'content': leadURL });
    }, 1337);
    setTimeout(function () {
      closest.$node.css({ 'content': closestURL });
    }, 1337);


    if ((lead.$node[0].className !== 'pokeball duo') && (closest.$node[0].className !== 'pokeball duo')) {
      setTimeout(function () {
        closest.$node.css({ 'content': 'url("poki/ripBulbasaur.gif")' });
      }, 5040);
    }

    // move lead and closest to center of stage
    lead.$node.animate({ top: 575, left: 840 }, 1000);
    closest.$node.animate({ top: 575, left: 950 }, 1000);

    // play fight song
    url = './audio/pokemon-battle.mp3';
    volume = 0.1;
    music(url, volume);

    // move winner back to original position on dance floor and remove loser from page
    var movePokemon = function() {
      lead.$node.animate({ top: $('body').height() * Math.random(), left: $('body').width() * Math.random() }, 1000);
      closest.$node.remove();
    };
    setTimeout(function() {
      movePokemon();
    }, 7000);

    // remove loser from window.dancers
    for (var i = 0; i < window.dancers.length; i++) {
      if (window.dancers[i] === closest) {
        window.dancers.splice(i, 1);
      }
    }

  });


  let music = function (url, vol) {
    let song = new Audio(src = url.toString());
    song.volume = vol;
    song.play();
  };

});

