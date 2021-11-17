import { FanaticForumCreateComponent } from './FanaticForumCreate/FanaticForumCreate.component';
import { FanaticRegisterComponent } from './FanaticRegister/FanaticRegister.component';
import { HomeArtistComponent } from './HomeArtist/HomeArtist.component';
import { ArtistRegisterComponent } from './ArtistRegister/ArtistRegister.component';
import { LoginComponent } from './Login/Login.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { FanaticForumComponent } from './Fanatic-Forum/Fanatic-Forum.component';


import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { EventComponent } from './event/event.component';
import { PostPageComponent } from './post-page/post-page.component';
import { ArtistForumComponent } from './artist-forum/artist-forum.component';
import { HomeFanaticComponent } from './HomeFanatic/HomeFanatic.component';
import { ConfigurationComponent } from './configuration/configuration.component';

const routes: Routes = [
{path:'',component:LoginComponent},
{path:'login',component:LoginComponent},
{path : 'Home', component: HomeComponent},
{path:'Event',component:EventComponent},
{path:'Posts',component:PostPageComponent},
{path:'artistforum',component:ArtistForumComponent},
{path:'registerartist',component:ArtistRegisterComponent},
{path:'registerfanatic',component:FanaticRegisterComponent},
{path:'HomeArtist/:artistid',component:HomeArtistComponent},
{path:'HomeFanatic/:fanaticid',component:HomeFanaticComponent},
{path:'HomeFanatic/:fanaticid/FanaticForum',component:FanaticForumComponent},
{path:'HomeFanatic/:fanaticid/FanaticForum/CreateForum',component:FanaticForumCreateComponent},
{path: 'HomeArtist/:artistid/ConfigureArtist',component:ConfigurationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
