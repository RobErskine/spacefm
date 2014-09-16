$(function(){

	var clientID = '3869b2e3b6e85b175e114b4e19042775';

	// sound cloud integration
	SC.initialize({
		client_id: clientID
	});

	var tracks = [		// list of all tracks 
		"164773080",	// slow magic | waited4u
		"22454575",		// cfcf | come true
		"155143944",	// tycho | awake (com truise remix)
		"130679842",	// com truise | subsonic
		"86282419",		// com truise | idle withdraw
		"56511482",		// explosions in the sky | so long, lonesome
		"11295149",		// balmorea | Truth (Helios Remix)
		"135397912",	// teen daze | tokyo winter
		"62837562",		// teen daze | discipleship
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
		"148393347",	// blackbird blackbird | Star Faces
		"114283628",	// slow magic | gold panda - brazil remix
		"1284839",		// moderat | a new error
		"35691245",		// seekae | 3
		"35498261",		// seekae | forest fire
		"16692104",		// seekae | yurai (telos remix)
		"35498404",		// seekae | void
		"23126532",		// memory cassette | asleep at a party
		"93549370",		// boards of canada | reach for the dead
		"4981703",		// boards of canada | seventy forty seven (johnny_ripper remix)
		"166246330",	// lancaster | beachy thing
		"163555600",	// coldplay | midnight (kygo remix)
		"165138064",	// phaeleh | a world without
		"50702267",		// phaeleh | orchid
		"159146247",	// vvv | more than love
		"164156075",	// exconfusion | flow
		"112470822",	// foxes in fiction | breathing in
		"94000680",		// gold panda | we work nights
		"124126863",	// thievery corporation | fragments (tycho remix)
		"68726077",		// heathered pearls | gentle practice
		"153438725",	// body complex | out of habit
		"106374730",	// heathered pearls | worship bell (foxes in fiction rework)
		"104281995",	// heathered pearls | steady veil (teen daze remix)
		"124089497",	// son of sound | night shift
		"32407942",		// windsurf | weird energy
		"45838370",		// uncle skeleton | lakeshore
		"53847841",		// uncle skeleton | retrofuture
		"148924485",	// espirit | warmjet
		"144391107",	// gacha | sea of steps (hvl space edit) 
		"166336588",	// anzo | intro
		"166353637",	// sizzelbird | dawn
		"157407766",	// sizzlebird | landing
		"16831032",		// sizzlebird | illuminate
		"155191090",	// aphonic | the further we go (bachelors of science remix)
		"13756912",		// games | midi drift
		"2405882",		// games | no disguies
		"97251636",		// darkstar | aidys girl is a computer
		"115625903",	// darkstar
		"129848489",	// young magic | something in the water
		"144651161",	// young magic | holographic
		"36501094",		// young magic | night in the ocean (S.Maharba serpernt love song remix)
		"110175342",	// gil michell | no friends
		"32242910",		// s.maharba | m/l/m/h
		"53126096",		// chrome sparks | marijuana
		"30868816",		// youth lagoon | daydream
		"45821728",		// cinnamon chasers | luv deluxe
		"19095016",		// teebs | anchor steam
		"32740736",		// ryan hemsworth | three hours in
		"72139376",		// prefuse 73 | storm returns
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
							$('#artwork img').wrap('<a data-popup="true" href="' + data.purchase_url + '">');
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
