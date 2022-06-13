export function getAudioURL(
  mediaRecorder: MediaRecorder,
  callback: (url: string) => void
) {
  //use mediaRecorder and extract blob from it
  mediaRecorder.addEventListener("dataavailable", (e) => {
    const blob = new Blob([e.data]);
    const audioURL = URL.createObjectURL(blob);
    callback(audioURL);
  });
}
export async function getMediaRecorder() {
  // provides access to connected media input devices and it is promise, we should use await or then 
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}
