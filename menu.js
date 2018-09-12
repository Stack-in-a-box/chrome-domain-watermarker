chrome.storage.local.get({ domains: defaultDomainList, text: defaultWatermarkText }, storage => {
    let domains = storage.domains;

    (function main() {
        populateFormInputWithCurrentDomain();
        selectAllTextInDomainInput();
        registerFormSubmissionHandler();
        renderWatermarkTextField();
        renderDomainList();
    })();

    function populateFormInputWithCurrentDomain() {
        chrome.tabs.query({ active: true, currentWindow: true }, ([{ url }]) => {
            const anchor = document.createElement("a");
            const input = document.getElementById("domain-to-add-field");

            anchor.href = url;
            input.value = anchor.hostname;
        });
    }

    function selectAllTextInDomainInput() {
        setTimeout(() => {
            document
                .getElementById("domain-to-add-field")
                .select();
        }, 10); // Adding a small delay avoids a race condition on Chrome: https://stackoverflow.com/a/19498477
    }

    function registerFormSubmissionHandler() {
        document
            .getElementById("add-domain-form")
            .addEventListener("submit", onFormSubmit);
    }

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
                <a id="domain-list-item-index-${index}-edit-link" href="#" class="edit-link">✎</a>
                <a id="domain-list-item-index-${index}-remove-link" href="#" class="remove-link">🗙</a>
            </li>
        `;
    }

    function getDomainListHtml() {
        return domains.map(renderDomainListItem).join("") + `
            <li>
                <input type=text placeholder="Domain…" value="www.example.com">
                <input type=text placeholder="Custom watermark text…">
                <button>Save</button>
            </li>
        `;
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
        if (domains.includes(domain)) return;
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
