import { FanaticForumComponent } from './Fanatic-Forum/Fanatic-Forum.component';

import { FanaticComponent } from './Fanatic/Fanatic.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
const routes: Routes = [
{path : 'Home', component: HomeComponent},
{path:'fanaticforum',component:FanaticForumComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
