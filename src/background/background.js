// SPAサイトでURLの変更を検知
function updatedDetect() {
  chrome.tabs.onUpdated.addListener(function(tabId, info, tab){
    localStorage.isForwardMatch(tab.url).then((isTarget) => {
      console.log(isTarget);
      if (info.status === 'complete' && isTarget) {
        chrome.tabs.executeScript(
          tabId,
          {
            file: "src/content/content.js",
          },
        );
      }
    });
  });
}

// アイコンクリック時の動作
function monitorIconClick() {
  chrome.browserAction.onClicked.addListener(function (tab) {
    localStorage.isForwardMatch(tab.url).then((isTarget) => {
      if (isTarget) {
        const key = "isMaximization";
        chrome.storage.local.get([key], (value) => {
          let isMaximization = typeof value[key] === 'undefined' ? true : value[key];
          chrome.storage.local.set({[key] : !isMaximization}, function() {
            chrome.tabs.sendMessage(tab.id, 'runScript');
          });
        });
      }
    });
  });
}

updatedDetect();
monitorIconClick();