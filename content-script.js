const button_html =
  '<button type="button" id="download" style="font-size: 1.2em; width: 100%; height: 2em">Download</button>';

let player = document.querySelector("div.jp-type-single");
let download_button =
  document.querySelector("button#download") || html_to_element(button_html);

player.insertAdjacentElement("afterend", download_button);

download_button.addEventListener("click", () => {
  let script_tag = Array.from(document.getElementsByTagName("script")).find(
    (script) => script.src == ""
  );
  let script_text = script_tag.textContent;
  let url_expression = /https:\/\/media\.soundgasm\.net\/sounds\/.+\.m4a/;

  let result = url_expression.exec(script_text);
  let url = result ? result[0] : "";

  if (!url) {
    console.warn("No url found");
    return;
  }

  browser.runtime.sendMessage({ url }).catch(console.error);
});

function html_to_element(html) {
  let template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstChild;
}
