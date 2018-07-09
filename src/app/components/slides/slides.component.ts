import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.css']
})
export class SlidesComponent implements OnInit {

  slideTimer;
  slideIndex = 0;
  changeSlideInterval = 3000;
  automaticSlideshow = true;

  constructor() { }

  ngOnInit() {
    this.runSlides();
  }

  /* Automatic slideshow */
  runSlides() {
    if (this.automaticSlideshow) {
      this.showSlide(this.slideIndex += 1);
      this.restartSlideTimer();
    }
  }

  /**
   * Restarts the slide timer
   */
  restartSlideTimer() {
    clearTimeout(this.slideTimer);
    this.slideTimer = setTimeout(() => {
      this.runSlides(); }, this.changeSlideInterval);
  }

  /* Pause automatic slideshow */
  pauseSlides() {
      this.automaticSlideshow = false;
      clearTimeout(this.slideTimer);

      const pauseButton = document.getElementById('pauseButton');
      pauseButton.style.display = 'none';
      const playButton = document.getElementById('playButton');
      playButton.style.display = 'block';
  }

  /* Play automatic slideshow */
  playSlides() {
      this.automaticSlideshow = true;
      this.restartSlideTimer();

      const playButton = document.getElementById('playButton');
      playButton.style.display = 'none';
      const pauseButton = document.getElementById('pauseButton');
      pauseButton.style.display = 'block';
  }

  /* Change to a slide relative to current by n */
  changeSlide(n) {
    this.showSlide(this.slideIndex += n);
    this.restartSlideTimer();
  }

  /**
   * Shows slide n and restarts the slide timer
   */
  setSlide(n) {
    this.showSlide(n);
    this.restartSlideTimer();
  }

  /**
   *  Show slide n. Will hide all slides and dots,
   * then display the right one for slide n.
   */
  showSlide(n) {
    this.slideIndex = n;

    let i;
    const slides = document.getElementsByClassName('slideshowslide');
    const dots = document.getElementsByClassName('dot');
    const slide_dots = [];

    /* Get dots for slide n */
    for (i = 0; i < dots.length; i += slides.length + 1) {
        slide_dots.push(dots[i]);
    }
    /* If trying to go right from last slide, go to first slide */
    if (n > slides.length) {
        this.slideIndex = 1;
    }
    /* If trying to go left from first slide, go to last slide */
    if (n < 1) {
        this.slideIndex = slides.length;
    }
    /* Hide all slides */
    for (i = 0; i < slides.length; i++) {
        slides[i].setAttribute('style', 'display:none;');
    }
    /* Hide all dots */
    for (i = 0; i < slide_dots.length; i++) {
        slide_dots[i].className = slide_dots[i].className.replace(' visible', '');
    }
    /* Display current slide */
    slides[this.slideIndex - 1].setAttribute('style', 'display:inline-block;');
    /* Display correct dot */
    slide_dots[this.slideIndex - 1].className += ' visible';
  }

}
