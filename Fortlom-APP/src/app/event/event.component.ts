import { Event } from './../models/event';
import {Component , OnInit, ViewChild} from '@angular/core';
import {EventService} from '../services/event/event.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {NgForm} from "@angular/forms";
import * as _ from 'lodash';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EventCreateComponent } from '../event-create/event-create.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  eventdata!: Event;
  events:Event[]=[];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id','EventName','EventDescription','ArtistID','Likes','actions'];

  @ViewChild('EventForm', {static: false})
  EventForm!: NgForm
  Eventprueba!:Event
  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;
  idartists!:number
  isEditMode = false;

  constructor(private eventService: EventService,private dialog:MatDialog) {
    this.eventdata = {} as Event;
    this.dataSource = new MatTableDataSource<any>();
    this.Eventprueba={}as Event;
  }

  ngOnInit():void{
    this.dataSource.paginator = this.paginator;
    console.log(this.events);
    console.log(this.displayedColumns);
    console.log(this.isEditMode)
    this.getAllEvents();

  }

  getAllEvents() {
    this.eventService.getAll().subscribe((response: any) => {
      this.dataSource.data = response.content;
      this.dataSource.paginator=this.paginator;

      console.log(this.dataSource.data)
      this.getArtistId(1)
    });
  }

   getArtistId(id :number){

    
   return this.dataSource.data[id-1].artist.id


   }









  deleteItem(id: number) {
    this.eventService.delete(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: Event) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addEvent(id:number) {
    //this.eventdata.ArtistID=id
    this.eventService.create(this.eventdata,id).subscribe((response: any) => {
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


  updateEvent() {
    this.eventService.update(this.eventdata.id, this.eventdata).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Event) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
      this.cancelEdit();
    });
  }

  onSubmit() {
    if(this.EventForm.form.valid){
      console.log(this.eventdata);
      if (this.isEditMode) {
        this.updateEvent();
        console.log("se actualizo")
      } else {
         console.log(this.idartists);
        this.addEvent(this.idartists);
      }
    }else{
      console.log('Invalid data');
    }
  }

}
