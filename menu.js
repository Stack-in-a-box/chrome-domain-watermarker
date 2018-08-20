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

    function onFormSubmit() {
        const inputValue = document.getElementById("domain-to-add-field").value;
        const domainToAdd = sanitiseInput(inputValue);

        if (!domainToAdd) return;
        
        domains.push(domainToAdd);
        chrome.storage.local.set({ domains });

        renderDomainList();
    }

    function sanitiseInput(input) {
        const container = document.createElement("div");
        const textNode = document.createTextNode(input);

        container.appendChild(textNode);

        return container.innerHTML;
    }
});
