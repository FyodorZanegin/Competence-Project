$(document).ready(function () {



  // Main Slider


  $('.slider').slick({
    arrows: true,
    dots: true,
    SlidesToShow: 1,
    speed: 1500,
    infinite: true,
    easing: 'linear',
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnFocus: false,
    pauseOnHover: true,
    pauseOnDotsHover: false,
    responsive: [
      {
        breakpoint: 376,
        settings: {
          arrows: false
        }
      }]
  });



  // Second Slider


  $('.sliderR').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    initialSlide: 2,
    rows: 1,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
  });


});



// Form


document.addEventListener("DOMContentLoaded", function () {
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
  });



  // Surname Validation


  formSurname.addEventListener('keyup', function () {
    this.value = this.value.replace(/[^А-ЯЁа-яё]/g, '');
  });



  // Counter


  countdownTextarea.addEventListener('keyup', function () {

    var element = document.getElementById('count');

    element.innerHTML = 500 - this.value.length;

    if (500 - this.value.length <= 0) {
      element.style.color = '#BF3330';

    } else {
      element.style.color = '#445f44';
    }

  });



  // Burger


  header__burger.onclick = function (e) {

    this.classList.toggle("active");

    header__menu.classList.toggle("active");

    document.body.classList.toggle("lock");

  };



  // Phone Mask


  phone.onfocus = phone.oninput = function (e) {

    const template = '+7 (___) ___-__-__',
      def = template.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
    let i = 0,

      newValue = template.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });

    i = newValue.indexOf("_");

    if (i !== -1) {
      newValue = newValue.slice(0, i);
    }

    this.value = newValue;

    console.log(newValue);
  }

  phone.onblur = function (e) {
    if (this.value.length < 18) {
      this.value = "";
    }
  }


});



// Popup Close


function popupClose() {

  for (var i = 1; i <= 4; i++) {
    document.getElementById('popup' + i).style.display = "none";
    document.body.classList.remove("lock");
  }
}






