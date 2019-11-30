const stringUtil = {
  isUrl : (url) => {
    const urlPattern = /^(http|https):\/\/([a-z]|[A-Z]|[0-9])+\.([a-z]|[A-Z]|[0-9])/;
    if(url.match(urlPattern)) {
      return true;
    }
    return false;
  }
};