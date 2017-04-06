var $ = require('../../../node_modules/jquery/dist/jquery')
const Observer = require('./observer').default

export default class VideoSetting {
  constructor(id, options) {
    if (id === null || id === undefined) {
      throw new Error('An id must be passed in. The hashed id of the wistia video')
    }
    this.id = id
    var opts = options || {}
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
    }
    $.extend(this.settings.options, opts)
    this.onReady = new Observer
    this.onPlay = new Observer
    this.onEnd = new Observer
    this.onPause = new Observer
    this.onTimeChange = new Observer
    this.onPopoverHide = new Observer
    this.onPopoverShow = new Observer
    return this
  }

  onReadyHandler = (video) => {
    video.bind('play', this.playHandler.bind(this))
    video.bind('pause', this.pauseHandler.bind(this))
    video.bind('end', this.endHandler.bind(this))
    video.bind('secondchange', this.timeChangeHandler.bind(this))
    video.bind('popovershow', this.popoverShowHandler.bind(this))
    video.bind('popovershow', this.popoverHideHandler.bind(this))
    this.video = video
    this.playListQueue = []
    this.onReady.fire(video)
    if (this.playHasBeenRequested()) {
      this.play()
    }
  }

  // hashedId, [options], [position]
  addToPlaylist(hashedId, options, position) {
    if(this.videoIsLoaded()) {
      // load into the playlist
      this.videoIsLoaded.addToPlaylist(hashedId, options, position)
    } else {
      // else store in a queue and call onReady
      this.playListQueue.push({hashedId: hashedId, options: options, position: position})
    }
  }

  addQueuedVideosToPlayList() {
    if (this.playListQueue.length > 0) {
      video = this.playListQueue.shift()
      this.addToPlaylist(video.hashedId, video.options, video.position)
      addQueuedVideosToPlayList()
    }
  }

  aspect() {
    if (this.videoIsLoaded()) {
      return this.video.aspect()
    }
  }

  duration() {
    if (this.videoIsLoaded()) {
      return this.video.duration()
    }
  }

  email(val) {
    if (this.videoIsLoaded()) {
      if (val !== 'undefined' && val !== null) {
      }
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

  eventKey() {
    if (this.videoIsLoaded()) {
      return this.video.eventKey()
    }
  }

  hasData() {
    if (this.videoIsLoaded()) {
      return this.video.hasData()
    }
  }

  hashedId() {
    if (this.videoIsLoaded()) {
      return this.video.hashedId()
    }
  }

  height(val, options) {
    // Would be nice to make this able to be synchronouse
    if (this.videoIsLoaded()) {
      if (val !== null && val !== 'undefined') {
        return this.height(val, options)
      } else {
        return this.height()
      }
    }
  }

  name() {
    if (this.videoIsLoaded()) {
      return this.video.name()
    }
  }

  requestPlay() {
    return this.playRequested = true
  }

  playHasBeenRequested() {
    return this.playRequested == true
  }

  videoIsLoaded() {
    return this.video !== null && this.video != undefined
  }

  play = () => {
    if(this.videoIsLoaded()) {
      this.video.play()
    } else {
      this.requestPlay()
    }
    return this
  }

  playHandler() {
    this.onPlay.fire()
  }

  pause = () => {
    if(this.videoIsLoaded()) {
      this.video.pause()
    }
    return this
  }

  percentWatched() {
    if (this.videoIsLoaded()) {
      return this.video.percentWatched()
    }
  }

  playbackRate(r) {
    if (this.videoIsLoaded()) {
      this.video.playbackRate(r)
    }
  }

  replaceWith(hashedId, options) {
    if (this.videoIsLoaded()) {
      this.video.replaceWith(hashedId, options)
    }
  }

  endHandler() {
    this.onEnd.fire()
  }

  pauseHandler() {
    this.onPause.fire()
  }

  timeChangeHandler(s) {
    this.onTimeChange.fire(s)
  }

  popoverShowHandler() {
    this.onPopoverShow.fire()
  }

  popoverHideHandler() {
    this.onPopoverHide.fire()
  }

  static setWistiaSourceLoaded() {
    window.wistiaSourceSet = true
  }

  static setWistiaLoaded() {
    window.wistiaLoaded = true
  }

  static setWistiaLoadedError() {
    window.wistiaSourceError = true
  }

  static createWistiaSourceEl() {
    if (window.wistiaLoaded !== true) {
      var s = document.createElement('script')
      var h = document.getElementsByTagName('head')[0]
      var u = '//fast.wistia.com/assets/external/E-v1.js' 

      s.async = true
      s.src = u
      h.appendChild(s)

      // handlers
      s.onload = this.constructor.setWistiaLoaded 
      s.onerror = this.constructor.setWistiaLoadedError
    }
  }

  initialize() {
    window._wq = window._wq || []
    window._wq.push(this.settings)
    console.log('linked to the right spot')
    return this
  }
}