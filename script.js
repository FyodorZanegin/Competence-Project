document.addEventListener("DOMContentLoaded", function () {





  // Scroll To Title

  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
      e.preventDefault();
      const id = smoothLink.getAttribute('href');

      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  };



  // Burger


  header__burger.onclick = function () {

    this.classList.toggle("active");

    header__menu.classList.toggle("active");

    document.body.classList.toggle("lock");

  };



  // Submneu


  header__link.onselectstart = function () {
    return false;
  }

  document.addEventListener('click', function (e) {

    if (header__link === e.target) {
      header__link.classList.toggle('active');
      header__submenu.classList.toggle('active');
      header__arrow.classList.toggle('active');
      submenu__desktop.classList.toggle('active');

    } else if (header__submenu.classList.contains('active')) {
      header__submenu.classList.remove('active');
      header__link.classList.remove('active');
      header__arrow.classList.remove('active');
      submenu__desktop.classList.remove('active');
    }

  });



  // Popup Close


  let popup__close = document.querySelectorAll(".popup__close");
  for (let i = 0; i < popup__close.length; i++) {
    popup__close[i].onclick = function () {
      for (let i = 1; i <= 4; i++) {
        document.getElementById('popup' + i).style.display = "none";
        document.body.classList.remove("lock");
      }
    }
  }







  // Form


  const form = document.getElementById("form");

  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    formData.append('image', formImage.files[0]);

    if (error === 0) {
      form.classList.add("_sending");
      let response = await fetch("sendmail.php", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        popup4.style.display = 'block';
        document.body.classList.add("lock");
        formPreview.innerHTML = "";
        form.reset();
        form.classList.remove("_sending");
        localStorage.clear();
      } else {
        popup3.style.display = 'block';
        document.body.classList.add("lock");
        form.classList.remove("_sending");
      }
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._req");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.value === "") {
        formAddError(input);
        error++;
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }



  // File Validation


  const formImage = document.getElementById('file');
  const formPreview = document.getElementById('formPreview');

  formImage.addEventListener('change', () => {
    uploadFile(formImage.files[0]);
  });

  function uploadFile(file) {
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      popup2.style.display = 'block';
      document.body.classList.add("lock");
      formImage.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      popup1.style.display = 'block';
      document.body.classList.add("lock");
      formImage.value = '';
      return;
    }



    // File Preview


    let formPhoto = new FileReader();

    formPhoto.onload = function (e) {
      formPreview.innerHTML = `<img src="${e.target.result}">`;
    };

    formPhoto.onerror = function (e) {
      popup3.style.display = 'block';
      document.body.classList.add("lock");
    };

    formPhoto.readAsDataURL(file);
  }



  // Name Validation


  formName.addEventListener('keyup', function () {
    this.value = this.value.replace(/[^А-ЯЁа-яё]/g, '');

    if (this.value.length > 15) {
      this.value = this.value.slice(0, 15);
    }

  });

  formName.oninput = function () {
    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
  }



  // Surname Validation


  formSurname.addEventListener('keyup', function () {
    this.value = this.value.replace(/[^А-ЯЁа-яё]/g, '');

    if (this.value.length > 15) {
      this.value = this.value.slice(0, 15);
    }

  });

  formSurname.oninput = function () {
    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
  }



  // Phone Validation


  phone.addEventListener('keyup', function () {
    this.value = this.value.replace(/[\D]/g, '');

    if (this.value.length > 11) {
      this.value = this.value.slice(0, 11);
    }

  });



  // Counter


  countdownTextarea.addEventListener('keyup', function () {

    let element = document.getElementById('count');

    element.innerHTML = 500 - this.value.length;

    if (500 - this.value.length <= 99) {
      element.style.color = '#BF3330';

    } else {
      element.style.color = '#445f44';
    }

  });



  // Local Storage


  let inputs = ["countdownTextarea", "formName", "formSurname", "work", "phone", "file"];
  for (let formInputs of inputs) {
    let input = document.getElementById(formInputs);
    input.value = localStorage.getItem(formInputs);
    (function (formInputs, input) {
      input.addEventListener("change", function () {
        localStorage.setItem(formInputs, input.value);
      });
    })(formInputs, input);
  }






});









