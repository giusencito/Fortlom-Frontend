import { MatSort } from '@angular/material/sort';
import { Forum } from './../Fanatic/Fanatic-Forum';
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FanaticForumService } from './fanatic-forum.service';
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {ChangeDetectorRef} from '@angular/core'
import * as _ from 'lodash';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
  constructor( private service:FanaticForumService,private dialog:MatDialog) {
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

deleteItem(id: number) {
  this.service.delete(id).subscribe((response: any) => {
    this.dataSource.data = this.dataSource.data.filter((o: Forum) => {
      return o.id !== id ? o : false;
    });
  });
  console.log(this.dataSource.data);
}

addStudent() {
  this.service.create(this.forumdata).subscribe((response: any) => {
    this.dataSource.data.push( {...response});
    this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
  });
}

GetForunName($key:string){
  if($key==" "){  return " ";}
  else {return _.find(this.dataSource.data,(obj)=>{return obj.ForumName==$key;});}



}
onCreate(){
  const dialogconfig=new MatDialogConfig();
  dialogconfig.disableClose=true;
  dialogconfig.autoFocus=true;
  dialogconfig.width="60%"
   this.dialog.open(FanaticForumComponent,dialogconfig);
}













}
