# JavaScript Video Loading Events

## Overview

This document provides information about JavaScript events related to video loading.

### 1. `loadedmetadata` Event

- Fires when the metadata of the video (duration, dimensions, text tracks) has been loaded.
- Occurs after the `loadstart` and `durationchange` events.
- Does not mean the entire video is loaded, just its metadata.
- Useful for retrieving video duration or dimensions.

### 2. `loadeddata` Event

- Fires when the data for the current frame (often the first frame) has been loaded.
- Occurs after the `loadedmetadata` event.
- Indicates that enough data is available to start playback.
- Does not mean the entire video is loaded.

### 3. `loadstart` Event

- Fires when the browser starts loading the video.
- It is the first event in the loading sequence.

### 4. `canplay` Event

- Fires when enough data has been loaded for the video to start playing.
- Does not mean that the entire video is loaded.

### 5. `canplaythrough` Event

- Fires when the browser estimates that the entire video can be played without interruptions.
- Does not guarantee that playback will be uninterrupted.

### 6. `progress` Event

- Fires periodically as the browser downloads video data.
- Can be used to track the download progress of the video.

### 7. `onload` Event

- Used for images and not videos.

### 8. `play` Event

- Fires when the video starts playing.

### 9. `ended` Event

- Fires when the video reaches the end of its content.

---

## Important Considerations

- **No "Fully Loaded" Event**: There is no single event that indicates that a video has been completely downloaded. Browsers prioritize playing the video as soon as possible, rather than downloading it fully.
- **Data Saver**: The `loadeddata` event may not fire on mobile devices if data-saver is enabled.
- **Buffering**: Even after the `canplaythrough` event, buffering may still occur during playback. [Source](https://stackoverflow.com/questions/32184043/fire-event-when-video-is-fully-loaded)

---

## How to Use These Events

```javascript
const video = document.getElementById("myVideo");

video.addEventListener("loadedmetadata", () => {
  console.log("Metadata loaded");
  console.log("Duration:", video.duration);
});

video.addEventListener("loadeddata", () => {
  console.log("First frame loaded");
});

video.addEventListener("canplay", () => {
  console.log("Can start playing");
});

video.addEventListener("canplaythrough", () => {
  console.log("Can play through");
});
```

These events provide a way to track the loading process of a video and respond to different stages.

---

**Note**: AI-generated responses may include mistakes.
