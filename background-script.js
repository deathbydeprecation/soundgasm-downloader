browser.runtime.onMessage.addListener((request) => {
  let filename = `${request.title} - u/${request.author}.m4a`;

  browser.downloads
    .download({
      saveAs: true,
      url: request.url,
      filename,
    })
    .catch(console.error);
});
