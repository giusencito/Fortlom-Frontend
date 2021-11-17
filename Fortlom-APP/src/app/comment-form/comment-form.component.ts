import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CommentService} from "../services/comment/comment.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  @Input()
  postId: any

  commentData: any;
  dataSource: MatTableDataSource<any>;

  constructor(private commentService : CommentService,
              private $route: ActivatedRoute) {
    this.commentData = {
      CommentDescription: "",
      PublicationID: 1,
      UserID: +this.$route.snapshot.params['artistid'], //change
      Date: ""
    }
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
  }

  postComment(txt: HTMLTextAreaElement): void {
    let today = new Date(); //change
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); //change
    this.commentData.CommentDescription = txt.value;
    this.commentData.PublicationID = this.postId;
    this.commentData.Date = date; //change
    this.commentService.create(this.commentData, 1, 1).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o:any)=>{return o;});
    });
    txt.value = "";
  }
}
