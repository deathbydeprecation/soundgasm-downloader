browser.runtime.onMessage.addListener(async (request) => {
  if (request.urls) {
    const urls = request.urls;

    for (const url of urls) {
      const tab = await browser.tabs.create({ url });
      await browser.tabs.executeScript(tab.id, {
        file: "/content-scripts/injected-download.js",
      });
      await browser.tabs.remove(tab.id);
    }

    return;
  }

  const url = request.url;
  const title = request.title
    .replace(/[^a-z0-9-.'!]/gi, "_")
    .replace(/_+/g, "_");
  const filename = `${title} - u-${request.author}.m4a`;

  browser.downloads
    .download({
      url,
      filename,
    })
    .catch(console.error);
});
