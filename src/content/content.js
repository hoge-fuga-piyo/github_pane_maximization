function isMaximization() {
  const key = "isMaximization";
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], (value) => {
      resolve(value[key]);
    });
  })
}

function paneMaximizationMode() {
  const repositoryContent = document.querySelectorAll('div.repository-content');
  if (repositoryContent.length > 0) {
    const metaInfo = document.querySelector("meta[name='diff-view']");
    if (metaInfo !== null) {
      const viewMode = metaInfo.getAttribute('content');
      if (viewMode === 'split') {
        return;
      }
    }

    repositoryContent.forEach((element) => {
      element.style.width = 'auto';
      const parent = element.parentNode;
      parent.style.marginLeft = '2%';
      parent.style.marginRight = '2%';
      parent.style.maxWidth = '100%';
      parent.style.width = 'auto';
    });
  }
}

function paneNormalMode() {
  if ($('div').hasClass('repository-content')) {
    let viewMode = $("meta[name='diff-view']").attr('content');
    if (viewMode === 'split') {
      return;
    }

    $('div.repository-content').parent().css('margin-left', 'auto');
    $('div.repository-content').parent().css('margin-right', 'auto');
    $('div.repository-content').parent().css('max-width', '1012px');
  }
}

function paneCompareMaximizationMode() {
  if ($(location).attr('search').indexOf('diff=split') !== -1) {
    return;
  }

  if ($('div').has('#files_bucket')) {
    $('div#files_bucket').parent().css('margin-left', '2%');
    $('div#files_bucket').parent().css('margin-right', '2%');
    $('div#files_bucket').parent().css('max-width', '100%');
    $('div#files_bucket').parent().css('width', 'auto');
    $('div#files_bucket').width('auto');
  }
}

function paneCompareNormalMode() {
  if ($(location).attr('search').indexOf('diff=split') !== -1) {
    return;
  }

  if ($('div').has('#files_bucket')) {
    $('div#files_bucket').parent().css('margin-left', 'auto');
    $('div#files_bucket').parent().css('margin-right', 'auto');
    $('div#files_bucket').parent().css('max-width', '1012px');
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