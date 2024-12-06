chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ blockedSites: [] });
});

// Listening to update blocked sites
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes.blockedSites) {
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: Array.from(Array(100).keys()),
            addRules: changes.blockedSites.newValue.map((site, index) => ({
                id: index + 1,
                action: { type: "block" },
                condition: { urlFilter: site }
            }))
        });
    }
});
