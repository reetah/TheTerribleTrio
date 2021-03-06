var ctx = new Array();
function draw(){



var a5 = document.getElementById("A5");
ctx[9]=a5.getContext("2d");
ctx[9].fillStyle = "#009E8E";
ctx[9].fillRect(0,0,70,25);


var g5 = document.getElementById("G5");
ctx[8]=g5.getContext("2d");
ctx[8].fillStyle = "#009E8E";
ctx[8].fillRect(0,0,70,25);

var e5 = document.getElementById("E5");
ctx[7]=e5.getContext("2d");
ctx[7].fillStyle = "#009E8E";
ctx[7].fillRect(0,0,70,25);

var d5 = document.getElementById("D5");
ctx[6]=d5.getContext("2d");
ctx[6].fillStyle = "#009E8E";
ctx[6].fillRect(0,0,70,25);

var c5 = document.getElementById("C5");
ctx[5]=c5.getContext("2d");
ctx[5].fillStyle = "#009E8E";
ctx[5].fillRect(0,0,70,25);

var a4 = document.getElementById("A4");
ctx[4]=a4.getContext("2d");
ctx[4].fillStyle = "#009E8E";
ctx[4].fillRect(0,0,70,25);


var g4 = document.getElementById("G4");
ctx[3]=g4.getContext("2d");
ctx[3].fillStyle = "#009E8E";
ctx[3].fillRect(0,0,70,25);

var e4 = document.getElementById("E4");
ctx[2]=e4.getContext("2d");
ctx[2].fillStyle = "#009E8E";
ctx[2].fillRect(0,0,70,25);

var d4 = document.getElementById("D4");
ctx[1]=d4.getContext("2d");
ctx[1].fillStyle = "#009E8E";
ctx[1].fillRect(0,0,70,25);

var c4 = document.getElementById("C4");
ctx[0]=c4.getContext("2d");
ctx[0].fillStyle = "#009E8E";
ctx[0].fillRect(0,0,70,25);


}

// stores mp3 files
var sounds = new Array();
sounds[0] = new Audio('./sounds/C4.mp3');
sounds[1] = new Audio('./sounds/D4.mp3');
sounds[2] = new Audio('./sounds/E4.mp3');
sounds[3] = new Audio('./sounds/G4.mp3');
sounds[4] = new Audio('./sounds/A4.mp3');
sounds[5] = new Audio('./sounds/C5.mp3');
sounds[6] = new Audio('./sounds/D5.mp3');
sounds[7] = new Audio('./sounds/E5.mp3');
sounds[8] = new Audio('./sounds/G5.mp3');
sounds[9] = new Audio('./sounds/A5.mp3');

function pentatonic() {
sounds[0] = new Audio('./sounds/C4.mp3');
sounds[1] = new Audio('./sounds/D4.mp3');
sounds[2] = new Audio('./sounds/E4.mp3');
sounds[3] = new Audio('./sounds/G4.mp3');
sounds[4] = new Audio('./sounds/A4.mp3');
sounds[5] = new Audio('./sounds/C5.mp3');
sounds[6] = new Audio('./sounds/D5.mp3');
sounds[7] = new Audio('./sounds/E5.mp3');
sounds[8] = new Audio('./sounds/G5.mp3');
sounds[9] = new Audio('./sounds/A5.mp3');

}

function blues(){
sounds[0] = new Audio('./sounds/C4.mp3');
sounds[1] = new Audio('./sounds/Eb4.mp3');
sounds[2] = new Audio('./sounds/F4.mp3');
sounds[3] = new Audio('./sounds/Gb4.mp3');
sounds[4] = new Audio('./sounds/G4.mp3');
sounds[5] = new Audio('./sounds/Bb4.mp3');
sounds[6] = new Audio('./sounds/C5.mp3');
sounds[7] = new Audio('./sounds/Eb5.mp3');
sounds[8] = new Audio('./sounds/F5.mp3');
sounds[9] = new Audio('./sounds/Gb5.mp3');
}












// Store frame for motion functions
var previousFrame = null;
var paused = false;
var pauseOnGesture = false;

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

Leap.loop(controllerOptions, function(frame) {
  if (paused) {
    return; // Skip this update
  }

  // Display Frame object data
  var frameOutput = document.getElementById("frameData");

  var frameString = 
              // "Frame ID: " + frame.id  + "<br />"
              //     + "Timestamp: " + frame.timestamp + " &micro;s<br />"
              //     + 
                  "<br />"
                  //"Hands: " + frame.hands.length + "<br />"
                  // + "Fingers: " + frame.fingers.length + "<br />"
                  // + "Tools: " + frame.tools.length + "<br />"
                  // + "Gestures: " + frame.gestures.length + "<br />";

  // Frame motion factors
  // if (previousFrame && previousFrame.valid) {
  //   var translation = frame.translation(previousFrame);
  //   // frameString += "Translation: " + vectorToString(translation) + " mm <br />";

  //   var rotationAxis = frame.rotationAxis(previousFrame);
  //   var rotationAngle = frame.rotationAngle(previousFrame);
  //   // frameString += "Rotation axis: " + vectorToString(rotationAxis, 2) + "<br />";
  //   // frameString += "Rotation angle: " + rotationAngle.toFixed(2) + " radians<br />";

  //   var scaleFactor = frame.scaleFactor(previousFrame);
  //   // frameString += "Scale factor: " + scaleFactor.toFixed(2) + "<br />";
  // }
  // frameOutput.innerHTML = "<div style='width:300px; float:left; padding:5px'>" + frameString + "</div>";

  // custom function to convert direction coordinate to pitch
  // we'll only use direction coordinates 0.0 to 0.6
  // C = 0.0, D = 0.05, E = 0.1,...,high C = 0.6

  var coordinateToPitchY = function(coordinate){
    //pitchNumber = (parseInt(coordinate/0.05, 10)) % 7 + 65;
    //pitch = String.fromCharCode(pitchNumber);
    //return pitch;
    pitchNumber = parseInt((coordinate - 0.1)/0.07, 10) % 10;
    return pitchNumber;
  }

  var playPitch = function(pitch){
      sounds[pitch].play();
  }

  var changeColorActive = function(pitch){
      ctx[pitch].clearRect(0,0,70,25);
      ctx[pitch].save();
      ctx[pitch].fillStyle = "#F80012";
      ctx[pitch].beginPath();
      ctx[pitch].rect(0,0,70,25);
      ctx[pitch].fill();
      ctx[pitch].restore();

  }

    var changeColorPassive = function(pitch){
      ctx[pitch].clearRect(0,0,70,25);
      ctx[pitch].save();
      ctx[pitch].fillStyle = "#009E8E";
      ctx[pitch].beginPath();
      ctx[pitch].rect(0,0,70,25);
      ctx[pitch].fill();
      ctx[pitch].restore();

  }

  // Display Hand object data
  var handOutput = document.getElementById("handData");
  var handString = "";
  if (frame.hands.length > 0) {
    for (var i = 0; i < frame.hands.length; i++) {
      var hand = frame.hands[i];

      // handString += "<div style='width:300px; float:left; padding:5px'>";
      // handString += "Hand ID: " + hand.id + "<br />";
      // handString += "Direction: " + vectorToString(hand.direction, 2) + "<br />";

      // handString += "Corresponding pitch: " + coordinateToPitch(hand.direction[1]) + "<br />";
      playPitch(coordinateToPitchY(hand.direction[1]));
      changeColorActive(coordinateToPitchY(hand.direction[1]));
      for (var i = 0; i < 10; i++){
        if (i != coordinateToPitchY(hand.direction[1])) {
          changeColorPassive(i);
        }
      }



      // handString += "Palm normal: " + vectorToString(hand.palmNormal, 2) + "<br />";
      // handString += "Palm position: " + vectorToString(hand.palmPosition) + " mm<br />";
      // handString += "Palm velocity: " + vectorToString(hand.palmVelocity) + " mm/s<br />";
      // handString += "Sphere center: " + vectorToString(hand.sphereCenter) + " mm<br />";
      // handString += "Sphere radius: " + hand.sphereRadius.toFixed(1) + " mm<br />";

      // Hand motion factors
      if (previousFrame && previousFrame.valid) {
        var translation = hand.translation(previousFrame);
        // handString += "Translation: " + vectorToString(translation) + " mm<br />";

        var rotationAxis = hand.rotationAxis(previousFrame, 2);
        var rotationAngle = hand.rotationAngle(previousFrame);
        // handString += "Rotation axis: " + vectorToString(rotationAxis) + "<br />";
        // handString += "Rotation angle: " + rotationAngle.toFixed(2) + " radians<br />";

        var scaleFactor = hand.scaleFactor(previousFrame);
        // handString += "Scale factor: " + scaleFactor.toFixed(2) + "<br />";
      }

      // IDs of pointables (fingers and tools) associated with this hand
      if (hand.pointables.length > 0) {
        var fingerIds = [];
        var toolIds = [];
        for (var j = 0; j < hand.pointables.length; j++) {
          var pointable = hand.pointables[j];
          if (pointable.tool) {
            toolIds.push(pointable.id);
          }
          else {
            fingerIds.push(pointable.id);
          }
        }
        if (fingerIds.length > 0) {
          // handString += "Fingers IDs: " + fingerIds.join(", ") + "<br />";
        }
        if (toolIds.length > 0) {
          // handString += "Tools IDs: " + toolIds.join(", ") + "<br />";
        }
      }

      // handString += "</div>";
    }
  }
  else {
    // handString += "No hands";
  }
  handOutput.innerHTML = handString;

  // Display Pointable (finger and tool) object data
  // var pointableOutput = document.getElementById("pointableData");
  // var pointableString = "";
  // if (frame.pointables.length > 0) {
  //   for (var i = 0; i < frame.pointables.length; i++) {
  //     var pointable = frame.pointables[i];

  //     pointableString += "<div style='width:250px; float:left; padding:5px'>";
  //     pointableString += "Pointable ID: " + pointable.id + "<br />";
  //     pointableString += "Belongs to hand with ID: " + pointable.handId + "<br />";

  //     if (pointable.tool) {
  //       pointableString += "Classified as a tool <br />";
  //       pointableString += "Length: " + pointable.length.toFixed(1) + " mm<br />";
  //       pointableString += "Width: "  + pointable.width.toFixed(1) + " mm<br />";
  //     }
  //     else {
  //       pointableString += "Classified as a finger<br />";
  //       pointableString += "Length: " + pointable.length.toFixed(1) + " mm<br />";
  //     }

  //     pointableString += "Direction: " + vectorToString(pointable.direction, 2) + "<br />";
  //     pointableString += "Tip position: " + vectorToString(pointable.tipPosition) + " mm<br />";
  //     pointableString += "Tip velocity: " + vectorToString(pointable.tipVelocity) + " mm/s<br />";

  //     pointableString += "</div>";
  //   }
  // }
  // else {
  //   // pointableString += "<div>No pointables</div>";
  // }
  // pointableOutput.innerHTML = pointableString;

  // Display Gesture object data
  // var gestureOutput = document.getElementById("gestureData");
  // var gestureString = "";
  // if (frame.gestures.length > 0) {
  //   if (pauseOnGesture) {
  //     togglePause();
  //   }
  //   for (var i = 0; i < frame.gestures.length; i++) {
  //     var gesture = frame.gestures[i];
  //     gestureString += "Gesture ID: " + gesture.id + ", "
  //                   + "type: " + gesture.type + ", "
  //                   + "state: " + gesture.state + ", "
  //                   + "hand IDs: " + gesture.handIds.join(", ") + ", "
  //                   + "pointable IDs: " + gesture.pointableIds.join(", ") + ", "
  //                   + "duration: " + gesture.duration + " &micro;s, ";

  //     switch (gesture.type) {
  //       case "circle":
  //         gestureString += "center: " + vectorToString(gesture.center) + " mm, "
  //                       + "normal: " + vectorToString(gesture.normal, 2) + ", "
  //                       + "radius: " + gesture.radius.toFixed(1) + " mm, "
  //                       + "progress: " + gesture.progress.toFixed(2) + " rotations";
  //         break;
  //       case "swipe":
  //         gestureString += "start position: " + vectorToString(gesture.startPosition) + " mm, "
  //                       + "current position: " + vectorToString(gesture.position) + " mm, "
  //                       + "direction: " + vectorToString(gesture.direction, 2) + ", "
  //                       + "speed: " + gesture.speed.toFixed(1) + " mm/s";
  //         break;
  //       case "screenTap":
  //       case "keyTap":
  //         gestureString += "position: " + vectorToString(gesture.position) + " mm, "
  //                       + "direction: " + vectorToString(gesture.direction, 2);
  //         break;
  //       default:
  //         gestureString += "unkown gesture type";
  //     }
  //     gestureString += "<br />";
  //   }
  // }
  // else {
  //   gestureString += "No gestures";
  // }
  // gestureOutput.innerHTML = gestureString;

  // Store frame for motion functions
  previousFrame = frame;
})

function vectorToString(vector, digits) {
  if (typeof digits === "undefined") {
    digits = 1;
  }
  return "(" + vector[0].toFixed(digits) + ", "
             + vector[1].toFixed(digits) + ", "
             + vector[2].toFixed(digits) + ")";
}

function togglePause() {
  paused = !paused;

  if (paused) {
    document.getElementById("pause").innerText = "Resume";
  } else {
    document.getElementById("pause").innerText = "Pause";
  }
}


function pauseForGestures() {
  if (document.getElementById("pauseOnGesture").checked) {
    pauseOnGesture = true;
  } else {
    pauseOnGesture = false;
  }
}