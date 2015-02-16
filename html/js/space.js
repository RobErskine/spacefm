var debugging = false;

paper.install(window);
var SQRT_3 = Math.pow(3, 0.5);
var triangle, D, mousePos, position;
var count = 50;


window.onload = function() {
  paper.setup('spacefm');

  D = Math.max(paper.view.getSize().width, paper.view.getSize().height);

  mousePos = paper.view.center.add([view.bounds.width / 3, 100]);
  position = paper.view.center;

  // Draw the BG
  var background = new Path.Rectangle(view.bounds);
  
  buildStars();
  triangle = new Triangle(50, '#191919');

  paper.view.draw();

  paper.view.onFrame = function(event) {
    position = position.add( (mousePos.subtract(position).divide(10) ) );
    var vector = (view.center.subtract(position)).divide(10);
    moveStars(vector.multiply(2.33));
    triangle.update();
  };

  // launch loading screen
  $('body').addClass('loaded');
  $('.now-playing h1').fitText(1);

  var clientID = '3869b2e3b6e85b175e114b4e19042775';

  // sound cloud integration
  SC.initialize({
    client_id: clientID
  });

  var tracks = [    // list of all tracks 
    "164773080",  // slow magic | waited4u
    "22454575",   // cfcf | come true
    "155143944",  // tycho | awake (com truise remix)
    "130679842",  // com truise | subsonic
    "86282419",   // com truise | idle withdraw
    "56511482",   // explosions in the sky | so long, lonesome
    "11295149",   // balmorea | Truth (Helios Remix)
    "135397912",  // teen daze | tokyo winter
    "62837562",   // teen daze | discipleship
    "120452997",  // nils frahm | you (teen daze rework)
    "157838635",  // pogo | puff love
    "89421686",   // elite gymnastics | minneapolis belongs to you 2
    "74376031",   // West One Music Group | washed away
    "6430227",    // daft punk | something about us
    "15145917",   // thieves like us | flow my tears, the police man said
    "21682519",   // slohmo | anywhere but here
    "115522159",  // fourtet | unicorn
    "30709985",   // fourtet | moma
    "156821162",  // bonobo | duels
    "132999269",  // bonobo | antenna
    "166262342",  // millionyoung | dire, dire docks
    "164975479",  // millionyoung | Fade Out (telescope thieves remix)
    "138156927",  // millionyoung | captn hook 
    "156878091",  // tennyson | lay-by
    "155226337",  // avidd | ??????
    "148393347",  // blackbird blackbird | Star Faces
    "114283628",  // slow magic | gold panda - brazil remix
    "1284839",    // moderat | a new error
    "35691245",   // seekae | 3
    "35498261",   // seekae | forest fire
    "16692104",   // seekae | yurai (telos remix)
    "35498404",   // seekae | void
    "23126532",   // memory cassette | asleep at a party
    "93549370",   // boards of canada | reach for the dead
    "4981703",    // boards of canada | seventy forty seven (johnny_ripper remix)
    "166246330",  // lancaster | beachy thing
    "163555600",  // coldplay | midnight (kygo remix)
    "165138064",  // phaeleh | a world without
    "50702267",   // phaeleh | orchid
    "159146247",  // vvv | more than love
    "164156075",  // exconfusion | flow
    "112470822",  // foxes in fiction | breathing in
    "94000680",   // gold panda | we work nights
    "124126863",  // thievery corporation | fragments (tycho remix)
    "68726077",   // heathered pearls | gentle practice
    "153438725",  // body complex | out of habit
    "106374730",  // heathered pearls | worship bell (foxes in fiction rework)
    "104281995",  // heathered pearls | steady veil (teen daze remix)
    "124089497",  // son of sound | night shift
    "32407942",   // windsurf | weird energy
    "45838370",   // uncle skeleton | lakeshore
    "53847841",   // uncle skeleton | retrofuture
    "148924485",  // espirit | warmjet
    "144391107",  // gacha | sea of steps (hvl space edit) 
    "166336588",  // anzo | intro
    "166353637",  // sizzelbird | dawn
    "157407766",  // sizzlebird | landing
    "16831032",   // sizzlebird | illuminate
    "155191090",  // aphonic | the further we go (bachelors of science remix)
    "13756912",   // games | midi drift
    "2405882",    // games | no disguies
    "97251636",   // darkstar | aidys girl is a computer
    "115625903",  // darkstar
    "129848489",  // young magic | something in the water
    "144651161",  // young magic | holographic
    "36501094",   // young magic | night in the ocean (S.Maharba serpernt love song remix)
    "110175342",  // gil michell | no friends
    "32242910",   // s.maharba | m/l/m/h
    "53126096",   // chrome sparks | marijuana
    "30868816",   // youth lagoon | daydream
    "45821728",   // cinnamon chasers | luv deluxe
    "19095016",   // teebs | anchor steam
    "32740736",   // ryan hemsworth | three hours in
    "72139376",   // prefuse 73 | storm returns
    "161171541",  // phaeleh | three
    "159049476",  // default genders | omertå
    "159049469",  // default genders | kairosis in real life
    "104281995",  // steady veil | teen daze remix
    "98189196",   // kodak to graph | house plants 
    "160833198",  // dntel | if i stay a minute
    "48102295",   // willits | opening
    "157958765",  // willits | clear
    "17260113",   // essay | morning mountain
    "171383711",  // young magic | something in the water ( roland tings remix )
    "171082727",  // tennyson | with you
    "170643277",  // sizzlebird | mountains
    "34125983",   // tourist | placid acid
    "78043048",   // evenings | friend[lover]
    "89326189",   // evenings | evenings [shigeto remix]
    "171937900",  // iambear | 16:40
    "168981952",  // gidge | huldra
    "170000664",  // jon hopkins | form by firelight
    "176310241",  // michna | she exists in my mind
    "90861637",   // jon hopkins | open eye signal [lord of the isles remix]
    "180439641",  // slow  magic | hold still [andrea remix]
    "176452084",  // pearl white | solitude
    "14212824",   // the american dollar | signaling through the flames
    "140695893",  // mogwai | hungry face (les revenants remix)
    "81970529",   // baths | miasma sky
    "14663128",   // bop | sunrain
    "4446117",    // special victim | zoinks
    "43587803",   // baio | sunburn modern
    "118739081",  // dauwd | silverse
    "15708345",   // souls in motion | sensual illusion
    "45179757",   // luke abbott | modern driveway
    "170880536",  // stal | gone (cubenx remix)
    "30233022",   // audision | yellow sunset (robags stoylago edit)
    "24251820",   // walls | heat haze
    "24251819",   // walls | into our midst
    "144036975",  // pye corner audio | perfect secrecy for ever
    "166220071",  // ludique | yessss niet gemasterd
    "39386586",   // ambulaunz | the garden
    "136569045",  // bonobo | kiara (ashchirn mix)
    "95392207",   // hobo | incise
    "42628534",   // klaypex | song12
    "70704570",   // braids | pleasures
    "9866727",    // we love | harmony of spheres
    "181162634",  // sun glitters | fading days
    "179444155",  // sun glitters | not everyday, sometimes
    "6142313",    // ulrich schnaub | monday paracetamol
    "101519147",  // casino versus japan | marilyn set me free
    "7637519",    // holy other | magick mountain
    "147215107",  // chrome sparks | meaning of love
    "87264491",   // evenings | babe
    "27709897",   // slow magic | moon
  ];

    //background color| ship color
  var colors = [
    ['#1f2335','#627e87'],
    ['#25221f','#e06e1e'],
    ['#0f2444','#0759a6'],
    ['#251a46','#7d7bb7'],
    ['#181928','#6f8d88'],
    ['#102138','#eec15f'],
    ['#0b3941','#eae8ab'],
    ['#2f242e','#3c2a3b']
  ];

  var songUpdate = function(trackTitle,trackArtist,trackImage) {
    if (!Notification) {
      console.log('no notifications');
      return;
    }

    if (Notification.permission !== "granted"){
      Notification.requestPermission();
    }

    var notification = new Notification('SpaceFM - Now Playing:', {
      icon: trackImage,
      body: trackTitle + " by " + trackArtist,
    });


    notification.onclick = function () {
      window.open("http://changethistotherightaddress.com");
    };


    setTimeout(function(){
      notification.close();
    },4000);

  };

  var i = 0;

  //var oldAPI = "http://api.soundcloud.com/tracks/" + trackID + ".json?client_id=" + clientID;
  var api = "http://spacefm-api.personal.dev/api/songs/allsongs"; 

  var playNewTrack = function(currentTrack){ // play that funky music space boy
    $.ajax({
      url: api,
      type: 'get',
      dataType: 'json',
      error: function(){
        currentTrack++;
        playMusic('error, playing a new one',currentTrack);
      },
      success: function(data){

        SC.get('/resolve', { url: data.songs[currentTrack].songUrl }, function(track) {
          /*SC.get('/tracks/' + track.id + '/comments', function(comments) {
            for (var i = 0; i < comments.length; i++) {
              console.log('Someone said: ' + comments[i].body);
            }
          });*/

          console.log(track);

          SC.stream(track.uri, function(sound){
            // debugging in case you want to listen to your own music ;)
            if(debugging === true){
              sound.mute();
            }

            sound.play({
              onfinish: function(){
                currentTrack++;
                sound.destruct();
                $('body').addClass('song-switching');
                playMusic('song finished, playing a new one', currentTrack);
              },
              onstop: function(){
                currentTrack++;
                sound.destruct();
                $('body').addClass('song-switching');
                playMusic('skipping',currentTrack++);
              }
            });

            $('body').addClass('song-switching');

            $('#play-pause').on("click",function(){
              console.log("pausing/playing");
              sound.togglePause();
              $(this).toggleClass("paused");
            });

            $('#skip').on("click", function(){
              sound.stop();
            });

            $('#artwork a, #artwork img').remove();

            $('#title').empty().html('<a data-popup="true" href="' + track.permalink_url + '">' + track.title + '</a>');
            $('#artist').empty().html('<a data-popup="true" href="' + track.user.permalink_url + '">' + track.user.username + '</a>');

            setTimeout(function(){
              $('header h1').html(data.songs[currentTrack].song).fitText(1);
              $('header h1').append('<span>'+data.songs[currentTrack].artist+'</span>');
              $('body').removeClass('song-switching');
            },600);

            if(data.artwork_url != null){
              $('#artwork').append('<img src="' + track.artwork_url + '">');
              $('nav').addClass('image-artwork');
              if( track.purchase_url != null){
                $('#artwork img').wrap('<a data-popup="true" href="' + track.purchase_url + '">');
              }
            }
            else{
              $('#artwork').remove("img");
              $('#artwork').remove("a");
              $('nav').removeClass('image-artwork');
            }

            if(document.hidden){
              songUpdate(track.title, track.user.username, track.artwork_url);
            }

            $('#artwork a').attr("href", track.purchase_url);

            $('nav').addClass('song-loaded');

          });

        });
      }
    });
  };

  
  playMusic('initializing', 0);

  function hexToRGBA(input,alpha){
    var s = input;
    var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
    var matches = patt.exec(s);
    var rgba = "rgba("+parseInt(matches[1], 16)+","+parseInt(matches[2], 16)+","+parseInt(matches[3], 16)+","+ alpha+");";
    return rgba;
  };

  function playMusic(message, currentTrack){
    if(debugging === true){
      console.log(message);
    }

    //shuffle(tracks);
    shuffle(colors);

    playNewTrack(currentTrack);
    
    triangle.changeColor(hexToRGBA(colors[0][1],"0.8"));
    $('body').css('background-color',colors[0][0]);
  }

  function shuffle(sourceArray) {
    for (var n = 0; n < sourceArray.length - 1; n++) {
      var k = n + Math.floor(Math.random() * (sourceArray.length - n));

      var temp = sourceArray[k];
      sourceArray[k] = sourceArray[n];
      sourceArray[n] = temp;
    }
  }

};


// ---------------------------------------------------
//  Helpers
// ---------------------------------------------------
window.onresize = function() {
  project.clear();
  D = Math.max(paper.view.getSize().width, paper.view.getSize().height);
  // Draw the BG
  var background = new Path.Rectangle(view.bounds);

  buildStars();
  triangle.build(50);
};

var random = function(minimum, maximum) {
  return Math.round(Math.random() * (maximum - minimum) + minimum);
};

var map = function (n, start1, stop1, start2, stop2) {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
};


// ---------------------------------------------------
//  Triangle
// ---------------------------------------------------
var Triangle = function(a, color) {
  this.build(a,color);
};

Triangle.prototype.build = function(a, color) {
  // The points of the triangle
  var segments = [new paper.Point(0, -a / SQRT_3),
                  new paper.Point(-a/2, a * 0.75 / SQRT_3),
                  new paper.Point(a/2, a * 0.75 / SQRT_3)];

  this.flameSize = (a / SQRT_3)*1.2;
  var flameSegments = [new paper.Point(0, this.flameSize),
                       new paper.Point(-a/3, a * 0.4 / SQRT_3),
                       new paper.Point(a/3, a * 0.4 / SQRT_3)];

  this.flame = new Path({
    segments: flameSegments,
    closed: true,
    fillColor: '#FCE589'
  });
  this.ship = new Path({
    segments: segments,
    closed: true,
    fillColor: color
  });
  this.group = new Group({
    children: [this.flame, this.ship],
    position: view.center
  });
};

Triangle.prototype.changeColor = function(newColor){
  this.ship.fillColor = newColor;
};

Triangle.prototype.update = function() {
  this.flame.segments[0].point.x = random(this.flame.segments[1].point.x, this.flame.segments[2].point.x);

  var dist = mousePos.subtract(paper.view.center).length;
  var angle = mousePos.subtract(paper.view.center).angle;
  var spread = map(dist, 0, D/2, 10, 30);

  this.flame.segments[0].point = paper.view.center.subtract(new Point({
    length: map(dist, 0, D/2, 2*this.flameSize/3, this.flameSize),
    angle: random(angle - spread, angle + spread)
  }));
};

Triangle.prototype.rotate = function() {
  var angle = paper.view.center.subtract(mousePos).angle - paper.view.center.subtract(this.ship.segments[0].point).angle;

  this.group.rotate(angle, paper.view.center);
};



// ---------------------------------------------------
//  Stars
// ---------------------------------------------------
window.onmousemove = function(event) {
  mousePos.x = event.x;
  mousePos.y = event.y;
  triangle.rotate();
};

var buildStars = function() {
  // Create a symbol, which we will use to place instances of later:
  var path = new Path.Circle({
    center: [0, 0],
    radius: 5,
    fillColor: '#fffeed',
    strokeColor: '#fffeed'
  });

  var symbol = new Symbol(path);

  // Place the instances of the symbol:
  for (var i = 0; i < count; i++) {
    // The center position is a random point in the view:
    var center = Point.random().multiply(paper.view.size);
    var placed = symbol.place(center);
    placed.scale(i / count + 0.01);
    placed.data = {
      vector: new Point({
        angle: Math.random() * 360,
        length : (i / count) * Math.random() / 5
      })
    };
  }

  var vector = new Point({
    angle: 45,
    length: 0
  });
};

var keepInView = function(item) {
  var position = item.position;
  var viewBounds = paper.view.bounds;
  if (position.isInside(viewBounds))
    return;
  var itemBounds = item.bounds;
  if (position.x > viewBounds.width + 5) {
    position.x = -item.bounds.width;
  }

  if (position.x < -itemBounds.width - 5) {
    position.x = viewBounds.width;
  }

  if (position.y > viewBounds.height + 5) {
    position.y = -itemBounds.height;
  }

  if (position.y < -itemBounds.height - 5) {
    position.y = viewBounds.height
  }
};

var moveStars = function(vector) {
  // Run through the active layer's children list and change
  // the position of the placed symbols:
  var layer = project.activeLayer;
  for (var i = 1; i < count + 1; i++) {
    var item = layer.children[i];
    var size = item.bounds.size;
    var length = vector.length / 10 * size.width / 10;
    item.position = item.position.add( vector.normalize(length).add(item.data.vector));
    keepInView(item);
  }
};