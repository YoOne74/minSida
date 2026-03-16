//clock from:
//https://developershaurya.com/build-digital-clock-html-css-javascript/
function updateClock() {
  const now = new Date();

  // Time
  let hours = now.getHours();
  let minutes = now.getMinutes();

  // Format time
  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");


  document.getElementById("time").textContent = `${hours}:${minutes}`;

}

// Update every second
setInterval(updateClock, 1000);

// Run once immediately
updateClock();