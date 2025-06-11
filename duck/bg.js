let P_ID = null;

function O_P() {
if (P_ID !== null) {
chrome.windows.get(P_ID, function(W) {
    if (chrome.runtime.lastError || !W) {
    C_P();
    } else {
    chrome.windows.update(P_ID, { focused: true });
    }
});
} else {
C_P();
}
}

function C_P() {
chrome.windows.create({
url: chrome.runtime.getURL("app.html"),
type: "popup",
width: 320,
height: 150
}, function(W) {
P_ID = W.id;
});
}

chrome.action.onClicked.addListener(() => {
O_P();
});
