var __WistiaVideo__ = require('../modules/wistiaVideo').default
describe('VideoSetting', () => {
  var video
  var hashedId = 'abc'
  beforeEach(() => {
    video = {
      bind: function() {

      }
    }
  })

  afterEach(() => {
    video = {}
  })

  describe('#constructor', () => {
    var wistiaVideo
    describe('when passing in a plugin', () => {
      beforeEach(() => {
        wistiaVideo = new __WistiaVideo__('abc', {
          plugin: {
            'postRoll-v1': { raw: 'html' }
          }
        })
      })
      afterEach(() => {
        wistiaVideo = undefined
      })
      it('should set the value', () => {
        expect(wistiaVideo.settings.options.plugin['postRoll-v1'].raw).to.equal('html')
      })
    })

    describe('when overriding an option', () => {
      var wistiaVideo
      beforeEach(() => {
        wistiaVideo = new __WistiaVideo__('abc', {
          playButton: true
        })
      })
      afterEach(() => {
        wistiaVideo = undefined
      })

      it('should set the value of the option', () => {
        expect(wistiaVideo.settings.options.playButton).to.equal(true) 
      })
    })
  })

  describe('handlers', () => {
    var wistiaVideo
    beforeEach(() => {
      wistiaVideo = new __WistiaVideo__('abc') 
      wistiaVideo.video = {
        play: function() {

        },
        pause: function() {

        }
      }
    })
    afterEach(() => {
      wistiaVideo = undefined
    })
    describe("playHandler", () => {
      it('should fire the onPlay event', () => {
        sinon.spy(wistiaVideo.onPlay, 'fire')
        wistiaVideo.playHandler()
        assert(wistiaVideo.onPlay.fire.calledOnce)
      })
    })
    describe("pauseHandler", () => {
      it('should fire the onPause event', () => {
        sinon.spy(wistiaVideo.onPause, 'fire')
        wistiaVideo.pauseHandler()
        assert(wistiaVideo.onPause.fire.calledOnce)
      })
    })
    describe("endHandler", () => {
      it("should fire the onEnd event", () => {
        sinon.spy(wistiaVideo.onEnd, 'fire')
        wistiaVideo.endHandler()
        assert(wistiaVideo.onEnd.fire.calledOnce)
      })
    })
    describe("timeChangeHandler", () => {
      it("should fire the onTimeChange event", () => {
        sinon.spy(wistiaVideo.onTimeChange, 'fire')
        wistiaVideo.timeChangeHandler()
        assert(wistiaVideo.onTimeChange.fire.calledOnce)
      })
    })
    describe("popoverShowHandler", () => {
      it("should fire the onPopoverShow event", () => {
        sinon.spy(wistiaVideo.onPopoverShow, 'fire') 
        wistiaVideo.popoverShowHandler()
        assert(wistiaVideo.onPopoverShow.fire.calledOnce)
      })
    })
    describe("popoverHideHandler", () => {
      it("should fire the onPopoverHide event", () => {
        sinon.spy(wistiaVideo.onPopoverHide, 'fire')
        wistiaVideo.popoverHideHandler()
        assert(wistiaVideo.onPopoverHide.fire.calledOnce)
      })
    })
  })

  describe('#play', () => {
    var wistiaVideo
    beforeEach(() => {
      wistiaVideo = new __WistiaVideo__('abcd')
    })
    describe('before video loaded', () => {
      beforeEach(() => {
        sinon.spy(wistiaVideo, 'requestPlay')
        wistiaVideo.play()
      })
      afterEach(() => {
        wistiaVideo.requestPlay.restore()
      })

      it('should save the intention of the user', () => {
        assert(wistiaVideo.requestPlay.calledOnce)
      })
    })

    describe('after video loaded', () => {
      beforeEach(() => {
        var video = {
          play: function() {

          }
        }
        wistiaVideo.video = video
        sinon.spy(wistiaVideo.video, 'play')
        wistiaVideo.play()
      })

      afterEach(() => {
        wistiaVideo.video.play.restore()
        wistiaVideo.video = undefined
      })

      it('should call the video play method', () => {
        assert(wistiaVideo.video.play.calledOnce)
      })

    })
  })

  describe('#pause', () => {
    var wistiaVideo
    beforeEach(() => {
      wistiaVideo = new __WistiaVideo__('abc')
    })
    describe('before video loaded', () => {
      it('should not throw an exception', () => {
        expect(wistiaVideo.pause).to.not.throw(Error)
      })

    })
    describe('after video loaded', () => {
      beforeEach(() => {
        var video = {
          pause: function() {

          }
        } 
        wistiaVideo.video = video
        sinon.spy(wistiaVideo.video, 'pause')
        wistiaVideo.pause()
      })

      afterEach(() => {
        wistiaVideo.video.pause.restore()
        wistiaVideo.video = undefined
      })

      it('should call the pause on the video object', () => {
        assert(wistiaVideo.video.pause.calledOnce)
      })
    })
  })
})