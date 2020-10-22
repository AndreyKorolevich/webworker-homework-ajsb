import Worker from './web.worker';

const dropEl = document.querySelector('[data-id=drop-area]');
const hashValue = document.querySelector('.value-hash');
const fileEl = document.querySelector('.overlapped');
const select = document.getElementById('algorithm');
let file;

dropEl.addEventListener('dragover', (evt) => {
  evt.preventDefault();
});

const calculateHash = async (data, algorithm) => {
  const selectValue = algorithm.options[select.selectedIndex].value;
  const worker = new Worker();
  worker.addEventListener('message', ({ data: result }) => {
    hashValue.textContent = result;
    worker.terminate();
  });
  worker.postMessage({ selectValue, data });
};

select.addEventListener('change', (event) => {
  calculateHash(file, event.target);
});
/* eslint-disable */
dropEl.addEventListener('drop', (evt) => {
  evt.preventDefault();
  file = Array.from(evt.currentTarget.files)[0];
  calculateHash(file, select);
});

dropEl.addEventListener('click', () => {
  fileEl.dispatchEvent(new MouseEvent('click'));
});

fileEl.addEventListener('change', (evt) => {
  file = Array.from(evt.currentTarget.files)[0];
  calculateHash(file, select);
});
