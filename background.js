chrome.runtime.onInstalled.addListener(() => {
    console.log("Tab Organizer Extension Installed");
    
    // Create an alarm to keep the service worker alive
    chrome.alarms.create("keepAlive", { periodInMinutes: 4.5 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "keepAlive") {
        console.log("Service worker is kept alive");
    }
});

chrome.tabs.onCreated.addListener((tab) => {
    console.log(`New tab opened: ${tab.url}`);
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    console.log(`Tab ${tabId} closed`);
});

chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "local" && changes.savedSession) {
        console.log("Session updated", changes.savedSession.newValue);
    }
});
