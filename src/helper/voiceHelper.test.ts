import { getAudioURL, getMediaRecorder } from "./voiceHelper";

const mockGetUserMedia = jest.fn(() => {
  return new Promise<void>((resolve) => {
    resolve();
  });
});

Object.defineProperty(global.navigator, "mediaDevices", {
  value: {
    getUserMedia: mockGetUserMedia,
  },
});

Object.defineProperty(window, "MediaRecorder", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    start: jest.fn(),
    ondataavailable: jest.fn(),
    onerror: jest.fn(),
    state: "",
    stop: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    addEventListener:jest.fn((e,callback)=>callback("abc"))
  })),
});

Object.defineProperty(MediaRecorder, "isTypeSupported", {
  writable: true,
  value: () => true,
});
describe("Get audio URL", () => {
  it("should callback with audio url", async () => {
    const mediaRecorder = await getMediaRecorder();
    const myCallback = jest.fn((url: string) => {});
    mediaRecorder.addEventListener =myCallback
    jest
      .spyOn(mediaRecorder, "addEventListener")
      .mockImplementationOnce((event, handler, options) => {
        myCallback("abc");
      });
    getAudioURL(mediaRecorder, myCallback);
    expect(myCallback).toBeCalledWith(expect.any(String));
  });
  it("should return media recorder", async () => {
    const mediaRecorder = await getMediaRecorder();
    expect(mediaRecorder).toBeTruthy();
  });
});
