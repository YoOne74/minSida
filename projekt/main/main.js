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
    }

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
  var oldClientX, oldClientY, curClientX, curClientY;

  // for (const child of elmnt.children) {
  //  if (child.classList.contains("handle")) {
  //    console.log(child);
  //    child.onmousedown = TODO
  //  }
  // }

  var handle = document.getElementsByClassName("handle")[0]; // 5 = se
  handle.onmousedown = dragRezise;
  console.log(handle);

  function dragRezise(event) {
    event.preventDefault();
    // get the mouse cursor position at startup:
    curClientX = event.clientX;
    curClientY = event.clientY;

    document.onmouseup = closeResizeElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementResize;
  }

  function elementResize(event) {
    event.preventDefault();

    oldClientX = curClientX - event.clientX;
    oldClientY = curClientY - event.clientY;
    curClientX = event.clientX;
    curClientY = event.clientY;

    const minWidth = 100;
    const minHeight = 200;

    const rect = elmnt.getBoundingClientRect();

    if (handle.classList.contains("n-resize")) {
      if (rect.height - oldClientY > minWidth) {
        elmnt.style.height = rect.height + oldClientY + "px";
        elmnt.style.top = elmnt.offsetTop - oldClientY + "px";
      }
    }

    if (handle.classList.contains("ne-resize")) {
      if (
        rect.height - oldClientY > minWidth &&
        rect.width - oldClientX > minHeight
      ) {
        elmnt.style.height = rect.height + oldClientY + "px";
        elmnt.style.top = elmnt.offsetTop - oldClientY + "px";

        elmnt.style.width = rect.width - oldClientX + "px";
      }
    }

    if (handle.classList.contains("e-resize")) {
      if (rect.width - oldClientX > minHeight) {
        elmnt.style.width = rect.width - oldClientX + "px";
      }
    }

    if (handle.classList.contains("se-resize")) {
      if (
        rect.height - oldClientY > minWidth &&
        rect.width - oldClientX > minHeight
      ) {
        elmnt.style.height = rect.height - oldClientY + "px";
        elmnt.style.width = rect.width - oldClientX + "px";
      }
    }

    if (handle.classList.contains("s-resize")) {
      if (rect.height - oldClientY > minWidth) {
        elmnt.style.height = rect.height - oldClientY + "px";
        elmnt.style.top = elmnt.offsetTop + oldClientY + "px";
      }
    }

    if (handle.classList.contains("sw-resize")) {
      if (
        rect.height - oldClientY > minWidth &&
        rect.width - oldClientX > minHeight
      ) {
        elmnt.style.height = rect.height + oldClientY + "px";
        elmnt.style.top = elmnt.offsetTop - oldClientY + "px";

        elmnt.style.width = rect.width - oldClientX + "px";
      }
    }

    if (handle.classList.contains("w-resize")) {
      if (rect.width + oldClientX > minHeight) {
        elmnt.style.width = rect.width + oldClientX + "px";
        elmnt.style.left = elmnt.offsetLeft - oldClientX + "px";
      }
    }

    if (handle.classList.contains("nw-resize")) {
      if (
        rect.height - oldClientY > minWidth &&
        rect.width - oldClientX > minHeight
      ) {
        elmnt.style.height = rect.height + oldClientY + "px";
        elmnt.style.top = elmnt.offsetTop - oldClientY + "px";

        elmnt.style.width = rect.width - oldClientX + "px";
      }
    }
  }

  function closeResizeElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function welcomewindowCreate() {
  desktop = document.getElementsByClassName("desktop")[0];
  const win = document.createElement("div");
  win.classList.add("window");
  win.id = "welcome.txt";
  windowCount = 1;
  zIndexCounter = 1;

  win.style.width = "400px";
  win.style.height = "400px";
  win.style.top = `${50 + windowCount * 20}px`;
  win.style.left = `${50 + windowCount * 20}px`;
  win.style.zIndex = ++zIndexCounter;
  win.style.display = "block";

  // Inject all 8 edge/corner handles
  win.innerHTML = `
        <div class="resize-handle n"></div>
        <div class="resize-handle s"></div>
        <div class="resize-handle e"></div>
        <div class="resize-handle w"></div>
        <div class="resize-handle nw"></div>
        <div class="resize-handle ne"></div>
        <div class="resize-handle sw"></div>
        <div class="resize-handle se"></div>


        <div class="topBar">
          <div class="windowTitle">
            <img src="content/archLogo.png" alt="archLogo" />
            <p>Welcome.txt</p>
          </div>
          <div class="buttonGroup">
            <button 
              onclick="rightButtonGroup('welcome.txt','hideWindow')" 
              class="buttonHide">
              <img src="content/minimise.png" alt="" />
            </button>
            <button
              onclick="rightButtonGroup('welcome.txt','fullScreenWindow')"
              class="buttonFullscreen"
            >
              <img src="content/maximise.png" alt="" />
            </button>
            <button
              onclick="rightButtonGroup('welcome.txt','closeWindow')"
              class="buttonClose"
            >
              <img src="content/close.png" alt="" />
            </button>
          </div>
          </div>
        <div style="padding: 10px" class="windowContent">

        </div>
    `;

  content = win.getElementsByClassName("windowContent")[0];
  content.innerHTML = `
    <h1>Haiii welcome to my website!</h1> 
    <p> This webbsite is supposed to emulate early windows, all of my things are availible in their own windows! You can close this one and re-open it by simply pressing the arch logo in the desktop, otherwise im sure youre quite familiar with how windows works... (sadly)</p>
    <p> You can also move and resize all the windows!, isnt that coool </p>
  `;
  desktop.appendChild(win);
}

icon = document.getElementById("aboutMeIcon");
icon.addEventListener("dblclick", (e) => {
  welcomewindowCreate();
});

function aboutmewindowCreate() {
  desktop = document.getElementsByClassName("desktop")[0];
  const win = document.createElement("div");
  win.classList.add("window");
  // win.classList.add('fullscreen');
  win.id = "aboutme.html";
  windowCount = 1;
  zIndexCounter = 1;

  win.style.width = "400px";
  win.style.height = "400px";
  win.style.top = `${50 + windowCount * 20}px`;
  win.style.left = `${50 + windowCount * 20}px`;
  win.style.zIndex = ++zIndexCounter;
  win.style.display = "block";

  // Inject all 8 edge/corner handles
  win.innerHTML = `
        <div class="resize-handle n"></div>
        <div class="resize-handle s"></div>
        <div class="resize-handle e"></div>
        <div class="resize-handle w"></div>
        <div class="resize-handle nw"></div>
        <div class="resize-handle ne"></div>
        <div class="resize-handle sw"></div>
        <div class="resize-handle se"></div>


        <div class="topBar">
          <div class="windowTitle">
            <img src="content/archLogo.png" alt="archLogo" />
            <p>FakeFox</p>
          </div>
          <div class="buttonGroup">
            <button 
              onclick="rightButtonGroup('aboutme.html','hideWindow')" 
              class="buttonHide">
              <img src="content/minimise.png" alt="" />
            </button>
            <button
              onclick="rightButtonGroup('aboutme.html','fullScreenWindow')"
              class="buttonFullscreen"
            >
              <img src="content/maximise.png" alt="" />
            </button>
            <button
              onclick="rightButtonGroup('aboutme.html','closeWindow')"
              class="buttonClose"
            >
              <img src="content/close.png" alt="" />
            </button>
          </div>
          </div>
        <div style="padding: 10px" class="windowContent">

        </div>
    `;

  content = win.getElementsByClassName("windowContent")[0];
  content.innerHTML = `
    <p>Here are some links:</p>
    <ul>
      <li> tumblr </li>
      <li> YouTube </li>
    </ul>

`;
  desktop.appendChild(win);
}

icon = document.getElementById("aboutme");
icon.addEventListener("dblclick", () => {
  aboutmewindowCreate();
});

let prevHeight = 0;
let prevWidth = 0;
let prevTop = 0;
let prevLeft = 0;

// Source - https://stackoverflow.com/a/53939059
// Retrieved 2026-03-18, License - CC BY-SA 4.0

// Make toggleShow run on double click
icon = document.getElementById("cristofferIcon");
icon.addEventListener("dblclick", (e) => {
  chWin = document.getElementById("cristofferWindow");
  toggleShow(chWin);
  setPrevValues(chWin);
});

function rightButtonGroup(id, typeOfButton) {
  win = document.getElementById(id);

  if (typeOfButton === "hideWindow") {
    hideWindow(win);
  }
  if (typeOfButton === "fullScreenWindow") {
    fullScreenWindow(win);
  }
  if (typeOfButton === "closeWindow") {
    closeWindow(win);
  }
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
  setPrevValues(win);
  win.classList.add("fullscreen");

  win.style.height = "calc(100vh - 10px)";
  win.style.width = "100vw";
  win.style.position = "absolute";
  win.style.top = "0px";
  win.style.left = "0px";
}

function makeFloating(win) {
  win.classList.remove("fullscreen");
  getPrevValues(win);
}

function closeWindow(win) {
  changeState(win);
  setDefaultValues(win);
  toggleShow(win);
}

function startButton() {
  toggleShow(document.getElementById("startButtonContent"));
}

//https://www.w3schools.com/howto/howto_js_dropdown.asp
/* When the user clicks on the button,
  toggle between hiding and showing the dropdown content */

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".target")) {
    var dropdowns = document.getElementsByClassName("droppDownContent");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.style.display === "block") {
        toggleShow(openDropdown);
      }
    }
  }
};
