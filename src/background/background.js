// SPA対応
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
  console.log("icon clicked");
  chrome.storage.local.get([key], (value) => {
    console.log(value);
    console.log(value[key]);

    let isMaximization = typeof value[key] === 'undefined' ? true : value[key];
    chrome.storage.local.set({[key] : !isMaximization}, function(){
      if (tab.url.indexOf("https://github.com/") > -1) {
        chrome.tabs.sendMessage(tab.id, 'runScript');
      }
    });
    console.log('set ' + !isMaximization);
  });
});