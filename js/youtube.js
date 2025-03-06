var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '450',
        width: '800',
        videoId: 'rLuPgKSMsfw',
        playerVars: {
            'autoplay': 1,
            'controls': 1,
            'disablekb': 0,
            'enablejsapi': 1,
            'fs': 1,
            'rel': 0,
            'showinfo': 0,
            'modestbranding': 1,
            'mute': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
    
    setTimeout(function() {
        player.pauseVideo();
        document.getElementById('redirect-overlay').classList.remove('hidden');
    }, 10000);
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        document.getElementById('redirect-overlay').classList.remove('hidden');
    }
}