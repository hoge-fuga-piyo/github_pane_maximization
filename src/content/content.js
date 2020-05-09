function isMaximization() {
  const key = "isMaximization";
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], (value) => {
      resolve(value[key]);
    });
  })
}

function isSplitMode() {
  // compare以外用の判定処理
  const metaInfo = document.querySelector("meta[name='diff-view']");
  if (metaInfo !== null) {
    const viewMode = metaInfo.getAttribute('content');
    if (viewMode === 'split') {
      return true;
    }
  }

  // comapre用の判定処理
  if (location.search.indexOf('diff=split') !== -1) {
    return true;
  }

  return false;
}

function paneMaximizationMode() {
  const repositoryContent = document.querySelectorAll('div.repository-content');
  if (repositoryContent.length > 0) {
    if (isSplitMode()) {
      return;
    }

    repositoryContent.forEach((element) => {
      const parent = element.parentNode;
      parent.style.marginLeft = '2%';
      parent.style.marginRight = '2%';
      parent.style.maxWidth = '100%';
      parent.style.width = 'auto';
      element.style.width = 'auto';
    });
  }
}

function paneNormalMode() {
  const repositoryContent = document.querySelectorAll('div.repository-content');
  if (repositoryContent.length > 0) {
    if (isSplitMode()) {
      return;
    }

    repositoryContent.forEach((element) => {
      const parent = element.parentNode;
      parent.style.marginLeft = 'auto';
      parent.style.marginRight = 'auto';
      parent.style.maxWidth = '1012px';
    });
  }
}

function paneCompareMaximizationMode() {
  if (isSplitMode()) {
    return;
  }

  const fileBucket = document.querySelectorAll('div#files_bucket');
  if (fileBucket.length > 0) {
    fileBucket.forEach((element) => {
      const parent = element.parentNode;
      parent.style.marginLeft = '2%';
      parent.style.marginRight = '2%';
      parent.style.maxWidth = '100%';
      parent.width = 'auto';
      element.width = 'auto';
    });
  }
}

function paneCompareNormalMode() {
  if (isSplitMode()) {
    return;
  }

  const fileBucket = document.querySelectorAll('div#files_bucket');
  if (fileBucket.length > 0) {
    fileBucket.forEach((element) => {
      const parent = element.parentNode;
      parent.style.marginLeft = 'auto';
      parent.style.marginRight = 'auto';
      parent.style.maxWidth = '1012px';
    });
  }
}

function runScript(type) {
  isMaximization().then(isMaximization => {
    if (isMaximization === false) {
      if (type === 'default') {
        paneNormalMode();
      } else {
        paneCompareNormalMode();
      }
    } else {
      if (type === 'default') {
        paneMaximizationMode();
      } else {
        paneCompareMaximizationMode();
      }
    }
  })
}

chrome.runtime.sendMessage({type: 'pageType'}, (response) => {
  // アイコンクリック時の挙動
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request == "runScript") {
        runScript(response);
    }
  }); 

  // Paneの最大化/デフォルト切り替え
  runScript(response);
 
});