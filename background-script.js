browser.runtime.onMessage.addListener((request) => {
  browser.downloads
    .download({
      url: request.url,
      saveAs: true,
      filename: "soundgasm-audio.m4a",
    })
    .catch(console.error);
});
