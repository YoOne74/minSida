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
//setInterval(updateClock, 1000);

// Run once immediately
//updateClock();

// movable windows
// stolen from:
// https://www.w3schools.com/howto/howto_js_draggable.asp

// Make the DIV element draggable:

dragElement(document.getElementsByClassName("dragable")[0]);

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementsByClassName("topBar")) {
    // if present, the header is where you move the DIV from:
    document.getElementsByClassName("topBar")[0].onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Hide and show window things
function clickOnIcon(name) {
  //toggleShow(name);
}

// Source - https://stackoverflow.com/a/53939059
// Posted by kyw
// Retrieved 2026-03-18, License - CC BY-SA 4.0

icon = document.getElementById("temp");

icon.addEventListener("dblclick", (e) => {
  toggleShow("cristofferWindow");
});

function hideWindow(name) {
  toggleShow(name);
}

function fullScreenWindow(name) {
  var x = document.getElementById(name);

  x.style.height = "90vh";
  x.style.width = "100vw";

}

function closeWindow(name) {
  toggleShow(name);
}

function toggleShow(name) {
  var x = document.getElementById(name);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
