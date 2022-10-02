export function checkPlaying(data) {
  if (data) {
    const playing = data.filter((x) => !x.standby);
    return playing;
  } else {
    return [];
  }
}
