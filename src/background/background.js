chrome.tabs.onUpdated.addListener(function(tabId, info, tab){
  if(info.status === 'complete' && tab.url.indexOf("https://github.com/") > -1) {
    console.log('completed');
    console.log(tab.url);
    chrome.tabs.executeScript(
      tabId,
      {
        file: "src/content/content.js",
      },
    );
  }
})