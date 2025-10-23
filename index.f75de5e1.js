"use strict";
const promise1 = new Promise((resolve, reject)=>{
    document.addEventListener("click", (e)=>{
        e.preventDefault();
        resolve("First promise was resolved");
    }, {
        once: true
    });
    setTimeout(()=>{
        reject(new Error("First promise was rejected"));
    }, 3000);
});
const promise2 = new Promise((resolve, reject)=>{
    document.addEventListener("contextmenu", (e)=>{
        e.preventDefault();
        resolve("Second promise was resolved");
    }, {
        once: true
    });
    document.addEventListener("click", ()=>{
        resolve("Second promise was resolved");
    }, {
        once: true
    });
});
const promise3 = new Promise((resolve)=>{
    let rightClicked = false;
    let leftClicked = false;
    const tryResolve = ()=>{
        if (rightClicked && leftClicked) resolve("Third promise was resolved");
    };
    document.addEventListener("contextmenu", (e)=>{
        e.preventDefault();
        rightClicked = true;
        tryResolve();
    }, {
        once: true
    });
    document.addEventListener("click", ()=>{
        leftClicked = true;
        tryResolve();
    }, {
        once: true
    });
});
promise1.then((message)=>createMessage(message)).catch((message)=>createMessage(message, true));
promise2.then((message)=>createMessage(message));
promise3.then((message)=>createMessage(message));
function createMessage(message, error = false) {
    document.body.insertAdjacentHTML("beforeend", `<div data-qa="notification" class=${error ? "error" : "success"}>${message}</div>`);
}

//# sourceMappingURL=index.f75de5e1.js.map
