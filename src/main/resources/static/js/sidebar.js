
function sidebarData(id) {
    $.ajax({
        type: 'POST',
        url: '/sidebarData',
        data: {
            id: id
        },
        success: function(response) {
            updateSidebar(response);
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}
function sidebarData2(id) {
    $.ajax({
        type: 'POST',
        url: '/sidebarData2',
        data: {
            id: id
        },
        success: function(response) {
            updateSidebar(response);
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}

function updateSidebar(data) {
    // 서버에서 받은 데이터를 사이드바에 렌더링
    $('#sidebarContent img').attr('src', data.firstImage ? data.firstImage : '/images/default.jpg');
    $('#sidebarContent h2').text(data.title || '제목');
    $('#sidebarContent p.addr').text(data.addr1 || '주소');
    $('#sidebarContent p.tel').text(data.tel || '전화번호');
    $('#sidebarContent p.description').text(data.description || '설명 없음');
}

// function loadDistrict(sigunguCode,centerLat,centerLng,districtName) {
//     $.ajax({
//         url: '/gu',
//         type: 'POST',
//         data : {
//             sigunguCode : sigunguCode,
//             centerLat: centerLat,
//             centerLng: centerLng,
//             guName: districtName
//         },
//         success: function(response) {
//             // 서버로부터 받은 HTML을 .map_content 클래스 요소에 삽입
//             $('.map_content').html(response);
//
//         },
//         error: function(xhr, status, error) {
//             console.error('Error fetching content:', error);
//         }
//     });
// }

function loadDistrict(sigunguCode, centerLat, centerLng, districtName) {
    // 1. JSON 데이터를 먼저 받아옴
    console.log("구지도정보 넘기기 ajax");
    $.ajax({
        url: '/gu/data',  // JSON 데이터를 반환하는 엔드포인트
        type: 'POST',
        data: {
            sigunguCode: sigunguCode,
            centerLat: centerLat,
            centerLng: centerLng,
            guName: districtName
        },
        success: function(response) {
            // JSON 데이터를 처리 (슬라이더 초기화, 데이터 처리 등)
            console.log("구정보넘기기 성공 ajax");
            var list = response;
            console.log("list:", list);
            updateTravelList(list);
               // 리스트가 있을 경우에만 함수 호출

        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
            console.log("Status:", status);
            console.log("Error:", error);
            console.log("Response Text:", xhr.responseText);  // 응답 내용 확인
        }
    });

    // 2. HTML 조각을 다시 받아옴
    $.ajax({
        url: '/gu',  // HTML 조각을 반환하는 엔드포인트
        type: 'POST',
        data: {
            sigunguCode: sigunguCode,
            centerLat: centerLat,
            centerLng: centerLng,
            guName: districtName
        },
        success: function(response) {
            // 서버로부터 받은 HTML을 .map_content 클래스 요소에 삽입
            $('.map_content').html(response);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching HTML content:', error);
        }
    });
}

function loadFoodDong(sigunguCode, centerLat, centerLng, guName,dongName) {
    // 1. JSON 데이터를 먼저 받아옴
    $.ajax({
        type: 'POST',
        url: '/' + guName + '/foodDongs',
        data: {
            dongName: dongName,
            sigunguCode: sigunguCode,
            guName: guName,
            centerLat: centerLat,
            centerLng: centerLng
        },
        success: function (response) {
            $('.map_content').html(response);

        },
        error: function (error) {
            console.error('Error:', error);
        }


    });
    var cat1 = '';
    // 2. HTML 조각을 다시 받아옴
    $.ajax({
        type: 'POST',
        url: '/food/' + guName + '/foodDongs/data',
        data: {
            dongName: dongName,
            sigunguCode: sigunguCode,
            guName: guName,
            centerLat: centerLat,
            centerLng: centerLng,
            cat1: cat1

        },
        success: function (response) {
            var listRating = response.listRating; // 또는 response['listRating']
            var listReview = response.listReview;
            var guName = response.guName;
            $('#guName').val(guName);
            var dongName = response.dongName;
            console.log("구네임은"+guName)
            console.log("동네임은"+dongName)
            $('#dongName').val(dongName);

            updateFoodList(listRating, listReview);
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}



function loadDong(sigunguCode, centerLat, centerLng, guName,dongName) {
    // 1. JSON 데이터를 먼저 받아옴
    console.log("로딩 동");
    $.ajax({
        type: 'POST',
        url: '/'+guName+'/dongs',
        data: {
            dongName: dongName,
            sigunguCode: sigunguCode,
            guName : guName,
            centerLat :centerLat,
            centerLng :centerLng
        },
        success: function(response) {
            $('.map_content').html(response);

        },
        error: function(error) {
            console.error('Error:', error);
        }




    });

    // 2. HTML 조각을 다시 받아옴
    $.ajax({
        type: 'POST',
        url: '/'+guName+'/dongs/data',
        data: {
            dongName: dongName,

        },
        success: function(response) {
            var list = response;

            updateTravelList(list);
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}
