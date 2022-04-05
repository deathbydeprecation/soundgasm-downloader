const button_html =
  '<button type="button" id="download" style="font-size: 1.2em; width: 100%; height: 2em">Download</button>';

let player = document.querySelector("div.jp-type-single");
let download_button =
  document.querySelector("button#download") || html_to_element(button_html);

player.insertAdjacentElement("afterend", download_button);

download_button.addEventListener("click", () => {
  let url = get_audio_url();
  let title = get_audio_title();
  let author = get_audio_author();

  console.log("URL:", url);
  console.log("Title:", title);
  console.log("Author:", author);

  if (!url || !title || !author) {
    console.warn("No url, title or author found");
    return;
  }

  browser.runtime.sendMessage({ url, title, author }).catch(console.error);
});

function get_audio_url() {
  let script_tag = Array.from(document.getElementsByTagName("script")).find(
    (script) => script.src == ""
  );
  let script_text = script_tag.textContent;
  let url_expression = /https:\/\/media\.soundgasm\.net\/sounds\/.+\.m4a/;

  let result = url_expression.exec(script_text);
  return result ? result[0] : null;
}

function get_audio_title() {
  return document.querySelector("div.jp-details div.jp-title").textContent;
}

function get_audio_author() {
  return document.querySelector("body div a[href^='https://soundgasm.net/u/']")
    .textContent;
}

function html_to_element(html) {
  let template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstChild;
}
