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
        client_id: clientID
    });
    var tracks = [ "164773080", "22454575", "155143944", "130679842", "86282419", "56511482", "11295149", "135397912", "62837562", "120452997", "157838635", "89421686", "74376031", "6430227", "15145917", "21682519", "115522159", "30709985", "156821162", "132999269", "166262342", "164975479", "138156927", "156878091", "155226337", "148393347", "114283628", "1284839", "35691245", "35498261", "16692104", "35498404", "23126532", "93549370", "4981703", "166246330", "163555600", "165138064", "50702267", "159146247", "164156075", "112470822", "94000680", "124126863", "68726077", "153438725", "106374730", "104281995", "124089497", "32407942", "45838370", "53847841", "148924485", "144391107", "166336588", "166353637", "157407766", "16831032", "155191090", "13756912", "2405882", "97251636", "115625903", "129848489", "144651161", "36501094", "110175342", "32242910", "53126096", "30868816", "45821728", "19095016", "32740736", "72139376", "161171541", "159049473", "159049476", "159049469", "104281995", "98189196", "160833198", "48102295", "157958765", "17260113", "171383711", "171082727", "170643277" ], i = 0, playNewTrack = function(trackID) {
        $.ajax({
            url: "http://api.soundcloud.com/tracks/" + trackID + ".json?client_id=" + clientID,
            type: "get",
            dataType: "json",
            success: function(data) {
                SC.stream("/tracks/" + trackID, function(sound) {
                    sound.play({
                        onfinish: function() {
                            console.log("song over"), sound.destruct(), playMusic();
                        },
                        onstop: function() {
                            sound.destruct(), playMusic();
                        }
                    }), console.log(data), $("#artwork a, #artwork img").remove(), $("#title").empty().html('<a data-popup="true" href="' + data.permalink_url + '">' + data.title + "</a>"), 
                    $("#artist").empty().html('<a data-popup="true" href="' + data.user.permalink_url + '">' + data.user.username + "</a>"), 
                    null != data.artwork_url ? ($("#artwork").append('<img src="' + data.artwork_url + '">'), 
                    $("nav").addClass("image-artwork"), null != data.purchase_url && $("#artwork img").wrap('<a data-popup="true" href="' + data.purchase_url + '">')) : ($("#artwork").remove("img"), 
                    $("#artwork").remove("a"), $("nav").removeClass("image-artwork")), $("#artwork a").attr("href", data.purchase_url), 
                    $("#play-pause").on("click", function() {
                        console.log("pausing/playing"), sound.togglePause();
                    }), $("#skip").on("click", function() {
                        console.log("skipping song"), sound.stop();
                    }), i++, console.log(i), $("nav").addClass("song-loaded");
                });
            }
        });
    };
    playMusic();
});