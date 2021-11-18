import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
<<<<<<< HEAD
=======

>>>>>>> origin/feature/feature-US09A
@Component({
  selector: 'app-ArtistNavegation',
  templateUrl: './ArtistNavegation.component.html',
  styleUrls: ['./ArtistNavegation.component.css']
})
export class ArtistNavegationComponent implements OnInit {
<<<<<<< HEAD
=======
  
>>>>>>> origin/feature/feature-US09A
  idnumber!:number
  constructor(private cd:Router,private route:ActivatedRoute) { }

  ngOnInit() {
<<<<<<< HEAD
    let pod=parseInt(this.route.snapshot.paramMap.get('id')!);
    let id= pod;
    this.idnumber=id;
    console.log(this.idnumber)
  }
  enterhome(){

    this.cd.navigate(['/HomeArtist',this.idnumber])

  }
  enterposts(){


  }
  enterEvents(){}
  enterForum(){


    this.cd.navigate(['/HomeArtist',this.idnumber,'ArtistForum'])

=======
    let pod=parseInt(this.route.snapshot.paramMap.get('artistid')!);
    let id= pod;
    this.idnumber=id;

  }

  enterConfigurationArtist(){

    this.cd.navigate(['/HomeArtist',this.idnumber,'ConfigureArtist'])
>>>>>>> origin/feature/feature-US09A
  }
  enterConfigure(){}









}
