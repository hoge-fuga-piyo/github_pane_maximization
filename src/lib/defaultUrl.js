const defaultUrl = {
  isDefaultUrl : (url) => {
    if (url.indexOf('https://github.com/') || url.indexOf('https://gist.github.com/')) {
      return true;
    }

    return false;
  }
};