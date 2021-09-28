import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  likePost(): void {
    alert("Liking post");
  }
  commentPost(): void {
    alert("Posting comment");
  }
  getPosts(): void {
    alert("Getting Posts");
  }
}
