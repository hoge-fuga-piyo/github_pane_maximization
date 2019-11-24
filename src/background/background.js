function isTargetUrl(url) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(null, (items) => {
      const allKeys = Object.keys(items);
      for(let key of allKeys) {
        if (key === 'isMaximization') {
          continue;
        }

        if (url.indexOf(key) > -1) {
          console.log('isTarget');
          resolve(true);
        }
      }

      console.log('isNotTarget');
      resolve(false);
    });
  });
}

// SPAサイトでURLの変更を検知
function updatedDetect() {
  chrome.tabs.onUpdated.addListener(function(tabId, info, tab){
    isTargetUrl(tab.url).then((isTarget) => {
      //if (info.status === 'complete' && tab.url.indexOf("https://github.com/") > -1) {
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
    isTargetUrl(tab.url).then((isTarget) => {
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