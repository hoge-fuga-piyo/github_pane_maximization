// SPAサイトでURLの変更を検知
function updatedDetect() {
  chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    const isTargetUrl = targetUrl.isTarget(tab.url);
    if (info.status === 'complete' && isTargetUrl) {
      chrome.tabs.executeScript(null, { file: "src/3rdparty/jquery-3.4.1.min.js" }, () => {
        chrome.tabs.executeScript(null, { file: "src/lib/targetUrl.js" } , () => {
          chrome.tabs.executeScript(
            tabId,
            {
              file: "src/content/content.js",
            },
            () => { 
              chrome.runtime.lastError;
            }
          );
        });
      });
    }
  });
}

// アイコンクリック時の動作
function monitorIconClick() {
  chrome.browserAction.onClicked.addListener(function (tab) {
    const isTargetUrl = targetUrl.isTarget(tab.url);
    if (isTargetUrl) {
      const key = "isMaximization";
      chrome.storage.local.get([key], (value) => {
        let isMaximization = typeof value[key] === 'undefined' ? true : value[key];
        chrome.storage.local.set({[key] : !isMaximization}, function() {
          chrome.tabs.sendMessage(tab.id, 'runScript');
        });
      });
    }
  });
}

// content scriptにURLを返す用
chrome.runtime.onMessage.addListener(
  (message, sender, callback) => {
  if (message.type === 'currentPageUrl') {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs => {
      const url = tabs[0].url;
      callback(url);
    });

    return true;
  }
  return true;
});


updatedDetect();
monitorIconClick();