chrome.storage.local.get({ domains: [] }, ({ domains }) => {
    document.getElementById("domain-list").innerHTML = domains.map(domain => `
        <li>
            <span>${domain}</span>
            <a href="#" class="remove-link">🗙</a>
        </li>
    `).join("");
});
