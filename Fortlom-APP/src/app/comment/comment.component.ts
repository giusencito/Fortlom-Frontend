import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input()
  customTitle: string;
  @Input()
  customText: string;

  constructor() {
    this.customTitle = "...";
    this.customText = "...";
  }

  ngOnInit(): void {
  }

}
