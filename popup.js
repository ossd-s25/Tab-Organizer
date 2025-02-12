document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("group-tabs").addEventListener("click", async () => {
        let tabs = await chrome.tabs.query({});
        let groups = {};
        
        tabs.forEach(tab => {
            let domain = new URL(tab.url).hostname;
            if (!groups[domain]) {
                groups[domain] = [];
            }
            groups[domain].push(tab.id);
        });
        
        for (const domain in groups) {
            if (groups[domain].length > 1) {
                chrome.tabs.group({ tabIds: groups[domain] });
            }
        }
    });

    document.getElementById("save-session").addEventListener("click", async () => {
        let tabs = await chrome.tabs.query({});
        let session = tabs.map(tab => ({ url: tab.url }));
        chrome.storage.local.set({ savedSession: session });
    });

    document.getElementById("restore-session").addEventListener("click", async () => {
        chrome.storage.local.get("savedSession", (data) => {
            if (data.savedSession) {
                data.savedSession.forEach(tab => {
                    chrome.tabs.create({ url: tab.url });
                });
            }
        });
    });
});
