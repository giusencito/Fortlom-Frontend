import { Component, OnInit } from '@angular/core';
import {PublicacionService} from "../services/publicacion/publicacion.service";
import {MatTableDataSource} from "@angular/material/table";
import {MultimediaService} from "../services/multimedia/multimedia.service";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  aux1:any;
  aux2:any;
  auxLinks:any = [];
  postData: any;
  dataSource: MatTableDataSource<any>;
  multimediaDialog = false;

  constructor(private postService: PublicacionService,
              private multimediaService: MultimediaService) {
    this.postData = {
      PublicationName: "Post Name",
      PublicationDescription: "",
      Likes: 0,
      Date: "",
      UserID: 5
    };
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
  }

  postPost(txt: HTMLTextAreaElement): void {
    this.postData.PublicationDescription = txt.value;
    this.postService.create(this.postData, 1).subscribe((response: any) => {
      this.dataSource.data.push( {...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
      console.log(this.dataSource.data);
      this.aux1 = this.dataSource.data[0].id;
    });

    if(this.auxLinks.length > 0){
      this.aux2 = {
        MultimediaLink: this.auxLinks[0],
        PublicationCode: this.dataSource.data[0].id
      }
      this.multimediaService.create(this.aux2).subscribe((response: any) => {
        console.log(response);
      })
    }
    txt.value = "";
  }

  getLinkFromDialog(txt: HTMLInputElement): void {
    this.auxLinks.push(txt.value);
  }

}
