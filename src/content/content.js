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
    // ソースコード表示
    codePaneMaximization();

    // PRのdiff表示
    prDiffPaneMaximization();
  }
}

function paneDefault() {
  if ($('div').hasClass('repository-content')) {
    codePaneDefault();
    prDiffPaneDefault();
  }
}

function codePaneMaximization() {
  $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.p-responsive').css('margin-left', '2%');
  $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.p-responsive').css('margin-right', '2%');
  $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.p-responsive').css('max-width', '100%');
  $('div.repository-content').width('auto');
}

function codePaneDefault() {
  $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.p-responsive').css('margin-left', 'auto');
  $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.p-responsive').css('margin-right', 'auto');
  $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.p-responsive').css('max-width', '1012px');
}

function prDiffPaneMaximization() {
  let viewMode = $("meta[name='diff-view']").attr('content');
  if (viewMode !== 'split') {
    $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.px-3').css('margin-left', '2%');
    $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.px-3').css('margin-right', '2%');
    $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.px-3').css('max-width', '100%');
  }
}

function prDiffPaneDefault() {
  let viewMode = $("meta[name='diff-view']").attr('content');
  if (viewMode !== 'split') {
    $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.px-3').css('margin-left', 'auto');
    $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.px-3').css('margin-right', 'auto');
    $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.px-3').css('max-width', '1012px');
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

chrome.runtime.sendMessage({type: 'currentPageUrl'}, (response) => {
  const url = response; // 現在のタブのURLを取得

  localStorage.isForwardMatch(url).then((isTarget) => {
    if (isTarget) {

      // アイコンクリック時の挙動
      chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
          if (request == "runScript") {
              runScript();
          }
      }); 

      // Paneの最大化/デフォルト切り替え
      runScript();
    }
  });
});
