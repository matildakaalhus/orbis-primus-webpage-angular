import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.css']
})
export class SlidesComponent implements OnInit, OnDestroy {

  slideTimer;
  visibleSlide = 0;
  changeSlideInterval = 3000;
  isPaused = false;

  SLIDE1;
  SLIDE2;
  SLIDE3;

  constructor() { }

  ngOnInit() {
    this.SLIDE1 = new Image();
    this.SLIDE1.src = './assets/Slideimg1.jpg';
    this.SLIDE2 = new Image();
    this.SLIDE2.src = './assets/Slideimg2.jpg';
    this.SLIDE3 = new Image();
    this.SLIDE3.src = './assets/Slideimg3.jpg';
    this.runSlides();
  }

  ngOnDestroy() {
    clearTimeout(this.slideTimer);
  }

  /* Automatic slideshow */
  runSlides() {
    this.visibleSlide === 3 ? this.showSlide(this.visibleSlide = 1) : this.showSlide(this.visibleSlide += 1);
    this.restartSlideTimer();
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
    clearTimeout(this.slideTimer);
    this.isPaused = true;
  }

  /* Play automatic slideshow */
  playSlides() {
    this.isPaused = false;
    this.restartSlideTimer();
  }

  /* Change to a slide relative to current by n */
  changeSlide(n) {
    let steps = n;
    while (steps > 0) {
      this.visibleSlide === 3 ? this.visibleSlide = 1 : this.visibleSlide++;
      steps--;
    }
    while (steps < 0) {
      this.visibleSlide === 1 ? this.visibleSlide = 3 : this.visibleSlide--;
      steps++;
    }
    this.showSlide(this.visibleSlide);
    if (!this.isPaused) {
      this.restartSlideTimer();
    }
  }

  /**
   * Shows slide n and restarts the slide timer
   */
  setSlide(n) {
    this.showSlide(n);
    if (!this.isPaused) {
      this.restartSlideTimer();
    }
  }

  showSlide(slide) {
    this.visibleSlide = slide;
  }
}
