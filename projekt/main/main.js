// movable windows
// stolen from: https://www.w3schools.com/howto/howto_js_draggable.asp

// Make the DIV element draggable:
dragElement(document.getElementsByClassName("dragable")[0]);

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  document.getElementsByClassName("topBar")[0].onmousedown = dragMouseDown;


  function dragMouseDown(e) {
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // make draging the window remove fullscreen
    if (elmnt.classList.contains("fullscreen")) {
      elmnt.classList.remove("fullscreen");
      elmnt.style.height = prevHeight;
      elmnt.style.width = prevWidth;

      // this is to make the window be centered on the window,
      // instead of it beaing in the very left
      const rect = elmnt.getBoundingClientRect();
      elmnt.style.left = e.clientX - rect.width / 2 + "px";
    }
    if (e.clientY < 10) {
      elmnt.classList.add("canDragFullscreen");
    } else if (!elmnt.classList.contains("canDragFullscreen")) {
      elmnt.classList.remove("canDragFullscreen");
    };


    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";

  }

  function closeDragElement(e) {
    // this code is to make the window be able to fullscreen from
    // draging to the top of the screen 
    e.preventDefault();

    if (elmnt.classList.contains("canDragFullscreen") && e.clientY < 10) {
      fullScreenWindow(elmnt);
      elmnt.classList.remove("canDragFullscreen");
    }

    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


//  for (let index = 0; index < document.getElementsByClassName("handle").length; index++) {

resizeElement(document.getElementsByClassName("resizable")[0]);

function resizeElement(elmnt) {
  var oldClientX,
    oldClientY,
    curClientX,
    curClientY


  var element = document.getElementsByClassName("handle")[0];
  element.onmousedown = dragRezise;

  // document.getElementsByClassName("n-resize")[0].onmousedown = dragRezise;

  function dragRezise(event) {
    console.log("dragRezise")
    event.preventDefault();
    // get the mouse cursor position at startup:
    curClientX = event.clientX;
    curClientY = event.clientY;

    document.onmouseup = closeResizeElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementResize;


  }

  function elementResize(event) {
    console.log("element rezise")
    event.preventDefault();

    oldClientX = curClientX - event.clientX;
    oldClientY = curClientY - event.clientY;
    curClientX = event.clientX;
    curClientY = event.clientY;

    const rect = elmnt.getBoundingClientRect();

    console.log(element)
    if (elmnt.classList.contains("n-resize")) {
      console.log("woo")
      if (rect.height + oldClientY > 100) {
        elmnt.style.height = rect.height + oldClientY + "px";
        elmnt.style.top = elmnt.offsetTop - oldClientY + "px";
      }
    }

    if (elmnt.classList.contains("s-resize")) {
      if (rect.height - oldClientY > 100) {
        elmnt.style.height = rect.height - oldClientY + "px";
        elmnt.style.top = elmnt.offsetTop + oldClientY + "px";
      }
    }


  }

  function closeResizeElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

  console.log(element)

}

let prevHeight = 0;
let prevWidth = 0;
let prevTop = 0;
let prevLeft = 0;

// Source - https://stackoverflow.com/a/53939059
// Retrieved 2026-03-18, License - CC BY-SA 4.0

// Make toggleShow run on double click
icon = document.getElementById("cristofferIcon");
icon.addEventListener("dblclick", (e) => {
  chWin = document.getElementById("cristofferWindow")
  toggleShow(chWin);
  setPrevValues(chWin);
});


function rightButtonGroup(id, typeOfButton) {
  win = document.getElementById(id);

  if (typeOfButton === "hideWindow") {
    hideWindow(win)
  };
  if (typeOfButton === "fullScreenWindow") {
    fullScreenWindow(win)
  };
  if (typeOfButton === "closeWindow") {
    closeWindow(win)
  };
}


function setPrevValues(win) {
  prevHeight = win.style.height;
  prevWidth = win.style.width;
  prevTop = win.style.top;
  prevLeft = win.style.left;
}

function setDefaultValues(win) {
  prevHeight = "300px";
  prevWidth = "300px";
  prevTop = "10px";
  prevLeft = "2px";

  win.style.height = "300px";
  win.style.width = "300px";
  win.style.top = "10px";
  win.style.left = "2px";

}

function getPrevValues(win) {
  win.style.height = prevHeight;
  win.style.width = prevWidth;
  win.style.top = prevTop;
  win.style.left = prevLeft;
}

function hideWindow(win) {
  win.classList.remove("open");
  setPrevValues(win);
  changeState(win);
  toggleShow(win);
}

function fullScreenWindow(win) {
  if (win.classList.contains("fullscreen")) {
    makeFloating(win);
  } else {
    makeFullScreen(win);
  }
}

function changeState(win) {
  if (win.classList.contains("fullscreen")) {
    makeFullScreen(win);
  } else {
    makeFloating(win);
  }

  if (win.classList.contains("open")) {

  }
}

function toggleShow(win) {
  if (win.style.display === "none") {
    win.style.display = "block";
  } else {
    win.style.display = "none";
  }
}




function makeFullScreen(win) {
  setPrevValues(win)
  win.classList.add("fullscreen");

  win.style.height = "calc(100vh - 10px)";
  win.style.width = "100vw";
  win.style.position = "absolute"
  win.style.top = "0px";
  win.style.left = "0px"

}

function makeFloating(win) {
  win.classList.remove("fullscreen")
  getPrevValues(win)
}


function closeWindow(win) {
  changeState(win)
  setDefaultValues(win)
  toggleShow(win);
}


