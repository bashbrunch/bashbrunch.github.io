async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);

    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
  }

  return false;
}

async function copyInstallCommand() {
  const commandInput = document.querySelector('.install-command input');
  const commandText = commandInput.value;

  if (!await copyTextToClipboard(commandText)) {
    alert('Failed to copy the command. Please copy it manually.');
    return;
  }

  const copyButton = document.getElementById('copy-install-command');
  copyButton.textContent = 'Copied!';

  setTimeout(() => {
    copyButton.textContent = 'Copy';
  }, 2000);
}

function createRainDrop(imageUrl) {
  const rainContainer = document.getElementById('rain');
  const drop = document.createElement('img');
  drop.src = imageUrl;
  drop.className = 'rain-drop';
  drop.style.position = 'absolute';
  drop.style.left = `${Math.random() * window.innerWidth}px`;
  drop.style.top = `-${Math.random() * 100}px`;
  drop.style.width = '30px';
  drop.style.height = '30px';
  drop.style.opacity = Math.random();
  rainContainer.appendChild(drop);
  const fallDuration = Math.random() * 3 + 2;

  drop.animate(
    [
      { transform: `translateY(0)` },
      { transform: `translateY(${window.innerHeight + 50}px)` }
    ],
    {
      duration: fallDuration * 1000,
      iterations: Infinity,
      easing: 'linear'
    }
  );

  setTimeout(() => {
    rainContainer.removeChild(drop);
  }, fallDuration * 1000);
}

function startRain(imageUrl) {
  const interval = setInterval(() => {
    createRainDrop(imageUrl);
  }, 200);

  setTimeout(() => {
    clearInterval(interval);
  }, 5000);
}

function mixedRain() {
  const images = [
    '/assets/brunch1.png',
    '/assets/brunch2.png',
    '/assets/brunch3.png',
    '/assets/brunch4.png'
  ];

  for (const image of images) {
    startRain(image);
  }
}

function restartVideo() {
  const video = document.getElementById('demo-video');
  video.currentTime = 0;
}

function toggleVideoPlayPause() {
  const video = document.getElementById('demo-video');
  const playPauseButton = document.getElementById('demo-playstate-button');

  if (video.paused) {
    video.play();
    playPauseButton.textContent = 'Halt';
  } else {
    video.pause();
    playPauseButton.textContent = 'Play';
  }
}

function toggleVideoMute() {
  const video = document.getElementById('demo-video');
  const muteButton = document.getElementById('demo-mute-button');
  video.muted = !video.muted;
  muteButton.textContent = video.muted ? 'Sounds' : 'Silent';
}

function toggleVideoFullscreen() {
  const video = document.getElementById('demo-video');

  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) { // Firefox
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) { // Chrome, Safari and Opera
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) { // IE/Edge
    video.msRequestFullscreen();
  }
}

