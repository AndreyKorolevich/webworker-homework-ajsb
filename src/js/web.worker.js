import crypto from 'crypto-js';

const hash = (file) => new Promise((resolve, reject) => {
  if (file.data === undefined) {
    const error = new Error('There`s no choose file');
    reject(error);
  } else {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file.data);
    reader.onload = () => {
      const wordArray = crypto.lib.WordArray.create(reader.result);
      let hashValue;
      switch (file.selectValue) {
        case 'MD5':
          hashValue = crypto.MD5(wordArray).toString(crypto.enc.Hex);
          break;
        case 'SHA1':
          hashValue = crypto.SHA1(wordArray).toString(crypto.enc.Hex);
          break;
        case 'SHA256':
          hashValue = crypto.SHA256(wordArray).toString(crypto.enc.Hex);
          break;
        case 'SHA512':
          hashValue = crypto.SHA512(wordArray).toString(crypto.enc.Hex);
          break;
        default:
          hashValue = crypto.SHA512(wordArray).toString(crypto.enc.Hex);
      }
      resolve(hashValue);
    };
  }
});

self.addEventListener('message', async (event) => {
  const result = await hash(event.data);
  self.postMessage(result);
});
