// Minecraft UI Click Sound
// Using local file
const CLICK_SOUND_URL = "/resources/sounds/click.mp3";

export const playClickSound = () => {
  const audio = new Audio(CLICK_SOUND_URL);
  audio.volume = 0.6;
  audio.currentTime = 0;
  audio.play().catch(e => {
    // Browsers might block audio if no interaction happened yet, ignore error
    console.warn("Audio play failed", e);
  });
};