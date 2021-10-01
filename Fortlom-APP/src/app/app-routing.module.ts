import { FanaticForumComponent } from './Fanatic-Forum/Fanatic-Forum.component';


import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { EventComponent } from './event/event.component';
import {ArtistForumComponent} from "./artist-forum/artist-forum.component";

const routes: Routes = [
{path : 'Home', component: HomeComponent},
{path:'fanaticforum',component:FanaticForumComponent},
{path:'Event',component:EventComponent},
{path:'artistforum',component:ArtistForumComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
