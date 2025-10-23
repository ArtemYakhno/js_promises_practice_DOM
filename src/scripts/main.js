'use strict';

let rightClicked = false;
let leftClicked = false;

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      rightClicked = true;
      resolve();
    },
    { once: true },
  );

  setTimeout(() =>  reject(new Error()), 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener(
    'contextmenu',
    () => {
      rightClicked = true;
      resolve();
    },
    { once: true },
  );

  document.addEventListener(
    'click',
    () => {
      leftClicked = true;
      resolve();
    },
    { once: true },
  );
});

const promise3 = new Promise((resolve, reject) => {
  promise1
    .then(() => promise2)
    .then(() => {
      if (rightClicked && leftClicked) {
        resolve();
      }
    });
});

promise1
  .then(() => createMessage('First promise was resolved'))
  .catch(() => createMessage('First promise was rejected', true));

promise2.then(() => createMessage('Second promise was resolved'));

promise3.then(() => createMessage('Third promise was resolved'));

function createMessage(message, error = false) {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div data-qa="notification" class=${error ? 'error' : 'success'}>${message}</div>`,
  );
}
