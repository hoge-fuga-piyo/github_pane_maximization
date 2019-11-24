// SPAサイトでURLの変更を検知
chrome.tabs.onUpdated.addListener(function(tabId, info, tab){
  if(info.status === 'complete' && tab.url.indexOf("https://github.com/") > -1) {
    chrome.tabs.executeScript(
      tabId,
      {
        file: "src/content/content.js",
      },
    );
  }
})

// アイコンクリック時の動作
chrome.browserAction.onClicked.addListener(function (tab) {
  const key = "isMaximization";
  chrome.storage.local.get([key], (value) => {
    let isMaximization = typeof value[key] === 'undefined' ? true : value[key];
    chrome.storage.local.set({[key] : !isMaximization}, function(){
      if (tab.url.indexOf("https://github.com/") > -1) {
        chrome.tabs.sendMessage(tab.id, 'runScript');
      }
    });
  });
});