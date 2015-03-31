/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );

!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.huey=e():"undefined"!=typeof global?global.huey=e():"undefined"!=typeof self&&(self.huey=e())}(function(){return function e(t,n,r){function o(i,u){if(!n[i]){if(!t[i]){var f="function"==typeof require&&require;if(!u&&f)return f(i,!0);if(a)return a(i,!0);throw new Error("Cannot find module '"+i+"'")}var d=n[i]={exports:{}};t[i][0].call(d.exports,function(e){var n=t[i][1][e];return o(n?n:e)},d,d.exports,e,t,n,r)}return n[i].exports}for(var a="function"==typeof require&&require,i=0;i<r.length;i++)o(r[i]);return o}({1:[function(e,t){var n=e("./shared");t.exports=function(e,t){var r=n.invalid(e,t);if(r){if(!t)throw r;return t(r),void 0}n.getImageData(e,function(e,r){if(e)return t(e),void 0;var o=n.getMostFrequentColor(r.data);t(null,o,r)})}},{"./shared":4}],2:[function(e,t){var n=e("./shared"),r=null,o=function(e){return r=e.createElement("canvas"),!(!r.getContext||!r.getContext("2d"))}(document);t.exports=function(e,t){if(!o)return t(new Error("Your browser doesn’t the <canvas> element"));var a=new Image;/^data/.test(e)||(a.crossOrigin=!0),a.src=e,a.onerror=t,a.onload=function(){var e=n(r);t(null,{data:e(a),height:a.height,width:a.width})}}},{"./shared":3}],3:[function(e,t){t.exports=function(e){return function(t){var n=e.getContext("2d");e.width=t.width,e.height=t.height,n.drawImage(t,0,0);var r=n.getImageData(0,0,t.width,t.height);return r.data}}},{}],4:[function(e,t,n){var r=function(e,t){return e&&typeof e===t};n.invalid=function(e,t){var n=void 0===e?"Please provide an image path.":r(t,"function")===!1?"Please provide a callback function.":null;return n?new Error(n):!1},n.getImageData=e("get-image-data"),n.getMostFrequentColor=function(e){for(var t,n,r,o,a=e.length,i={},u=0,f=1e4>a?24:1e5>a?56:1e6>a?512:1e7>a?768:1e8>a?10240:12288,d=0;a>d;d+=f)n=[e[d],e[d+1],e[d+2]],r=Math.min(n[0],Math.min(n[1],n[2])),o=Math.max(n[0],Math.max(n[1],n[2])),24>o-r||(n=n.join(","),i[n]=i.hasOwnProperty(n)?++i[n]:1);for(n in i)i[n]<u||(u=i[n],t=n);return t?t.split(",").map(function(e){return parseInt(e,10)}):null}},{"get-image-data":2}]},{},[1])(1)});

/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
 */

/*
 * One small change is: now keys are passed by object { keys: '...' }
 * Might be useful, when you want to pass some other data to your handler
 */

(function(jQuery) {

  jQuery.hotkeys = {
    version: "0.8",

    specialKeys: {
      8: "backspace",
      9: "tab",
      10: "return",
      13: "return",
      16: "shift",
      17: "ctrl",
      18: "alt",
      19: "pause",
      20: "capslock",
      27: "esc",
      32: "space",
      33: "pageup",
      34: "pagedown",
      35: "end",
      36: "home",
      37: "left",
      38: "up",
      39: "right",
      40: "down",
      45: "insert",
      46: "del",
      59: ";",
      61: "=",
      96: "0",
      97: "1",
      98: "2",
      99: "3",
      100: "4",
      101: "5",
      102: "6",
      103: "7",
      104: "8",
      105: "9",
      106: "*",
      107: "+",
      109: "-",
      110: ".",
      111: "/",
      112: "f1",
      113: "f2",
      114: "f3",
      115: "f4",
      116: "f5",
      117: "f6",
      118: "f7",
      119: "f8",
      120: "f9",
      121: "f10",
      122: "f11",
      123: "f12",
      144: "numlock",
      145: "scroll",
      173: "-",
      186: ";",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'"
    },

    shiftNums: {
      "`": "~",
      "1": "!",
      "2": "@",
      "3": "#",
      "4": "$",
      "5": "%",
      "6": "^",
      "7": "&",
      "8": "*",
      "9": "(",
      "0": ")",
      "-": "_",
      "=": "+",
      ";": ": ",
      "'": "\"",
      ",": "<",
      ".": ">",
      "/": "?",
      "\\": "|"
    },

    // excludes: button, checkbox, file, hidden, image, password, radio, reset, search, submit, url
    textAcceptingInputTypes: [
      "text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime",
      "datetime-local", "search", "color", "tel"],

    // default input types not to bind to unless bound directly
    textInputTypes: /textarea|input|select/i,

    options: {
      filterInputAcceptingElements: true,
      filterTextInputs: true,
      filterContentEditable: true
    }
  };

  function keyHandler(handleObj) {
    if (typeof handleObj.data === "string") {
      handleObj.data = {
        keys: handleObj.data
      };
    }

    // Only care when a possible input has been specified
    if (!handleObj.data || !handleObj.data.keys || typeof handleObj.data.keys !== "string") {
      return;
    }

    var origHandler = handleObj.handler,
      keys = handleObj.data.keys.toLowerCase().split(" ");

    handleObj.handler = function(event) {
      //      Don't fire in text-accepting inputs that we didn't directly bind to
      if (this !== event.target &&
        (jQuery.hotkeys.options.filterInputAcceptingElements &&
          jQuery.hotkeys.textInputTypes.test(event.target.nodeName) ||
          (jQuery.hotkeys.options.filterContentEditable && jQuery(event.target).attr('contenteditable')) ||
          (jQuery.hotkeys.options.filterTextInputs &&
            jQuery.inArray(event.target.type, jQuery.hotkeys.textAcceptingInputTypes) > -1))) {
        return;
      }

      var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[event.which],
        character = String.fromCharCode(event.which).toLowerCase(),
        modif = "",
        possible = {};

      jQuery.each(["alt", "ctrl", "shift"], function(index, specialKey) {

        if (event[specialKey + 'Key'] && special !== specialKey) {
          modif += specialKey + '+';
        }
      });

      // metaKey is triggered off ctrlKey erronously
      if (event.metaKey && !event.ctrlKey && special !== "meta") {
        modif += "meta+";
      }

      if (event.metaKey && special !== "meta" && modif.indexOf("alt+ctrl+shift+") > -1) {
        modif = modif.replace("alt+ctrl+shift+", "hyper+");
      }

      if (special) {
        possible[modif + special] = true;
      }
      else {
        possible[modif + character] = true;
        possible[modif + jQuery.hotkeys.shiftNums[character]] = true;

        // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
        if (modif === "shift+") {
          possible[jQuery.hotkeys.shiftNums[character]] = true;
        }
      }

      for (var i = 0, l = keys.length; i < l; i++) {
        if (possible[keys[i]]) {
          return origHandler.apply(this, arguments);
        }
      }
    };
  }

  jQuery.each(["keydown", "keyup", "keypress"], function() {
    jQuery.event.special[this] = {
      add: keyHandler
    };
  });

})(jQuery || this.jQuery || window.jQuery);

/*
 *  Google analytics
 */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-61387854-1', 'auto');
ga('send', 'pageview');

$(function(){
  $('.soundcloud-connect').on('click',function(){
    ga('send', 'event', 'soundcloud connect', 'clicked');
  });

});