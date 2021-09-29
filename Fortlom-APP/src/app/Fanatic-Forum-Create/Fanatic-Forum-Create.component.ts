import { Forum } from './../Fanatic-Forum/Fanatic-Forummodel';
import { Component, OnInit } from '@angular/core';
import { FanaticForumComponent } from '../Fanatic-Forum/Fanatic-Forum.component';
import { NgForm } from '@angular/forms';
import { FanaticForumService } from '../Fanatic-Forum/fanatic-forum.service';

@Component({
  selector: 'app-Fanatic-Forum-Create',
  templateUrl: './Fanatic-Forum-Create.component.html',
  styleUrls: ['./Fanatic-Forum-Create.component.css']
})
export class FanaticForumCreateComponent implements OnInit {
  forum_data !: Forum;
  ForumForm!: NgForm;

  constructor() {
    this.forum_data = {} as Forum;

  }

  ngOnInit() {

  }

  onSubmit(){
    console.log(this.forum_data)
    
  }














}
