browser.runtime.onMessage.addListener((request) => {
  let title = request.title.replace(/[^a-z0-9-.'!]/gi, "_").replace(/_+/g, "_");

  browser.downloads
    .download({
      saveAs: true,
      url: request.url,
      filename: `${title} - u-${request.author}.m4a`,
    })
    .catch(console.error);
});
