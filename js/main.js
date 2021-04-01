function isHighDensity(){/*проверка HD display*/
	return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
}

function isRetina(){/*проверка Retina*/
	return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches)) || (window.devicePixelRatio && window.devicePixelRatio >= 2)) && /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
}

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
	$('input.required').on('blur',function(){
		if ( !$(this).val().length ){
			$(this).addClass('error');
		}
	});
	$('textarea.required').on('blur',function(){
		if ( !$(this).val().length ){
			$(this).addClass('error');
		}
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
		autoplay: true,
		dots: true
	});

	$('.example-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 420,
				settings: {
					slidesToShow: 1
				}
			}
		]
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
		if (quantity < 100){
			quantity++;
			$(this).parent('.quantity').find('input.text').val(quantity);
		}
	});

	let prevValue;
	$('.param .quantity input.text').on('input',function(){
		let value = +$(this).val();
		if ( $(this).val().length ){
			if ( value > 99 ){
				$(this).val(prevValue);
				return;
			}
			if ( (value < 0) || (value == -0) ){
				$(this).val(0);
			}
		}
		prevValue = value;
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
			if ( $(element).prev().hasClass('breadcrumbs') ){
				blockHeight -= $('.breadcrumbs').outerHeight();
			}
			$(element).css('min-height',blockHeight);
		}
	}
	setHeightFullWindow('.b-thanks .wrap');
	setHeightFullWindow('.b-error .wrap');
	setHeightFullWindow('.b-section.full-window');

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

	function createPlayers(){
		let players = {};
		let playerTime;

		function initPlayers(){
			if ( $('.b-player').length ){
				let i = 1;
				$('.b-player').each(function(){
					let key = 'player-'+i;
					let $element = $(this);
					$element.attr('data-player',key);
					players[key] = new Audio();
					players[key].src = $element.attr('data-src');
					players[key].currentTime = 0;
					i++;
				});
			}
		}
		initPlayers();

		$(window).on('load',function(){
			$('.b-player').each(function(){
				let player = $(this).attr('data-player');
				$(this).find('.current-time').text(printTime(Math.round(players[player].currentTime)));
				$(this).find('.duration').text(printTime(Math.round(players[player].duration)));
			});
		});

		function printTime(time){
			let minutes = Math.trunc(time/60);
			let seconds = time - minutes*60;
			if (minutes < 10){
				minutes = '0' + minutes;
			}
			if (seconds < 10){
				seconds = '0' + seconds;
			}
			return minutes + ':' + seconds;
		}

		$(document).on('click','.b-player .play-btn',function(){
			let player = $(this).parents('.b-player').attr('data-player');
			let $element = $(this).parents('.b-player');
			if ( players[player].ended ){
				$element.find('.current-time').text(printTime(0));
				$element.find('.progress-bar .bar .line').css('width',0);
			}
			if ( players[player].paused ){
				for ( key in players ){
					if ( !players[key].paused ){
						players[key].pause();
					}
				}
				players[player].play();
				$('.b-player').removeClass('played');
				$(this).parents('.b-player').addClass('played');
				playerTime = setInterval(function(){
					let progress = Math.round($element.find('.progress-bar').innerWidth() * players[player].currentTime / players[player].duration);
					$element.find('.progress-bar .bar .line').css('width',progress);
					$element.find('.current-time').text(printTime(Math.round(players[player].currentTime)));
					if ( players[player].ended ){
						clearInterval(playerTime);
						$element.removeClass('played');
					}
				},1000);
			} else {
				players[player].pause();
				$(this).parents('.b-player').removeClass('played');
				clearInterval(playerTime);
			}
		});

		function PlayerProgress(){
			let onMouseDown = false;

			function moveProgress(element,player,event){
				let cursorPos = event.pageX - $(element).offset().left;
				let time = Math.round(players[player].duration * cursorPos / $(element).innerWidth());
				if (time > players[player].duration){
					time = Math.round(players[player].duration);
				}
				if (time < 0){
					time = 0;
				}
				let progress = Math.round($(element).innerWidth() * time / players[player].duration);
				$(element).find('.bar .line').css('width',progress);
				$(element).parents('.b-player').find('.current-time').text(printTime(time));
				players[player].currentTime = time;
			}

			$(document).on('pointerdown','.b-player .progress-bar',function(event){
				let player = $(this).parents('.b-player').attr('data-player');
				onMouseDown = true;
				moveProgress(this,player,event);
				if ( $(this).parents('.b-player').hasClass('played') ){
					players[player].pause();
				}
			});

			$(document).on('pointerup','.b-player .progress-bar',function(event){
				let player = $(this).parents('.b-player').attr('data-player');
				onMouseDown = false;
				if ( $(this).parents('.b-player').hasClass('played') ){
					players[player].play();
				}
			});

			$(document).on('pointerleave','.b-player .progress-bar',function(event){
				let player = $(this).parents('.b-player').attr('data-player');
				onMouseDown = false;
				if ( $(this).parents('.b-player').hasClass('played') ){
					players[player].play();
				}
			});

			$(document).on('pointermove','.b-player .progress-bar',function(event){
				let player = $(this).parents('.b-player').attr('data-player');
				if ( onMouseDown ){
					moveProgress(this,player,event);
				}
			});
		}
		PlayerProgress();

		function changeVolume(){
			let onMouseDown = false;

			function moveVolume(element,player,event){
				let cursorPos = event.pageY - $(element).offset().top;
				let progress = Math.round($(element).innerHeight() - cursorPos);
				if (progress > $(element).innerHeight()){
					progress = $(element).innerHeight();
				}
				if (progress < 0){
					progress = 0;
				}
				let volume = progress / $(element).innerHeight();
				$(element).find('.line').css('height',progress);
				players[player].volume = volume.toFixed(2);
			}

			$(document).on('mousedown','.b-player .volume-bar .bar',function(event){
				let player = $(this).parents('.b-player').attr('data-player');
				onMouseDown = true;
				moveVolume(this,player,event);
			});

			$(document).on('mouseup','.b-player .volume-bar .bar',function(){
				onMouseDown = false;
			});

			$(document).on('mouseleave','.b-player .volume-bar .bar',function(){
				onMouseDown = false;
			});

			$(document).on('mousemove','.b-player .volume-bar .bar',function(event){
				let player = $(this).parents('.b-player').attr('data-player');
				if ( onMouseDown ){
					moveVolume(this,player,event);
				}
			});

			$(document).on('click','.volume-btn',function(){
				let player = $(this).parents('.b-player').attr('data-player');
				if ( players[player].muted ){
					players[player].muted = false;
					$(this).removeClass('muted');
				} else {
					players[player].muted = true;
					$(this).addClass('muted');
				}
			});
		}
		changeVolume();
	}
	createPlayers();

	function swapImage(){
		if ( isRetina() || isHighDensity() ){
			if ( $('img[data-src]').length ){
				$('img[data-src]').each(function(){
					let img_width = $(this).outerWidth();
					$(this).attr('src',$(this).attr('data-src'));
					$(this).css({
						'width':'100%',
						'max-width': img_width,
					});
				});
			}
		}
	}
	swapImage();

	$(window).on('scroll',function(){
		scrollElement('.b-scrollable','.b-scroll-element');		
	});

	$(window).resize(function(){
		scrollElement('.b-scrollable','.b-scroll-element');
		setHeightFullWindow('.b-thanks .wrap');
		setHeightFullWindow('.b-error .wrap');
		setHeightFullWindow('.b-section.full-window');
		changeFaqElemHeight();
	});

});