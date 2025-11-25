const openLetterBtn = document.getElementById("openLetterBtn");
const letterOverlay = document.getElementById("letterOverlay");
const closeLetterBtn = document.getElementById("closeLetterBtn");

openLetterBtn.addEventListener("click", () => {
  letterOverlay.style.display = "flex"; // Show letter
});

// Close the letter
closeLetterBtn.addEventListener("click", () => {
  letterOverlay.style.display = "none";
});

const openMusicList = document.getElementById("openMusicList");
const musicOverlay = document.getElementById("musicOverlay");
const closeMusicList = document.getElementById("closemusic");

openMusicList.addEventListener("click", () => {
  musicOverlay.style.display = "flex"; // Show letter
});

// Close the letter
closeMusicList.addEventListener("click", () => {
  musicOverlay.style.display = "none";
});

window.addEventListener('mouseup',function(event){
    if(!(event.target.closest("#musicOverlay"))){
        musicOverlay.style.display = 'none';
    }
});

window.addEventListener('mouseup',function(event){
    if(!(event.target.closest("#letterOverlay"))){
        letterOverlay.style.display = 'none';
    }
});
