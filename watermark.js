(() => {
    const domainsToWatermark = [
        "www.google.com",
        "www.google.co.uk"
    ];

    const textToRepeat = "WARNING: Live system!"
    const spacingCharacters = "       ";
    const timesToRepeatText = 100;

    (function main() {
        if (!domainsToWatermark.includes(window.location.hostname)) return;

        attachStylesToDom();

        const overlay = document.createElement("div");

        overlay.setAttribute("id", "domain-watermarker-overlay");
        overlay.dataset.text = (textToRepeat + spacingCharacters).repeat(timesToRepeatText);

        document.body.appendChild(overlay);
    })();

    function attachStylesToDom() {
        const head = document.getElementsByTagName("head")[0];
        const link = document.createElement("link");
        const url = chrome.runtime.getURL("watermark.css");

        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", url);

        head.appendChild(link);
    }
})();
