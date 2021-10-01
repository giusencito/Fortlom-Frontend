import { FanaticForumcommentComponent } from './Fanatic-Forumcomment/Fanatic-Forumcomment.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DemoMaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FanaticForumComponent } from './Fanatic-Forum/Fanatic-Forum.component';
import { MatInputModule } from '@angular/material/input';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'

import { EventComponent } from './event/event.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { ArtistForumComponent } from './artist-forum/artist-forum.component';
import { TableComponent } from './artist-forum/table/table.component';
import { NavbarComponent } from './artist-forum/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    FanaticForumComponent,
    
    EventComponent,
    EventCreateComponent,
    FanaticForumcommentComponent,
    ArtistForumComponent,
    TableComponent,
    NavbarComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
