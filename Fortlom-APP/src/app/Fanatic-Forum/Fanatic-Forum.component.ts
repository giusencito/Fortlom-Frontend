import { MatSort } from '@angular/material/sort';
import { Forum } from './Fanatic-Forummodel';
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FanaticForumService } from './fanatic-forum.service';
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {ChangeDetectorRef} from '@angular/core'
import * as _ from 'lodash';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, Validators } from '@angular/forms';
import {FormControl} from '@angular/forms'

@Component({
  selector: 'app-Fanatic-Forum',
  templateUrl: './Fanatic-Forum.component.html',
  styleUrls: ['./Fanatic-Forum.component.css']
})
export class FanaticForumComponent implements OnInit {
  forumdata !:Forum;
  forumdatabyid !:Forum;
  forums:Forum[]=[];
  dataSource !:MatTableDataSource<any>;
  @ViewChild('ForumForm', {static: false})
  ForumForm!: NgForm;
  displayedColumns: string[] = ['id', 'ForumName', 'ForumDescription','actions'];
  @ViewChild(MatSort) sort !:MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator !:MatPaginator;
  searchKey!:string;
  isEditMode = false;
  form:FormGroup=new FormGroup({
  ForumName!:new FormControl('',Validators.required),
  ForumDescription!:new FormControl('',[Validators.required,Validators.maxLength(40)])
});


  constructor( private service:FanaticForumService,private dialog:MatDialog) {
    this.forumdata = {} as Forum;
    this.dataSource = new MatTableDataSource<any>();
    this.forumdatabyid ={} as Forum;

  }
  ngOnInit(): void {

    this.getAllStudents()
    console.log(this.forums);
    console.log(this.displayedColumns);
    console.log(this.isEditMode)
    this.getbyid(1)
  }
  getAllStudents() {
    this.service.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;

      console.log(response)
    });
}







getbyid(id: number){
this.service.getById(id).subscribe((response: any)=>{
this.forumdatabyid=response;


});


}

OnSearchClear(){
this.searchKey="";
this.applyfilter();


}

editItem(element: Forum) {
  this.forumdata = _.cloneDeep(element);
  this.isEditMode = true;
  console.log(this.isEditMode)
}
cancelEdit() {
  this.isEditMode = false;
  this.ForumForm.resetForm();
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


onSubmit(){

  if (this.ForumForm.form.valid) {
  console.log(this.forumdata);
  if (this.isEditMode) {
    console.log("se actualiza")
    this.updateStudent();
  } else {

    this.addStudent();
  }
  }
  else{
    console.log('Invalid data');
  }

}


updateStudent() {
  this.service.update(this.forumdata.id, this.forumdata).subscribe((response: any) => {
    this.dataSource.data = this.dataSource.data.map((o: Forum) => {
      if (o.id === response.id) {
        o = response;
      }
      return o;
    });
    this.cancelEdit();
  });
}

















}