const overlay = document.createElement("div");
const text = document.createElement("p");

const textToRepeat = "WARNING: Live system!!"
const spacingCharacters = " _____ ";
const timesToRepeatText = 100;
const repeatedText = (textToRepeat + spacingCharacters).repeat(timesToRepeatText);

text.innerHTML = repeatedText; // TODO: Make sure "textToRepeat" gets sanitised, to prevent potential script injection attacks, once it's possible for users to specify their own watermark text.

overlay.setAttribute("style", `
    z-index: 999999; /* This should be sufficiently high-enough to ensure it renders on-top of any properly-implemented website. */
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: pink;
    opacity: 0.25;
`);

text.setAttribute("style", `
    position: absolute;
    top: -75%;
    left: -75%;
    width: 150%;
    height: 150%;
    transform: rotate(-45deg);
    color: red;
    font-weight: 900;
    font-size: 50pt;
    line-height: 150px;
`);

overlay.appendChild(text);
document.body.appendChild(overlay);
