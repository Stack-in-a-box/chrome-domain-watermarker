chrome.storage.local.get({ domains: defaultDomainList, text: defaultWatermarkText }, storage => {
    let domains = storage.domains;

    (function main() {
        document
            .getElementById("add-domain-form")
            .addEventListener("submit", onFormSubmit);

        renderWatermarkTextField();
        renderDomainList();
    })();

    function renderWatermarkTextField() {
        document.getElementById("watermark-text-field-input").value = storage.text;
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

    function onFormSubmit() {
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

    function saveDomainListToStorage() {
        chrome.storage.local.set({ domains });
    }
});
