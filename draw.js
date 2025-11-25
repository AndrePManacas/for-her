// Canvas setup
const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");

// Controls
const currentColorBtn = document.getElementById("currentColor");
const colorPicker = document.getElementById("colorPicker");
const lineWidthSelect = document.getElementById("lineWidthSelect");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");
const gridToggle = document.getElementById("gridToggle");
const controlPanel = document.getElementById("controlPanel");
const dragHandle = document.getElementById("dragHandle");

// Full-screen canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Drawing state
let drawing = false;
let currentColor = "#ffffff"; // white

let lineWidth = 2;
let isEraser = false;
let showGrid = false;

ctx.strokeStyle = currentColor;
ctx.lineWidth = lineWidth;
ctx.lineCap = "round";

// --- DRAWING EVENTS ---
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY);
});
window.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
});

// --- COLOR PICKER ---
currentColorBtn.addEventListener("click", () => {
  colorPicker.click();
});

colorPicker.addEventListener("input", (e) => {
  currentColor = e.target.value;
  if (!isEraser) ctx.strokeStyle = currentColor;
  currentColorBtn.style.background = currentColor;
  updateButtonStates();
});

// --- LINE WIDTH DROPDOWN ---
lineWidthSelect.addEventListener("change", (e) => {
  lineWidth = parseInt(e.target.value);
  ctx.lineWidth = lineWidth;
});

// --- ERASER TOGGLE ---
eraserBtn.addEventListener("click", () => {
  isEraser = !isEraser;
  if (isEraser) {
    ctx.globalCompositeOperation = "destination-out";
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = currentColor;
  }
  updateButtonStates();
});

// --- CLEAR CANVAS ---
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (showGrid) drawGrid();
});

// --- BUTTON STATE HIGHLIGHT ---
function updateButtonStates() {
  if (isEraser) {
    eraserBtn.style.backgroundColor = "var(--bg-light)"
    currentColorBtn.style.backgroundColor = "var(--bg)";
  } else {
    eraserBtn.style.backgroundColor = "var(--bg)";
    currentColorBtn.style.backgroundColor = "var(--bg-light)";
  }
}
updateButtonStates();

// --- DRAGGING TOOLBAR ---
let offsetX, offsetY, isDragging = false;

dragHandle.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - controlPanel.offsetLeft;
  offsetY = e.clientY - controlPanel.offsetTop;
  dragHandle.classList.add("dragging");
});

window.addEventListener("mouseup", () => {
  isDragging = false;
  dragHandle.classList.remove("dragging");
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  let newX = e.clientX - offsetX;
  let newY = e.clientY - offsetY;

  const maxX = window.innerWidth - controlPanel.offsetWidth;
  const maxY = window.innerHeight - controlPanel.offsetHeight;
  newX = Math.max(0, Math.min(newX, maxX));
  newY = Math.max(0, Math.min(newY, maxY));

  controlPanel.style.left = newX + "px";
  controlPanel.style.top = newY + "px";
});