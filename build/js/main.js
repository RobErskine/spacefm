$(function(){

	var clientID = '3869b2e3b6e85b175e114b4e19042775';

	// sound cloud integration
	SC.initialize({
		client_id: clientID
	});

	var tracks = [		// list of all tracks 
		"164773080",	// slow magic | waited4u
		"165964904",	// the six | too much love
		"22454575",		// cfcf | come true
		"155143944",	// tycho | awake (com truise remix)
		"130679842",	// com truise | subsonic
		"86282419",		// com truise | idle withdraw
		"56511482",		// explosions in the sky | so long, lonesome
		"11295149",		// balmorea | Truth (Helios Remix)
		"135397912",	// teen daze | tokyo winter
		"120452997",	// nils frahm | you (teen daze rework)
		"157838635",	// pogo | puff love
		"89421686",		// elite gymnastics | minneapolis belongs to you 2
		"74376031",		// West One Music Group | washed away
		"6430227",		// daft punk | something about us
		"15145917",		// thieves like us | flow my tears, the police man said
		"21682519",		// slohmo | anywhere but here
		"115522159",	// fourtet | unicorn
		"30709985",		// fourtet | moma
		"156821162",	// bonobo | duels
		"132999269",	// bonobo | antenna
		"166262342",	// millionyoung | dire, dire docks
		"164975479",	// millionyoung | Fade Out (telescope thieves remix)
		"138156927",	// millionyoung | captn hook 
		"156878091",	// tennyson | lay-by
		"155226337",	// avidd | ??????
		"148393347",	// blackbird blackbird
		"114283628",	// slow magic | gold panda - brazil remix
		"1284839",		// moderat | a new error
		"35691245",		// seekae | 3
		"35498261",		// seekae | forest fire
		"16692104",		// telos2010 | yurai (telos remix)
		"35498404",		// seekae | void
	];

	var i = 0;

	var playNewTrack = function(trackID){ // play that funky music space boy
		$.ajax({
			url: "http://api.soundcloud.com/tracks/" + trackID + ".json?client_id=" + clientID,
			type: 'get',
			dataType: 'json',
			success: function(data){

				SC.stream("/tracks/"+trackID, function(sound){
					sound.play({
						onfinish: function(){
							console.log("song over");
							sound.destruct();
							playMusic();
						},
						onstop: function(){
							sound.destruct();
							playMusic();
						}
					});

					console.log(data);

					$('#artwork a, #artwork img').remove();

					$('#title').empty().html('<a data-popup="true" href="' + data.permalink_url + '">' + data.title + '</a>');
					$('#artist').empty().html('<a data-popup="true" href="' + data.user.permalink_url + '">' + data.user.username + '</a>');

					if(data.artwork_url != null){
						$('#artwork').append('<img src="' + data.artwork_url + '">');
						$('nav').addClass('image-artwork');
						if( data.purchase_url != null){
							$('#artwork img').wrap('<a href="' + data.purchase_url + '">');
						}
					}
					else{
						$('#artwork').remove("img");
						$('#artwork').remove("a");
						$('nav').removeClass('image-artwork');
					}

					$('#artwork a').attr("href", data.purchase_url);
				
					$('#play-pause').on("click",function(){
						console.log("pausing/playing");
						sound.togglePause();
					});

					$('#skip').on("click", function(){
						console.log("skipping song");
						sound.stop();
					});

					i++;
					console.log(i);

					$('nav').addClass('song-loaded');

				});
			}
		});
	};

	
	playMusic();

	function playMusic(){
		console.log("new song playing");
		shuffle(tracks);
		playNewTrack(tracks[0]);
	}

	// control for videos
	/*
	var videos = [
		["zez8Dza-TwQ", "2000"],
		["C8tEK-0nybo", "2000"],
		["55gOBu_PvXE", "2000"],
		["01TwapLmoP8", "2000"],
		["TheFr7Nl-zY", "2000"],
		["P5_GlAOCHyE", "2000"]
	];

	setInterval(function(){
		var player =  $("#video-player").get(0);
		var randomVideo = Math.floor(Math.random() * videos.length);

		var stock = "//www.youtube.com/embed/" + videos[randomVideo][0] + "?autoplay=1&enablejsapi=1";
		//$('#video-player').attr("src", stock);
		player.mute();
	}, 30000);
	*/

	function shuffle(sourceArray) {
		for (var n = 0; n < sourceArray.length - 1; n++) {
			var k = n + Math.floor(Math.random() * (sourceArray.length - n));

			var temp = sourceArray[k];
			sourceArray[k] = sourceArray[n];
			sourceArray[n] = temp;
		}
	}
});
