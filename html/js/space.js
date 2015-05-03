// ---------------------------------------------------
//  Base config
// ---------------------------------------------------
var debugging = false;

paper.install(window);
var SQRT_3 = Math.pow(2, 0.5);
var triangle, D, mousePos, position;
var count = 50;


window.onload = function() {
// ---------------------------------------------------
//  paper js setup
// ---------------------------------------------------
  paper.setup('spacefm');

  D = Math.max(paper.view.getSize().width, paper.view.getSize().height);

  mousePos = paper.view.center.add([view.bounds.width / 3, 100]);
  position = paper.view.center;

  // Draw the BG
  var background = new Path.Rectangle(view.bounds);
  var colors = [];
  
  buildStars();
  triangle = new Triangle(50, '#191919');

  paper.view.draw();

  paper.view.onFrame = function(event) {
    if($('#play-pause').hasClass('paused')){
      starIntensity(event,0.1);
    }
    else{
      starIntensity(event,2);
    }
  };

  var starIntensity = function(event,intensity){
    position = position.add( (mousePos.subtract(position).divide(10) ) );
    var vector = (view.center.subtract(position)).divide(10);

    if(! document.hasFocus()){
      intensity = (intensity/5);
    }

    if($('#play-paused').hasClass('paused')){
      intensity = 0;
    }

    moveStars(vector.multiply(intensity));
    triangle.update();
  }

// ---------------------------------------------------
//  Intitiate App with Soundcloud
// ---------------------------------------------------
  $('body').addClass('loaded');
  if($(window).width() < 700){
     $('.now-playing h1').fitText(0.6);
  }
  else{
    $('.now-playing h1').fitText(1.2);
  }
 
  triangle.changeColor("#000","0.8");

  var clientID = '3869b2e3b6e85b175e114b4e19042775';

  // sound cloud integration
  SC.initialize({
    client_id: clientID,
    redirect_uri: 'http://floatinginspace.fm/callback.html'
  });

  if(Modernizr.touch){
    playStarted = false;
    $('body').append('<div class="upgrade touch-play"><div><p>FLOATINGINSPACE.FM</p><button>Tap here to listen to music.</button><p>When on a touch device, we need you need to tell us to autoplay.</p></div></div>');
    $('body').on('click','.touch-play button',function(){
      if(playStarted === false){
        $('.touch-play').fadeOut(function(){$(this).remove();});
        retrieveTracks();
        $('#play-pause').click();
      }
      playStarted = true;
    });
  }

// ---------------------------------------------------
//  Chrome Push Notifications
// ---------------------------------------------------
  var songUpdate = function(trackTitle,trackArtist,trackImage) {
    if (!Notification) {
      console.log('no notifications');
      return;
    }

    if (Notification.permission !== "granted"){
      Notification.requestPermission();
    }

    var notification = new Notification('FloatinginSpace.fm - Now Playing:', {
      icon: trackImage,
      body: trackTitle + " by " + trackArtist,
    });


    notification.onclick = function () {
      window.focus();
      this.cancel();
    };


    setTimeout(function(){
      notification.close();
    },4000);

  };

// ---------------------------------------------------
//  Authenticate User with Soundcloud
// ---------------------------------------------------
  function authenticate(){
    SC.connect(function() {
      SC.get('/me', function(me) { 
        $('body').addClass('user-registered');
        $('.soundcloud-connect').text('Now connected to Soundcloud as '+me.username+'.');
        ga('send', 'event', 'soundcloud connect', me.permalink_url);
        return me; 
      });
    });
  };

  $('.soundcloud-connect').on('click',function(){
    authenticate();
  });

// ---------------------------------------------------
//  if a user likes a song / dislikes a song buttons
// ---------------------------------------------------
  function likeSong(trackId){
    SC.get('/me/favorites/'+trackId, function(status,error){

      ga('send', 'event', 'soundcloud favorite', $('.now-playing h1').text());
      
      //IF THE USER HAS LIKED THE SONG
      if(status.user_favorite === true){
        SC.delete('/me/favorites/'+trackId, function(status, error) {
          if (error) {
            console.log("Error: " + error.message);
          } else {
            console.log("Deleted Favorite:  " + trackId);
            $('#like').removeClass('liked');
          }
        });
      }
      //IF THE USER HAS NOT LIKE THE SONG
      else{
        SC.put('/me/favorites/'+trackId, function(status, error) {
          if (error) {
            console.log("Error: " + error.message);
          } else {
            console.log("Favorite:  " + trackId);
            $('#like').addClass('liked');
          }
        });
      }

      $('#like').removeClass('pending');

    });
  };

  $('#like').on("click",function(){
    $(this).addClass('pending');
    likeSong($('#like').data("trackId"));
  });

  $('button').on('click',function(){
    $(this).blur();
  });

function popitup(url,height,width) {
  newwindow=window.open(url,'name','height='+height+',width='+width);
  if (window.focus) {newwindow.focus()}
  return false;
}

var getQueryVariable = function(variable){
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] === variable){
          return pair[1];
      }
  }
  return(false);
};

var isInt = function(value){
  return !isNaN(value) && 
  parseInt(Number(value)) == value && 
  !isNaN(parseInt(value, 10));
}

// ---------------------------------------------------
//  Retrieve tracks from space.fm api and start playing
// ---------------------------------------------------
  
var api;

if (getQueryVariable('id') != false  && isInt(getQueryVariable('id')) ){
  api = "http://spacefm-api.herokuapp.com/api/songs/"+getQueryVariable('id');
}
else{
   api = "http://spacefm-api.herokuapp.com/api/songs/allsongs";
}

  var tracks;

  var retrieveTracks = function(){
    $.ajax({
      url: api,
      type: 'get',
      dataType: 'json',
      error: function(){
        currentTrack++;
        playMusic('error, playing a new one', currentTrack, data);
      },
      success: function(data){
        console.log(data);
        playMusic('initializing', 0, data);
      },
    });
  };

  retrieveTracks();

// ---------------------------------------------------
//  Update dom when song ends / gets skipped
// ---------------------------------------------------
  var playNewTrack = function(data, currentTrack){ // play that funky music space boy
    SC.get('/resolve', { url: data.songs[currentTrack].songUrl }, function(track,error) {
      /*SC.get('/tracks/' + track.id + '/comments', function(comments) {
        for (var i = 0; i < comments.length; i++) {
          console.log('Someone said: ' + comments[i].body);
        }
      });*/

      // debugging in case you want to listen to your own music ;)
      if(debugging === true){
        sound.mute();
      }

      if(error !== null){ 
        currentTrack++;
        playMusic('error playing song, skipping', currentTrack, data);
      }
      else{
        SC.stream(track.uri, function(sound){
          sound.play({
            onfinish: function(){
              currentTrack++;
              sound.destruct();
              $('#like').removeClass('liked');
              $('body').addClass('song-switching');
              playMusic('song finished, playing a new one', currentTrack, data);
              ga('send', 'pageview', {
                'page': '/?id='+data.songs[currentTrack].id,
                'title': data.songs[currentTrack].song + " by " + data.songs[currentTrack].artist
              });
            },
            onstop: function(){
              currentTrack++;
              sound.destruct();
              $('#like').removeClass('liked');
              $('body').addClass('song-switching');
              playMusic('skipping',currentTrack, data);
              ga('send', 'event', 'skipped', $('.now-playing h1:not(span)').text());
              ga('send', 'pageview', {
                'page': '/?id='+data.songs[currentTrack].id,
                'title': data.songs[currentTrack].song + " by " + data.songs[currentTrack].artist
              });
            },
            whileplaying: function(){
              currentPosition = sound.position;
              duration = sound.duration;
              percent = (currentPosition / duration) * 100;
              $('.current-time').css('width',percent+'%');
            }
          });

          $('body').addClass('song-switching');

          // play and pause
          $('#play-pause').on("click",function(){
            sound.togglePause();
            $(this).toggleClass("paused");
          });

          // skip the current song
          $('#skip').on("click", function(){
            sound.stop();
          });

          // if the user is registered, see if they like the current song
          if(track.user_favorite){
            $('#like').addClass('liked');
          }

          // like / dislike the song depending on what it is
          $('#like').data('trackId',track.id);


          $('#title').empty().html('<a data-popup="true" href="' + track.permalink_url + '">' + track.title + '</a>');
          $('#artist').empty().html('<a data-popup="true" href="' + track.user.permalink_url + '">' + track.user.username + '</a>');

          setTimeout(function(){
            $('.now-playing h1').html(data.songs[currentTrack].song);
            $('.now-playing h1').append('<span>'+data.songs[currentTrack].artist+'</span>');
            $('body').removeClass('song-switching');
          },600);

          document.title = data.songs[currentTrack].song + " by " + data.songs[currentTrack].artist + ' | FloatinginSpace.fm';

        // get artwork in if it exists
          if(track.artwork_url != null){
            $('#artwork *').remove();
            $('#artwork').append('<img src="' + track.artwork_url + '">');
          }
          else{
            $('#artwork *').remove();
            var randomPlaceholder = Math.floor((Math.random() * 4) + 1);
            $('#artwork').append('<img src="/img/placeholder' + randomPlaceholder + '.jpg">');
          }

          var albumArt = $('#artwork img');
            if (albumArt[0].complete){
              adjustColors()
              $("#favicon").attr("href",$('#artwork img').attr('src'));
            }
            else{
              albumArt.load(adjustColors);
              $("#favicon").attr("href",$('#artwork img').attr('src'));
            }

        // get purchase url in there if it exists
          $('.purchase').remove();

          if( track.purchase_url != null){
            $('.song-details').append('<a href="'+track.purchase_url+'" target="_blank" class="purchase">Purchase Song</a>');
            $('body').on('click','.purchase',function(){
              ga('send', 'event', 'purchase clicked', data.songs[currentTrack].song + " by " + data.songs[currentTrack].artist + " via " + track.purchase_url);
            });
          }
          else{
            $('.purchase').remove();
          }

        // update listen on soundcloud link
          $('.song-details .soundcloud').attr('href',track.permalink_url);
          $('.song-details .soundcloud').on('click',function(){
            ga('send', 'event', 'listen on soundcloud', track.permalink_url);
          }); 

        // update artist
          $('.uploaded span').text(track.user.username);
          $('.uploaded').attr('href',track.user.permalink_url);
          $('.uploaded').on('click',function(){
            ga('send', 'event', 'uploaded clicked', track.user.permalink_url);
          }); 

        // update share info
          
          $('a.twitter-share').attr('href','http://twitter.com/intent/tweet?status=Currently listening to '+data.songs[currentTrack].song + " by " + data.songs[currentTrack].artist+'+'+'on http://floatinginspace.fm?id='+data.songs[currentTrack].id+' via @floatingspacefm');
          $('a.facebook-share').attr('href','http://www.facebook.com/share.php?u=http://floatinginspace.fm?id='+data.songs[currentTrack].id+'&title='+data.songs[currentTrack].song + " by " + data.songs[currentTrack].artist);
          
          $('a.twitter-share').on('click',function(){
            ga('send', 'event', 'twitter share', data.songs[currentTrack].song + " by " + data.songs[currentTrack].artist);
          });

          $('a.facebook-share').on('click',function(){
            ga('send', 'event', 'facebook share', data.songs[currentTrack].song + " by " + data.songs[currentTrack].artist);
          });

          $('.share a').on('click',function(){
            event.preventDefault();
            popitup($(this).attr('href'),265,550);
          });

          if(! document.hasFocus()){
            songUpdate(data.songs[currentTrack].song, data.songs[currentTrack].artist, track.artwork_url);
          }

          $('#artwork a').attr("href", track.purchase_url);

          $('body').addClass('song-loaded');

          // ---------------------------------------------------
          //  keyboard shortcuts
          // ---------------------------------------------------
          $(document).bind('keydown','space',function(){
            sound.togglePause();
            $('#play-pause').toggleClass("paused");
          });

          $(document).bind('keydown','right',function(){
            sound.stop();
          });

          $(document).bind('keydown','s',function(){
            $('#like').addClass('pending');
            likeSong($('#like').data("trackId"));
          });

          $(document).bind('keydown','l',function(){
            $('#like').addClass('pending');
            likeSong($('#like').data("trackId"));
          });

        });
      }
    });
  };

// ---------------------------------------------------
//  Play a new track, shuffle colors, and update them
// ---------------------------------------------------
  function adjustColors(){
    huey($('#artwork img').attr('src'), function(error, rgb, image) {
      if(rgb == null){
        $('body').css('background-color','rgb(25,25,25)');
        triangle.changeColor('rgb(255,255,255)');
      }
      else{
        var red = rgb[0]
        var green = rgb[1]
        var blue = rgb[2]

        $('body').css('background-color','rgb('+red+','+green+','+blue+')');
        triangle.changeColor('rgb('+(red+30)+','+(green+30)+','+(blue+30));
      }

      $('body').css('background-color','rgb('+red+','+green+','+blue+')');
      triangle.changeColor('rgb('+(red+50)+','+(green+50)+','+(blue+50));
    });
  }

  function playMusic(message, currentTrack, data){
    if(debugging === true){
      console.log(message);
    }

    var albumArt = $('#artwork img');
    if (albumArt[0].complete){
      adjustColors()
    }
    else{
      albumArt.load(adjustColors);
    }

    $('body').removeClass('bg-ready');

    //shuffle(tracks);
    shuffle(colors);

    playNewTrack(data, currentTrack);
  }

// ---------------------------------------------------
//  Global shuffle declaration
// ---------------------------------------------------
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

  this.flameSize = (a / SQRT_3)*1;
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