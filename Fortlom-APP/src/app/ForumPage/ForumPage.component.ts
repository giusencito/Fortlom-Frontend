import { ActivatedRoute } from '@angular/router';
import { ForumService } from './../services/forum/forum.service';
import { Forum } from '../models/forum';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario/usuario.service';
@Component({
  selector: 'app-ForumPage',
  templateUrl: './ForumPage.component.html',
  styleUrls: ['./ForumPage.component.css']
})
export class ForumPageComponent implements OnInit {
  forum!:Forum
  forumname!:string;
  usuario!:Usuario
  username!:string;
  userlastname!:string
  forumdescription!:string
  idforum!:number
  constructor(private service:ForumService,private route:ActivatedRoute,private service2:UsuarioService) {
   this.forum={}as Forum
   this.usuario={}as Usuario


   }

  ngOnInit() {
    let pod=parseInt(this.route.snapshot.paramMap.get('forumid')!);
    let id= pod;
    this.idforum=id;
    this.getidforum(this.idforum)

  }
  getidforum(id:number){

    this.service.getById(id).subscribe((response:any)=>{

     this.forum=response;
      console.log(this.forum);
      this.forumname=this.forum.ForumName;
      this.forumdescription=this.forum.ForumDescription
      console.log(this.forum.usuario)
      this.getidUser(this.forum.usuario)

    });


  }
  getidUser(id:number){

    this.service2.getById(id).subscribe((response:any)=>{

      this.usuario=response;
       console.log(this.usuario);
       this.username=this.usuario.Name
       this.userlastname=this.usuario.LastName;

    });


  }


}
