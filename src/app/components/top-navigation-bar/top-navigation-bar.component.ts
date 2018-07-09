import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-navigation-bar',
  templateUrl: './top-navigation-bar.component.html',
  styleUrls: ['./top-navigation-bar.component.css']
})
export class TopNavigationBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.addEventListener('scroll', function() {
      const topNav = document.getElementById('topnav');
      const slideshowHeight = document.getElementById('slideshowcontainer').offsetHeight;
      if (window.pageYOffset >= slideshowHeight) {
          topNav.setAttribute('style', 'position:fixed;');
          topNav.setAttribute('style', 'top:0px;');
      } else {
          topNav.style.position = 'relative';
          topNav.style.top = '';
      }
  });
    this.setActiveNavBarButton(document.getElementById('start'));
  }

setActiveNavBarButton(navBarButton) {
    const topNavButtons = document.getElementsByClassName('topnavbutton');
    // Inactivate all page contents
    for (let i = 0; i < topNavButtons.length; i++) {
      topNavButtons[i].className = topNavButtons[i].className.replace(' active', '');
    }
    // Activate new button
    navBarButton.className += ' active';
}


}
