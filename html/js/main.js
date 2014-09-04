$(function() {
    function playMusic() {
        console.log("new song playing"), shuffle(tracks), playNewTrack(tracks[0]);
    }
    function shuffle(sourceArray) {
        for (var n = 0; n < sourceArray.length - 1; n++) {
            var k = n + Math.floor(Math.random() * (sourceArray.length - n)), temp = sourceArray[k];
            sourceArray[k] = sourceArray[n], sourceArray[n] = temp;
        }
    }
    var clientID = "3869b2e3b6e85b175e114b4e19042775";
    SC.initialize({
        client_id: clientID,
        redirect_uri: "http://google.com"
    });
    var tracks = [ "164773080", "165964904", "22454575", "155143944", "130679842", "86282419", "56511482", "11295149", "135397912", "120452997", "157838635", "89421686", "74376031", "6430227", "15145917", "21682519", "115522159", "30709985", "156821162", "132999269" ], playNewTrack = function(trackID) {
        $.ajax({
            url: "http://api.soundcloud.com/tracks/" + trackID + ".json?client_id=" + clientID,
            type: "get",
            dataType: "json",
            success: function(data) {
                SC.stream("/tracks/" + trackID, function(sound) {
                    sound.play({
                        onfinish: function() {
                            console.log("song over"), sound.destruct(), playMusic();
                        }
                    }), console.log(data), $("#title").empty().html(data.title), $("#artist").empty().html(data.user.username), 
                    null != data.artwork_url ? ($("#artwork").append('<img src="' + data.artwork_url + '">'), 
                    $("nav").addClass("image-artwork"), null != data.purchase_url && $("#artwork img").wrap('<a href="' + data.purchase_url + '">')) : ($("#artwork").remove("img"), 
                    $("#artwork").remove("a"), $("nav").removeClass("image-artwork")), $("#artwork a").attr("href", data.purchase_url), 
                    $("nav").on("click", function() {
                        console.log("pausing/playing"), sound.togglePause();
                    });
                });
            }
        });
    };
    playMusic();
    var videos = [ [ "zez8Dza-TwQ", "2000" ], [ "C8tEK-0nybo", "2000" ], [ "55gOBu_PvXE", "2000" ], [ "01TwapLmoP8", "2000" ], [ "TheFr7Nl-zY", "2000" ], [ "P5_GlAOCHyE", "2000" ] ];
    setInterval(function() {
        {
            var player = $("#video-player").get(0), randomVideo = Math.floor(Math.random() * videos.length);
            "//www.youtube.com/embed/" + videos[randomVideo][0] + "?autoplay=1&enablejsapi=1";
        }
        player.mute();
    }, 3e4);
});