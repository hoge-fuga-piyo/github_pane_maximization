function isMaximization() {
  const key = "isMaximization";
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], (value) => {
      resolve(value[key]);
    });
  })
}

function paneMaximization() {
  if ($('div').hasClass('repository-content')) {
    let viewMode = $("meta[name='diff-view']").attr('content');
    if (viewMode === 'split') {
      return;
    }

    $('div.repository-content').parent().css('margin-left', '2%');
    $('div.repository-content').parent().css('margin-right', '2%');
    $('div.repository-content').parent().css('max-width', '100%');
    $('div.repository-content').parent().css('width', 'auto');
    $('div.repository-content').width('auto');
  }
}

function paneDefault() {
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

function runScript() {
  isMaximization().then(isMaximization => {
    if (isMaximization === false) {
      paneDefault();
    } else {
      paneMaximization();
    }
  })
}

// アイコンクリック時の挙動
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request == "runScript") {
        runScript();
    }
}); 

// Paneの最大化/デフォルト切り替え
runScript();
 