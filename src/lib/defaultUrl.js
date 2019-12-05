const defaultUrl = {
  isDefaultUrl : (url) => {
    const blobPattern = /https:\/\/github.com\/.*\/blob\/.*/;
    const pullPattern = /https:\/\/github.com\/.*\/pull\/.*/;
    const comparePattern = /https:\/\/github.com\/.*\/compare\/.*/;

    if (blobPattern.test(url) || pullPattern.test(url) || comparePattern.test(url)) {
      console.log('is default target');
      return true;
    }

    console.log('is NOT default target');
    return false;
  }
};