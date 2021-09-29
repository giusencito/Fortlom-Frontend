import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Forum } from './Fanatic-Forum';
import { FanaticForumServiceService } from './Fanatic-Forum-Service.service';
@Component({
  selector: 'app-Fanatic',
  templateUrl: './Fanatic.component.html',
  styleUrls: ['./Fanatic.component.css']
})
export class FanaticComponent implements OnInit {
  forumdata !:Forum;
  dataSource !:MatTableDataSource<any>;
  displaycolumns: string[] =['id','ForumName','ForumDescription'];
  constructor(private rs:FanaticForumServiceService) {
    this.forumdata={} as Forum;
    this.dataSource=new MatTableDataSource<any>();
  }

  ngOnInit() {



  }

  getAllStudents() {
    this.rs.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }





}
