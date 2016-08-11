var contentDiv = document.getElementById("content"),
pageDiv = document.getElementById("page"),
samContainerDiv = document.getElementById("sam-container"),
samDiv = document.getElementById("sam"),
samFramesDiv = document.getElementById("sam-slides"),
samEyesCloseDiv = document.getElementById("sam-eyes-close"),
layerHorizontalArray = new Array,
layerHorizontalSpeedArray = new Array,
containerDiv = document.getElementById("container"),
pageVerticalPosition = 0,
samFramesDiv = document.getElementById("sam-slide"),
deltaPageVerticalPosition = 0,
previousPageVerticalPosition = 0,
samEyesCloseDiv = document.getElementById("eyes-closed"),
shiftSamFrameTimer,
counter = 0,
canAnimate,
testFrames = document.getElementById("test");
// function handleMove(e) {
//   e.preventDefault();
//   1 == canScrollOrSwipe && (detectPageVerticalPosition(),
//   runTheseFunctionsAfterScrollOrSwipe())
// }

function setLayerSpeed() {
    for (; layerHorizontalSpeedArray.length > 0; ){
      layerHorizontalSpeedArray.pop();
    }
    for (var e = 0; e < layerHorizontalArray.length; e++) {
        var t = (layerHorizontalArray[e].offsetWidth - containerDiv.offsetWidth) / (layerHorizontalArray[layerHorizontalArray.length - 1].offsetWidth - containerDiv.offsetWidth);
        layerHorizontalSpeedArray.push(t)
    }
}


function setPageHeight() {
    pageDiv.style.height = document.getElementById('layer-horizontal-3').offsetWidth + "px"
}

window.onload = function() {
  setPageHeight();
  storeDivs();
  setLayerSpeed();
}

window.onscroll = function(e) {
    // detectPageVerticalPosition();
    runTheseFunctionsAfterScrollOrSwipe();
};

function detectPageVerticalPosition(){
  previousPageVerticalPosition = pageVerticalPosition;
  pageVerticalPosition = window.scrollY;
  deltaPageVerticalPosition = pageVerticalPosition - previousPageVerticalPosition;
  console.log(deltaPageVerticalPosition);
}

function runningAnimation() {
  // if(deltaPageVerticalPosition > 0) {
  //   samFramesDiv.style.top = "200px";
  // }
}

function runTheseFunctionsAfterScrollOrSwipe() {
  detectPageVerticalPosition();
  runningAnimation();
  moveLayers();
  orientSam();
  // animateSam();
}

function moveLayers() {
  for (var e = 0; e < layerHorizontalArray.length; e++) {
    layerHorizontalArray[e].style.left = -1 * layerHorizontalSpeedArray[e] * pageVerticalPosition + "px";
  }
}

function storeDivs() {
    for (var e = document.getElementsByTagName("div"), t = 0; t < e.length; t++){
      "layer-horizontal" == e[t].getAttribute("class") && layerHorizontalArray.push(e[t])
    }
}

function orientSam() {
    deltaPageVerticalPosition > 0 && (testFrames.style.top = "0px",
    samEyesCloseDiv.style.left = "90px"),
    0 > deltaPageVerticalPosition && (testFrames.style.top = "-200px",
    samEyesCloseDiv.style.left = "55px")
}

function animateSam() {
  clearInterval(shiftSamFrameTimer),
  shiftSamFrameTimer = setInterval(function() {
    if(counter === 0){
      counter += 1;
    }else {
      counter -= 1;
    }
    shiftSamFrame();
  }, 200);
}

function clearShiftFrameTimer() {
    clearInterval(shiftSamFrameTimer),
    setStaticFrame(),
    counter = 0,
    enableAnimate();
}

function enableAnimate() {
    canAnimate = true;
}
function disableAnimate() {
    canAnimate = false;
}

function shiftSamFrame() {
  samFramesDiv.style.left = -1 * 200 * (1 + counter) + "px";
}

function setStaticFrame() {
    samFramesDiv.style.left = "0px"
}
