// Task Management
document.getElementById("add-task").onclick = function() {
    const taskInput = document.getElementById("task-input").value;
    if (taskInput) {
        const listItem = document.createElement("li");
        listItem.textContent = taskInput;
        document.getElementById("task-list").appendChild(listItem);
        document.getElementById("task-input").value = "";
    }
};

// Focus Timer
let timer;
document.getElementById("start-timer").onclick = function() {
    clearTimeout(timer); // Clear previous timer
    let timeLeft = 25 * 60; // 25 minutes in seconds
    const countdownElement = document.getElementById("timer-countdown");
    timer = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timer);
            countdownElement.textContent = "Time's up! Take a break.";
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            countdownElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        }
    }, 1000);
};

// Site Blocker
let blockedSites = [];
document.getElementById("block-site").onclick = function() {
    const url = document.getElementById("block-input").value;
    if (url && !blockedSites.includes(url)) {
        blockedSites.push(url);
        updateBlockedSites();
        chrome.declarativeNetRequest.updateDynamicRules({
            addRules: [{
                id: blockedSites.length,
                action: { type: "block" },
                condition: { urlFilter: url }
            }]
        });
        document.getElementById("block-input").value = "";
    }
};

function updateBlockedSites() {
    const blockedList = document.getElementById("blocked-list");
    blockedList.innerHTML = "";
    blockedSites.forEach(site => {
        const listItem = document.createElement("li");
        listItem.textContent = site;
        blockedList.appendChild(listItem);
    });
}
