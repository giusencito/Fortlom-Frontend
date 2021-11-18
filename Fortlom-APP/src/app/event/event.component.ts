import {Component , OnInit, ViewChild} from '@angular/core';
import {Event} from '../models/event';
import {EventService} from '../services/event/event.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {NgForm} from "@angular/forms";
import * as _ from 'lodash';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EventCreateComponent } from '../event-create/event-create.component';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  eventdata!: Event;
  idevent !:number;
  userdata!: Usuario;
  cont : number = 0;
  listusers : Usuario[] = [];
  events:Event[]=[];
  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;
  arrayevents!: any;
  eventbyid!:any;
  conditionaltype : string = "Test";
  displayedColumns: string[] = ['id','EventName','EventDescription','ArtistID','Likes'];

  @ViewChild('EventForm', {static: false})
  EventForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  isEditMode = false;

  showeventartist = false;

  constructor(private eventService: EventService,private userService: UsuarioService,private dialog:MatDialog, private route:ActivatedRoute) {
    this.eventdata = {} as Event;
    this.userdata = {} as Usuario;
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource2 = new MatTableDataSource<any>();
  }

  ngOnInit():void{
    this.dataSource.paginator = this.paginator;
    this.getAllEvents();
    let pod=parseInt(this.route.snapshot.paramMap.get('artistid')!);
    let id = pod;
    this.idevent=id;
    console.log(this.idevent);
    this.getListArtist();
  }

  getAllEvents() {
    this.eventService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.paginator=this.paginator;
      this.arrayevents = response;
      console.log(this.arrayevents)
    });
  }

  getListArtist(){
    this.eventService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.paginator=this.paginator;
      this.arrayevents = response;
      
      let n = this.arrayevents.length;
      
        for(let i = 0; i<n;i++){
            
          this.userService.getById(this.arrayevents[i].ArtistID).subscribe((response: any) => {
            this.dataSource2.data = response;
            this.dataSource.paginator=this.paginator;
            if(i == 0)this.listusers.push(response);
            if(this.arrayevents[i].ArtistID != this.arrayevents[i+1].ArtistID && i+1<n) this.listusers.push(response);
          });
        }
      
      console.log(this.listusers)
    });
  }

  deleteItem(id: number) {
    this.eventService.delete(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: Event) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addEvent() {
    this.eventService.create(this.eventdata).subscribe((response: any) => {
      this.dataSource.data.push( {...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
    });
  }

  editItem(element: Event) {
    this.eventdata = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.EventForm.resetForm();
  }
  
  deleteEdit(id:number){
    console.log(id);
    this.eventdata.id = _.cloneDeep(id);
    this.deleteItem(this.eventdata.id);
  }

  onCreate(){
    const dialogconfig=new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus=true;
    dialogconfig.width="60%"
     this.dialog.open(EventCreateComponent,dialogconfig);
  }

  updateEvent() {
    this.eventService.update(this.eventdata.id, this.eventdata).subscribe((response: any) => {
      this.arrayevents = this.arrayevents.map((o: Event) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
      this.cancelEdit();
    });
  }

  onSubmit() {
      console.log(this.eventdata);
      if (this.isEditMode) {
        this.updateEvent();
        console.log("se actualizo")
      } else {
        this.addEvent();
      }
  }

  openDialog() {
    const dialogRef = this.dialog.open(EventCreateComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getEventsById(id:number){
    this.eventService.getById(id).subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.paginator=this.paginator;
      
      console.log(response)
    });
  }

  Increasinglikes(id:number){
    this.eventService.getById(id).subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.paginator=this.paginator;
      this.eventdata = response

      var presentlikes = this.eventdata.Likes;
      var finalLikes = presentlikes + 1;
      this.eventdata.Likes = finalLikes

      this.eventService.update(this.eventdata.id, this.eventdata).subscribe((response: any) => {
        this.arrayevents = this.arrayevents.map((o: Event) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });
      });

    });
    
  }

  ShowEventsArtist(){
    this.showeventartist = true;
    console.log(this.showeventartist)
  }

  NotShowEventsArtist(){
    this.showeventartist = false;
    console.log(this.showeventartist)
  }
}