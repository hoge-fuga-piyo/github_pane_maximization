function showTargetUrls() {
  chrome.storage.local.get(null, (items) => {
    let allKeys = Object.keys(items);

    for(let key of allKeys) {
      if (key === 'isMaximization') {
        continue;
      }

      appendUrlToLast(key);
    }
    declareRemoveButton();
  });
}

function createUrlStyle(url) {
  return '<div class="row">' +
            '<div class="col-sm-11">' +
              '<span>' + decodeURIComponent(url) + '</span>' +
            '</div>' +
            '<div class="col-sm-1">' +
              '<button type="button" class="btn btn-primary rounded-circle p-0 removeButton" style="width:2rem;height:2rem;">-</button>' +
            '</div>' +
          '</div>';
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
      declareRemoveButton();
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

function declareRemoveButton() {
  $('.removeButton').on('click', function() {
    console.log($(this).parent().prev().children('span').text());
    
    let url = $(this).parent().prev().children('span').text();
    chrome.storage.local.remove(url, function(){});
    $(this).parent().prev().parent().remove();
  });
}

showTargetUrls();

$('.addButton').on('click', () => {
  let newUrl = $('#newUrl').val();
  addUrl(newUrl);
});