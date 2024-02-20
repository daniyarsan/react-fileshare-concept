let rowButtonsArr = document.querySelectorAll(".row-buttons");

for (var i = 0; i < rowButtonsArr.length; i++) {

    rowButtonsArr[i].onclick = function(e) {
        
        highlight(e.target);
    }
}

function highlight(e) {

    for (var i = 0; i < e.parentNode.children.length; i++) {
        e.parentNode.children[i].removeAttribute("active");
    }
    e.setAttribute("active","");
}

