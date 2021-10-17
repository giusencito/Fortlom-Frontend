import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CommentService} from "../services/comment/comment.service";
import {CommentComponent} from "../comment/comment.component";
import {CommonModule} from "@angular/common";
import {PublicacionService} from "../services/publicacion/publicacion.service";
import {ReportService} from "../services/report/report.service";

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
  @Input()
  textPart = "...";
  @Input()
  titlePart = "...";
  @Input()
  fullPost : any;

  constructor(private commentService: CommentService,
              private postService: PublicacionService,
              private reportService: ReportService) {
    this.studentData = {}
    this.dataSource = new MatTableDataSource<any>();
    this.haveInfo = false;
  }

  ngOnInit(): void {
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
    this.commentService.getByPostId(id).subscribe((response: any) => {
      this.dataSource.data = response;
      this.studentData = this.dataSource.data;
      this.haveInfo = true;
    });
  }
  flagPost(): void {
    this.aux = {
      ReportDescription: "Insultos frecuentes",
      UserMain: 1,
      PostReported: this.fullPost.id
    }
    this.reportService.create(this.aux)
      .subscribe((response: any) => {
        console.log(response);
      });
  }
}
