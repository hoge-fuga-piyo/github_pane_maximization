const localStorage = {
  isForwardMatch: async (key) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(null, (items) => {
        const allKeys = Object.keys(items);
        for (let oneKey of allKeys) {
          if (key.indexOf(oneKey) === 0) {
            console.log('match forward');
            resolve(true);
          }
        }
        console.log('not match forward');
        resolve(false);
      });
    }); 
  }
};