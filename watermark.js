attachStylesToDom();

const overlay = document.createElement("div");
const text = document.createElement("p");

const textToRepeat = "WARNING: Live system!!"
const spacingCharacters = " _____ ";
const timesToRepeatText = 100;
const repeatedText = (textToRepeat + spacingCharacters).repeat(timesToRepeatText);

text.innerHTML = repeatedText; // TODO: Make sure "textToRepeat" gets sanitised, to prevent potential script injection attacks, once it's possible for users to specify their own watermark text.

overlay.setAttribute("id", "overlay"); // TODO: Change this to something more-specific, so it's less likely to class with an app also using this ID for another purpose.
overlay.appendChild(text);

document.body.appendChild(overlay);

function attachStylesToDom() {
    const head = document.getElementsByTagName("head")[0];
    const link = document.createElement("link");
    const url = chrome.runtime.getURL("watermark.css");

    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", url);

    head.appendChild(link);
}
