$(document).keyup(function(event) {
    if (event.keyCode == '13') {
        $('.btn-login').trigger('click');

    }
});

setTimeout(function() {
    // $('.main-panel').css('background-image', 'url(https://source.unsplash.com/daily?office');
}, 200);