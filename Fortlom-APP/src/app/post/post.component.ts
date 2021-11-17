import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CommentService} from "../services/comment/comment.service";
import {CommentComponent} from "../comment/comment.component";
import {CommonModule} from "@angular/common";
import {PublicacionService} from "../services/publicacion/publicacion.service";
import {ReportService} from "../services/report/report.service";
import {MultimediaService} from "../services/multimedia/multimedia.service";
import {ActivatedRoute} from "@angular/router";
import  {UsuarioService} from "../services/usuario/usuario.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  aux: any;
  studentData: any;
  dataSource: MatTableDataSource<any>;
  haveInfo = false;
  havePosts = false;
  orderedMultimedia:any = [];
  relatedUser: any;

  @Input()
  textPart = "...";
  @Input()
  titlePart = "...";
  @Input()
  fullPost : any;

  constructor(private commentService: CommentService,
              private postService: PublicacionService,
              private reportService: ReportService,
              private multimediaService: MultimediaService,
              private artistService: UsuarioService,
              private $route: ActivatedRoute) {
    this.studentData = {}
    this.dataSource = new MatTableDataSource<any>();
    this.haveInfo = false;
    this.havePosts = false;
  }

  ngOnInit(): void {
    this.multimediaService.getById(this.fullPost.id) //changed
      .subscribe((response: any) => {
        this.orderedMultimedia = response;
        console.log(this.orderedMultimedia);
        this.haveInfo = true;
      })
    this.artistService.getById(this.fullPost.UserID)
      .subscribe((response: any) => {
        this.relatedUser = response;
        console.log(this.relatedUser);
      })
  }

  likePost(): void {
    this.fullPost.Likes += 1;
    this.postService.update(this.fullPost.id, this.fullPost)
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  getComments(id:any): void {
    id = Number(id);
    this.commentService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
      this.studentData = this.dataSource.data;
      //this.haveInfo = true;
      this.havePosts = true;
    });
  }

  flagPost(): void {
    this.aux = {
      ReportDescription: "Insultos frecuentes",
      UserMain: +this.$route.snapshot.params['artistid'],
      PostReported: this.fullPost.id
    }
    this.reportService.create(this.aux)
      .subscribe((response: any) => {
        console.log(response);
      });
  }
}
