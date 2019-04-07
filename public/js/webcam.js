const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');
const parent = document.getElementById("div1");

const constraints = {
  video: true,
};

captureButton.addEventListener('click', () => {
  context.drawImage(player, 0, 0, canvas.width, canvas.height);
  // Stop all video streams.
  player.srcObject.getVideoTracks().forEach(track => track.stop());
  modal.style.display = "none";
  canvas.style.display = "block";
  btn.style.display = "none";
  var img = canvas.toDataURL("image/png");
  document.write('<img src="'+img+'"/>');
});

navigator.mediaDevices.getUserMedia(constraints)
  .then((stream) => {
    // Attach the video stream to the video element and autoplay.
    player.srcObject = stream;
});

// Get the modal
const modal = document.getElementById('div1');

// Get the button that opens the modal
const btn = document.getElementById("capWeb");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}