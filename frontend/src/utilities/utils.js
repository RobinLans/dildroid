export function millisToMinutesAndSeconds(millis) {
  const minutes = Math.floor(millis / 60000);
  const returnedMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return returnedMin + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export function secondsToMinutesAndSeconds(duration) {
  const minutes = Math.floor((duration % 3600) / 60);
  const returnedMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secs = Math.floor(duration % 60);
  let ret = "";
  ret += "" + returnedMin + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}
