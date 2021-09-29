import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DemoMaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FanaticComponent } from './Fanatic/Fanatic.component';
import { FanaticForumComponent } from './Fanatic-Forum/Fanatic-Forum.component';
import { MatInputModule } from '@angular/material/input';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { FanaticForumCreateComponent } from './Fanatic-Forum-Create/Fanatic-Forum-Create.component';
import { FanaticForumcommentComponent } from './Fanatic-Forumcomment/Fanatic-Forumcomment.component';


@NgModule({
  declarations: [	
    AppComponent,
    HomeComponent,
    FanaticComponent,
    FanaticForumComponent,
      FanaticForumCreateComponent,
      FanaticForumcommentComponent
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
  entryComponents:[FanaticForumCreateComponent]
})
export class AppModule { }
