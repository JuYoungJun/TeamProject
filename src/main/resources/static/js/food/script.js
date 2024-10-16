
$(function () {

    // =================== 웹 지역선택
    $('.county_top .toggle_down').on('click', function () {
        $('.drop_wrap').toggle();      
    })

    /*$('.drop_menu li').on('click',function(){
        $('.drop_menu li').removeClass('on')
        $(this).addClass('on')

        //  버튼 on 텍스트 출력
        var nowTxt = $(".drop_menu li.on button").text();
        $('.toggle_down .now_txt span').text(nowTxt);
    })*/




    
//=================== 모바일 지역선택
    $('.mo_map_county .search_btn').on('click',function(){
        $('.open_wrap').show()
        $('.mo_map_county').hide()
    })

    // --------- 지역 선택
    $('.open_cont .top button').on('click', function () {
        $('.open_cont .top ul li').removeClass('on')
        $(this).parent().addClass('on')

        //  버튼 on 텍스트 출력
//        var topOn = $(".open_cont .top ul li.on button").text();
//        $('.search_btn_click .city').text(topOn);
    })

     // --------- 지역 선택
    $('.open_cont .bot button').on('click', function () {
        $('.open_cont .bot ul li').removeClass('on')
        $(this).parent().addClass('on')

        //  버튼 on 텍스트 출력
//        var topOn = $(".open_cont .bot ul li.on button").text();
//        $('.search_btn_click .county').text(topOn);
    })

    //  ----- 선택 버튼 클릭
    $('.open_wrap .ch_btn').on('click',function(){
        $('.open_wrap').hide();
        $('.search_btn').hide();
        $('.search_btn_click').addClass('on');
        $('.mo_map_county').show();
    })

    $('.search_btn_click').on('click',function(){
        $('.open_wrap').show()
        $('.mo_map_county').hide()
    })


    //  해당 페이지 찾기
    var page = $('#parent').data('page');
    var nowPage = $('.map_img div[data-point="' + page + '"]').text();


    //$('.map_img div[data-point="' + page + '"]').addClass('on');
//    $('.wrap').addClass(page);





    $('.map_pin_cont').on('mouseover',function(){
        var pinNow = $(this).data('point');
        $('.map_bg').addClass(pinNow);
    })



    $('.map_pin_cont').on('mouseout',function(){
        var pinNow = $(this).data('point');
        $('.map_bg').removeClass(pinNow);
    })



    

    $('.open_wrap .close').on('click',function(){
        $('.open_wrap').hide();
        $('.mo_map_county').show()
    })


    $('.ra_list .more_btn ').on('click',function(){
        $('.ra_list li.more').toggleClass('open')
        $(this).toggleClass('open')
    })




})

$(document).ready(function(){
    if (window.matchMedia("(max-width: 1024px)").matches) {
        $('.tab_cont').slick({
            slide: 'div',		//슬라이드 되어야 할 태그 ex) div, li 
            infinite : false, 	//무한 반복 옵션	 
            slidesToShow : 1,		// 한 화면에 보여질 컨텐츠 개수
            slidesToScroll : 1,		//스크롤 한번에 움직일 컨텐츠 개수
            arrows : false, 		// 옆으로 이동하는 화살표 표시 여부
            autoplay : false,			// 자동 스크롤 사용 여부
            draggable : true, 	//드래그 가능 여부 
            dots: true,
            customPaging : function(slider, i) {
            var thumb = $(slider.$slides[i]).data();
            if (i=='0'){
              i = "현지인 랭킹";
            } else if (i=='1'){
              i = "외지인 랭킹";
            }
            return '<a class="dot">'+i+'</a>';
            },
        });

      } 
});




// let vh = window.innerHeight * 0.01
// document.documentElement.style.setProperty('--vh', '${vh}px')
// window.addEventListener('resize', () => { 
//     let vh = window.innerHeight * 0.01
//     document.documentElement.style.setProperty('--vh', `${vh}px`)
// })



// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});


// 익스 브라우저 확인
var agent = navigator.userAgent.toLowerCase();

if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
	alert('Internet Explorer는 호환되지 않는 브라우저 입니다.\n다른 브라우저를 이용해주세요')
}


