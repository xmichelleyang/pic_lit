$(document).ready(function () {
  const player = document.getElementById('player');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const captureButton = document.getElementById('capture');
  const retakeButton = document.getElementById('retake');
  const useButton = document.getElementById('use');
  const parent = document.getElementById("div1");

  const constraints = {
    video: { facingMode: { exact: "environment" } },
  };

  captureButton.addEventListener('click', () => {
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
    // Stop all video streams.
    canvas.style.display = "block";
    player.style.display = "none";
    captureButton.style.display = "none";
    retakeButton.style.display = "block";
    useButton.style.display = "block";

    //$.post("/image", dataURL, function(dataURL, status){
      //console.log('${data} and status is ${status}')});
    // document.write('<img src="'+img+'"/>');
  });


  useButton.addEventListener('click', () => {
    const dataURL = canvas.toDataURL();
    $.ajax({
      type: "POST",
      url: "/image",
      data: {
        imgBase64: dataURL
      }
    })
    window.location.href = "download-screen";
  })
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
});
