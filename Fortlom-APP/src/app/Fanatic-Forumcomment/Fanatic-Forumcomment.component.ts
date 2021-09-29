import { Forum } from './../models/forum';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from "@angular/material/paginator";
import { ForumcommentService } from '../services/forumcomment/forumcomment.service';
import { Forumcomment } from '../models/forumcomment';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import {NgForm} from "@angular/forms";
@Component({
  selector: 'app-Fanatic-Forumcomment',
  templateUrl: './Fanatic-Forumcomment.component.html',
  styleUrls: ['./Fanatic-Forumcomment.component.css']
})
export class FanaticForumcommentComponent implements OnInit {
  commentdata !:Forumcomment;
  commentdatabyid !:Forumcomment;
  dataSource!:MatTableDataSource<any>;
  commentdataForm !: NgForm;
  displayedColumns: string[] = ['id', 'CommentDescription', 'usuario','forum','Date','actions'];
  @ViewChild(MatSort) sort !:MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator !:MatPaginator;
  searchKey!:string;
  isEditMode = false;
  paso!:string;
  constructor(private service:ForumcommentService) {
     this.commentdata={} as Forumcomment;
     this.commentdatabyid={} as Forumcomment;
     this.dataSource=new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getAllComments()
    console.log(this.displayedColumns);
    console.log(this.isEditMode)
    this.getidComment(1);

  }

  getAllComments(){
    this.service.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;

      console.log(response)

    });


  }


getidComment(id:number){

this.service.getById(id).subscribe((response:any)=>{

  this.commentdatabyid=response;
  console.log(this.commentdatabyid.forum);

});


}

  OnSearchClear(){
    this.searchKey="";
    this.applyfilter();


    }
    editItem(element: Forumcomment) {
      this.commentdata = _.cloneDeep(element);
      this.isEditMode = true;
      console.log(this.isEditMode)
    }

    cancelEdit() {
      this.isEditMode = false;
      this.commentdataForm.resetForm();
    }

    applyfilter(){

      this.dataSource.filter=this.searchKey.trim().toLowerCase();


      }

      deleteItem(id: number) {
        this.service.delete(id).subscribe((response: any) => {
          this.dataSource.data = this.dataSource.data.filter((o: Forumcomment) => {
            return o.id !== id ? o : false;
          });
        });
        console.log(this.dataSource.data);
      }

getforum_name(){




}


addcomment(){

  this.service.create(this.commentdata).subscribe((response: any) => {
    this.dataSource.data.push( {...response});
    this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
  });


}

onSubmit(){
  console.log(this.commentdata);
  if (this.isEditMode) {
    console.log("se actualiza")
    this.updatecomment();
  } else {

    this.addcomment();
  }
}


updatecomment() {
  this.service.update(this.commentdata.id, this.commentdata).subscribe((response: any) => {
    this.dataSource.data = this.dataSource.data.map((o: Forumcomment) => {
      if (o.id === response.id) {
        o = response;
      }
      return o;
    });
    this.cancelEdit();
  });
}
































}
