chrome.storage.local.get({ domains: [] }, storage => {
    let domains = storage.domains;

    (function main() {
        document.getElementById("add-domain-form").addEventListener("submit", onFormSubmit);
        renderDomainList();
    })();

    function renderDomainList() {
        document.getElementById("domain-list").innerHTML = domains.map(domain => `
            <li>
                <span>${domain}</span>
                <a href="#" class="remove-link">🗙</a>
            </li>
        `).join("");
    }

    // TODO: Sanitise input.
    function onFormSubmit() {
        const domainToAdd = document.getElementById("domain-to-add-field").value;
        if (!domainToAdd) return;
        domains.push(domainToAdd);
        chrome.storage.local.set({ domains });
        renderDomainList();
    }
});
