const playListContainerTag= document.getElementsByClassName("playListContainer")[0];

const currentAndTotleTimeTag = document.getElementsByClassName("currentAndTotleTime")[0];

const currentProgressTag = document.getElementById("currentProgress");
const audioTag =document.getElementsByClassName("audioTag")[0];
const playButtonTag = document.getElementsByClassName("playButton")[0];
const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
const previousButtonTag = document.getElementsByClassName("previousButton")[0];
const nextButtonTag = document.getElementsByClassName("nextButton")[0];

const tracks= [
    { trackId:"music/track1.mp3",title:"Charlie Puth-One Call Away"},
    { trackId:"music/track2.mp3",title:"The Vamps - Somebody To You ft. Demi Lovato "},
    { trackId:"music/track3.mp3",title:"Sia - Unstoppable"},
    { trackId:"music/track4.mp3",title:"One Direction - One Thing"},
    { trackId:"music/track5.mp3",title:"Way Back Home - SHAUN"},
];

for (let i=0;i<tracks.length; i++) {
  const trackTag = document.createElement("div");
  trackTag.addEventListener("click", () => {
   currentPlayingIndex= i;
   playSong();
  });
  trackTag.classList.add("trackItem");
  const title= (i + 1).toString() + ". " + tracks[i].title;
  trackTag.textContent = title;
  playListContainerTag.append(trackTag); 
}

let duration = 0;
let durationText ="00:00"
audioTag.addEventListener("loadeddata", () => {
  duration = Math.floor(audioTag.duration);
  durationText =createMinuteAndSecondText(duration);
});

audioTag.addEventListener("timeupdate", () => {
  const currentTime = Math.floor(audioTag.currentTime);
  const currentTimeText=createMinuteAndSecondText(currentTime);
  const currentTimeTextAnddurationText =currentTimeText + " / " + durationText
  currentAndTotleTimeTag.textContent = currentTimeTextAnddurationText;
  updateCurrentProgress(currentTime);
});

const updateCurrentProgress = (currentTime) => {
 const currentProgressWidth = (500/duration) *currentTime;
 currentProgressTag.style.width = currentProgressWidth.toString() + "px";
};

const createMinuteAndSecondText = (totalsecond) => {
  const minutes = Math.floor(totalsecond/60);
  const seconds = totalsecond%60;

  const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
  const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;
  return minuteText + ":" + secondText;
};

let currentPlayingIndex =0;
let isPlaying = false;
playButtonTag.addEventListener("click", () => {
  const currentTime = Math.floor(audioTag.currentTime);
  isPlaying = true;
  if (currentTime === 0) {
    playSong();
  }else {
    audioTag.play();
    updatePlayAndPauseButton();
  }
});

pauseButtonTag.addEventListener("click", () => {
 isPlaying = false;
 audioTag.pause();
 updatePlayAndPauseButton();
});

previousButtonTag.addEventListener("click", () => {
 if (currentPlayingIndex === 0) {
  currentPlayingIndex = tracks.length -1;
  playSong();
   return;
 }
 currentPlayingIndex -= 1;
 playSong();
});

nextButtonTag.addEventListener("click", () => {
  if (currentPlayingIndex === tracks.length -1) {
    currentPlayingIndex = 0;
    playSong();
    return;
  }
  currentPlayingIndex += 1;
  playSong();
  
});

const playSong = () => {
  const songIdToPlay = tracks[currentPlayingIndex].trackId;
  audioTag.src = songIdToPlay;
  audioTag.play();
  isPlaying = true;
  updatePlayAndPauseButton();
}

const updatePlayAndPauseButton = () => {
 if (isPlaying) {
   playButtonTag.style.display = "none";
   pauseButtonTag.style.display = "inline";
 }else {
  playButtonTag.style.display = "inline";
  pauseButtonTag.style.display = "none";
 }
};