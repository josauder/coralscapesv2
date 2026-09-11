window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Avoid infinite:true — it cloneNode()s <video> elements and breaks playback.
    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: false,
			autoplay: false,
    }

    var carousels = bulmaCarousel.attach('.carousel', options);

    function slideIndex(carousel) {
      // During 'show' / 'after:show', state.index is still the previous slide;
      // state.next is the slide being shown.
      var length = carousel.state.length;
      var idx = (carousel.state.next != null) ? carousel.state.next : carousel.state.index;
      return ((idx % length) + length) % length;
    }

    function videoForIndex(carousel, idx) {
      var slides = carousel.slides || [];
      for (var i = 0; i < slides.length; i++) {
        var slide = slides[i];
        if (slide.dataset.cloned) continue;
        if (parseInt(slide.dataset.sliderIndex, 10) === idx) {
          return slide.querySelector('video.carousel-video');
        }
      }
      return null;
    }

    function pauseAllVideos(carousel) {
      (carousel.slides || []).forEach(function(slide) {
        var video = slide.querySelector('video.carousel-video');
        if (!video) return;
        video.pause();
      });
    }

    function playActiveCarouselVideo(carousel) {
      var idx = slideIndex(carousel);
      var activeVideo = videoForIndex(carousel, idx);
      if (!activeVideo) return;

      pauseAllVideos(carousel);

      try { activeVideo.currentTime = 0; } catch (e) {}
      var playPromise = activeVideo.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function() {
          // Retry once media is ready (muted autoplay can race with loading).
          activeVideo.addEventListener('loadeddata', function onReady() {
            activeVideo.removeEventListener('loadeddata', onReady);
            activeVideo.play().catch(function() {});
          });
          if (activeVideo.readyState < 2) {
            activeVideo.load();
          }
        });
      }
    }

    carousels.forEach(function(carousel) {
      if (!carousel || !carousel.slides) return;
      if (!videoForIndex(carousel, 0)) return;

      carousel.slides.forEach(function(slide) {
        var video = slide.querySelector('video.carousel-video');
        if (!video) return;
        video.addEventListener('ended', function() {
          carousel.next();
        });
      });

      carousel.on('before:show', function() {
        pauseAllVideos(carousel);
      });

      carousel.on('show', function() {
        playActiveCarouselVideo(carousel);
      });

      playActiveCarouselVideo(carousel);
    });

    bulmaSlider.attach();
})
