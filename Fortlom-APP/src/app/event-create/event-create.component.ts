import {Component , OnInit, ViewChild} from '@angular/core';
import {Event} from '../models/event';
import {EventService} from '../services/event/event.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {NgForm} from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  eventdata!: Event;
  dataSource!: MatTableDataSource<any>;

  @ViewChild('EventForm', {static: false})
  EventForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  constructor(private eventService: EventService,private dialog:MatDialog) { 
    this.eventdata = {} as Event;
    this.dataSource = new MatTableDataSource<any>();  
  }


  ngOnInit():void {
    this.dataSource.paginator = this.paginator;
    this.getAllEvents();
  }


  getAllEvents() {
    this.eventService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.paginator=this.paginator;

      console.log(response)
    });
  }

  addEvent() {
    this.eventService.create(this.eventdata).subscribe((response: any) => {
      this.dataSource.data.push( {...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
    });
  }

  ClearForm(){
    this.EventForm.resetForm();
  }

}
