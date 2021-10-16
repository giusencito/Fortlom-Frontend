import { ForumService } from './../services/forum/forum.service';
import { Forum } from './../models/forum';
import { Component, Input, OnInit ,ViewChild} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from "@angular/material/paginator";
import { ForumcommentService } from '../services/forumcomment/forumcomment.service';
import { Forumcomment } from '../models/forumcomment';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import {NgForm} from "@angular/forms";
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';
import { ForumPageComponent } from '../ForumPage/ForumPage.component';
@Component({
  selector: 'app-Fanatic-Forumcomment',
  templateUrl: './Fanatic-Forumcomment.component.html',
  styleUrls: ['./Fanatic-Forumcomment.component.css'],
  providers: [DatePipe]
})
export class FanaticForumcommentComponent implements OnInit {
  commentdata !:Forumcomment;
  commentdatabyid !:Forumcomment;
  dataSource!:MatTableDataSource<any>;
  @ViewChild('commentdataForm', {static: false})
  commentdataForm !: NgForm;
  forumbyid!:Forum;
  fecha!:string;

  displayedColumns: string[] = ['id', 'CommentDescription','forum','Date','actions'];
   @Input() comentarios!:number;
  @ViewChild(MatSort) sort !:MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator !:MatPaginator;
  searchKey!:string;
  isEditMode = false;
  paso:string="vacio";
  myDate : Date;
  proDate = new Date();
  proDatevalue!:string;
  constructor(private service:ForumcommentService,private serviceext:ForumService,private datePipe: DatePipe) {
     this.commentdata={} as Forumcomment;
     this.commentdatabyid={} as Forumcomment;
     this.forumbyid={}as Forum;
     this.dataSource=new MatTableDataSource<any>();
     this.myDate=new Date();

  }

  ngOnInit(): void {


    console.log(this.comentarios)
    this.getAllcommentsperaforum()
    console.log(this.paso)


  }

  getAllComments(){
    this.service.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
      console.log("datos");
      console.log(response)

    });


  }
  getAllcommentsperaforum(){
    this.service.getallcommentsperforum(this.comentarios).subscribe((response: any) => {
      this.dataSource.data = response;
      console.log(response)
    });


  }

getname(){

 this.paso=this.forumbyid.ForumName;
  return this.paso;
}
getidComment(id:number){

this.service.getById(id).subscribe((response:any)=>{

  this.commentdatabyid=response;
  console.log(this.commentdatabyid.ForumId);

});


}

getidForum(id:number){
console.log("entro")
this.serviceext.getById(id).subscribe((response=>this.forumbyid=response))
console.log("medio")
console.log(this.forumbyid)
}


getfecha(sr:string){
this.fecha=sr;
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




addcomment(){

  this.service.create(this.commentdata).subscribe((response: any) => {
    this.dataSource.data.push( {...response});
    this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
  });


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


getfechacomment(fecha:Date){

console.log("fecha")
console.log(fecha)


this.proDate=fecha
console.log(this.proDate)
this.proDatevalue = this.datePipe.transform(fecha, 'yyyy-MM-dd')!;


return this.proDatevalue

}





























}
