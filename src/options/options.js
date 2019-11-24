function showTargetUrls() {
  chrome.storage.local.get(null, (items) => {
    let allKeys = Object.keys(items);

    for(let key of allKeys) {
      if (key === 'isMaximization') {
        continue;
      }

      appendUrlToLast(key);
    }
  });
}

function createUrlStyle(url) {
  return '<tr><td>' + decodeURIComponent(url) + '</td></tr>';
}

function appendUrlToLast(url) {
  let content = createUrlStyle(url);
  $(content).appendTo('#urls');
}

async function addUrl(url) {
  const alreadyHasUrl = await hasUrl(url);
  console.log(alreadyHasUrl);
  if (!alreadyHasUrl ) {
    console.log('does not have url');
    chrome.storage.local.set({[url] : true}, () => {
      appendUrlToLast(url);
    });
  } else {
    console.log('has url');
  }
}

function hasUrl(url) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([url], (value) => {
      const keys = Object.keys(value);
      if (value[keys[0]]) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

$('#addButton').on('click',function(){
  let newUrl = $('#newUrl').val();
  addUrl(newUrl);
});

showTargetUrls();