// Высота экрана под высоту устройства
// function adjustToWindowSize(){
//     let windowHeight = window.innerHeight;
//     let height = document.querySelector(".height-100");
//     height.style.height = windowHeight + 'px';
// }

// adjustToWindowSize();

// window.addEventListener("resize", function(event) {

//     adjustToWindowSize();
// });

let contentHeight = document.body.scrollHeight;

function adjustToWindowSize() {
    let windowHeight = window.innerHeight;

    let elements = document.querySelectorAll(".set-height");
  
    [...elements].forEach(el => {
        el.style.height = `${Math.max(windowHeight, contentHeight)}px`;
    });
  }

  document.addEventListener('readystatechange', event => { 

    if (event.target.readyState === "complete") {
        contentHeight = document.body.scrollHeight;
        adjustToWindowSize();
    }
});

window.addEventListener("resize", function(event) {
  adjustToWindowSize();
});