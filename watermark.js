const overlay = document.createElement("div");

overlay.setAttribute("style", `
    z-index: 999999; /* This should be sufficiently high-enough to ensure it renders on-top of any properly-implemented website. */
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: red;
    opacity: 0.25;
`);

document.body.appendChild(overlay);
