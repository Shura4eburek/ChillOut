// Minecraft UI Click Sound
// Using a reliable source for the standard "click.ogg" sound
const CLICK_SOUND_URL = "https://www.myinstants.com/media/sounds/minecraft_click.mp3";

export const playClickSound = () => {
  const audio = new Audio(CLICK_SOUND_URL);
  audio.volume = 0.6;
  audio.currentTime = 0;
  audio.play().catch(e => {
    // Browsers might block audio if no interaction happened yet, ignore error
    console.warn("Audio play failed", e);
  });
};
