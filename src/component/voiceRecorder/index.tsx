import { useEffect, useState } from "react";
import { getAudioURL, getMediaRecorder } from "../../helper/voiceHelper";
import { STATUS } from "../../types/recordType";
import RecordingAnimation from "../recordingAnimation";

const VoiceRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [audioURL, setAudioURL] = useState<string | null>("");
  const [status, setStatus] = useState(STATUS.IDLE);

  useEffect(() => {
    const init = async () => {
      //it used in useEffect because it should be render one time
      const mediaRecorder = await getMediaRecorder();
      setMediaRecorder(mediaRecorder);
    };
    init();
  }, []);

  const handleStart = () => {
    //start recording
    if (mediaRecorder === undefined) return;
    setAudioURL("");
    mediaRecorder.start();
    setStatus(STATUS.RECORDING);
  };

  const handleStop = () => {
    //stop recording
    if (mediaRecorder === undefined) return;
    mediaRecorder.stop();
    //called getAudioURL
    getAudioURL(mediaRecorder, setAudioURL);
    setStatus(STATUS.IDLE);
  };

  return (
    <div className="recorder_container">
      {status === STATUS.IDLE ? (
        <button
          data-testid="record"
          className="btn btn-record"
          onClick={handleStart}
        >
          Record
        </button>
      ) : (
        <button
          data-testid="stop"
          className="btn btn-stop"
          onClick={handleStop}
        >
          Stop
        </button>
      )}
      {audioURL && <audio controls src={audioURL}></audio>}
      {status === STATUS.RECORDING && <RecordingAnimation />}
    </div>
  );
};
export default VoiceRecorder;
