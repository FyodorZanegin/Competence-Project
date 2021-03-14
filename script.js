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



document.addEventListener("DOMContentLoaded", function () {



  // Burger


  header__burger.onclick = function (e) {

    this.classList.toggle("active");

    header__menu.classList.toggle("active");

    document.body.classList.toggle("lock");

  };



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

    if (500 - this.value.length <= 50) {
      element.style.color = '#BF3330';

    } else {
      element.style.color = '#445f44';
    }

  });



  // Phone Mask


  const mask = "+7 (___) ___-__-__",
    input = document.getElementsByClassName('phone-input');


  for (var i = 0; i < input.length; i++) {

    input[i].addEventListener('focus', function (e) {

      this.autocomplete = "off"

      if (mask.length > this.value.length) {
        for (var i = 0; i < mask.length; i++) {

          if (mask[i] == '_') {
            e.preventDefault()
            i_mask = save_mask = i
            let th = this;
            window.setTimeout(function () {
              th.value = mask
              th.setSelectionRange(i_mask, i_mask);
            }, 1);
            return true
          }

        }
      }
    })


    input[i].addEventListener("blur", function () {
      for (var i = 0; i < mask.length; i++) {
        this.value[i] == '_' ? this.value = '' : false
      }
    });


    input[i].addEventListener('click', function () {
      (this.selectionStart >= save_mask) ? i_mask = this.selectionStart : false
    })


    if (window.screen.width >= 1200) {
      input[i].addEventListener('input', function (e) {
        let th = this
        step(th)
      })
    }

    input[i].addEventListener('keydown', function (e) {
      let th = this,
        mask_number = true,
        arrow = false;

      if (e.keyCode == 37) {
        e.preventDefault()
        if (save_mask < i_mask) i_mask--
        th.setSelectionRange(i_mask, i_mask);
        mask_number = false
        arrow = true
      }
      else if (e.keyCode == 39 && mask.length > i_mask) {
        e.preventDefault()
        arrow = true
        i_mask++
      }
      else if (e.keyCode == 8) {
        e.preventDefault()
        window.setTimeout(function () {
          if (i_mask == save_mask && window.screen.width >= 1200) {
            th.value = mask
          }
          else if (i_mask == save_mask && window.screen.width <= 1200) {
            th.value = ''
            th.blur()
            return false
          }
          else {
            i_mask--
          }
          let mask_number = false
          step_input(mask_number, th, arrow)
          return false
        }, 1);
      }
      else if (window.screen.width <= 1200) {
        window.setTimeout(function () {
          step(th)
        }, 1);
      }

      step_input(mask_number, th, arrow)
    })

    function step(th) {
      if (+th.value[i_mask] && mask.length > i_mask || th.value[i_mask] == '0' && mask.length > i_mask) {
        i_mask++
      }
      let mask_number = true,
        arrow = false
      step_input(mask_number, th, arrow)
    }


    function step_input(mask_number, th, arrow) {
      if (arrow == false) th.value = th.value.substr(0, i_mask) + mask.substr(i_mask, mask.length)
      th.setSelectionRange(i_mask, i_mask);

      if (mask[i_mask] != '_' && mask.length > i_mask) {
        (mask_number == true) ? i_mask++ : i_mask--
        step_input(mask_number, th, arrow)
      }
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






