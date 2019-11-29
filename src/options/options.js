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
  return '<div class="row mt-2">' +
            '<div class="col-11">' +
              '<span class="url">' + decodeURIComponent(url) + '</span>' +
            '</div>' +
            '<div class="col-1">' +
              '<button type="button" class="btn btn-dark rounded-circle p-0 removeButton" style="width:1.8rem;height:1.8rem;">-</button>' +
            '</div>' +
          '</div>';
}

function appendUrlToLast(url) {
  let content = createUrlStyle(url);
  $(content).appendTo('#url-list');
}

async function addUrl(url) {
  if (url === '') {
    return;
  }

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

// ローカルストレージからURL一覧を取得して表示
showTargetUrls();

// "+"ボタンが押されたとき
$('.addButton').on('click', () => {
  let newUrl = $('#newUrl').val();
  addUrl(newUrl);
});

// テキストボックスでエンターが押されたとき
$('#newUrl').keypress(function(e) {
  if (e.which === 13) {
    $('.addButton').click();
    $('#newUrl').val('');
  }
})