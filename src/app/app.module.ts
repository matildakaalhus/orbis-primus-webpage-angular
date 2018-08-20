import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { SlidesComponent } from './components/slides/slides.component';
import { TabContentComponent } from './components/tab-content/tab-content.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatFormFieldModule,
  MatIcon,
} from '@angular/material';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { StartTabComponent } from './components/start-tab/start-tab.component';
import { BookingTabComponent } from './components/booking-tab/booking-tab.component';
import { ContactTabComponent } from './components/contact-tab/contact-tab.component';
import { AboutTabComponent } from './components/about-tab/about-tab.component';
import { DateValidatorDirective } from './directives/date.directive';
import { Http, ConnectionBackend, HttpModule } from '@angular/http';

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
  ],
  imports: [
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
