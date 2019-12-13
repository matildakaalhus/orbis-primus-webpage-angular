import { Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.css']
})
export class SlidesComponent implements OnInit, OnDestroy {
  @ViewChild('slideimg') slideimg: ElementRef;
  @ViewChild('dot1') dot1: ElementRef;
  @ViewChild('dot2') dot2: ElementRef;
  @ViewChild('dot3') dot3: ElementRef;
  @ViewChild('dot4') dot4: ElementRef;
  @ViewChild('dot5') dot5: ElementRef;
  @ViewChild('dot6') dot6: ElementRef;
  @ViewChild('dot7') dot7: ElementRef;
  @ViewChild('dot8') dot8: ElementRef;
  @ViewChild('slideImage1') slideImage1: ElementRef;
  @ViewChild('slideImage2') slideImage2: ElementRef;
  @ViewChild('slideImage3') slideImage3: ElementRef;
  @ViewChild('slideImage4') slideImage4: ElementRef;
  @ViewChild('slideImage5') slideImage5: ElementRef;
  @ViewChild('slideImage6') slideImage6: ElementRef;
  @ViewChild('slideImage7') slideImage7: ElementRef;
  @ViewChild('slideImage8') slideImage8: ElementRef;

  slideTimer = null;
  visibleSlide = 0;
  changeSlideInterval = 3000;
  isPaused = false;
  numSlides = 8;

  slidesList;
  dotsList;

  constructor() {}

  ngOnInit() {
    this.initSlideImages();
    this.initDots();
    this.runSlides();
  }

  ngOnDestroy() {
    clearTimeout(this.slideTimer);
  }

  /**
   * Create Image objects for each slide and push their src to a list
   * for easy access when changing slides.
   */
  initSlideImages() {
    this.slidesList = [];
    this.slidesList.push(this.slideImage1);
    this.slidesList.push(this.slideImage2);
    this.slidesList.push(this.slideImage3);
    this.slidesList.push(this.slideImage4);
    this.slidesList.push(this.slideImage5);
    this.slidesList.push(this.slideImage6);
    this.slidesList.push(this.slideImage7);
    this.slidesList.push(this.slideImage8);
    for (let i = 0; i < this.numSlides; i++) {
      this.slidesList[i].nativeElement.src = './assets/SlideImage' + String(i + 1) + '.jpg';
    }
  }

  /**
   * Put all dot elements in a list for easy access.
   */
  initDots() {
    this.dotsList = [];
    this.dotsList.push(this.dot1);
    this.dotsList.push(this.dot2);
    this.dotsList.push(this.dot3);
    this.dotsList.push(this.dot4);
    this.dotsList.push(this.dot5);
    this.dotsList.push(this.dot6);
    this.dotsList.push(this.dot7);
    this.dotsList.push(this.dot8);
  }

  /* Automatic slideshow */
  runSlides() {
    this.visibleSlide === this.numSlides ? this.showSlide(1) :
                                            this.showSlide(this.visibleSlide + 1);
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
    let slide = this.visibleSlide;
    while (steps > 0) {
      slide === this.numSlides ? slide = 1 : slide++;
      steps--;
    }
    while (steps < 0) {
      slide === 1 ? slide = this.numSlides : slide--;
      steps++;
    }
    this.showSlide(slide);
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
    if (this.visibleSlide !== slide) {
      this.visibleSlide = slide;
      // Hide all slides and then show only one
      for (let i = 0; i < this.slidesList.length; i++) {
        this.slidesList[i].nativeElement.classList.remove('visible-slide');
      }
      this.slidesList[slide - 1].nativeElement.classList.add('visible-slide');

      // Set all dots to inactive and then set only one to active
      for (let i = 0; i < this.dotsList.length; i++) {
        this.dotsList[i].nativeElement.classList.remove('active-dot');
      }
      this.dotsList[slide - 1].nativeElement.classList.add('active-dot');
    }
  }
}
