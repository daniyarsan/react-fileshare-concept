let carts = document.querySelectorAll(".square");
let cartWidth = carts[0].offsetWidth;

for (let i = 0; i < carts.length; i++) {
    carts[i].style.height = cartWidth + "px";;
}