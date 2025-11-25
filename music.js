

const pl1 = [
  "audio/Dispatch (Original Soundtrack) Episode 6 - Radio (Dance Scene Song).mp3",
  "audio/Gigi Perez - Sailor Song [Official Music Video].mp3",
  "audio/SZA - Snooze (Audio).mp3",
  "audio/sombr - back to friends (official video).mp3",
  "audio/Joji - PIXELATED KISSES.mp3",
  "audio/José González - Crosses (Lyric Video).mp3",
  "audio/Mr.Kitty - After Dark.mp3",
  "audio/VXLLAIN, iGRES, ENXK - Cystal Skies (4K Music Video).mp3",
];

const audio = document.getElementById("audio-player");
const btnBack = document.querySelector(".btn-back");
const btnPlay = document.querySelector(".btn-play");
const btnNext = document.querySelector(".btn-next");
const btnAudio = document.querySelector(".btn-audio");
const btnLoop = document.querySelector(".btn-loop");

const iconPlay = document.getElementById("icon-play");
const iconAudio = document.getElementById("icon-audio");

const progress = document.getElementById("progress");
const timeDisplay = document.getElementById("time-display");
const volume = document.getElementById("volume");

let playlist = pl1;
let currentTrack = 0;
let lastVolume = 0.5;
let isLooping = false;

audio.volume = 0.5;
volume.value = 0.5;


// Load first track
function loadTrack() {
  audio.src = playlist[currentTrack];
  audio.load();
}
loadTrack();

// Play/Pause
btnPlay.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    iconPlay.className = "fa-solid fa-pause";
  } else {
    audio.pause();
    iconPlay.className = "fa-solid fa-play";
  }
});

// Next track
btnNext.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack();
  audio.play();
  iconPlay.className = "fa-solid fa-pause";
});

// Back / restart logic
btnBack.addEventListener("click", () => {
  if (audio.currentTime > 2) {
    audio.currentTime = 0;
  } else {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack();
    audio.play();
  }
});

// Progress update
audio.addEventListener("timeupdate", () => {
  progress.max = audio.duration;
  progress.value = audio.currentTime;

  let remaining = Math.floor(audio.duration - audio.currentTime);
  let min = Math.floor(remaining / 60);
  let sec = remaining % 60;
  timeDisplay.textContent = `${min}:${sec.toString().padStart(2, "0")}`;
});

// Drag progress
progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
});

// Volume change
volume.addEventListener("input", () => {
  audio.volume = volume.value;
  iconAudio.className = (audio.volume == 0) ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
});

// Mute toggle
btnAudio.addEventListener("click", () => {
  if (audio.volume > 0) {
    lastVolume = audio.volume;
    audio.volume = 0;
    volume.value = 0;
    iconAudio.className = "fa-solid fa-volume-xmark";
  } else {
    audio.volume = lastVolume;
    volume.value = lastVolume;
    iconAudio.className = "fa-solid fa-volume-high";
  }
});

// Loop button
btnLoop.addEventListener("click", () => {
  isLooping = !isLooping;
  audio.loop = isLooping;
  btnLoop.classList.toggle("active", isLooping);
});

