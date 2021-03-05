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



  // Burger


  $('.header__burger').click(function (event) {
    $('.header__burger, .header__menu').toggleClass('active');
    $('body').toggleClass('lock');
  });



  // Popup Close


  $('.popup__close').click(function () {
    $('.popup, .popup1, .popup2, .popup3').fadeOut(300);
  });



  // Phone Mask


  $("#phone").mask("+7 (999) 999-99-99");



  // Counter


  var limit = 1000,
    chars,
    output = $('.counter span').text(limit);
  $('textarea').keyup(function () {
    chars = $(this).val().length;
    if (chars >= limit) {
      output.css('color', '#BF3330').text(limit - chars);
    } else {
      output.css('color', '#445f44').text(limit - chars);
    }
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
        $('.popup3').fadeIn(300);
        formPreview.innerHTML = "";
        form.reset();
        form.classList.remove("_sending");
      } else {
        $('.popup2').fadeIn(300);
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

      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (
        input.getAttribute("type") === "checkbox" &&
        input.checked === false
      ) {
        formAddError(input);
        error++;
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
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
  const popup = document.getElementById('popup');

  formImage.addEventListener('change', () => {
    uploadFile(formImage.files[0]);
  });

  function uploadFile(file) {
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      $('.popup1').fadeIn(300);
      formImage.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      $('.popup').fadeIn(300);
      formImage.value = '';
      return;
    }



    // File Preview


    var reader = new FileReader();
    reader.onload = function (e) {
      formPreview.innerHTML = `<img src="${e.target.result}">`;
    };

    reader.onerror = function (e) {
      $('.popup2').fadeIn(300);
    };

    reader.readAsDataURL(file);
  }



  // Name Validation


  document.querySelector('#name').addEventListener('keyup', function () {
    this.value = this.value.replace(/[^\А-ЯЁа-яё]/g, '');
  });



  // Surname Validation


  document.querySelector('#surname').addEventListener('keyup', function () {
    this.value = this.value.replace(/[^\А-ЯЁа-яё]/g, '');
  });


});



