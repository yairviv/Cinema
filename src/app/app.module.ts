import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from "@angular/material";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';




import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movies/movie.component';
import { MovieDialogComponent } from './movies/movieDialog/moviedialog.component'
import { warningDialogcomponent } from './shared/warningDialog/warningDialog.component'




@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieComponent,
    MovieDialogComponent,
    warningDialogcomponent, 
  ],

 imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
   entryComponents: [
      MovieDialogComponent,warningDialogcomponent,

  ],
  providers: [],
  bootstrap: [AppComponent,],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
  
 })
export class AppModule { }
