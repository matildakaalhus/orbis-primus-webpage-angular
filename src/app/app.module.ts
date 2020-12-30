import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { SlidesComponent } from './components/slides/slides.component';
import { TabContentComponent } from './components/tab-content/tab-content.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { StartTabComponent } from './components/start-tab/start-tab.component';
import { BookingTabComponent } from './components/booking-tab/booking-tab.component';
import { ContactTabComponent } from './components/contact-tab/contact-tab.component';
import { AboutTabComponent } from './components/about-tab/about-tab.component';
import { DateValidatorDirective } from './directives/date.directive';
import { HttpModule } from '@angular/http';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { FooterComponent } from './components/footer/footer.component';
import { ApplyTabComponent } from './components/apply-tab/apply-tab.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    SlidesComponent,
    TabContentComponent,
    StartTabComponent,
    BookingTabComponent,
    ContactTabComponent,
    AboutTabComponent,
    DateValidatorDirective,
    ConfirmModalComponent,
    FooterComponent,
    ApplyTabComponent,
    HeaderComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    MatToolbarModule,
    MatInputModule,
    MatTabsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpModule,
    MatCardModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ ModalService ],
  bootstrap: [AppComponent]
})
export class AppModule {}
