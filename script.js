const VideoEl = document.createElement("video");
VideoEl.setAttribute("src", "video/852x480.mp4");

const containerEl = document.querySelector(".containerVideo");
containerEl.appendChild(VideoEl);

const playEl = document.createElement("div");
const pauseEl = document.createElement("div");
playEl.classList.add("play");
pauseEl.classList.add("pause");

playEl.addEventListener("click", function (e) {
  VideoEl.play();
  console.log(VideoEl.duration, VideoEl.currentTime);
});
pauseEl.addEventListener("click", function (e) {
  VideoEl.pause();
  console.log(VideoEl.duration, VideoEl.currentTime);
});

const rangeEl = document.createElement("input");
rangeEl.setAttribute("type", "range");
rangeEl.setAttribute("min", "0");
rangeEl.setAttribute("max", "100");
rangeEl.setAttribute("value", "0");
rangeEl.addEventListener("change", function (e) {
  console.log(e.target.value);
  VideoEl.currentTime = (e.target.value / 100) * VideoEl.duration;
});
VideoEl.addEventListener("timeupdate", (e) => {
  rangeEl.setAttribute(
    "value",
    Math.round((VideoEl.currentTime / VideoEl.duration) * 100)
  );
});

const volumeEl = document.createElement("input");
volumeEl.setAttribute("type", "range");
volumeEl.setAttribute("min", "0");
volumeEl.setAttribute("max", "100");
volumeEl.setAttribute("value", "0");

VideoEl.addEventListener("loadeddata", (event) => {
  volumeEl.setAttribute("value", VideoEl.volume * 100);
});
volumeEl.addEventListener("change", function (e) {
  VideoEl.volume = e.target.value / 100;
  console.log(VideoEl.volume);
});

const muteEl = document.createElement("div");
muteEl.classList.add("mute");

const pMuteEl = document.createElement("p");
muteEl.appendChild(pMuteEl);
pMuteEl.textContent = "Выключить звук";

muteEl.addEventListener("click", function (e) {
  if (VideoEl.muted) {
    // Если звук был выключен, включаем его
    VideoEl.muted = false;
    pMuteEl.textContent = "Выключить звук";
  } else {
    // Если звук был включен, выключаем его
    VideoEl.muted = true;
    pMuteEl.textContent = "Включить звук";
  }
});

const fullscreenEl = document.createElement("div");
fullscreenEl.classList.add("fullscreen");

const pFullscreenEl = document.createElement("p");
fullscreenEl.appendChild(pFullscreenEl);
pFullscreenEl.textContent = "Развернуть видео";

fullscreenEl.addEventListener("click", function () {
  if (!document.fullscreenElement) {
    // Если видео не находится в полноэкранном режиме, разворачиваем его
    if (VideoEl.requestFullscreen) {
      VideoEl.requestFullscreen();
    }
    // else if (VideoEl.webkitRequestFullscreen) {
    //   // Для Safari
    //   VideoEl.webkitRequestFullscreen();
    // } else if (VideoEl.msRequestFullscreen) {
    //   // Для Internet Explorer
    //   VideoEl.msRequestFullscreen();
    // }
  } else {
    // Если видео находится в полноэкранном режиме, выходим из него
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    // else if (document.webkitExitFullscreen) {
    //   // Для Safari
    //   document.webkitExitFullscreen();
    // } else if (document.msExitFullscreen) {
    //   // Для Internet Explorer
    //   document.msExitFullscreen();
    // }
  }
});

VideoEl.addEventListener("click", function () {
  if (VideoEl.paused) {
    // Если видео на паузе, включаем воспроизведение
    VideoEl.play();
  } else {
    // Если видео воспроизводится, ставим на паузу
    VideoEl.pause();
  }
});

// Функция для установки видео с определенной секундой воспроизведения
function setVideoSource(src, currentTime) {
  VideoEl.src = src;
  VideoEl.load(); // Перезагрузить видео с новым источником
  VideoEl.currentTime = currentTime; // Установить текущую секунду воспроизведения
}

// Создать список разрешений
const resolutions = [
  { label: "240p", src: "video/426x240.mp4" },
  { label: "360p", src: "video/640x360.mp4" },
  { label: "480p", src: "video/852x480.mp4" },
  { label: "720p", src: "video/1280x720.mp4" },
];

const resolutionSelect = document.createElement("select");

// Заполнить список разрешений
resolutions.forEach((resolution) => {
  const option = document.createElement("option");
  option.textContent = resolution.label;
  option.value = resolution.src;
  resolutionSelect.appendChild(option);
});

// Событие изменения выбранного разрешения
resolutionSelect.addEventListener("change", function () {
  const selectedSrc = this.value;
  const currentTime = VideoEl.currentTime; // Сохранить текущую секунду воспроизведения
  const wasPlaying = !VideoEl.paused; // Проверка, играло ли видео перед изменением разрешения
  setVideoSource(selectedSrc, currentTime); // Установить новый источник видео с сохраненной секундой воспроизведения
  if (wasPlaying) {
    VideoEl.play(); // Автоматический запуск воспроизведения, если видео воспроизводилось до изменения разрешения
  }
});

// Добавить список разрешений в контейнер перед видео
// containerEl.insertBefore(resolutionSelect, VideoEl);

const rangesEl = document.createElement("div");
rangesEl.classList.add("ranges");
containerEl.appendChild(rangesEl);
rangesEl.appendChild(rangeEl);
rangesEl.appendChild(volumeEl);

const powerBlock = document.createElement("div");
powerBlock.classList.add("power-block");
containerEl.appendChild(powerBlock);

powerBlock.appendChild(playEl);
powerBlock.appendChild(pauseEl);
powerBlock.appendChild(muteEl);
powerBlock.appendChild(fullscreenEl);
powerBlock.appendChild(resolutionSelect);
