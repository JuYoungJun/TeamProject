let oriUrl = '';
let shuturl = '';
let conLike = 0;
let conShare = 0;
function getShuturl() {

    ShareDesc1 = '맛집랭킹10 동네 사람들이 자주 찾는 맛집, 여행자들이 즐겨가는 맛집을 빅데이터로 콕 집어 알려드립니다.';
    oriUrl =  location.href;
    sContentTitle = '빅데이터가 알려주는 현지인vs외지인 맛집차트 : 대한민국 구석구석 ';
    // oriUrl = rurl;

    $.ajax({
        url: mainurl+'/call',
        // url: 'https://dev.ktovisitkorea.com/call',
        dataType: 'json',
        type: "POST",
        data : {
            cmd : 'GET_SHUTURL',
            longurl : oriUrl
        },
        success: function(data) {
            if (data.header.process == 'success'){
                var obj = JSON.parse(data.header.JsonString);
                shuturl = obj.result.url;

                $('#foo').val(shuturl);
                layerPopup.layerShow('popShare');
            } else {
                alert('서비스 준비 중입니다.');
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            alert('서비스 준비 중입니다.');
        }
    });
}

function btnClipBoard() {

    var URL_link = $('#foo').val();

    //$('.pop_share').hide();

    function selectElementText(element) {
        if (document.selection) {
            var range = document.body.createTextRange();
            range.moveToElementText(element);
            range.select();
            document.execCommand('copy');

            alert("주소가 복사 되었습니다.");

        } else if(window.getSelection){
            var brw = getBrowser();
            if( brw == "Chrome") {
                var copyText = document.getElementById("foo");
                copyText.select();
                document.execCommand('copy');

                alert("주소가 복사 되었습니다.");
            } else {
                var range = document.createRange();
                range.selectNode(element);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('copy');

                alert("주소가 복사 되었습니다.");
            }
        }
    }

    var element = document.createElement('DIV');
    element.textContent = URL_link;
    document.body.appendChild(element);
    selectElementText(element);
    element.remove();
}

function openShare() {

    if (typeof FB == 'undefined'){
        //<![CDATA[
        window.fbAsyncInit = function() {
            FB.init({
                appId	  : '1628836140497717',
                xfbml	  : true,
                version	: 'v3.0'
            });
        };
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/ko_KR/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        //]]>
    }

    getShuturl();

}

function goShare(kind) {
    if( kind == 'facebook' ) {
        facebook();
    }else if( kind == 'twitter') {
        twitter();
    }else if( kind == 'kakaostory') {
        kakaostory();
    }else if( kind == 'kakaotalk') {
        if(getDevice() == 'iOS'){
            if(getBrowser() == 'Opera' || getBrowser() == 'OperaTouch' )
                alert("카카오톡으로 공유하시려면 다른 브라우저를 사용해주세요.");
            else
                kakaotalk();
        } else
            kakaotalk();
    }else if( kind == 'kakaotalkm') {
        if(getDevice() == 'iOS') {
            if (getBrowser() == 'Opera' || getBrowser() == 'OperaTouch')
                alert("카카오톡으로 공유하시려면 다른 브라우저를 사용해주세요.");
            else
                kakaotalkm();
        } else
            kakaotalkm();
    }else if( kind == 'band') {
        band();
    }
    conShare++;
    $('.btn_box .shere_btn').html('<i></i>'+getReadNumber(conShare));
    shareHistory(kind, '022c9b34-1d3d-11ed-9c43-0242ac1b0002');
}

function band() {

    var url   = shuturl;
    var title = sContentTitle;

    var _url   = encodeURIComponent(url);
    var _title = encodeURIComponent(title);
    var _br	= encodeURIComponent('\r\n');

    var gw_schemeUrl = 'create/post';
    var ga_schemeUrl = 'bandapp://create/post';
    var schemeUrl2 = 'bandapp://create/post';
    var param = '?text=' + _title + _br + _url;
    var param2 = '?text=' + _title + _br + _url + '&route=' + mainurl;
    var a_store = 'itms-apps://itunes.apple.com/app/id542613198';
    var g_store = 'market://details?id=com.nhn.android.band';
    var a_proto = 'bandapp://';
    var g_proto = 'scheme=bandapp;package=com.nhn.android.band';
    var ga_proto = 'package=com.nhn.android.band';

    var url2 = '';

    if (navigator.userAgent.match(/android/i) ) 	{
        var chkband = false;

        if( appYn == "Y" ) {
            var invisible_div = document.getElementById("invisible_div");
            invisible_div.innerHTML = "<iframe src=" + ga_schemeUrl  + param + " onload='goMarket();'></iframe>";
        }

        if( appYn == "Y" ) {
            url2 = "intent:" + ga_schemeUrl + param + "#Intent;" + g_proto + ";end;";
        } else {
            url2 = "intent://" + gw_schemeUrl + param+  "#Intent;" + g_proto + ";end;";
        }

        if( appYn == "N") {
            var startTime = new Date();
            setTimeout(function () {
                var endTime = new Date();
                if(endTime - startTime < 4000) {
                    window.location.href = g_store;
                }
            }, 2000) ;
        }

        setTimeout(function(){ window.location.href = url2; }, 100);

    } else if (navigator.userAgent.match(/(iphone)|(ipod)|(ipad)/i) || navigator.userAgent.match(/ios/i)) {

        url2 = schemeUrl2+param2;

        var startTime = new Date();
        setTimeout(function () {
            var endTime = new Date();
            if(endTime - startTime < 4000) {
                window.location.href = a_store;

            }
        }, 2000) ;

        //setTimeout(function(){ location.href = a_store; }, 500);
        if(getBrowser() == 'Opera' || getBrowser() == 'OperaTouch'){
            setTimeout(function(){ location.href = 'http://band.us/plugin/share?body=' + _title + _br + _url + '&route=' + _url; }, 300);
        } else{
            setTimeout(function(){ location.href = url2; }, 300);
        }
    } else {
        var url = 'http://band.us/plugin/share?body=' + _title + _br + _url + '&route=' + _url;
//			window.open(url, "share_band", "width=600, height=700, resizable=no");
        window.open(url, "share_band", "width=600, height=700, resizable=no");
    }
}

function goMarket() {
    window.location.href = 'market://details?id=com.nhn.android.band';
    return true;
}

function kakaotalk(){

    var kakaoshareimage = 'https://dev.ktovisitkorea.com/localfood/images/common/thumb.png';

    var kakaosharedesc =  '';
    if((ShareDesc1 + ShareDesc2) != '')
        kakaosharedesc = ShareDesc1 +'\n'+ ShareDesc2;
    //<![CDATA[
    Kakao.Link.createDefaultButton({
        container: '#kakao-link-btn',
        objectType: 'feed',
        content: {
            title: sContentTitle,
            description: kakaosharedesc,
            imageUrl: kakaoshareimage,
            link: {
                mobileWebUrl: oriUrl,
                webUrl: oriUrl
            }
        },
        buttons: [
            {
                title: '웹으로 보기',
                link: {
                    mobileWebUrl: oriUrl,
                    webUrl: oriUrl
                }
            }
        ]
    });
    //]]>

    $('#kakao-link-btn').trigger("click");
    Kakao.Link.cleanup();
};

// 모바일
function kakaotalkm(){

    var kakaoshareimage = 'https://dev.ktovisitkorea.com/localfood/images/common/thumb.png';

    //<![CDATA[
    Kakao.Link.createDefaultButton({
        container: '#kakao-link-btn-m',
        objectType: 'feed',
        content: {
            title: sContentTitle,
            description: ShareDesc1 +'\n'+ ShareDesc2,
            imageUrl: kakaoshareimage,
            link: {
                mobileWebUrl: oriUrl,
                webUrl: oriUrl
            }
        },
        buttons: [
            {
                title: '웹으로 보기',
                link: {
                    mobileWebUrl: oriUrl,
                    webUrl: oriUrl
                }
            }
        ]
    });
    //]]>

    $('#kakao-link-btn-m').trigger("click");
    Kakao.Link.cleanup();
};

function facebook(){

    var url = shuturl;
    var tit = sContentTitle;

    if (device == 'iOS') {
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url),'_system');
    } else {
        FB.ui({
            method: 'feed',
            link: url,
            title:tit,
            display:'popup'
        }, function(response){
            if (typeof response != 'undefined') {
            }
        });
    }
};

function twitter() {

    var msg = encodeURIComponent(sContentTitle);
    var	linkUrl = shuturl;

    var url = encodeURIComponent(linkUrl);

    w=window.open("https://twitter.com/intent/tweet?text="+msg+"&url="+url, '_system', 'width=450,height=400');
}

function kakaostory(){

    var	linkUrl = shuturl;

    Kakao.Story.share({
        url: linkUrl,
        text: sContentTitle
    });
};


var layerPopup = {
    init:function(){
        this.dimClickEv();
        this.activeBtn;
    },
    layerShow:function(targetLayer){
        layerjoin = document.activeElement
        this.activeBtn = $(document.activeElement);
        this.wrap = $('#'+ targetLayer);
        if (location.href.indexOf("/main/main.do") == -1 || targetLayer !== "safetyStay1" || this.wrap.filter('.dimmed') != null) {// 2021-09-28, dohyeong. 임시로 수정.. (추후 재수정 예정;;;)
            this.wrap.append('<div class="dimmed"></div>');
        }
        this.popup = this.wrap.find('.layerpop');
//		this.popup.attr('tabindex', -1).focus();

        // (공통)더보기
        if(this.wrap.show()){
            $('.list_thumType li .btn_view').removeClass('on');
            $('.list_reply li .btn_view').removeClass('on');
            $('.tit_cont .btn_titview').removeClass('on');
            $('.list_board1 li .btn_view').removeClass('on');
            this.popup.attr('tabindex', 0).focus();//20210105 수정
        }

        function popResize(){
            this.wrap = $('#'+ targetLayer);
            this.popup = this.wrap.find('.layerpop');

            var winScrollTop = $(window).scrollTop(),
                winWidth = $(window).width(),
                winHeight = $(window).height();

            var popWidthHalf = this.popup.width()/2,
                popHeightHalf = this.popup.height()/2, // 0203추가
                popWidth = this.popup.width(),
                popHeight = this.popup.outerHeight(),
                popupTop = (winScrollTop + (winHeight - popHeight)/2);

            // default x, y
            this.popup.css({ //	0203 수정
                'left' : '50%',
                'top' : '50%',
                'margin-left' : '-' + popWidthHalf + 'px',
                'margin-top' : '-' + popHeightHalf + 'px'
            });

            // window height > popup height
            /*			if(winHeight > popHeight){
                            $('body').css({
                                'overflow' : 'hidden'
                            });
                        }
            */
            // pc
            if(winWidth > 1023){
                // window height < popup height
                if(winHeight < popHeight){
                    this.popup.css({
                        'top' : popHeightHalf + 'px'
                    });
                }
            }

            // mobile
            if(winWidth <= 1023){
                // window width > popup width
                if(winWidth >= popWidth){
                    this.popup.css({
                        'left' : '50%',
                        'right' : 'inherit',
                        'margin-left' : '-' + popWidthHalf + 'px'
                    });
                }
                // window height < popup height
                if(winHeight < popHeight){
                    if(this.popup.parent().attr("id") != "popMemberLogin") {
                        this.popup.css({
                            'top' : winScrollTop + 15 + 'px'
                        });
                    }

                    if(this.popup.parent().attr("id") == "popCoupon" ||
                        this.popup.parent().attr("id") == "infoForm" ||
                        this.popup.parent().attr("id") == "missionPop" ||
                        this.popup.parent().attr("id") == "restaurant_report" ||
                        this.popup.parent().attr("id") == "travel100Detail" ||
                        this.popup.parent().attr("id") == "popMemberLogin"){
                        this.popup.css({
                            'top' : '50%'
                        });
                    }
                }
            }
        }
        popResize();

        $(window).resize(function(){
            popResize();
        })
    },
    layerHide:function(targetLayer){
        if(targetLayer)
            this.wrap = $('#'+ targetLayer);
        this.wrap.removeAttr('tabindex').hide();
        $('.dimmed').remove();
        $('.dimmed2').remove();
        this.activeBtn.focus();

        if(targetLayer == 'detailPop')
            $("meta[name=viewport]").attr("content", "width-device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no");
        layerjoin.focus();
        $('body').css({
            'overflow' : 'auto'
        });

        if(beforefocus != undefined){
            if($(beforefocus).closest('.pop_subMenu').attr('tabindex') == 0){
                $(beforefocus).closest('.pop_subMenu').siblings('button').addClass('on').attr('title', '닫기');
                $('body').append('<div class="dimmed2"></div>');
            }
            $(beforefocus).focus();
        }
    },
    dimClickEv:function(){
        $(document).on('click touchend', '.dimmed', function(){
            $('.wrap_layerpop').hide();
            $(this).remove();
            $('.dimmed2').remove();

            $('body').css({
                'overflow' : 'auto'
            });
        })
    },
    layerUpdate:function(targetLayer){
        function popResize(){
            this.wrap = $('#'+ targetLayer);
            this.popup = this.wrap.find('.layerpop');

            var winScrollTop = $(window).scrollTop(),
                winWidth = $(window).width(),
                winHeight = $(window).height();

            var popWidthHalf = this.popup.width()/2,
                popHeightHalf = this.popup.outerHeight()/2, // 0203추가
                popWidth = this.popup.width(),
                popHeight = this.popup.outerHeight(),
                popupTop = (winScrollTop + (winHeight - popHeight)/2);

            // default x, y
            this.popup.css({ //	0203 수정
                'left' : '50%',
                'top' : '50%',
                'margin-left' : '-' + popWidthHalf + 'px',
                'margin-top' : '-' + popHeightHalf + 'px'
            });

            // window height > popup height
            /*			if(winHeight > popHeight){
                            $('body').css({
                                'overflow' : 'hidden'
                            });
                        }
            */
            // pc
            if(winWidth > 1023){
                // window height < popup height
                if(winHeight < popHeight){
                    this.popup.css({
                        'top' : popHeightHalf + 'px'
                    });
                }
            }

            // mobile
            if(winWidth <= 1023){
                // window width > popup width
                if(winWidth >= popWidth){
                    this.popup.css({
                        'left' : '50%',
                        'right' : 'inherit',
                        'margin-left' : '-' + popWidthHalf + 'px'
                    });
                }
                // window height < popup height
                if(winHeight < popHeight){
                    this.popup.css({
                        'top' : winScrollTop + 15 + 'px'
                    });

                    if(this.popup.parent().attr("id") == "popCoupon" ||
                        this.popup.parent().attr("id") == "infoForm" ||
                        this.popup.parent().attr("id") == "missionPop" ||
                        this.popup.parent().attr("id") == "travel100Detail"){
                        this.popup.css({
                            'top' : '50%'
                        });
                    }
                }
            }
        }
        popResize();
    }
}

function setLike() {
    if( $.cookie('content_022c9b34-1d3d-11ed-9c43-0242ac1b0002') == 'Y') {
        alert('이미 좋아요를 누르셨습니다.');
    } else {

        $.ajax({
            url: mainurl+'/call',
            dataType: 'json',
            type: "POST",
            data: {
                cmd : 'CONTENT_LIKE_SAVE',
                cotid : '022c9b34-1d3d-11ed-9c43-0242ac1b0002'
            },
            success: function(data) {
                alert('좋아요를 저장하였습니다.');
                conLike++;
                $('.btn_box .wish_btn').html('<i></i>'+getReadNumber(conLike));


                $.cookie('content_022c9b34-1d3d-11ed-9c43-0242ac1b0002', 'Y', {expires: 1, path:'/'});
            },
            complete: function() {
            },
            error: function(xhr, textStatus, errorThrown) {
            }
        });
    }
}

function getSnsCnt(){
    $.ajax({
        url: mainurl+'/call',
        dataType: 'json',
        type: "POST",
        data: {
            cmd : 'GET_TWEEK_PAPER_INFO',
            cotId : '022c9b34-1d3d-11ed-9c43-0242ac1b0002'
        },
        success: function(data) {
            if(data.header.process == 'success'){
                if(data.body.result && data.body.result.conLike)
                    conLike = Number(data.body.result.conLike);
                if(data.body.result && data.body.result.conLike)
                    conShare = Number(data.body.result.conShare);
            }
            $('.btn_box .wish_btn').html('<i></i>'+getReadNumber(conLike));
            $('.btn_box .shere_btn').html('<i></i>'+getReadNumber(conShare));
        },
        complete: function() {
        },
        error: function(xhr, textStatus, errorThrown) {
        }
    });
}