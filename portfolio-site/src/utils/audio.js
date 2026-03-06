const playSound = (frequency, type, duration, volume) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const audioCtx = new AudioContext();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  
  gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration);
  
  // Cleanup
  setTimeout(() => {
    audioCtx.close();
  }, (duration + 0.1) * 1000);
};

export const playClick = () => {
  playSound(1200, 'sine', 0.1, 0.1);
};

export const playTransition = () => {
  playSound(400, 'sine', 0.3, 0.15);
  setTimeout(() => playSound(800, 'sine', 0.2, 0.1), 100);
};
