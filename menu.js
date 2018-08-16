document.getElementById("domain-list").innerHTML = domainsToWatermark.map(domain => `
    <li>
        <span>${domain}</span>
        <a href="#" class="remove-link">🗙</a>
    </li>
`).join("");
