import { Component, OnInit } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Component({
  selector: 'app-contact-tab',
  templateUrl: './contact-tab.component.html',
  styleUrls: ['./contact-tab.component.css']
})
export class ContactTabComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("send");

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this.http.post("http://orbisprimus.se/MailHandler.php", 'email=jennifer@orbisprimus.se',
      { headers: headers })
    .subscribe(res => console.log(res));
  }
}
