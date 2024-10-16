// 마커와 폴리라인 지우기 함수
var markers = markers || [];
var polylines = [];

function resetMap(){
    $.ajax({
        url: '/map2',  // 서버에 요청할 URL (서버에서 해당 경로에 맞는 데이터를 응답해줘야 함)
        method: 'POST', // 데이터를 서버로 보내는 방식 (POST)
        // 필요한 파라미터 전송
        success: function(response) {
            // 서버에서 받은 HTML을 .map_content에 삽입
            $('.map_content').html(response);
        },
        error: function(xhr, status, error) {
            console.error('Error while reloading content:', error);
        }
    });
}
function clearMapElements() {

    markers.forEach(function(marker) {
        marker.setMap(null); // 기존 마커 삭제
    });
    markers = []; // 마커 배열 초기화

    polylines.forEach(function(line) {
        line.setMap(null); // 기존 폴리라인 삭제
    });
    polylines = []; // 폴리라인 배열 초기화

}

// 랜덤으로 입력된 개수만큼의 위치 선택하기
function getRandomLocations(lists, count) {

    var shuffled = lists.sort(() => 0.5 - Math.random()); // 랜덤으로 섞기
    return shuffled.slice(0, count); // 입력받은 개수만큼 선택
}

// 구글 거리 계산 서비스 초기화
var distanceService = new google.maps.DistanceMatrixService();


// 거리 및 소요시간 계산 함수
function calculateDistance(origin, destination, callback) {
    distanceService.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: 'TRANSIT',
        // 기본 모드는 걷기

    }, function(response, status) {
        console.log('출발지:', origin);
        console.log('목적지:', destination);
        console.log('응답:', response); // 전체 응답을 로그로 확인
        console.log('상태:', status); // 상태 확인
        if (status === 'OK') {
            var result = response.rows[0].elements[0];
            console.log('응답 데이터:', result);
            if (result && result.distance && result.duration) {
                var distance = result.distance.text;
                var duration = result.duration.text;
//                var distanceValue = result.distance.value;
//                var speedKmh = 25; // 시속 25km
//                var timeHours = distanceValue / 1000 / speedKmh; // 시간 단위로 소요 시간 계산
//                var timeMinutes = timeHours * 60;
//
//                var durationText = `${Math.round(timeMinutes)} 분`; // 소요 시간을 텍스트로 변환
                console.log('거리:', distance);
                console.log('소요 시간:', duration);// 분 단위로 변환

                var infoWindow = new google.maps.InfoWindow({
                    content: `
                        <div style="padding:5px; font-size:12px; max-width: 150px; line-height: 1.3; white-space: normal; text-align: left;">
                            <b style="color:red; white-space: nowrap;">거리:</b> ${distance}<br/>
                            <b style="color:red;  white-space: nowrap;">소요 시간:</b> ${duration}
                        </div>`,
                    position: destination,
                    pixelOffset: new google.maps.Size(0, -50)
                });

                infoWindow.open(map);

                callback(distance, duration);


            } else {
                console.error('걷기 거리 또는 소요 시간 정보를 가져오는 데 실패했습니다.');
                callback('정보 없음', '정보 없음', '정보 없음');
            }
        } else {
            console.error('걷기 소요 시간 요청 실패:', status);
            callback('정보 없음', '정보 없음', '정보 없음');
        }
    });
}

// 선 애니메이션 함수
function animatePolyline(startPosition, endPosition, map, duration, callback) {
    var line = new google.maps.Polyline({
        path: [startPosition, startPosition], // 초기에는 시작점만
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
    });
    polylines.push(line);

    var startTime = new Date().getTime();
    var interval = setInterval(function() {
        var currentTime = new Date().getTime();
        var progress = Math.min((currentTime - startTime) / duration, 1); // 0 ~ 1까지

        var lat = startPosition.lat + (endPosition.lat - startPosition.lat) * progress;
        var lng = startPosition.lng + (endPosition.lng - startPosition.lng) * progress;
        line.setPath([startPosition, { lat: lat, lng: lng }]);

        if (progress >= 1) {
            clearInterval(interval); // 애니메이션 종료
            if (callback) callback(); // 콜백 실행 (마커 추가)
        }
    }, 16); // 약 60fps
}

// 전역 변수로 캐릭터 마커 선언
var characterMarker = null;

function addMarkersAndLines(randomLocations, callback) {
    var positions = []; // 마커 위치 저장 배열

    function createMarkerWithAnimation(location, index) {
        var markerPosition = { lat: location.mapY, lng: location.mapX };

        // 마커 클릭 시 정보창 표시
        var infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding:10px; width: 200px; box-sizing: border-box; font-size: 14px;">
                    <b style="display: block; margin-bottom: 5px;">${index + 1}: ${location.title}</b>
                    <p style="margin: 0 0 5px; white-space: pre-line; font-size: 13px;">${location.addr1}<br>${location.addr2}</p>
                    <p style="margin: 0; padding: 5px; background-color: #f0f0f0; border-radius: 5px; text-align: center; font-size: 13px;">Tel: ${location.tel}</p>                    
                </div>`
        });

        var marker = new google.maps.Marker({
            position: markerPosition,
            map: map,

            title: `${index + 1}: ${location.title}`,
            // 마커 아이콘을 커스텀 이미지로 변경하려면 아래 코드를 사용하세요.
             icon: {
                 url: '/images/pin.png',
                 scaledSize: new google.maps.Size(20, 42)
             }
        });

        marker.addListener('mouseover', function () {
            infoWindow.open(map, marker); // 마우스 오버 시 정보창 열기
        });

        marker.addListener('mouseout', function () {
            infoWindow.close(); // 마우스 아웃 시 정보창 닫기
        });

        markers.push(marker); // 마커 배열에 저장
    }

    function animateMarkerAndLine(index) {
        if (index === randomLocations.length) {
            // 애니메이션이 모두 끝나면 캐릭터 마커를 지도에서 제거하거나 유지할 수 있습니다.
            if (characterMarker) {
                characterMarker.setMap(null); // 캐릭터 마커 제거
            }
            if (callback) callback(); // 마지막 작업 후 콜백 실행
            return;
        }

        var location = randomLocations[index];
        if (index === 0) {
            // 첫 번째 마커는 바로 표시
            createMarkerWithAnimation(location, index);
            positions.push({ lat: location.mapY, lng: location.mapX });

            // 다음 마커로 이동
            setTimeout(function () {
                animateMarkerAndLine(index + 1); // 다음 마커 및 캐릭터 애니메이션
            }, 1000); // 1초 대기 후 시작
        } else {
            // 이후 마커는 캐릭터 애니메이션 후에 표시
            animateCharacter(
                positions[index - 1],
                { lat: location.mapY, lng: location.mapX },
                map,
                3000, // 캐릭터 애니메이션 시간 (밀리초)
                function() {
                    createMarkerWithAnimation(location, index); // 캐릭터 애니메이션 후 마커 추가
                    positions.push({ lat: location.mapY, lng: location.mapX }); // 위치 저장

                    // 거리 및 소요시간 계산 후 출력 (선택 사항)
                    calculateDistance(positions[index - 1], positions[index], function(distance, duration) {
                        console.log(`거리: ${distance}, 소요 시간: ${duration}`);
                    });

                    // 다음 마커로 이동
                    setTimeout(function () {
                        animateMarkerAndLine(index + 1); // 다음 마커 및 캐릭터 애니메이션
                    }, 3000); // 2초 대기 후 다음 마커로 이동
                }
            );
        }
    }

    animateMarkerAndLine(0); // 첫 번째 마커로 시작
}function addMarkersAndLines(randomLocations, callback) {
    var positions = []; // 마커 위치 저장 배열
    var markerInfos = []; // 마커 정보를 저장할 배열

    function createMarkerWithAnimation(location, index) {
        var markerPosition = {lat: location.mapY, lng: location.mapX};

        // 마커 클릭 시 정보창 표시
        var infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding:10px; width: 200px; box-sizing: border-box; font-size: 14px;">
                    <b style="display: block; margin-bottom: 5px;">${index + 1}: ${location.title}</b>
                    <img src="${location.firstImage}" alt="Image" style="width:100%;max-width:200px;height:auto;border-radius: 5px;margin-bottom: 10px;">
                    <p style="margin: 0 0 5px; white-space: pre-line; font-size: 13px;">${location.addr1}</p>
                    <p style="margin: 0; padding: 5px; background-color: #f0f0f0; border-radius: 5px; text-align: center; font-size: 13px;">Tel: ${location.tel}</p>
                    
                </div>`
        });

        var marker = new google.maps.Marker({
            position: markerPosition,
            map: map,
            title: `${index + 1}: ${location.title}`,
            icon: {
                url: '/images/marker/pin.png',
                scaledSize: new google.maps.Size(20, 40), // 마커 크기 (너비, 높이)
                origin: new google.maps.Point(0, 0), // 이미지의 시작점
                anchor: new google.maps.Point(20, 40) // 마커의 기준점 (이미지 내에서 기준 위치)
            }// 관광지 이름
        });

        marker.addListener('mouseover', function () {
            infoWindow.open(map, marker); // 마우스 오버 시 정보창 열기
        });

        marker.addListener('mouseout', function () {
            infoWindow.close(); // 마우스 아웃 시 정보창 닫기
        });

        markers.push(marker); // 마커 배열에 저장
        console.log(lists);
        // 마커 정보 저장
        markerInfos.push({
            index: index + 1,
            title: location.title,
            image: location.firstImage,
            address1: location.addr1,
            address2: location.addr2,
            home: location.home,
            description: location.description,
            tel: location.tel,
            lat: location.mapY,
            lng: location.mapX
        });
    }

    function animateMarkerAndLine(index) {
        if (index === randomLocations.length) {
            // 모든 마커 생성 및 애니메이션 완료 후 마커 정보 표시
            displayMarkerInfos();

            if (characterMarker) {
                characterMarker.setMap(null); // 캐릭터 마커 제거
            }
            if (callback) callback(); // 마지막 작업 후 콜백 실행
            return;
        }

        var location = randomLocations[index];
        if (index === 0) {
            // 첫 번째 마커는 바로 표시
            createMarkerWithAnimation(location, index);
            positions.push({lat: location.mapY, lng: location.mapX});

            // 다음 마커로 이동
            setTimeout(function () {
                animateMarkerAndLine(index + 1); // 다음 마커 및 캐릭터 애니메이션
            }, 1000); // 1초 대기 후 시작
        } else {
            // 이후 마커는 캐릭터 애니메이션 후에 표시
            animateCharacter(
                positions[index - 1],
                {lat: location.mapY, lng: location.mapX},
                map,
                3000, // 캐릭터 애니메이션 시간 (밀리초)
                function () {
                    createMarkerWithAnimation(location, index); // 캐릭터 애니메이션 후 마커 추가
                    positions.push({lat: location.mapY, lng: location.mapX}); // 위치 저장

                    // 거리 및 소요시간 계산 후 출력 (선택 사항)
                    calculateDistance(positions[index - 1], positions[index], function (distance, duration) {
                        console.log(`거리: ${distance}, 소요 시간: ${duration}`);
                    });

                    // 다음 마커로 이동
                    setTimeout(function () {
                        animateMarkerAndLine(index + 1); // 다음 마커 및 캐릭터 애니메이션
                    }, 3000); // 3초 대기 후 다음 마커로 이동
                }
            );
        }
    }

    animateMarkerAndLine(0); // 첫 번째 마커로 시작

    function displayMarkerInfos() {
        var markerInfoDiv = document.getElementById('marker-info');
        markerInfoDiv.innerHTML = ''; // 기존 내용 초기화

        markerInfos.forEach(function(info, index) {
            setTimeout(function() {
                var infoElement = document.createElement('div');
                infoElement.className = 'marker-card';
                infoElement.style.opacity = '0'; // 초기 투명도 0
                infoElement.style.transition = 'opacity 0.5s ease'; // 투명도 변화에 대한 트랜지션 설정

                // XSS 방지를 위한 이스케이프 처리
                var safeDescription = escapeHtml(info.description);

                infoElement.innerHTML = `
                <div class="card-header">
                   
                    <div class="profile-name">${info.index}. ${info.title}</div>
                </div>
                <div class="card-body">
                    <div class="card-image">
                        <img src="${info.image}" alt="Image">
                    </div>
                    <div class="card-content">
                        <p class="description"><strong>${info.title}</strong> ${safeDescription}</p>
                        <p class="address">📍 ${info.address1}</p>
                        <p class="tel">📞 ${info.tel}</p>
                        <p class="website-link">🔗 <a href="${info.home}" target="_blank">웹사이트 바로가기</a></p>
                    </div>
                </div>
            `;

                markerInfoDiv.appendChild(infoElement);

                // 약간의 지연 후에 카드의 투명도를 1로 변경하여 페이드 인 효과
                setTimeout(function() {
                    infoElement.style.opacity = '1';
                }, 50); // 50ms 후에 opacity 변경

            }, index * 500); // 각 카드마다 0.5초 지연
        });
    }

// XSS 방지를 위한 함수
    function escapeHtml(text) {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
            '`': '&#096;'
        };
        return text.replace(/[&<>"'`]/g, function(m) { return map[m]; });
    }


}
// 버튼 클릭 시 랜덤으로 마커와 선 표시


function animateCharacter(startPosition, endPosition, map, duration, callback) {
    var startTime = new Date().getTime();
    var interval = setInterval(function() {
        var elapsed = new Date().getTime() - startTime;
        var progress = Math.min(elapsed / duration, 1);

        // 위치 인터폴레이션 (geometry 라이브러리 사용 시)
        var currentPosition = google.maps.geometry.spherical.interpolate(
            startPosition,
            endPosition,
            progress
        );

        if (characterMarker === null) {
            characterMarker = new google.maps.Marker({
                position: currentPosition,
                map: map,
                icon: {
                    url: '/images/char.png',
                    scaledSize: new google.maps.Size(50, 50)
                },
                zIndex: 9999
            });
        } else {
            characterMarker.setPosition(currentPosition);
        }

        if (progress >= 1) {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 16);
}
