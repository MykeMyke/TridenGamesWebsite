export function checkPlaying(data) {
  const playing = data.filter((x) => !x.standby);
  return playing;
}
