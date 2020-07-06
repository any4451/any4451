const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');


burger.addEventListener('click', function() {
  if (!menu.classList.contains('menu--active')) {
    menu.classList.add('menu--active');
    burger.classList.add('burger--active');
  } else {
    menu.classList.remove('menu--active');
    burger.classList.remove('burger--active');
  }
});



/// аккордеон team 


// const teamList = document.querySelector('.team-list');
// const memberInfo = document.querySelector('.team-member__content');

// teamList.addEventListener('click', e => {
//       e.preventDefault();

//       let target = e.target;

//       const item = target.closest(".team-list__item");
//       const memberInfo = item.find('.team-list__content');
//       console.log(memberInfo);
      
//       if(target.classList.contains('team-list__content')) {
//         if (!item.classList.contains('team-list__content--active'))
//       }  
// });
  
  const openItem = item => {
      const container = item.closest('.team__item');
      const contentBlock = container.find('.team__content');
      const textBlock = contentBlock.find('.team__content-block');
      const reqHeight = textBlock.height();

      container.addClass('active');
      contentBlock.height(reqHeight);
  };

  const closeEveryItem = (container) => {
   const items = container.find('.team__content');
   const itemContainer = container.find('.team__item');
   
   itemContainer.removeClass('active');
   items.height(0);
  };

  $('.team__name').on('click', (e) => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const container = $this.closest('.team');
    const elemContainer = $this.closest('.team__item');

    if (elemContainer.hasClass('active')) {
      closeEveryItem(container);

    } else {
      closeEveryItem(container);
      openItem($this);
    }

 });



/// SLIDER 

const slider = $('.slider').bxSlider({
  pager: false,
  controls: false
});

$('.slider-btn--left').click( e => {
   e.preventDefault();
   slider.goToPrevSlide();
});
$('.slider-btn--right').click( e => {
 e.preventDefault();
 slider.goToNextSlide();
});



/// TABS REVIEWS
 
 $('.review-switcher__link').on('click', (e) => {
     e.preventDefault();
 
     const $this = $(e.currentTarget);
    const target = $this.closest('.review-switcher').index();
     const itemToShow = $('.review').eq(target);

     const curItem = $this.closest('.review-switcher');
 
     itemToShow.addClass('active').siblings().removeClass('active');
     curItem.addClass('active').siblings().removeClass('active');
 });


////// FORM

const validateFields = (form, fieldsArray) => {

  fieldsArray.forEach( field => {
    field.removeClass('input-error');
     if (field.val().trim() === '') {
       field.addClass('input-error');
     }
    });

  const errorFields = form.find('.input-error');
  return errorFields.length === 0;
}
$('.form').submit( e => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find('[name = "name"]');
  const phone = form.find('[name = "phone"]');
  const comment = form.find('[name = "comment"]');
  const to = form.find('[name = "to"]');
  const modal = $('#modal');
  const content = modal.find('.modal__content');

 const isValid = validateFields(form, [name, phone, comment, to])

  if (isValid){
    $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: 'post',
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val(),
      },
      success: data => {
       content.text(data.message);
       $.fancybox.open({
        src: "#modal",
        type: 'inline'
      });
      },
      error: data => {
        const message = data.responseJSON.message;
        content.text(message);
        $.fancybox.open({
          src: "#modal",
          type: 'inline'
        });
      }
    });
  }
});

$('.app-close-modal').click( e => {
   e.preventDefault();

   $.fancybox.close();
});
















// const form = document.querySelector('#form');
// const sendButton = document.querySelector('#sendButton');
// const modal = document.querySelector('#modal');

// sendButton.addEventListener('click', e => {
//     e.preventDefault();

//     if(validateForm(form)) {
//       const xhr = new XMLHttpRequest();
//       let data = new FormData();
//       data.append('name', form.elements.name.value);
//       data.append('phone', form.elements.phone.value);
//       data.append('comment', form.elements.comment.value);
//       data.append('to', form.elements.to.value);
//       xhr.responseType = 'json';
//       xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
//       xhr.send(data);
//       xhr.addEventListener('load', () => {
//         const content = modal.querySelector('modal__content');
//         modal.classList.remove('open');
//          success: data => {
//              content.textContent(data.message);
//              modal.classList.add('open');
//       });
//     }

    
// });

// function validateForm(form) {
//   let valid = true;
//   if (!validateField(form.elements.name)) {
//       valid = false;
//   }
//   if (!validateField(form.elements.phone)) {
//     valid = false;
//   }
//   if (!validateField(form.elements.street)) {
//   valid = false;
//   }
//   if (!validateField(form.elements.house)) {
//   valid = false;
//   }
//   if (!validateField(form.elements.house)) {
//   valid = false;
//   }
//   return valid;
// };

// function validateField(field) {
//   field.nextElementSibling.textContent = field.validationMessage;

//   return field.checkValidity();

// };

  
  