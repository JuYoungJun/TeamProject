jQuery(function ($) {
	$('header .lang p').click(function () {
		$('header nav.pc-none').slideUp();
		$('header .lang ul').slideToggle();
	});

	var flg = false;
	var scrollpos;
	$('.menu_btn').click(function () {
		$('header .lang ul').slideUp();
		$('#header nav.pc-none').slideToggle();
		$(this).toggleClass('active');
		if (flg) {
			$('.menu_btn span.ttl').text('メニュー');
			$('body').removeClass('fixed').css({'top': 0});
			window.scrollTo(0, scrollpos);
			flg = false;
		} else {
			scrollpos = $(window).scrollTop();
			$('body').addClass('fixed').css({'top': -scrollpos});
			$('.menu_btn span.ttl').text('閉じる');
			flg = true;
		}
	});


	$('header a,#header a').click(function () {
		$('header .lang ul').slideUp();
		$('#header nav.pc-none').slideUp();
	});
	$('a[href^="#"]').click(function () {
		var speed = 500;
		var href = $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop: position - 80}, speed, "swing");
		return false;
	});


	var h_height = $('header').outerHeight();
	var urlHash = location.hash;
	var speed = 500;
	if (urlHash) {
		$('body,html').stop().scrollTop(0);
		setTimeout(function () {
			var target = $(urlHash);
			var position = target.offset().top - h_height;
			$('body,html').stop().animate({scrollTop: position}, speed);
		}, 100);
	}

	//   var windowWidth = $(window).width();
	//   if (windowWidth > 736) {
	// $('header .parent').hover(
	// 	function(){
	// 		$(this).children('.submenu').slideDown('fast');
	// 	},
	// 	function(){
	// 		$(this).children('.submenu').slideUp('fast');
	// 	}
	// );
	//   }

	$(window).on('load resize', function () {
		var windowW = $(window).width();
		if (windowW < 801) {
			var igImgW = $('#top .instagram .item').width();
			$('#top .instagram .item').height(igImgW);
			trimImg('#top .instagram .item');
		} else {
			trimImg('#top .instagram .item');
		}
		trimImg('#top .diary .item .img');
		trimImg('#top .t4 .item .thumb');

		// $('#joshitabi .item').heightLine();
	})

	function trimImg($photoBox) {
		jQuery($photoBox).each(function () {
			var box = jQuery(this);
			var i = jQuery('img', this);
			var boxWidth = $(box).width();
			var boxHeight = $(box).height();
			var imgWidth = $(i).width();
			var imgHeight = $(i).height();
			var parImg = imgWidth / imgHeight;
			var parBox = boxWidth / boxHeight;
			if (parImg > parBox) {
				$(i).css({
					"width": "auto",
					"height": "100%"
				});
			} else {
				$(i).css({
					"width": "100%",
					"height": "auto"
				});
			}
		});
	}

	var yclid;
	$(document).ready(function () {
		var p = location.search.substring(1).split('&');
		if (!p) return false;
		for (var i = 0; i < p.length; i++) {
			var d = p[i].split('=');
			if (d[0] == "yclid") yclid = d[1];
		}
	});
	$(document).ready(function () {
		$('.hasDatepicker').on('mouseover', function () {
			$(this).focus();
		});
		$('#ui-datepicker-div').on('mouseleave', function () {
			$('.hasDatepicker').blur();
			$('.hasDatepicker').datepicker('hide');
			// console.log('here');
		});
	});
	$('#pagetop').hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 180) {
			$('#pagetop').fadeIn();
		} else {
			$('#pagetop').fadeOut();
		}
	});

	var windowW = $(window).width();
	if (windowW < 801) {
		var pos = 0;
		$(window).on('scroll', function () {
			if (pos > 1) {
				if ($(this).scrollTop() < pos) {
					$('header').removeClass('hide');
				} else {
					$('header').addClass('hide');
				}
			}
			pos = $(this).scrollTop();
		});
	}

	$(window).on('load', function () {
		$('#loader-bg').delay(900).fadeOut(800);
		$('#loader').delay(600).fadeOut(300);
	});
	setTimeout('stopload()', 10000);

	function stopload() {
		$('#loader-bg').delay(900).fadeOut(800);
		$('#loader').delay(600).fadeOut(300);
	}
});


// Function to check if a div with class 'div' exists
function checkAndLoadRecaptcha() {
	document.removeEventListener('DOMContentLoaded', checkAndLoadRecaptcha); // Remove the event listener
	var divElement = document.querySelector('input[name="recaptcha-v3"]');
	if (divElement) {
		// If the div exists, load the reCAPTCHA script
		var script = document.createElement('script');
		script.src = "https://www.google.com/recaptcha/api.js?render=6LfoSd4oAAAAAH5F5drjB_Gct_pm5OC18HQXSWpn";
		document.body.appendChild(script);

		const myForm = document.querySelector("#form_cont form");
		let preventEvent = true;
		const getToken = (e) => {
			const target = e.target;
			if (preventEvent) {
				e.preventDefault();
				grecaptcha.ready(function () {
					grecaptcha.execute("6LfoSd4oAAAAAH5F5drjB_Gct_pm5OC18HQXSWpn", {action: "homepage"})
						.then(function (token) {
							preventEvent = false;
							if (document.querySelector('input[name="recaptcha-v3"]')) {
								const recaptchaToken = document.querySelector('input[name="recaptcha-v3"]');
								recaptchaToken.value = token;
							}
							//追加↓
							if (myForm.querySelector('[name=submitConfirm]')) {
								const confirmButtonValue = myForm.querySelector('[name=submitConfirm]').value;
								const myComfirmButton = document.createElement("input");
								myComfirmButton.type = "hidden";
								myComfirmButton.value = confirmButtonValue;
								myComfirmButton.name = "submitConfirm";
								myForm.appendChild(myComfirmButton);
							}

							myForm.submit();
							console.log('send');
						})
						.catch(function (e) {
							alert("reCAPTCHA token取得時にエラーが発生したためフォームデータを送信できません");
							return false;
						});
				});
			}
		}
		myForm.addEventListener("submit", getToken);
	}
}

// Call the function when the document is loaded
document.addEventListener('DOMContentLoaded', checkAndLoadRecaptcha);


	var slideConts = document.querySelectorAll('.slideConts');
	var slideContsRect = [];
	var slideContsTop = [];
	var fadeConts = document.querySelectorAll('.fadeConts');
	var fadeContsRect = [];
	var fadeContsTop = [];
	var animateConts = document.querySelectorAll('.animateConts');
	var animateContsRect = [];
	var animateContsTop = [];
	var animateConts2 = document.querySelectorAll('.animateConts2');
	var animateConts2Rect = [];
	var animateConts2Top = [];
	var animateConts3 = document.querySelectorAll('.animateConts3');
	var animateConts3Rect = [];
	var animateConts3Top = [];
	var windowY = window.pageYOffset;
	var windowH = window.innerHeight;
	var remainder = 0;
	for (var i = 0; i < slideConts.length; i++) {
	slideContsRect.push(slideConts[i].getBoundingClientRect());
}
	for (var i = 0; i < slideContsRect.length; i++) {
	slideContsTop.push(slideContsRect[i].top + windowY);
}
	for (var i = 0; i < fadeConts.length; i++) {
	fadeContsRect.push(fadeConts[i].getBoundingClientRect());
}
	for (var i = 0; i < fadeContsRect.length; i++) {
	fadeContsTop.push(fadeContsRect[i].top + windowY);
}
	for (var i = 0; i < animateConts.length; i++) {
	animateContsRect.push(animateConts[i].getBoundingClientRect());
}
	for (var i = 0; i < animateContsRect.length; i++) {
	animateContsTop.push(animateContsRect[i].top + windowY);
}
	for (var i = 0; i < animateConts2.length; i++) {
	animateConts2Rect.push(animateConts2[i].getBoundingClientRect());
}
	for (var i = 0; i < animateConts2Rect.length; i++) {
	animateConts2Top.push(animateConts2Rect[i].top + windowY);
}
	for (var i = 0; i < animateConts3.length; i++) {
	animateConts3Rect.push(animateConts3[i].getBoundingClientRect());
}
	for (var i = 0; i < animateConts3Rect.length; i++) {
	animateConts3Top.push(animateConts3Rect[i].top + windowY);
}
	window.addEventListener('resize', function () {
	windowH = window.innerHeight;
});
	if(window.matchMedia('(max-width:800px)').matches){
	window.addEventListener('scroll', function () {
		windowY = window.pageYOffset;
		for (var i = 0; i < slideConts.length; i++) {
			if (windowY > slideContsTop[i] - windowH + remainder) {
				slideConts[i].classList.add('show');
			}
		}
		for (var i = 0; i < fadeConts.length; i++) {
			if (windowY > fadeContsTop[i] - windowH + remainder) {
				fadeConts[i].classList.add('show');
			}
		}
		for (var i = 0; i < animateConts.length; i++) {
			if (windowY > animateContsTop[i] - windowH + remainder) {
				animateConts[i].classList.add('show');
			}
		}
		for (var i = 0; i < animateConts2.length; i++) {
			if (windowY > animateConts2Top[i] - windowH - 400) {
				animateConts2[i].classList.add('show');
			}
		}
		for (var i = 0; i < animateConts3.length; i++) {
			if (windowY > animateConts3Top[i] + windowH) {
				animateConts3[i].classList.add('show');
			}
		}
	});
}else{
	window.addEventListener('scroll', function () {
		windowY = window.pageYOffset;
		for (var i = 0; i < slideConts.length; i++) {
			if (windowY > slideContsTop[i] - windowH + remainder) {
				slideConts[i].classList.add('show');
			}
		}
		for (var i = 0; i < fadeConts.length; i++) {
			if (windowY > fadeContsTop[i] - windowH + remainder) {
				fadeConts[i].classList.add('show');
			}
		}
		for (var i = 0; i < animateConts.length; i++) {
			if (windowY > animateContsTop[i] - windowH + remainder) {
				animateConts[i].classList.add('show');
			}
		}
		for (var i = 0; i < animateConts2.length; i++) {
			if (windowY > animateConts2Top[i] - windowH) {
				animateConts2[i].classList.add('show');
			}
		}
		for (var i = 0; i < animateConts3.length; i++) {
			if (windowY > animateConts3Top[i] - windowH) {
				animateConts3[i].classList.add('show');
			}
		}
	});
}

var currentDate = new Date();
currentDate.setMinutes(currentDate.getMinutes() + currentDate.getTimezoneOffset() + 9 * 60); // Adjust for JST offset

// Select all elements with the specified class
var elementsToShow = document.querySelectorAll('.content-to-show');
var elementsToNone = document.querySelectorAll('.content-to-none');

// Iterate through elements with target times
for (var i = 0; i < elementsToShow.length; i++) {
	var targetTimeAttribute = elementsToShow[i].getAttribute('data-targetTime');
	var targetDate = new Date(targetTimeAttribute);

	// Compare the current date and time with the target date and time
	if (currentDate >= targetDate) {
		// Display the content after the specified date and time
		elementsToShow[i].style.display = 'block';
	}
}
for (var i = 0; i < elementsToNone.length; i++) {
	var targetTimeAttribute = elementsToNone[i].getAttribute('data-targetTime');
	var targetDate = new Date(targetTimeAttribute);

	// Compare the current date and time with the target date and time
	if (currentDate >= targetDate) {
		// Display the content after the specified date and time
		elementsToNone[i].style.display = 'none';
	}
}



