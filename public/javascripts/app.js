/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "javascripts/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	window.MC = window.MC || {};
	window.MC.WistiaVideo = __webpack_require__(2).default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(3);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Observer = __webpack_require__(4).default;

	var VideoSetting = function () {
	  function VideoSetting(id, options) {
	    var _this = this;

	    _classCallCheck(this, VideoSetting);

	    this.onReadyHandler = function (video) {
	      video.bind('play', _this.playHandler.bind(_this));
	      video.bind('pause', _this.pauseHandler.bind(_this));
	      video.bind('end', _this.endHandler.bind(_this));
	      video.bind('secondchange', _this.timeChangeHandler.bind(_this));
	      video.bind('popovershow', _this.popoverShowHandler.bind(_this));
	      video.bind('popovershow', _this.popoverHideHandler.bind(_this));
	      _this.video = video;
	      _this.playListQueue = [];
	      _this.onReady.fire(video);
	      if (_this.playHasBeenRequested()) {
	        _this.play();
	      }
	    };

	    this.play = function () {
	      if (_this.videoIsLoaded()) {
	        _this.video.play();
	      } else {
	        _this.requestPlay();
	      }
	      return _this;
	    };

	    this.pause = function () {
	      if (_this.videoIsLoaded()) {
	        _this.video.pause();
	      }
	      return _this;
	    };

	    if (id === null || id === undefined) {
	      throw new Error('An id must be passed in. The hashed id of the wistia video');
	    }
	    this.id = id;
	    var opts = options || {};
	    this.settings = {
	      id: this.id,
	      onReady: this.onReadyHandler,
	      options: {
	        playButton: false,
	        videoFoam: true,
	        playerColor: '292929',
	        ssl_option: false,
	        plugin: {
	          captions: {
	            onByDefault: false
	          }
	        }
	      }
	    };
	    _jquery2.default.extend(this.settings.options, opts);
	    this.onReady = new Observer();
	    this.onPlay = new Observer();
	    this.onEnd = new Observer();
	    this.onPause = new Observer();
	    this.onTimeChange = new Observer();
	    this.onPopoverHide = new Observer();
	    this.onPopoverShow = new Observer();
	    return this;
	  }

	  _createClass(VideoSetting, [{
	    key: 'addToPlaylist',


	    // hashedId, [options], [position]
	    value: function addToPlaylist(hashedId, options, position) {
	      if (this.videoIsLoaded()) {
	        // load into the playlist
	        this.videoIsLoaded.addToPlaylist(hashedId, options, position);
	      } else {
	        // else store in a queue and call onReady
	        this.playListQueue.push({ hashedId: hashedId, options: options, position: position });
	      }
	    }
	  }, {
	    key: 'addQueuedVideosToPlayList',
	    value: function (_addQueuedVideosToPlayList) {
	      function addQueuedVideosToPlayList() {
	        return _addQueuedVideosToPlayList.apply(this, arguments);
	      }

	      addQueuedVideosToPlayList.toString = function () {
	        return _addQueuedVideosToPlayList.toString();
	      };

	      return addQueuedVideosToPlayList;
	    }(function () {
	      if (this.playListQueue.length > 0) {
	        video = this.playListQueue.shift();
	        this.addToPlaylist(video.hashedId, video.options, video.position);
	        addQueuedVideosToPlayList();
	      }
	    })
	  }, {
	    key: 'aspect',
	    value: function aspect() {
	      if (this.videoIsLoaded()) {
	        return this.video.aspect();
	      }
	    }
	  }, {
	    key: 'duration',
	    value: function duration() {
	      if (this.videoIsLoaded()) {
	        return this.video.duration();
	      }
	    }
	  }, {
	    key: 'email',
	    value: function email(val) {
	      if (this.videoIsLoaded()) {
	        if (val !== 'undefined' && val !== null) {}
	      } else {
	        if (val !== 'undefined' && val !== null) {
	          // They are trying to set email so save the value and set 
	          // it once the video is loaded
	        } else {
	            // The are trying to get the value console.log out that the video is 
	            // not ready yet
	          }
	      }
	    }
	  }, {
	    key: 'eventKey',
	    value: function eventKey() {
	      if (this.videoIsLoaded()) {
	        return this.video.eventKey();
	      }
	    }
	  }, {
	    key: 'hasData',
	    value: function hasData() {
	      if (this.videoIsLoaded()) {
	        return this.video.hasData();
	      }
	    }
	  }, {
	    key: 'hashedId',
	    value: function hashedId() {
	      if (this.videoIsLoaded()) {
	        return this.video.hashedId();
	      }
	    }
	  }, {
	    key: 'height',
	    value: function height(val, options) {
	      // Would be nice to make this able to be synchronouse
	      if (this.videoIsLoaded()) {
	        if (val !== null && val !== 'undefined') {
	          return this.height(val, options);
	        } else {
	          return this.height();
	        }
	      }
	    }
	  }, {
	    key: 'name',
	    value: function name() {
	      if (this.videoIsLoaded()) {
	        return this.video.name();
	      }
	    }
	  }, {
	    key: 'requestPlay',
	    value: function requestPlay() {
	      return this.playRequested = true;
	    }
	  }, {
	    key: 'playHasBeenRequested',
	    value: function playHasBeenRequested() {
	      return this.playRequested == true;
	    }
	  }, {
	    key: 'videoIsLoaded',
	    value: function videoIsLoaded() {
	      return this.video !== null && this.video != undefined;
	    }
	  }, {
	    key: 'playHandler',
	    value: function playHandler() {
	      this.onPlay.fire();
	    }
	  }, {
	    key: 'percentWatched',
	    value: function percentWatched() {
	      if (this.videoIsLoaded()) {
	        return this.video.percentWatched();
	      }
	    }
	  }, {
	    key: 'playbackRate',
	    value: function playbackRate(r) {
	      if (this.videoIsLoaded()) {
	        this.video.playbackRate(r);
	      }
	    }
	  }, {
	    key: 'replaceWith',
	    value: function replaceWith(hashedId, options) {
	      if (this.videoIsLoaded()) {
	        this.video.replaceWith(hashedId, options);
	      }
	    }
	  }, {
	    key: 'endHandler',
	    value: function endHandler() {
	      this.onEnd.fire();
	    }
	  }, {
	    key: 'pauseHandler',
	    value: function pauseHandler() {
	      this.onPause.fire();
	    }
	  }, {
	    key: 'timeChangeHandler',
	    value: function timeChangeHandler(s) {
	      this.onTimeChange.fire(s);
	    }
	  }, {
	    key: 'popoverShowHandler',
	    value: function popoverShowHandler() {
	      this.onPopoverShow.fire();
	    }
	  }, {
	    key: 'popoverHideHandler',
	    value: function popoverHideHandler() {
	      this.onPopoverHide.fire();
	    }
	  }, {
	    key: 'initialize',
	    value: function initialize() {
	      window._wq = window._wq || [];
	      window._wq.push(this.settings);
	      console.log('linked to the right spot');
	      return this;
	    }
	  }], [{
	    key: 'setWistiaSourceLoaded',
	    value: function setWistiaSourceLoaded() {
	      window.wistiaSourceSet = true;
	    }
	  }, {
	    key: 'setWistiaLoaded',
	    value: function setWistiaLoaded() {
	      window.wistiaLoaded = true;
	    }
	  }, {
	    key: 'setWistiaLoadedError',
	    value: function setWistiaLoadedError() {
	      window.wistiaSourceError = true;
	    }
	  }, {
	    key: 'createWistiaSourceEl',
	    value: function createWistiaSourceEl() {
	      if (window.wistiaLoaded !== true) {
	        var s = document.createElement('script');
	        var h = document.getElementsByTagName('head')[0];
	        var u = '//fast.wistia.com/assets/external/E-v1.js';

	        s.async = true;
	        s.src = u;
	        h.appendChild(s);

	        // handlers
	        s.onload = this.constructor.setWistiaLoaded;
	        s.onerror = this.constructor.setWistiaLoadedError;
	      }
	    }
	  }]);

	  return VideoSetting;
	}();

	exports.default = VideoSetting;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Observer = function () {
	  function Observer() {
	    _classCallCheck(this, Observer);

	    this.fns = [];
	  }

	  _createClass(Observer, [{
	    key: "subscribe",
	    value: function subscribe(fn) {
	      this.fns.push(fn);
	    }
	  }, {
	    key: "unsubscribe",
	    value: function unsubscribe(fn) {
	      this.fns = this.fns.filter(function (el) {
	        if (el != fn) {
	          el;
	        }
	      });
	    }
	  }, {
	    key: "fire",
	    value: function fire(o) {
	      this.fns.forEach(function (el) {
	        el(o);
	      });
	    }
	  }]);

	  return Observer;
	}();

	exports.default = Observer;

/***/ }
/******/ ]);