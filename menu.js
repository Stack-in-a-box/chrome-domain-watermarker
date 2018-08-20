chrome.storage.local.get({ domains: [] }, storage => {
    let domains = storage.domains;

    (function main() {
        document.getElementById("add-domain-form").addEventListener("submit", onFormSubmit);
        renderDomainList();
    })();

    function renderDomainList() {
        document.getElementById("domain-list").innerHTML = domains.map((domain, index) => `
            <li id="domain-list-item-index-${index}">
                <span>${domain}</span>
                <a id="domain-list-item-index-${index}-remove-link" href="#" class="remove-link">🗙</a>
            </li>
        `).join("");

        domains.forEach((_, index) => {
            document.getElementById(`domain-list-item-index-${index}-remove-link`)
                .addEventListener("click", () => {
                    removeElementFromDom(`domain-list-item-index-${index}`);
                    domains.splice(index, 1);
                    chrome.storage.local.set({ domains });
                    renderDomainList();
                });
        });
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

    function removeElementFromDom(id) {
        const element = document.getElementById(id);
        element.parentNode.removeChild(element);
    }
});
