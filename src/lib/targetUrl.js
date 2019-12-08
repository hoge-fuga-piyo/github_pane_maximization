const targetUrl = {
  isTarget : (url) => {
    const blobPattern = /https:\/\/github.com\/.*\/blob\/.*/;
    const pullPattern = /https:\/\/github.com\/.*\/pull\/.*/;
    const comparePattern = /https:\/\/github.com\/.*\/compare\/.*/;

    if (blobPattern.test(url) || pullPattern.test(url) || comparePattern.test(url)) {
      return true;
    }

    return false;
  }
};