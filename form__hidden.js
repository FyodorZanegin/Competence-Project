document.addEventListener("DOMContentLoaded", function () {

    let form__hidden = document.querySelector('.form__hidden');
    let form__close = document.querySelector('.form__close');

    services__button.onclick = function () {
        form__hidden.style.display = 'block';
        document.body.classList.add('lock');
    }

    form__close.onclick = function () {
        form__hidden.style.display = 'none';
        document.body.classList.remove('lock');
    }

});