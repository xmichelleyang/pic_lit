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
  canvas.style.display = "block";
  player.style.display = "none";
  //var img = canvas.toDataURL("image/png");
  //document.write('<img src="'+img+'"/>');
});

navigator.mediaDevices.getUserMedia(constraints)
  .then((stream) => {
    // Attach the video stream to the video element and autoplay.
    player.srcObject = stream;
});