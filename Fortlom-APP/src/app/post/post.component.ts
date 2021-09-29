import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CommentService} from "../../services/comment.service";
import {CommentComponent} from "../comment/comment.component";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  studentData: any;
  dataSource: MatTableDataSource<any>;
  haveInfo = false;

  constructor(private commentService: CommentService) {
    this.studentData = {}
    this.dataSource = new MatTableDataSource<any>();
    this.haveInfo = false;
  }

  ngOnInit(): void {
  }

  likePost(): void {
    alert("Liking post");
  }
  commentPost(): void {
    alert("Posting comment");
  }
  getComments(): void {
    this.commentService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
      console.log(this.dataSource);
      console.log(this.dataSource.data);
      this.haveInfo = true;
    });
  }
}
