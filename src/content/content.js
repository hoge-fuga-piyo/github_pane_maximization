function isMaximization() {
  const key = "isMaximization";
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], (value) => {
      //console.log(value[key]);
      resolve(value[key]);
    });
  })
}

function paneMaximization() {
  if($('div').hasClass('repository-content')) {
    console.log("has repository-content");
    $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.p-responsive').css('margin-left', '2%');
    $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.p-responsive').css('margin-right', '2%');
    $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.p-responsive').css('max-width', '100%');
    $('div.repository-content').width('auto');
  }
}

function paneDefault() {
  if($('div').hasClass('repository-content')) {
    console.log("has repository-content");
    $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.p-responsive').css('margin-left', 'auto');
    $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.p-responsive').css('margin-right', 'auto');
    $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.p-responsive').css('max-width', '1012px');
  }
}

function runScript() {
  isMaximization().then(isMaximization => {
    console.log(isMaximization);
    if (isMaximization === false) {
      console.log('pane default')
      paneDefault();
    } else {
      console.log('pane max')
      paneMaximization();
    }
  })
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request == "runScript") {
        runScript();
    }
}); 

runScript();