const desktop = document.getElementsByClassName("desktop")[0];
const spawnBtn = document.getElementById("spawn-btn");

let zIndexCounter = 1;
let windowCount = 0;

// Draggable Logic (Unchanged from before)
function makeDraggable(win, handle) {
  let isDragging = false;
  let startX, startY, startLeft, startTop;

  handle.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startLeft = parseInt(window.getComputedStyle(win).left, 10) || 0;
    startTop = parseInt(window.getComputedStyle(win).top, 10) || 0;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    win.style.left = `${startLeft + deltaX}px`;
    win.style.top = `${startTop + deltaY}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

function makeResizable(win, handles) {
  let isResizing = false;
  let currentHandle = "";
  let startX, startY, startWidth, startHeight, startLeft, startTop;

  handles.forEach((handle) => {
    handle.addEventListener("mousedown", (e) => {
      isResizing = true;
      // Get the specific direction class (e.g., 'n', 'sw', 'e')
      currentHandle = handle.className.replace("resize-handle ", "");

      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(window.getComputedStyle(win).width, 10);
      startHeight = parseInt(window.getComputedStyle(win).height, 10);
      startLeft = parseInt(window.getComputedStyle(win).left, 10);
      startTop = parseInt(window.getComputedStyle(win).top, 10);

      e.stopPropagation(); // Don't trigger the window's drag logic
    });
  });

  document.addEventListener("mousemove", (e) => {
    if (!isResizing) return;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    if (currentHandle.includes("e")) {
      win.style.width = `${startWidth + deltaX}px`;
    }
    if (currentHandle.includes("s")) {
      win.style.height = `${startHeight + deltaY}px`;
    }
    if (currentHandle.includes("w")) {
      // Dragging left changes both width and X position
      win.style.width = `${startWidth - deltaX}px`;
      win.style.left = `${startLeft + deltaX}px`;
    }
    if (currentHandle.includes("n")) {
      // Dragging up changes both height and Y position
      win.style.height = `${startHeight - deltaY}px`;
      win.style.top = `${startTop + deltaY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isResizing = false;
  });
}

function welcomewindowCreate(id) {
  const win = document.createElement("div");
  win.classList.add("window");
  win.id = id;
  windowCount++;

  win.style.width = "400px";
  win.style.height = "400px";
  win.style.top = `${50 + windowCount * 20}px`;
  win.style.left = `${50 + windowCount * 20}px`;
  win.style.zIndex = ++zIndexCounter;
  win.style.display = "block";

  // Inject all 8 edge/corner handles
  win.innerHTML = `
        <div class="handle n-resize"></div>
        <div class="handle s-resize"></div>
        <div class="handle e-resize"></div>
        <div class="handle w-resize"></div>
        <div class="handle nw-resize"></div>
        <div class="handle ne-resize"></div>
        <div class="handle sw-resize"></div>
        <div class="handle se-resize"></div>


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
            <button class="buttonClose">
              <img src="content/close.png" alt="" />
            </button>
          </div>
          </div>
        <div style="padding: 10px" class="windowContent">

        </div>
    `;
  desktop.appendChild(win);

  const titleBar = win.querySelector(".topBar");
  const closeBtn = win.querySelector(".buttonClose");
  const resizeHandles = win.querySelectorAll(".handle"); // Select all handles

  win.addEventListener("mousedown", () => {
    win.style.zIndex = ++zIndexCounter;
  });

  closeBtn.addEventListener("click", () => {
    win.remove();
  });

  makeDraggable(win, titleBar);
  makeResizable(win, resizeHandles);
}

icon = document.getElementById("aboutMeIcon");
icon.addEventListener("dblclick", (e) => {
  welcomewindowCreate("welcome.txt");
  win = document.getElementById("welcome.txt");
  content = win.getElementsByClassName("windowContent")[0];
  content.innerHTML = `
    <h1>Haiii welcome to my website!</h1> 
    <p> This webbsite is supposed to emulate early windows, all of my things are availible in their own windows! You can close this one and re-open it by simply pressing the arch logo in the desktop, otherwise im sure youre quite familiar with how windows works... (sadly)</p>
    <p> You can also move and resize all the windows!, isnt that coool </p>
  `;
});

function aboutmewindowCreate(id) {
  const win = document.createElement("div");
  win.classList.add("window");
  win.id = id;
  windowCount++;

  win.style.width = "400px";
  win.style.height = "400px";
  win.style.top = `${50 + windowCount * 20}px`;
  win.style.left = `${50 + windowCount * 20}px`;
  win.style.zIndex = ++zIndexCounter;
  win.style.display = "block";

  // Inject all 8 edge/corner handles
  win.innerHTML = `
        <div class="handle n-resize"></div>
        <div class="handle s-resize"></div>
        <div class="handle e-resize"></div>
        <div class="handle w-resize"></div>
        <div class="handle nw-resize"></div>
        <div class="handle ne-resize"></div>
        <div class="handle sw-resize"></div>
        <div class="handle se-resize"></div>


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
              class="buttonClose"
            >
              <img src="content/close.png" alt="" />
            </button>
          </div>
          </div>
        <div style="padding: 10px" class="windowContent">

        </div>
    `;
  desktop.appendChild(win);

  const titleBar = win.querySelector(".topBar");
  const closeBtn = win.querySelector(".buttonClose");
  const resizeHandles = win.querySelectorAll(".handle"); // Select all handles

  win.addEventListener("mousedown", () => {
    win.style.zIndex = ++zIndexCounter;
  });

  closeBtn.addEventListener("click", () => {
    win.remove();
  });

  makeDraggable(win, titleBar);
  makeResizable(win, resizeHandles);
}

icon = document.getElementById("aboutme");
icon.addEventListener("dblclick", () => {
  aboutmewindowCreate("aboutme.html");
  win = document.getElementById("aboutme.html");
  content = win.getElementsByClassName("windowContent")[0];
  content.innerHTML = `
    <p>I am a student in whats basically swedens highschool system, and i am taking a line that is very technicaly focoused</p>
    <p>Here are some links:</p>
    <ul>
      <li> tumblr </li>
      <li> YouTube </li>
    </ul>
  `;
});

function linksWindowCreate(id) {
  const win = document.createElement("div");
  win.classList.add("window");
  win.id = id;
  windowCount++;

  win.style.width = "400px";
  win.style.height = "400px";
  win.style.top = `${50 + windowCount * 20}px`;
  win.style.left = `${50 + windowCount * 20}px`;
  win.style.zIndex = ++zIndexCounter;
  win.style.display = "block";

  // Inject all 8 edge/corner handles
  win.innerHTML = `
        <div class="handle n-resize"></div>
        <div class="handle s-resize"></div>
        <div class="handle e-resize"></div>
        <div class="handle w-resize"></div>
        <div class="handle nw-resize"></div>
        <div class="handle ne-resize"></div>
        <div class="handle sw-resize"></div>
        <div class="handle se-resize"></div>


        <div class="topBar">
          <div class="windowTitle">
            <img src="content/archLogo.png" alt="archLogo" />
            <p>FakeFox</p>
          </div>
          <div class="buttonGroup">
            <button 
              onclick="rightButtonGroup('links','hideWindow')" 
              class="buttonHide">
              <img src="content/minimise.png" alt="" />
            </button>
            <button
              onclick="rightButtonGroup('links','fullScreenWindow')"
              class="buttonFullscreen"
            >
              <img src="content/maximise.png" alt="" />
            </button>
            <button
              class="buttonClose"
            >
              <img src="content/close.png" alt="" />
            </button>
          </div>
          </div>
        <div style="padding: 10px" class="windowContent">

        </div>
    `;
  desktop.appendChild(win);
  const titleBar = win.querySelector(".topBar");
  const closeBtn = win.querySelector(".buttonClose");
  const resizeHandles = win.querySelectorAll(".handle"); // Select all handles

  win.addEventListener("mousedown", () => {
    win.style.zIndex = ++zIndexCounter;
  });

  closeBtn.addEventListener("click", () => {
    win.remove();
  });

  makeDraggable(win, titleBar);
  makeResizable(win, resizeHandles);
}

icon = document.getElementById("linksFolderIcon");
icon.addEventListener("dblclick", () => {
  linksWindowCreate("links");
  win = document.getElementById("links");
  content = win.getElementsByClassName("windowContent")[0];
  content.innerHTML = `
   <div class="folderWindowTopBar" style="display:flex;flex-direction:row;height:10%;width:100%;">
      <div class="folderTopLeft"style="display:flex;flex-direction:row;width:70%;">
        <p>C:\\</p>
        <p>Users\\</p>
        <p>Oupper\\</p>
        <p>Desktop\\</p>
        <p>links</p>
      </div>
      <div class="folderTopRight">
       <input class="target" type="text" name="wo" placeholder="search:" />
      </div>
    </div>
    <div class="folderMainContent">
      <div id="link1" class="linkInFolderIcon">
        <img src="content/archLogo.png" alt="cristoffer" />
        <p>my_old_main_page.html</p>
      </div>

      <div id="link2" class="linkInFolderIcon">
        <img src="content/archLogo.png" alt="cristoffer" />
        <p>my_otehr_projects.html</p>
      </div>

      <div id="link3" class="linkInFolderIcon">
        <img src="content/cristoffer.jpg" alt="cristoffer" />
        <p>somethign_else.html</p>
     </div>
    </div>
`;
  icon = document.getElementById("link1");
  icon.addEventListener("dblclick", () => {
    window.location.href = "https://yoone74.github.io/minSida/";
  });
});

function cristofferWindowCreate(id) {
  const win = document.createElement("div");
  win.classList.add("window");
  win.id = id;
  windowCount++;

  win.style.width = "400px";
  win.style.height = "400px";
  win.style.top = `${50 + windowCount * 20}px`;
  win.style.left = `${50 + windowCount * 20}px`;
  win.style.zIndex = ++zIndexCounter;
  win.style.display = "block";

  // Inject all 8 edge/corner handles
  win.innerHTML = `
        <div class="handle n-resize"></div>
        <div class="handle s-resize"></div>
        <div class="handle e-resize"></div>
        <div class="handle w-resize"></div>
        <div class="handle nw-resize"></div>
        <div class="handle ne-resize"></div>
        <div class="handle sw-resize"></div>
        <div class="handle se-resize"></div>


        <div class="topBar">
          <div class="windowTitle">
            <img src="content/cristoffer.jpg" alt="cristoffer" />
            <p>cristoffer.jpg</p>
          </div>
          <div class="buttonGroup">
            <button 
              onclick="rightButtonGroup('cristogfferWindow','hideWindow')" 
              class="buttonHide">
              <img src="content/minimise.png" alt="" />
            </button>
            <button
              onclick="rightButtonGroup('cristogfferWindow','fullScreenWindow')"
              class="buttonFullscreen"
            >
              <img src="content/maximise.png" alt="" />
            </button>
            <button
              class="buttonClose"
            >
              <img src="content/close.png" alt="" />
            </button>
          </div>
          </div>
        <div style="padding: 10px" class="windowContent">

        </div>
    `;
  desktop.appendChild(win);

  const titleBar = win.querySelector(".topBar");
  const closeBtn = win.querySelector(".buttonClose");
  const resizeHandles = win.querySelectorAll(".handle"); // Select all handles

  win.addEventListener("mousedown", () => {
    win.style.zIndex = ++zIndexCounter;
  });

  closeBtn.addEventListener("click", () => {
    win.remove();
  });

  makeDraggable(win, titleBar);
  makeResizable(win, resizeHandles);
}

icon = document.getElementById("cristofferIcon");
icon.addEventListener("dblclick", () => {
  cristofferWindowCreate("cristogfferWindow");
  win = document.getElementById("cristogfferWindow");
  content = win.getElementsByClassName("windowContent")[0];
  content.innerHTML = `
      <img src="content/cristoffer.jpg" alt="cristoffer" />
   `;
});

let prevHeight = 0;
let prevWidth = 0;
let prevTop = 0;
let prevLeft = 0;

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
