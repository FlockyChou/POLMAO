var files = preloadAudioFiles(folder, max);

$(function() {
  var $button = $('#button');

  $button.on('mousedown', function(e) {
    $button.removeClass('button-shadow');
    $button.css('margin-top', '-115px');
    
    /* Stop previous Zura */
    if(typeof prev !== "undefined") {
      files[prev].pause();
      files[prev].currentTime = 0;
    }

    /* Start current Zura */
    files[curr].play();

    /* Get next Zura */
    getNextFile(max);
  });
   
  $button.on('mouseup', function(e) {
    $button.addClass('button-shadow');
    $button.css('margin-top', '-125px');
  });
});

/* Not sure if this actually does anything, to be honest... */
function preloadAudioFiles(folder, max) {
  var files = []
  for (var i = 0; i < max; i++) {
    var url = generateFilePath(folder, i);
    files[i] = new Audio(url);
  }

  return files;
}

/* Audio file path generator */
function generateFilePath(folder, num) {
  num = numberToPaddedString(num + 1);
  return '/assets/audio/' + folder + '/' + num + '.mp3';
}

/* Converts ints to a string w/ leading zeroes */
function numberToPaddedString(num) {
  var num = num.toString();

  if(num.length < 2) {
    num = '0' + num;
  }

  return num;
}

function getNextFile(max) {
  if(max === 1) {
    prev = curr;
    return;
  }

  var num        = curr;
  var iterations = 0;

  while(curr == num && iterations < 5) {
    num = randomNumber(max);

    // Make sure the while loop doesn't hang
    iterations++;
  }

  prev = curr;
  curr = num;
  return;
}

function randomNumber(max) {
  return Math.floor(Math.random() * max);
}