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


// Source - https://stackoverflow.com/a/53939059
// Retrieved 2026-03-18, License - CC BY-SA 4.0

// Make toggleShow run on double click
icon = document.getElementById("temp");
icon.addEventListener("dblclick", (e) => {
  toggleShow("cristofferWindow");
});

let state = {
  "open": false,
  "fullscreen":false
};

function hideWindow(name) {
  state["open"] = false;
  toggleShow(name);
}

function fullScreenWindow(name) {
  state["fullscreen"] = true;
  changeState(name);
}

function changeState(name) {
  if (state["fullscreen"]==true){
    makeFullScreen(name)
  } else {
    makeFloating(name)
  }
}


let prevHeight=0;
let prevWidth=0;

function makeFullScreen(name){
  var win = document.getElementById(name);
  prevHeight=win.style.height;
  prevWidth=win.style.width;
  win.style.height = "90vh";
  win.style.width = "100vw";
  win.style.position="absolute"
  win.style.top="0px";
  win.style.left="0px"

}

function makeFloating(name) {
  var win = document.getElementById(name);
  win.style.height = prevHeight; 
  win.style.width = prevWidth;

}


function closeWindow(name) {
  state["fullscreen"]=false
  state["open"]=false
  
  changeState(name)

  var win = document.getElementById(name)
  win.style.top="0px";
  win.style.left="0px"


  toggleShow(name);
};

function toggleShow(name) {
  var x = document.getElementById(name);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  state[open]=true;  
}
