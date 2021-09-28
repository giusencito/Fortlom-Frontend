import { MatSort } from '@angular/material/sort';
import { Forum } from './../Fanatic/Fanatic-Forum';
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FanaticForumService } from './fanatic-forum.service';
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {ChangeDetectorRef} from '@angular/core'
@Component({
  selector: 'app-Fanatic-Forum',
  templateUrl: './Fanatic-Forum.component.html',
  styleUrls: ['./Fanatic-Forum.component.css']
})
export class FanaticForumComponent implements OnInit {
  forumdata !:Forum;
  forums:Forum[]=[];
  dataSource !:MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'ForumName', 'ForumDescription','actions'];
  @ViewChild(MatSort) sort !:MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator !:MatPaginator;
  searchKey!:string;
  isEditMode = false;
  constructor( private service:FanaticForumService) {
    this.forumdata = {} as Forum;
    this.dataSource = new MatTableDataSource<any>();

  }
  ngOnInit(): void {

    this.getAllStudents()
    console.log(this.forums);
    console.log(this.displayedColumns);

  }
  getAllStudents() {
    this.service.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;

      console.log(response)
    });
}
OnSearchClear(){
this.searchKey="";
this.applyfilter();


}

applyfilter(){

this.dataSource.filter=this.searchKey.trim().toLowerCase();


}

















}
