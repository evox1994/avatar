$(document).ready(function(){

	$(document).on('click','.radio-btn',function(){
		if ( $(this).hasClass('active') ) {
			$(this).removeClass('active');
		} else {
			$(this).removeClass('error');
			$(this).addClass('active');
		}
	});

	$(document).on('click','.mobile-btn',function(){
		if ( $(this).hasClass('active') ){
			$(this).removeClass('active');
			$('.mobile-menu').removeClass('active');
			$('body').removeClass('no-scroll');
		} else {
			$(this).addClass('active');
			$('.mobile-menu').addClass('active');
			$('body').addClass('no-scroll');
		}
	});

	$('.fancybox-gal').fancybox({loop: true});
	$('.fancybox').fancybox({touch: false});
	$('input[type="tel"]').inputmask('+7 999 999 99 99');

	$(document).on('click','.close-btn',function(){
		$('.mobile-btn').removeClass('active');
		$('.mobile-menu').removeClass('active');
		$('body').removeClass('no-scroll');
		$('.mobile-menu .nav li.li-drop').removeClass('active');
	});

	$('input').on('input',function(){
		$(this).removeClass('error');
	});
	$('textarea').on('input',function(){
		$(this).removeClass('error');
	});

	$(document).on('click','.scroll-btn',function(){
		var el = $(this).attr('href');
		var des = $(this).attr('data-scroll-offset');
		if ($(el).length){
			if (des){
				$('body,html').animate({scrollTop: $(el).offset().top - des}, 800);
			} else {
				$('body,html').animate({scrollTop: $(el).offset().top}, 800);
			}
		}
		return false;
	});

	$('form').on('submit',function(){
		var valid = true;

		if ( $(this).find('.policy-text .radio-btn').length ){
			if ( $(this).find('.policy-text .radio-btn').hasClass('active') ){
				$(this).find('input.required').each(function(){
					if(!$(this).val().length) { 
						event.preventDefault();
						valid = false;
						$(this).addClass("error"); 
					} else { 
						$(this).removeClass("error"); 
					}
				});
				$(this).find('textarea.required').each(function(){
					if(!$(this).val().length) { 
						event.preventDefault();
						valid = false;
						$(this).addClass("error"); 
					} else { 
						$(this).removeClass("error"); 
					}
				});
			} else {
				$(this).find('.policy-text .radio-btn').addClass('error');
				event.preventDefault();
				return false;
			}
		} else {
			$(this).find('input.required').each(function(){
				if(!$(this).val().length) { 
					event.preventDefault();
					valid = false;
					$(this).addClass("error"); 
				} else { 
					$(this).removeClass("error"); 
				}
			});
			$(this).find('textarea.required').each(function(){
				if(!$(this).val().length) { 
					event.preventDefault();
					valid = false;
					$(this).addClass("error"); 
				} else { 
					$(this).removeClass("error"); 
				}
			});
		}

		if (!valid) {
			event.preventDefault();
			return false;
		}
	});

	function footerYear(){
		var date = new Date();
		var year = date.getFullYear();
		$('#footer-year').text(year);
	}
	footerYear();

	$('.b-cards-slider').slick({
		slidesToShow: 3,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 560,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});

	$('.face-slider').slick({
		autoplay: true
	});

	$(document).on('click',function(e){
		let $elem = $(e.target);

		if ( !($elem.closest('.header-drop').length || $elem.closest('.header-btn').length) ){
			$('.header-drop,.header-btn').removeClass('active');
		}
	});

	$(document).on('click','.header-btn',function(){
		$(this).toggleClass('active');
		$('.header-drop').toggleClass('active');
	});

	$('.header-drop .sec-list > li').on('mouseenter',function(){
		let el = $(this).attr('data-drop');
		if ( !$(this).hasClass('active') ){
			$(this).parent('.sec-list').find('li').removeClass('active');
			$(this).parents('.header-drop').find('.serv-wrap').removeClass('active');
			$(this).addClass('active');
			$(el).addClass('active');
		}
	});

	$(document).on('click','.mobile-menu .nav > li.drop > span',function(){
		$(this).parent('.drop').toggleClass('active');
	});

	$(document).on('click','.param .quantity .less',function(){
		let quantity = +$(this).parent('.quantity').find('input.text').val();
		if (quantity > 0){
			quantity--;
			$(this).parent('.quantity').find('input.text').val(quantity);
		}
	});

	$(document).on('click','.param .quantity .more',function(){
		let quantity = +$(this).parent('.quantity').find('input.text').val();
		quantity++;
		$(this).parent('.quantity').find('input.text').val(quantity);
	});

	$('.param .quantity input.text').on('input',function(){
		let value = +$(this).val();
		if ( $(this).val().length ){
			if ( (value < 0) || (value == -0) ){
				$(this).val(0);
			}
		}
	});
	$('.param .quantity input.text').on('change',function(){
		if ( !$(this).val().length ){
			$(this).val(0);
		}
	});

	$(document).on('click','.b-faq > li .qwestion',function(){
		if ( $(this).parent('li').hasClass('active') ){
			$(this).parent('li').removeClass('active');
			$(this).parent('li').find('.answer').animate({height: 0},500);
		} else {
			$(this).parent('li').addClass('active');
			$(this).parent('li').find('.answer').animate({height: $(this).parent('li').find('.answer .content').outerHeight()},500);
		}
	});

	function printTime(hours,minutes){
		let day = 'Сегодня, ';
		let print_hours = hours + 1;
		let print_minutes = minutes;
		if (print_minutes < 10){
			print_minutes = '0'+print_minutes;
		}
		if (print_hours > 23){
			day = 'Завтра, ';
		}
		$('.param .date-time').text(day+print_hours+':'+print_minutes);
	}

	function getTimeInning(){
		let date = new Date();
		let seconds = date.getSeconds();
		let minutes = date.getMinutes();
		let hours = date.getHours();
		printTime(hours,minutes);
		let timer = setInterval(function step(){
			date = new Date();
			seconds = date.getSeconds();
			minutes = date.getMinutes();
			hours = date.getHours();
			printTime(hours,minutes);
		},1000);
	}
	getTimeInning();

	function setHeightFullWindow(element){
		if ($(element).length){
			let headerHeight = $('.header').outerHeight();
			let windowHeight = $(window).innerHeight();
			let blockHeight = windowHeight - headerHeight;
			//$(element).innerHeight(blockHeight);
			$(element).css('min-height',blockHeight);
		}
	}
	setHeightFullWindow('.b-thanks .wrap');
	setHeightFullWindow('.b-error .wrap');

	function scrollElement(parent,element){
		if ( $(parent).length && $(parent).find(element).length ){
			$(parent).each(function(){
				$parent = $(this);
				$element = $(this).find(element);
				if ( $(window).width() > 1024 ) {
					let startScroll = $parent.offset().top - 30;
					let endScroll = startScroll + $parent.outerHeight() - $element.outerHeight();
					let st = $(window).scrollTop();
					$parent.css('min-height',$element.outerHeight());

					if ( st > startScroll ) {
						if ( st > endScroll ) {
							$element.removeClass('scroll');
							$element.addClass('bottom');
						} else {
							$element.addClass('scroll');
							$element.removeClass('bottom');
						}
					} else {
						$element.removeClass('scroll');
						$element.removeClass('bottom');
					}
				} else {
					$element.removeClass('scroll');
					$element.removeClass('bottom');
					$parent.removeAttr('style');
				}
			});
		}
	}
	scrollElement('.b-scrollable','.b-scroll-element');

	function changeFaqElemHeight(){
		if ( $('.b-faq').length ){
			$('.b-faq > li.active .answer').each(function(){
				let $element = $(this);
				setTimeout(function(){
					$element.css('height',$element.find('.content').outerHeight());
				},100);
			});
		}
	}
	changeFaqElemHeight();

	$(window).on('scroll',function(){
		scrollElement('.b-scrollable','.b-scroll-element');		
	});

	$(window).resize(function(){
		scrollElement('.b-scrollable','.b-scroll-element');
		setHeightFullWindow('.b-thanks .wrap');
		setHeightFullWindow('.b-error .wrap');
		changeFaqElemHeight();
	});

});