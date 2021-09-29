import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { EventComponent } from './event/event.component';

const routes: Routes = [
{path : 'Home', component: HomeComponent},
{path: 'Event', component: EventComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
