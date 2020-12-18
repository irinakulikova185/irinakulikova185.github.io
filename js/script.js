// const { on } = require("gulp");
window.addEventListener('DOMContentLoaded', () => {
// $(document).ready(function(){
// 	$('.feed-back__inner').slick({
// 		speed: 1400,
// 		prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow.prev.png"></button>',
// 		nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow.next.png"></button>',
// 		responsive: [
// 			 {
// 				 breakpoint: 992,
// 				 settings: {
// 					 dots: true,
// 					 arrows: false
// 				 }
// 			 }
// 		 ]
// 	  })

//     })
     // Слайдер

     const slides = document.querySelectorAll('.feed-back__item'),
           sliderField = document.querySelector('.feed-back__inner'),
           sliderWrapper = document.querySelector('.feed-back__carousel'),
           width = window.getComputedStyle(sliderWrapper).width,
           next = document.querySelector('.feed-back__arrowNext'),
           prev = document.querySelector('.feed-back__arrowPrev'),
           dots = document.querySelectorAll('.feed-back__dot');

    console.log(width);
    let sliderIndex = 1,
        offset = 0,
        posInit = 0,
        posX1 = 0,
        posX2 = 0,
        posFinal = 0,
        trfRegExp = /[-0-9.]+(?=px)/,
        posThreshold = deleteNotDigits(width) * 0.3;

    sliderField.style.width = 100*slides.length + '%';
    sliderField.style.display = 'flex';
    slides.forEach(slide => {
            slide.style.width = width;
        });  
    sliderField.style.transition = 'all 1s';
    sliderWrapper.style.overflow = 'hidden';
    sliderField.style.transform = 'translateX(0px)';

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if(offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        sliderField.style.transform = `translateX(-${offset}px)`;
    
    
    
    });
    
    prev.addEventListener('click', () => {
        if(offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        sliderField.style.transform = `translateX(-${offset}px)`;
 
    });
    dots.forEach( dot => {
        if(sliderIndex == 1) {
             dots[sliderIndex - 1].style.opacity = '1';
        }
    } );

    function setActiveDot() {
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[sliderIndex - 1].style.opacity = '1';
    }
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
    
            sliderIndex = slideTo;
            offset = deleteNotDigits(width) * (sliderIndex - 1);
            sliderField.style.transform = `translateX(-${offset}px)`;
    
            setActiveDot();
        });
    });
  //свайп
  sliderWrapper.addEventListener('touchstart', swipeStart);
  sliderWrapper.addEventListener('mousedown', swipeStart);
  function swipeStart(event) {
        let evt = event.type.includes('touch') == true ? event.touches[0] : event;
        posInit = posX1 = evt.clientX;
        document.addEventListener('touchmove', swipeAction);
        document.addEventListener('touchend', swipeEnd);
        document.addEventListener('mousemove', swipeAction);
        document.addEventListener('mouseup', swipeEnd);
  }  
  function swipeAction(event) {
    let evt = event.type.includes('touch') == true ? event.touches[0] : event;
    let style = sliderField.style.transform,
    transform = +style.match(trfRegExp)[0];
    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;
    sliderField.style.transform = `translateX(${transform - posX2}px)`;
  }
  
  function swipeEnd(e) {
    posFinal = posInit - posX1;
    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);
  
    if (Math.abs(posFinal) > posThreshold) {
        if (posInit < posX1) {
            if(sliderIndex == 1) {
                sliderIndex = slides.length;
                

            } else {
                sliderIndex--;
            }
          
        } else if (posInit > posX1) {
            if(sliderIndex == slides.length) {
                sliderIndex = 1;
                
            } else {
                sliderIndex++;
            }
          
        }
      }
      if (posInit !== posX1) {
            offset = deleteNotDigits(width) * (sliderIndex - 1);
            sliderField.style.transform = `translateX(-${offset}px)`;
    
            setActiveDot();
      }  
      }
        
    
	//Smooth scroll and pageup
	// $(window).scroll(function() {
    //     if ($(this).scrollTop() > 1400) {
    //         $('.pageup').fadeIn();
    //     } else {
    //         $('.pageup').fadeOut();
    //     }
    // });
    
    const pageup = document.querySelector('.pageup');
    
    window.addEventListener('scroll', () => {
        if(document.documentElement.scrollTop > 1400) {
            pageup.classList.remove('animated', 'fadeOut');
            pageup.classList.add('animated', 'fadeIn');
            pageup.style.display = 'block';

        } else {
            pageup.classList.remove('animated', 'fadeIn');
            pageup.classList.add('animated', 'fadeOut');
            pageup.style.display = 'none';
        }
    });
    
	$(function(){
			$("a[href^='#']").click(function(){
					var _href = $(this).attr("href");
					$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
					return false;
			});
	});
	 //Modal
	$('.button_recall, .button_calculation, .button_prices').on('click', function(){
        $('.overlay, #recall').fadeIn();    
    });
    $('.modal__close').on('click', function(){
        $('.overlay, #recall, #thanks').fadeOut();
    });

    // $('.button_details').each(function(i) {
    //     $(this).on('click', function(e) {
    //        e.preventDefault();
    //         $('.prices__content').toggleClass('.prices__content_active');
    //         $('.prices__info').toggleClass('.prices__info_active');
    //     })
    // })
   


    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.prices__content').eq(i).toggleClass('prices__content_active');
                $('.prices__info').eq(i).toggleClass("prices__info_active");
    
          
            });
        })  ; 
    }
    toggleSlide('.button_details');
    toggleSlide('.prices__link');
    
    
    // $('.button_catalog').on('click', function(){
    //     $('.overlay, #order').fadeIn();
    // });
    // $('.button_catalog').each(function(i){
    //     $(this).on('click', function (){
    //         $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
    //         $('.overlay, #order').fadeIn();
    //     })
	
    $('input[name=phone]').mask("+7(999) 999-99-99");

    // отправка данных из формы
    
    const forms = document.querySelectorAll('form'),
          modalRecall = document.querySelector('#recall'),
          modalThanks = document.querySelector('#thanks'),
          modalOverlay = document.querySelector('.overlay');

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = 'icons/spinner.svg';
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
            form.insertAdjacentElement('afterend', statusMessage);

            
            const formData = new FormData(form);

            fetch('server.php', {
                method: 'POST',
                body: formData
            })
            .then(data => data.text())
            .then(() => {
                modalRecall.style.display = 'none';
                modalOverlay.style.display = 'block';
                modalThanks.style.display = 'block';
                statusMessage.remove();
            })
            .finally(() => {
                form.reset();
            });
            
        });            

    }
  
    
 //Гамбургер
  
          const menu = document.querySelector('.header__menu'),
          menuItem = menu.querySelectorAll('.header__link'),
          hamburger = document.querySelector('.hamburger'),
          menuOverlay = document.querySelector('.menu_overlay');

          hamburger.addEventListener('click', () => {
     
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('header__menu_active');
            document.body.style.overflow = 'hidden';
            menuOverlay.style.display = 'block';
            
             
          });
          hamburger.addEventListener('click', () => {
            if(!hamburger.classList.contains('hamburger_active')) {
                document.body.style.overflow = '';
                menuOverlay.style.display = '';
            }
        });
        function closeHamburgerMenu() {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('header__menu_active');
            document.body.style.overflow = '';
            menuOverlay.style.display = '';
        }  
           
         menuItem.forEach(item => {
            item.addEventListener('click', closeHamburgerMenu);
         }); 

        menuOverlay.addEventListener('click', closeHamburgerMenu);


      });
