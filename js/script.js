// const { on } = require("gulp");

$(document).ready(function(){
	$('.feed-back__inner').slick({
		speed: 1400,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow.prev.png"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow.next.png"></button>',
		responsive: [
			 {
				 breakpoint: 992,
				 settings: {
					 dots: true,
					 arrows: false
				 }
			 }
		 ]
	  })

	})
	//Smooth scroll and pageup
	$(window).scroll(function() {
        if ($(this).scrollTop() > 1400) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
	})
	
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
    
          
            })
        })   
    };
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
    
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#recall').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

  window.addEventListener('DOMContentLoaded', () => {
          const menu = document.querySelector('.header__menu'),
          menuItem = document.querySelectorAll('.header__item'),
          hamburger = document.querySelector('.hamburger');
    
          hamburger.addEventListener('click', () => {
              hamburger.classList.toggle('hamburger_active');
              menu.classList.toggle('header__menu_active');
          });
    
          menuItem.forEach(item => {
              item.addEventListener('click', () => {
                  hamburger.classList.toggle('hamburger_active');
                  menu.classList.toggle('header__menu_active');
              })
          })
      })
