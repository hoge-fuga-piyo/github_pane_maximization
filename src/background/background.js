function isBlobUrl(url) {
  const blobPattern = /https:\/\/.*\/.*\/blob\/.*/;
  if (blobPattern.test(url)) {
    return true;
  }

  return false;
}

function isPullUrl(url) {
  const pullPattern = /https:\/\/.*\/.*\/pull\/.*/;
  if (pullPattern.test(url)) {
    return true;
  }

  return false;
}

function isCompareUrl(url) {
  const comparePattern = /https:\/\/.*\/.*\/compare\/.*/;
  if (comparePattern.test(url)) {
    return true;
  }

  return false;
}

function isCommitUrl(url) {
  const commitPattern = /https:\/\/.*\/.*\/commit\/.*/;
  if (commitPattern.test(url)) {
    return true;
  }

  return false;
}

// 対象URLの判定
function isTargetUrl(url) {
  if (isBlobUrl(url) 
    || isPullUrl(url)
    || isCompareUrl(url)
    || isCommitUrl(url)){

    return true;
  }

  return false;
}

// SPAサイトでURLの変更を検知
function updatedDetect() {
  chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    if (info.status === 'complete' && isTargetUrl(tab.url)) {
      chrome.tabs.executeScript(null, { file: "src/3rdparty/jquery-3.4.1.min.js" }, () => {
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
    }
  });
}

// アイコンクリック時の動作
function monitorIconClick() {
  chrome.browserAction.onClicked.addListener(function (tab) {
    if (isTargetUrl(tab.url)) {
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

  if (message.type === 'pageType') {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs => {
      const url = tabs[0].url;
      if (isCompareUrl(url)) {
        callback('campare');
      } else {
        callback('default');
      }
    });

    return true;
  }

  return true;
});


updatedDetect();
monitorIconClick();