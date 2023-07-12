let target;
let input;
let eye;

function togglePassword(el, ev) {
    target = ev.target;
    input = el.querySelector('.input-password');
    eye = el.querySelector('.eye');
    console.log(target);

    if (target.classList.contains('fa-eye-slash')) {
        eye.classList.remove('fa-eye-slash');
        eye.classList.add('fa-eye');
        input.type = "text";

    }   
    else {eye.classList.add('fa-eye-slash');
        eye.classList.remove('fa-eye');
        input.type = "password";
    }
}