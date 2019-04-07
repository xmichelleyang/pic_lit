const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');
const retakeButton = document.getElementById('retake');
const useButton = document.getElementById('use');
const parent = document.getElementById("div1");

const constraints = {
  video: true,
};

captureButton.addEventListener('click', () => {
  context.drawImage(player, 0, 0, canvas.width, canvas.height);
  // Stop all video streams.
  canvas.style.display = "block";
  player.style.display = "none";
  captureButton.style.display = "none";
  retakeButton.style.display = "block";
  useButton.style.display = "block";
  const img = canvas.toDataURL("image/png");


  // document.write('<img src="'+img+'"/>');
});
retakeButton.addEventListener('click', () => {
  canvas.style.display = "none";
  player.style.display = "block";
  captureButton.style.display = "block";
  retakeButton.style.display = "none";
  useButton.style.display = "none";
});
navigator.mediaDevices.getUserMedia(constraints)
  .then((stream) => {
    // Attach the video stream to the video element and autoplay.
    player.srcObject = stream;
});
