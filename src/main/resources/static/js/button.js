function goMap1() {
    $.ajax({
        type: 'POST',
        url: '/map',
        success: function(response) {
            $('.map_content').html(response);
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}

function goMap2(sigunguCode) {
    $.ajax({
        type: 'POST',
        url: '/gu',
        data: {
            centerLat: centerLat,
            centerLng: centerLng,
            sigunguCode: sigunguCode,
            guName : guName

        },
        success: function(response) {
            $('.map_content').html(response);
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}

function goMainSports() {
    $.ajax({
        type: 'POST',
        url: '/mapSports',
        success: function(response) {
            $('.map_content').html(response);
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}

function goMainParking() {
    $.ajax({
        type: 'POST',
        url: '/mapParking',
        success: function(response) {
            $('.map_content').html(response);
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}