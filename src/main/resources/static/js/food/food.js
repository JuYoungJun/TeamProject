

function loadFood(cat1) {
    var sigunguCode = document.getElementById('sigunguCode').value;
    console.log("시군구코드"+sigunguCode)
    console.log("푸드정보 넘기기 ajax");

    $.ajax({
        url: '/food/data',  // JSON 데이터를 반환하는 엔드포인트
        type: 'POST',
        data: {
            sigunguCode: sigunguCode,
            cat1: cat1
        },
        success: function(response) {
            // JSON 데이터를 처리 (슬라이더 초기화, 데이터 처리 등)
            console.log("푸드넘기기 성공 ajax");
            var listRating = response.listRating; // 또는 response['listRating']
            var listReview = response.listReview; // 또는 response['listReview']
            updateFoodList(listRating, listReview);

            // 리스트가 있을 경우에만 함수 호출

        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
            console.log("Status:", status);
            console.log("Error:", error);
            console.log("Response Text:", xhr.responseText);  // 응답 내용 확인
        }
    });
}
function loadFoodGu(cat1) {
    var sigunguCode = document.getElementById('sigunguCode').value;
    console.log("시군구코드"+sigunguCode)
    console.log("푸드정보 넘기기 ajax");

    $.ajax({
        url: '/food/foodGu/data',  // JSON 데이터를 반환하는 엔드포인트
        type: 'POST',
        data: {
            sigunguCode: sigunguCode,
            cat1: cat1
        },
        success: function(response) {
            // JSON 데이터를 처리 (슬라이더 초기화, 데이터 처리 등)
            console.log("푸드넘기기 성공 ajax");
            var listRating = response.listRating;
            console.log("리스트레이팅"+listRating);// 또는 response['listRating']
            var listReview = response.listReview; // 또는 response['listReview']
            updateFoodList(listRating, listReview);

            // 리스트가 있을 경우에만 함수 호출

        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
            console.log("Status:", status);
            console.log("Error:", error);
            console.log("Response Text:", xhr.responseText);  // 응답 내용 확인
        }
    });
}

function loadFoodDistrictGu(sigunguCode, centerLat, centerLng, guName) {
    // 1. JSON 데이터를 먼저 받아옴
    console.log("푸드구정보 넘기기 ajax");
    var cat1 = '';
    $.ajax({
        url: '/food/foodGu/data',  // JSON 데이터를 반환하는 엔드포인트
        type: 'POST',
        data: {
            sigunguCode: sigunguCode,
            centerLat: centerLat,
            centerLng: centerLng,
            guName: guName,
            cat1: cat1
        },
        success: function(response) {
            // JSON 데이터를 처리 (슬라이더 초기화, 데이터 처리 등)
            console.log("푸드구넘기기 성공 ajax");
            var listRating = response.listRating; // 또는 response['listRating']
            var listReview = response.listReview; // 또는 response['listReview']
            var returnedSigunguCode = response.sigunguCode;

            // sigunguCode를 input 필드에 설정
            $('#sigunguCode').val(returnedSigunguCode);
            updateFoodList(listRating, listReview);
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
        url: '/food/foodGu',  // HTML 조각을 반환하는 엔드포인트
        type: 'POST',
        data: {
            sigunguCode: sigunguCode,
            centerLat: centerLat,
            centerLng: centerLng,
            guName: guName
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

function loadFoodDongs(cat1) {
    var sigunguCode = document.getElementById('sigunguCode').value;
    var guName = document.getElementById('guName').value;
    var dongName = document.getElementById('dongName').value;
    console.log("동네임=" +dongName);
    console.log("푸드정보 넘기기 ajax");

    $.ajax({
        url: '/food/'+guName+'/foodDongs/data',  // JSON 데이터를 반환하는 엔드포인트
        type: 'POST',
        data: {
            sigunguCode: sigunguCode,
            cat1: cat1,
            guName:guName,
            dongName:dongName
        },
        success: function(response) {
            // JSON 데이터를 처리 (슬라이더 초기화, 데이터 처리 등)
            console.log("푸드넘기기 성공 ajax");
            var listRating = response.listRating;
            console.log("리스트레이팅"+listRating);// 또는 response['listRating']
            var listReview = response.listReview; // 또는 response['listReview']
            console.log("리스트리뷰"+listReview);// 또는 response['listRating']
            updateFoodList(listRating, listReview);

            // 리스트가 있을 경우에만 함수 호출

        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
            console.log("Status:", status);
            console.log("Error:", error);
            console.log("Response Text:", xhr.responseText);  // 응답 내용 확인
        }
    });
}

// 새로운 버튼을 추가하는 함수
function replaceGu() {
    // <div class="sortwrap only_w"> 요소 선택
    var sortwrapDiv = document.querySelector('.sortwrap.only_w');

    // 새로운 HTML 내용
    var newContent = `
        <ul>
            <li class="on" data-cate="all">
                <button onclick="loadFoodGu('')">전체</button>
            </li>
            <li class="res" data-cate="restaurant">
                <button onclick="loadFoodGu('restaurant')">음식점</button>
            </li>
            <li class="cafe" data-cate="cafe">
                <button onclick="loadFoodGu('cafe')">카페</button>
            </li>
        </ul>
    `;

    // 기존 내용 교체
    sortwrapDiv.innerHTML = newContent;
}


function replaceDong() {
    // <div class="sortwrap only_w"> 요소 선택
    var sortwrapDiv = document.querySelector('.sortwrap.only_w');

    // 새로운 HTML 내용
    var newContent = `
        <ul>
            <li class="on" data-cate="all">
                <button onclick="loadFoodDongs('')">전체</button>
            </li>
            <li class="res" data-cate="restaurant">
                <button onclick="loadFoodDongs('restaurant')">음식점</button>
            </li>
            <li class="cafe" data-cate="cafe">
                <button onclick="loadFoodDongs('cafe')">카페</button>
            </li>
        </ul>
    `;

    // 기존 내용 교체
    sortwrapDiv.innerHTML = newContent;
}
