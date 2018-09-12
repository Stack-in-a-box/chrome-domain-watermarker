chrome.storage.local.get({ domains: defaultDomainList, text: defaultWatermarkText }, storage => {
    let domains = storage.domains;

    (function main() {
        document
            .getElementById("add-domain-form")
            .addEventListener("submit", onFormSubmit);

        document
            .getElementById("domain-to-add-field")
            .focus();

        chrome.tabs.query({ active: true, currentWindow: true }, ([{ url }]) => {
            const anchor = document.createElement("a");
            const input = document.getElementById("domain-to-add-field");

            anchor.href = url;
            input.value = anchor.hostname;
        });

        renderWatermarkTextField();
        renderDomainList();
    })();

    function renderWatermarkTextField() {
        const element = document.getElementById("watermark-text-field-input");

        element.value = storage.text;
        element.addEventListener("input", () => saveWatermarkTextToStorage());
    }

    function renderDomainList() {
        document.getElementById("domain-list").innerHTML = getDomainListHtml();
        attachRemoveItemLinkClickListeners();
    }

    function renderDomainListItem(domain, index) {
        return `
            <li id="domain-list-item-index-${index}">
                <span>${domain}</span>
                <a id="domain-list-item-index-${index}-remove-link" href="#" class="remove-link">🗙</a>
            </li>
        `;
    }

    function getDomainListHtml() {
        return domains.map(renderDomainListItem).join("");
    }

    function attachRemoveItemLinkClickListeners() {
        domains.forEach((_, index) => {
            document
                .getElementById(`domain-list-item-index-${index}-remove-link`)
                .addEventListener("click", () => onRemoveItemLinkClick(index));
        });
    }

    function onFormSubmit(event) {
        event.preventDefault();

        const inputValue = document.getElementById("domain-to-add-field").value;
        const domainToAdd = sanitiseInput(inputValue);

        if (!domainToAdd) return;

        addDomainToList(domainToAdd);
        saveDomainListToStorage();
        renderDomainList();
    }

    function onRemoveItemLinkClick(index) {
        removeDomainFromList(index);
        saveDomainListToStorage();
        renderDomainList();
    }

    function sanitiseInput(input) {
        const container = document.createElement("div");
        const textNode = document.createTextNode(input);

        container.appendChild(textNode);

        return container.innerHTML;
    }

    function addDomainToList(domain) {
        domains.push(domain);
    }

    function removeDomainFromList(index) {
        domains.splice(index, 1);
    }

    function saveWatermarkTextToStorage() {
        const input = document.getElementById("watermark-text-field-input");
        chrome.storage.local.set({ text: input.value });
    }

    function saveDomainListToStorage() {
        chrome.storage.local.set({ domains });
    }
});
